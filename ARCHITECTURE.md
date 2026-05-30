# 🏗️ NEXUS IMS PRO - ARCHITECTURE & DEPLOYMENT DIAGRAM

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         END USERS                               │
│              (Browser Access - Any Device)                      │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER (PORT 80/3000)                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │          React 18 + Vite Application                    │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │ Pages:                                          │    │   │
│  │  │ • Dashboard (Revenue, Stats, Charts)            │    │   │
│  │  │ • Clients (Client Management)                   │    │   │
│  │  │ • Estimates (Proposal Management)               │    │   │
│  │  │ • Invoices (Invoice Tracking)                   │    │   │
│  │  │ • Payments (Payment Recording)                  │    │   │
│  │  │ • Reports (Data Analysis)                       │    │   │
│  │  │ • Users (User Management - Admin Only)          │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  │                                                          │   │
│  │  Tech: React 18, Vite, Lucide Icons, Chart.js          │   │
│  │  Styling: Glassmorphism, Dark Theme, Responsive        │   │
│  └─────────────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │  CORS Enabled API Calls     │
        │  (JWT Authentication)       │
        ▼                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                    BACKEND LAYER (PORT 9001)                    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │      Spring Boot 3.4.1 REST API (Java 17)             │    │
│  │                                                        │    │
│  │  Authentication & Security:                           │    │
│  │  • Spring Security                                    │    │
│  │  • JWT Token Generation & Validation                 │    │
│  │  • Role-Based Access Control (ADMIN, SALES)          │    │
│  │  • CORS Configuration                                │    │
│  │                                                        │    │
│  │  API Endpoints:                                       │    │
│  │  ┌────────────────────────────────────────────┐      │    │
│  │  │ POST   /api/auth/login                     │      │    │
│  │  │ POST   /api/auth/signup                    │      │    │
│  │  │ GET    /api/dashboard/stats                │      │    │
│  │  │ GET    /api/clients                        │      │    │
│  │  │ POST   /api/clients                        │      │    │
│  │  │ GET    /api/estimates                      │      │    │
│  │  │ POST   /api/estimates                      │      │    │
│  │  │ GET    /api/invoices                       │      │    │
│  │  │ POST   /api/invoices                       │      │    │
│  │  │ GET    /api/payments                       │      │    │
│  │  │ POST   /api/payments                       │      │    │
│  │  │ GET    /api/reports                        │      │    │
│  │  └────────────────────────────────────────────┘      │    │
│  │                                                        │    │
│  │  Data Models:                                         │    │
│  │  • User (Email, Role, Password Hash)                │    │
│  │  • Client (Company, GST, Contact)                   │    │
│  │  • Estimate (Draft Invoices)                        │    │
│  │  • Invoice (Billed Amounts)                         │    │
│  │  • Payment (Transaction Records)                    │    │
│  │                                                        │    │
│  │  Tech Stack:                                          │    │
│  │  • Spring Boot Web, Security, Data JPA              │    │
│  │  • Hibernate ORM                                     │    │
│  │  • JWT Library                                       │    │
│  │  • Maven Build Tool                                 │    │
│  └────────────────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │  SQL Queries (JDBC)          │
        │  Connection Pooling          │
        ▼                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                  DATABASE LAYER (PORT 3306)                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              MySQL 8.0 Database                        │    │
│  │                                                        │    │
│  │  Tables:                                              │    │
│  │  ┌──────────────────────────────────────────┐        │    │
│  │  │ users                                    │        │    │
│  │  │ • id, email, password_hash, role        │        │    │
│  │  │ • created_at, updated_at                │        │    │
│  │  │ Primary Key: id                         │        │    │
│  │  └──────────────────────────────────────────┘        │    │
│  │  ┌──────────────────────────────────────────┐        │    │
│  │  │ clients                                  │        │    │
│  │  │ • id, name, gst_number, email           │        │    │
│  │  │ • phone, address, created_at            │        │    │
│  │  │ Foreign Key: created_by (users.id)      │        │    │
│  │  └──────────────────────────────────────────┘        │    │
│  │  ┌──────────────────────────────────────────┐        │    │
│  │  │ estimates                                │        │    │
│  │  │ • id, client_id, status, total_amount   │        │    │
│  │  │ • description, created_at               │        │    │
│  │  │ Foreign Key: client_id (clients.id)    │        │    │
│  │  └──────────────────────────────────────────┘        │    │
│  │  ┌──────────────────────────────────────────┐        │    │
│  │  │ invoices                                 │        │    │
│  │  │ • id, estimate_id, status, amount_due   │        │    │
│  │  │ • due_date, issue_date                  │        │    │
│  │  │ Foreign Key: estimate_id (estimates.id) │        │    │
│  │  └──────────────────────────────────────────┘        │    │
│  │  ┌──────────────────────────────────────────┐        │    │
│  │  │ payments                                 │        │    │
│  │  │ • id, invoice_id, amount, status        │        │    │
│  │  │ • transaction_hash, paid_at             │        │    │
│  │  │ Foreign Key: invoice_id (invoices.id)   │        │    │
│  │  └──────────────────────────────────────────┘        │    │
│  │                                                        │    │
│  │  Data Persistence:                                   │    │
│  │  • InnoDB Storage Engine                             │    │
│  │  • UTF-8 Character Set                              │    │
│  │  • Foreign Key Constraints                          │    │
│  │  • Indexes on frequently queried columns            │    │
│  └────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

