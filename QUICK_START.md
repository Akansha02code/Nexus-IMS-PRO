# 🚀 DEPLOYMENT QUICK START GUIDE

## 📌 Quick Reference

### Your Application Stack
- **Frontend**: React 18 + Vite (Port 5173 dev / 3000 prod)
- **Backend**: Spring Boot 3.4.1 + Java 17 (Port 9001)
- **Database**: MySQL 8.0 (Port 3306)

### System Requirements (Varies by Option)
- ✅ JDK 17+ (for local/Docker)
- ✅ Node.js 16+ (for local/Docker/Vercel)
- ✅ Maven 3.6+ (for local/Docker)
- ✅ MySQL 8.0+ (for local)
- ✅ Docker & Docker Compose (for Docker option)
- ✅ GitHub account (for Vercel/Railway)

---

## 🚀 DEPLOYMENT OPTIONS

### **Option 1: Vercel + Railway (HTTPS Production)** 🌐 (15 minutes) ⭐ RECOMMENDED

```bash
# 1. Push code to GitHub
git push origin main

# 2. Deploy Frontend on Vercel
# Go to https://vercel.app → Import repo → Select ims-frontend

# 3. Deploy Backend on Railway  
# Go to https://railway.app → Import repo → Add MySQL database

# 4. Connect them (see VERCEL_QUICK_START.md)

# Result: https://your-app.vercel.app (HTTPS ✅)
```

**Benefits**: HTTPS, auto-scaling, managed database, global CDN, FREE tier
**👉 Full Guide**: [VERCEL_QUICK_START.md](VERCEL_QUICK_START.md)

---

### **Option 2: Quick Local Development** ⚡ (5 minutes)

```bash
# Terminal 1 - Backend
cd ims-backend
mvn spring-boot:run

# Terminal 2 - Frontend
cd ims-frontend
npm install
npm run dev
```

**Access**: 
- Frontend: http://localhost:5173
- Backend: http://localhost:9001

---

### **Option 3: Docker Deployment** 🐳 (Recommended for Staging)

```bash
# Windows
deploy.bat docker

# macOS/Linux
./deploy.sh docker
```

**Access**:
- Frontend: http://localhost
- Backend: http://localhost:9001
- MySQL: localhost:3306

---

### **Option 4: Cloud Deployment** ☁️

**AWS EC2**:
```bash
ssh -i key.pem ubuntu@your-instance-ip
git clone <repo>
cd CodeB_javafullstack
docker-compose up -d
```

**Heroku**:
```bash
heroku login
heroku create your-app
git push heroku main
```

---

## 📋 STEP-BY-STEP LOCAL SETUP

### 1️⃣ Verify Prerequisites
```bash
# Check Java
java -version

# Check Node
node --version
npm --version

# Check Maven
mvn --version

# Check MySQL
mysql --version
```

### 2️⃣ Setup Database
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE test;
CREATE USER 'root'@'localhost' IDENTIFIED BY 'Akanshaa@02';
GRANT ALL PRIVILEGES ON test.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### 3️⃣ Build Backend
```bash
cd ims-backend
mvn clean package
```

### 4️⃣ Run Backend
```bash
mvn spring-boot:run
# Backend will be ready at http://localhost:9001
```

### 5️⃣ Setup Frontend
```bash
cd ims-frontend
npm install
npm run dev
# Frontend will be ready at http://localhost:5173
```

---

## 🐳 DOCKER DEPLOYMENT (Recommended for Production)

### Quick Deploy
```bash
# Navigate to project root
cd c:\Users\Akansha Pramod Sahoo\Desktop\projects\CodeB_javafullstack

# Deploy
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### What Gets Deployed
- ✅ MySQL 8.0 database
- ✅ Spring Boot backend (Java)
- ✅ React frontend (Node.js)
- ✅ All interconnected on internal network

---

## 🔐 DEFAULT CREDENTIALS

| Role | Username | Password |
|------|----------|----------|
| **Admin** | `admin` | `admin123` |
| **Sales** | `sales-Akansha` | `12345678` |

---

## 🔧 COMMON COMMANDS

### Build Commands
```bash
# Backend
cd ims-backend && mvn clean package -DskipTests

# Frontend
cd ims-frontend && npm run build
```

### Docker Commands
```bash
# Start all containers
docker-compose up -d

