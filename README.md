# 🚀 NEXUS IMS PRO
### *Enterprise-Grade Financial Management & Asset Suite*

Nexus IMS Pro is a high-performance, full-stack Inventory and Invoice Management System designed for modern enterprises. It combines sophisticated financial intelligence with a premium, executive-level user experience to streamline architectural estimates, billing cycles, and payment settlements.

---

## ✨ Premium Features

### 📈 Executive Intelligence Dashboard
*   **Real-time Revenue Projections**: Dynamic Chart.js integration visualizing monthly income growth.
*   **Financial Stat Cards**: Instant visibility into Gross Revenue, Settled Invoices, Outstanding Debt, and Partner Network scale.
*   **Operational Quick Links**: High-speed navigation to core modules with interactive micro-animations.

### 💼 Professional Client Registry
*   **Corporate Identity Tracking**: Centralized database for client partners with GST verification.
*   **Relationship Management**: High-density row-based UI for efficient communication and location tracking.

### 📝 Strategic Proposal Terminal
*   **Draft-to-Invoice Workflow**: Create detailed architectural estimates that automatically convert into legal invoices upon approval.
*   **Status Lifecycle**: Manage proposals through Pending, Approved, and Rejected states with full audit trails.

### 💳 Financial Ledger & Payments
*   **Liability Tracking**: Dedicated "Outstanding Liabilities" section for sales teams to monitor pending dues.
*   **Secure Settlements**: Record payments with unique transaction hashes and verification protocols.
*   **Automated Status Updates**: Real-time synchronization between payments, invoices, and dashboards.

### 📊 Data Portability & Security
*   **One-Click CSV Export**: Context-aware data export functionality across all modules (Clients, Invoices, Payments).
*   **Role-Based Access Control (RBAC)**: Granular security separating `ADMIN` (Overseer) and `SALES` (Operational) permissions.
*   **Premium Aesthetics**: Immersive Glassmorphism design system with custom dark-theme corporate backgrounds.

---

## 🛠️ Technology Stack

**Frontend:**
- **React 18** (Vite-powered)
- **Lucide React** (High-precision iconography)
- **Chart.js** (Financial data visualization)
- **Vanilla CSS + Glassmorphism** (Custom design system)

**Backend:**
- **Java Spring Boot** (Secure RESTful API)
- **Spring Security + JWT** (Cryptographic authentication)
- **Hibernate/JPA** (Data persistence)
- **MySQL** (Relational Database)

---

## 🚀 Getting Started

### 📖 Deployment Options

Choose your preferred deployment method:

| Method | Time | Cost | Best For |
|--------|------|------|----------|
| **[Vercel + Railway (HTTPS)](VERCEL_QUICK_START.md)** 🌐 | 15 min | FREE | **Production, Public facing** |
| [Docker](QUICK_START.md) 🐳 | 5 min | FREE | Staging, Local testing |
| [Local Dev](QUICK_START.md) 💻 | 10 min | FREE | Development, Debugging |

### ⚡ FASTEST: Vercel Deployment (HTTPS + Production Ready)

**Deploy in 15 minutes with HTTPS:**

```bash
# 1. Push to GitHub
git push origin main

# 2. Deploy Frontend on Vercel
# Visit https://vercel.app → Import repo → Select ims-frontend

# 3. Deploy Backend on Railway  
# Visit https://railway.app → GitHub Repo → Java auto-detected

# Done! Your app is live at https://your-app.vercel.app ✅
```

👉 **[Full Vercel + Railway Guide](VERCEL_QUICK_START.md)** - Step-by-step instructions

### 🐳 ALTERNATIVE: Docker Deployment

```bash
# One command deployment!
docker-compose up -d
```
**Access**: Frontend at http://localhost | Backend at http://localhost:9001

### 💻 Local Development Setup

```bash
# Terminal 1 - Backend
cd ims-backend && mvn spring-boot:run

# Terminal 2 - Frontend
cd ims-frontend && npm install && npm run dev
```
**Access**: Frontend at http://localhost:5173 | Backend at http://localhost:9001

### 🔑 Default Access Credentials
For evaluation purposes, use the following verified identities:

| Role | System Identifier | Access Key |
| :--- | :--- | :--- |
| **System Admin** | `admin` | `admin123` |
| **Sales Lead** | `sales-Akansha` | `12345678` |

---

## 👤 Developer Credit
**Nexus IMS Pro** was developed with precision and 💚 by **Akansha❤️**.

> *"Turning complex financial workflows into elegant digital experiences."*

© 2026 NEXUS FINANCIAL TECHNOLOGIES. ALL RIGHTS RESERVED.