---

## Local Development Setup

```
Developer Machine
┌──────────────────────────────────────────────────┐
│                                                  │
│  Terminal 1: Backend                            │
│  $ cd ims-backend                               │
│  $ mvn spring-boot:run                          │
│  ▶ http://localhost:9001                        │
│                                                  │
│  Terminal 2: Frontend                           │
│  $ cd ims-frontend                              │
│  $ npm install && npm run dev                   │
│  ▶ http://localhost:5173                        │
│                                                  │
│  Terminal 3: MySQL                              │
│  (Running in background)                        │
│  ▶ localhost:3306                               │
│                                                  │
│  Database Credentials:                          │
│  • Username: root                               │
│  • Password: Akanshaa@02                        │
│  • Database: test                               │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Docker Deployment Architecture

```
Host Machine (Port: 80, 443, 9001, 3306)
│
└─ Docker Daemon
   │
   └─ Docker Network: ims-network
      │
      ├─────────────────────────────────────────┐
      │  Container: mysql                       │
      │  Image: mysql:8.0                       │
      │  Port: 3306:3306                        │
      │  Volume: mysql_data (persistent)        │
      │  Health Check: mysqladmin ping          │
      └─────────────────────────────────────────┘
      │
      ├─────────────────────────────────────────┐
      │  Container: backend                     │
      │  Image: Custom (Dockerfile)             │
      │  Port: 9001:9001                        │
      │  Env: DB_URL, DB_USER, DB_PASSWORD     │
      │  Depends On: mysql (healthy)            │
      │  Health Check: curl /api/health         │
      │  Restart: unless-stopped                │
      └─────────────────────────────────────────┘
      │
      └─────────────────────────────────────────┐
         Container: frontend                    │
         Image: Custom (Dockerfile.prod)        │
         Port: 80:3000, 443:3443                │
         Env: VITE_API_URL                      │
         Depends On: backend                    │
         Restart: unless-stopped                │
      └─────────────────────────────────────────┘
```

---

## Deployment Options Comparison

```
┌─────────────────────┬────────────┬─────────────┬──────────────┐
│ Feature             │ Local Dev  │ Docker      │ Cloud        │
├─────────────────────┼────────────┼─────────────┼──────────────┤
│ Setup Time          │ 30 min     │ 5 min       │ 15 min       │
│ Consistency         │ Machine    │ Perfect ✓   │ Perfect ✓    │
│ Scalability         │ Single PC  │ Single Host │ Unlimited ✓  │
│ Backup              │ Manual     │ Automatic   │ Managed ✓    │
│ SSL/TLS             │ Manual     │ Manual      │ Auto ✓       │
│ Monitoring          │ Manual     │ Manual      │ Built-in ✓   │
│ Cost                │ Free       │ Free        │ $10-100/mo   │
│ Best For            │ Dev        │ Staging/QA  │ Production   │
│ Recommended         │ -          │ ✓✓✓         │ ✓✓✓          │
└─────────────────────┴────────────┴─────────────┴──────────────┘
```

---

## Data Flow Diagram

```
User Login Flow:
━━━━━━━━━━━━━━━━

1. User enters credentials
   │
   ▼
2. Frontend POSTs to /api/auth/login
   │
   ▼
