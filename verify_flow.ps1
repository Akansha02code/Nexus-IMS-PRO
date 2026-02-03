# Internal Management System - Business Flow Verification Script
$baseUrl = "http://localhost:9001/api"

Write-Host "--- 1 & 2. Admin Login ---" -ForegroundColor Cyan
$loginBody = @{ username = "admin"; password = "admin123" } | ConvertTo-Json
try {
    $adminSession = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
    $adminToken = "Bearer " + $adminSession.token
    Write-Host "Admin Logged In. Token acquired." -ForegroundColor Green
}
catch {
    Write-Host "Admin Login Failed. Ensure backend is running and DataInitializer created 'admin'." -ForegroundColor Red
    exit
}

Write-Host "`n--- 3. Create Sales User ---" -ForegroundColor Cyan
$salesUser = @{
    username = "sales_demo"
    name     = "Demo Sales executive"
    email    = "sales@ims.com"
    password = "sales123"
    role     = "SALES"
} | ConvertTo-Json
$res = Invoke-RestMethod -Uri "$baseUrl/auth/signup" -Method Post -Headers @{ Authorization = $adminToken } -Body $salesUser -ContentType "application/json"
Write-Host "Sales User Created: $res" -ForegroundColor Green

Write-Host "`n--- 4. Login Sales ---" -ForegroundColor Cyan
$salesLogin = @{ username = "sales_demo"; password = "sales123" } | ConvertTo-Json
$salesSession = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $salesLogin -ContentType "application/json"
$salesToken = "Bearer " + $salesSession.token
Write-Host "Sales Logged In." -ForegroundColor Green

Write-Host "`n--- 5. Create Client ---" -ForegroundColor Cyan
$clientBody = @{
    clientName = "Acme Corp"
    email      = "contact@acme.com"
    phone      = "9876543210"
    address    = "123 Business Way, Industrial Area"
} | ConvertTo-Json
$client = Invoke-RestMethod -Uri "$baseUrl/clients" -Method Post -Headers @{ Authorization = $salesToken } -Body $clientBody -ContentType "application/json"
Write-Host "Client Created: $($client.clientName) (ID: $($client.id))" -ForegroundColor Green

Write-Host "`n--- 6. Create Estimate ---" -ForegroundColor Cyan
$estimateBody = @{
    client = @{ id = $client.id }
    items  = @(
        @{ description = "Software Service"; quantity = 1; unitPrice = 50000.0 }
    )
} | ConvertTo-Json
$estimate = Invoke-RestMethod -Uri "$baseUrl/estimates" -Method Post -Headers @{ Authorization = $salesToken } -Body $estimateBody -ContentType "application/json"
Write-Host "Estimate Created: $($estimate.estimateNumber) - Grand Total: ₹$($estimate.grandTotal)" -ForegroundColor Green

Write-Host "`n--- 7. Generate Invoice (Approve Estimate) ---" -ForegroundColor Cyan
$approvedEstimate = Invoke-RestMethod -Uri "$baseUrl/estimates/$($estimate.id)/approve" -Method Patch -Headers @{ Authorization = $adminToken }
Write-Host "Estimate Approved. Automated Invoice Triggered." -ForegroundColor Green

# Small delay to ensure DB sync
Start-Sleep -Seconds 1

Write-Host "`n--- 8. Add Payment ---" -ForegroundColor Cyan
# Get the auto-generated invoice
$invoices = Invoke-RestMethod -Uri "$baseUrl/invoices" -Method Get -Headers @{ Authorization = $adminToken }
$targetInvoice = $invoices | Where-Object { $_.estimate.id -eq $estimate.id } | Select-Object -First 1

$paymentBody = @{
    invoice       = @{ id = $targetInvoice.id }
    amount        = $targetInvoice.finalAmount
    paymentMode   = "UPI"
    transactionId = "TXN" + (Get-Date -Format "yyyyMMddHHmmss")
    status        = "COMPLETED"
} | ConvertTo-Json
$payment = Invoke-RestMethod -Uri "$baseUrl/payments" -Method Post -Headers @{ Authorization = $adminToken } -Body $paymentBody -ContentType "application/json"
Write-Host "Payment of ₹$($payment.amount) recorded successfully." -ForegroundColor Green

Write-Host "`n--- 9. Check Invoice Status Updated ---" -ForegroundColor Cyan
$finalInvoice = Invoke-RestMethod -Uri "$baseUrl/invoices/$($targetInvoice.id)" -Method Get -Headers @{ Authorization = $adminToken }
Write-Host "Final Invoice Status: $($finalInvoice.status)" -ForegroundColor Yellow # Should be PAID
Write-Host "Balance Remaining: ₹$($finalInvoice.balanceAmount)" -ForegroundColor Yellow

Write-Host "`n--- 10. Load Dashboard API ---" -ForegroundColor Cyan
$stats = Invoke-RestMethod -Uri "$baseUrl/dashboard/stats" -Method Get -Headers @{ Authorization = $adminToken }
Write-Host "Dashboard Stats:" -ForegroundColor Green
Write-Host "Total Revenue: ₹$($stats.totalRevenue)"
Write-Host "Paid Invoices: $($stats.paidInvoices)"
Write-Host "Monthly Summary Count: $($stats.monthlySales.Keys.Count) month(s)"