# Stop all containers
docker-compose down

# View logs
docker-compose logs -f

# Restart specific service
docker-compose restart backend
docker-compose restart frontend
docker-compose restart mysql

# Clean everything (WARNING: deletes DB)
docker-compose down -v
```

### Database Commands
```bash
# Backup
mysqldump -u root -p test > backup.sql

# Restore
mysql -u root -p test < backup.sql

# Connect
mysql -u root -p -h localhost -D test
```

---

## 🌐 PRODUCTION DEPLOYMENT

### Environment Variables
```bash
# Set these before deployment
export DB_PASSWORD="strong-production-password"
export JWT_SECRET="your-64-character-production-secret-key"
export VITE_API_URL="https://your-production-domain.com/api"
```

### Production Checklist
- [ ] Update database credentials
- [ ] Set strong JWT secret (64+ characters)
- [ ] Configure SSL/TLS certificates
- [ ] Update frontend API URL
- [ ] Configure firewall rules
- [ ] Setup database backups
- [ ] Configure monitoring/logging
- [ ] Test health endpoints

---

## ❌ TROUBLESHOOTING

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :9001
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :9001
kill -9 <PID>
```

### Database Connection Failed
```bash
# Test MySQL connection
mysql -u root -p

# Check if running
# Windows: Services > MySQL
# Docker: docker-compose logs mysql
```

### Frontend Can't Connect to Backend
```bash
# Check backend is running
curl http://localhost:9001/api

# Verify frontend API URL
# Check ims-frontend/src/services/api.js
# Update VITE_API_URL in .env.production
```

### Docker Issues
```bash
# View detailed logs
docker-compose logs backend
docker-compose logs frontend

# Rebuild containers
docker-compose build --no-cache

# Clean and start fresh
docker-compose down -v
docker-compose up -d
```

---

## 📁 IMPORTANT FILES

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Complete deployment configuration |
| `ims-backend/Dockerfile` | Backend container definition |
| `ims-frontend/Dockerfile.prod` | Frontend production container |
| `DEPLOYMENT_GUIDE.md` | Complete deployment documentation |
| `deploy.bat` | Windows deployment script |
| `deploy.sh` | Linux/macOS deployment script |

---

## 📊 PORT REFERENCE

| Service | Local Dev | Docker | Vercel + Railway |
|---------|-----------|--------|-----------------|
| Frontend | 5173 | 80 | https://your-app.vercel.app (HTTPS) |
| Backend | 9001 | 9001 | https://your-backend.railway.app (HTTPS) |
| MySQL | 3306 | 3306 | Managed by Railway |

---

## ✅ VERIFICATION CHECKLIST

After deployment, verify:
- [ ] Frontend loads
- [ ] Backend API responds at http://localhost:9001/api (local) or https://your-backend.railway.app/api (production)
- [ ] Can login with default credentials
- [ ] Dashboard displays correctly
- [ ] Database connection works
- [ ] API requests don't have CORS errors

---

## 📞 NEXT STEPS

1. **Read Full Guide**: Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions
2. **Run Deploy Script**: Execute `deploy.bat docker` (Windows) or `./deploy.sh docker` (Linux/macOS)
3. **Access Application**: Open http://localhost in browser
4. **Login**: Use `admin` / `admin123`
5. **Test Features**: Explore dashboard, clients, invoices, and payments modules

---

## 📝 FILE STRUCTURE

```
.
├── DEPLOYMENT_GUIDE.md          # Comprehensive deployment guide
├── QUICK_START.md               # This file
├── docker-compose.yml           # Docker deployment config
├── deploy.bat                   # Windows deployment script
├── deploy.sh                    # Unix deployment script
├── .env.example                 # Environment variables template
├── README.md                    # Project overview
├── ims-backend/
│   ├── Dockerfile              # Backend container config
│   ├── pom.xml                 # Maven dependencies
│   └── src/
│       └── main/resources/
│           └── application.properties  # Backend config
└── ims-frontend/
    ├── Dockerfile.prod         # Frontend production container
    ├── .env.production         # Frontend production env
    ├── package.json            # NPM dependencies
    └── vite.config.js          # Vite configuration
```

---

**🎉 You're ready to deploy!**

Choose your deployment method above and follow the instructions. For detailed help, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

*Last Updated: May 2026 | Version: 1.0.0 | By: Akansha ❤️*