3. Backend validates credentials against database
   │
   ├─ Invalid? ──→ Return 401 Unauthorized
   │
   └─ Valid? ──→ 4. Generate JWT Token
                  │
                  ▼
              5. Return Token & User Info
                  │
                  ▼
              6. Frontend stores JWT in localStorage
                  │
                  ▼
              7. All subsequent requests include JWT in header
                  │
                  ▼
              8. Backend validates JWT on each request
                  │
                  └─→ Valid? ──→ Process request ──→ Return data
                      │
                      └─ Invalid? ──→ Redirect to login


Invoice Creation Flow:
━━━━━━━━━━━━━━━━━━━━

1. User fills invoice form
   │
   ▼
2. Frontend validates data
   │
   ▼
3. Frontend POSTs to /api/invoices
   │
   ▼
4. Backend receives request
   │
   ├─ 5. Validates JWT token
   │
   ├─ 6. Checks user permissions (ADMIN/SALES)
   │
   ├─ 7. Validates data format
   │
   └─ 8. Creates invoice record in database
        │
        ▼
      9. Returns created invoice with ID
        │
        ▼
     10. Frontend updates UI
        │
        ▼
     11. Shows success message to user


Payment Recording Flow:
━━━━━━━━━━━━━━━━━━━━━

1. User selects invoice to pay
   │
   ▼
2. User enters payment amount
   │
   ▼
3. Frontend POSTs to /api/payments
   │
   ▼
4. Backend receives payment request
   │
   ├─ 5. Validates JWT
   │
   ├─ 6. Checks invoice exists
   │
   ├─ 7. Validates payment amount ≤ outstanding
   │
   ├─ 8. Creates payment record
   │
   ├─ 9. Generates transaction hash
   │
   ├─ 10. Updates invoice status
   │
   ├─ 11. If payment ≥ invoice → Mark PAID
   │
   └─ 12. Updates dashboard statistics
        │
        ▼
      13. Returns payment confirmation
        │
        ▼
     14. Frontend displays success
        │
        ▼
     15. User sees updated invoice status
```

---

## Security Architecture

```
┌──────────────────────────────────────────────────────┐
│          AUTHENTICATION & AUTHORIZATION              │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Layer 1: Frontend                                  │
│  • Store JWT in localStorage                        │
│  • Send JWT in Authorization header                 │
│  • Clear JWT on logout                              │
│                                                      │
│  Layer 2: CORS (Cross-Origin Resource Sharing)      │
│  • Allow requests only from authorized origins      │
│  • Prevent unauthorized domain access               │
│                                                      │
│  Layer 3: Spring Security                           │
│  • Filter all incoming requests                     │
│  • Validate JWT token                               │
│  • Extract user information from token              │
│                                                      │
│  Layer 4: Authorization                             │
│  • Check user role (ADMIN vs SALES)                │
│  • Enforce role-based access control                │
│  • Some endpoints admin-only, others sales-only    │
│                                                      │
│  Layer 5: Data Validation                           │
│  • Validate all input data                          │
│  • Prevent SQL injection                            │
│  • Sanitize user inputs                             │
│                                                      │
│  Layer 6: Database                                  │
│  • Store password hashes (not plain text)           │
│  • Use strong encryption algorithms                 │
│  • Enforce foreign key constraints                  │
│                                                      │
└──────────────────────────────────────────────────────┘

JWT Token Structure:
┌────────────────────────────────────────────┐
│  Header.Payload.Signature                  │
├────────────────────────────────────────────┤
│  Header: {                                 │
│    "alg": "HS256",                         │
│    "typ": "JWT"                            │
│  }                                         │
├────────────────────────────────────────────┤
│  Payload: {                                │
│    "sub": "user_id",                       │
│    "email": "user@example.com",            │
│    "role": "ADMIN",                        │
│    "iat": 1234567890,                      │
│    "exp": 1234654290                       │
│  }                                         │
├────────────────────────────────────────────┤
│  Signature: HMAC-SHA256(                   │
│    base64(Header) + "." + base64(Payload),│
│    SECRET_KEY                              │
│  )                                         │
└────────────────────────────────────────────┘
```

---

## Monitoring & Health Checks

```
┌───────────────────────────────────────────────────┐
│           HEALTH CHECK ENDPOINTS                  │
├───────────────────────────────────────────────────┤
│                                                   │
│  Frontend:                                        │
│  GET http://localhost:80/                        │
│  Returns: 200 OK (page loads)                    │
│                                                   │
│  Backend API:                                     │
│  GET http://localhost:9001/api/health            │
│  Returns: 200 OK {status: "UP"}                  │
│                                                   │
│  Database:                                        │
│  GET http://localhost:9001/api/health            │
│  Includes: database connection status            │
│                                                   │
│  Docker:                                          │
│  docker-compose ps                               │
│  Shows: Container status (Up/Exit/etc)          │
│                                                   │
│  Logs:                                            │
│  docker-compose logs -f [service]                │
│  Shows: Real-time service logs                   │
│                                                   │
└───────────────────────────────────────────────────┘
```

---

## Performance Optimization

```
Frontend Optimization:
═══════════════════════════════════════════════════
• Vite: Lightning-fast build tool & dev server
• Code Splitting: Lazy load pages on demand
• Caching: Browser caches static assets
• Gzip Compression: Reduces file sizes by 70%
• Minification: Removes unnecessary characters
• Tree Shaking: Removes unused code

