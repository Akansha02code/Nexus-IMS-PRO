import { useEffect, useState } from 'react';
import invoiceService from '../services/invoiceService';

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        invoiceService.getAllInvoices().then(res => setInvoices(res.data));
    }, []);

    return (
        <div className="animate-fade">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Invoices</h1>
                <p className="text-text-muted">Automated invoices from approved estimates</p>
            </div>

            <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-glass text-text-muted text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Invoice #</th>
                            <th className="px-6 py-4">Client</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Paid</th>
                            <th className="px-6 py-4">Balance</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {invoices.map((inv) => (
                            <tr key={inv.id} className="hover:bg-glass">
                                <td className="px-6 py-4 font-mono text-sm">{inv.invoiceNumber}</td>
                                <td className="px-6 py-4">{inv.estimate?.client?.name}</td>
                                <td className="px-6 py-4 font-semibold">₹{inv.totalAmount?.toLocaleString()}</td>
                                <td className="px-6 py-4 text-green-500">₹{inv.paidAmount?.toLocaleString()}</td>
                                <td className="px-6 py-4 text-red-400">₹{inv.balanceAmount?.toLocaleString()}</td>
                                <td className="px-6 py-4 text-sm font-bold">
                                    <span className={`px-2 py-1 rounded ${inv.status === 'PAID' ? 'bg-green-500/20 text-green-500' :
                                            inv.status === 'PARTIALLY_PAID' ? 'bg-blue-500/20 text-blue-500' :
                                                'bg-red-500/20 text-red-500'
                                        }`}>
                                        {inv.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {invoices.length === 0 && (
                    <div className="text-center py-12 text-text-muted">No invoices generated yet.</div>
                )}
            </div>
        </div>
    );
};

export default Invoices;