Backend Optimization:
═══════════════════════════════════════════════════
• Connection Pooling: Reuse database connections
• Query Optimization: Indexed database queries
• Response Caching: Cache frequently accessed data
• Pagination: Load data in chunks, not all at once
• Spring Boot: Built-in performance tuning
• JPA Optimization: Lazy loading, batch processing

Database Optimization:
═══════════════════════════════════════════════════
• Indexes: Speed up searches on large tables
• Foreign Keys: Maintain data integrity
• Normalization: Reduce data redundancy
• Connection Pool: Limit concurrent connections
• Regular Backups: Ensure data recovery
• Query Monitoring: Track slow queries
```

---

## Scaling Strategy

```
Current Setup (Single Server):
┌─────────────────────────────────┐
│      Single EC2 Instance        │
│  t3.medium (2 CPU, 4GB RAM)     │
│  ├─ MySQL Database              │
│  ├─ Spring Boot Backend          │
│  └─ React Frontend               │
└─────────────────────────────────┘

Scaling Level 2 (Multiple Servers):
┌──────────────────┐   ┌──────────────────┐
│   EC2 Instance   │   │   EC2 Instance   │
│  (Load Balancer) │   │  (Backend #1)    │
│   ├─ React FE    │   │  Port 9001       │
│   └─ API Gateway │   └──────────────────┘
└──────────────────┘   
                       ┌──────────────────┐
                       │  EC2 Instance    │
                       │  (Backend #2)    │
                       │  Port 9001       │
                       └──────────────────┘
                       
                       ┌──────────────────┐
                       │  RDS Instance    │
                       │  (MySQL Master)  │
                       │  Multi-AZ        │
                       └──────────────────┘

Scaling Level 3 (High Availability):
┌──────────────────┐
│   CloudFront CDN │ (Caches frontend)
├──────────────────┤
│  Load Balancer   │ (Distributes traffic)
├─────────────────────────────────────────┤
│  │  EC2 Backend #1  │  EC2 Backend #2   │
│  │  Port 9001       │  Port 9001        │
└─────────────────────────────────────────┘
                      ▼
        ┌─────────────────────────────┐
        │  RDS MySQL Multi-AZ         │
        │  ├─ Master (Write)          │
        │  └─ Standby (Read Replica)  │
        └─────────────────────────────┘
                      ▼
        ┌─────────────────────────────┐
        │  S3 Backup Storage          │
        │  (Automated daily backups)  │
        └─────────────────────────────┘
```

---

## Disaster Recovery

```
Backup & Recovery Plan:
═══════════════════════════════════════════════════

Daily Backups:
├─ 1:00 AM - Full database backup
├─ Store in S3 (off-site)
├─ Retain for 30 days
└─ Test restore weekly

Weekly Backups:
├─ Sunday midnight - Full backup
├─ Store in separate AWS region
├─ Retain for 90 days
└─ Keep for compliance

Recovery Procedures:
├─ Database Failure (< 1 hour):
│  1. Stop affected services
│  2. Restore from most recent backup
│  3. Verify data integrity
│  4. Restart services
│
├─ Complete Server Failure (< 30 minutes):
│  1. Launch new EC2 instance
│  2. Deploy Docker containers
│  3. Restore database from S3
│  4. Update DNS records
│  5. Verify all services
│
└─ Data Center Failure (< 4 hours):
   1. Activate disaster recovery in different region
   2. Restore database from cross-region backup
   3. Update load balancer
   4. Notify users of status
   5. Begin gradual migration
```

---

**Ready to deploy? See [QUICK_START.md](QUICK_START.md) for immediate next steps!** 🚀

*Diagram Version: 1.0 | Last Updated: May 2026*
