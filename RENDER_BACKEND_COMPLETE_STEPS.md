# 🎯 RENDER BACKEND DEPLOYMENT - COMPLETE STEPS

## FOR: Backend Deployment on Render (Spring Boot + PostgreSQL + HTTPS)

---

## 📋 TABLE OF CONTENTS

1. [Architecture](#architecture)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step Deployment](#step-by-step-deployment)
4. [Configuration Details](#configuration-details)
5. [Troubleshooting](#troubleshooting)
6. [Verification](#verification)

---

## 🏗️ ARCHITECTURE

```
Your Backend on Render
├─ Web Service (Spring Boot Java 17)
│  ├─ Automatic HTTPS ✅
│  ├─ Auto-scaling ready
│  └─ Health checks configured
│
└─ PostgreSQL Database
   ├─ Automatic daily backups
   ├─ Connection pooling
   └─ SSL/TLS encryption
```

---

## ✅ PREREQUISITES

### What You Have Ready
- ✅ Code on GitHub
- ✅ Spring Boot 3.4.1 application
- ✅ PostgreSQL driver in pom.xml
- ✅ Spring profiles configured
- ✅ render.yaml ready
- ✅ Environment templates

### What You Need
- ✅ Render account (free signup)
- ✅ GitHub account (already have)
- ✅ 15 minutes

---

## 🚀 STEP-BY-STEP DEPLOYMENT

### STEP 1: Verify Code is on GitHub (1 min)

```bash
# Check code was pushed
git log --oneline | head -1
# Should show your latest commit

# Verify branch is main
git branch
# Should show * main
```

If not pushed yet:
```bash
cd c:\Users\Akansha Pramod Sahoo\Desktop\projects\CodeB_javafullstack
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

---

### STEP 2: Create Render Account (2 min)

1. Go to **https://render.com**
2. Click **"Sign Up"**
3. Choose **"GitHub"** login option
4. Authorize Render to access your GitHub
5. Email verification (check inbox)
6. **Account created!** ✅

---

### STEP 3: Deploy Backend (8 min)

#### Option A: Using Blueprint (RECOMMENDED - Easiest)

**This auto-creates database + backend together!**

1. Go to **https://dashboard.render.com**

2. Click **"New +"** in the top right

3. Select **"Blueprint"**

4. In the dropdown, select your GitHub repository:
   ```
   nexus-ims-pro (or your repo name)
   ```

5. Render analyzes and finds `render.yaml`

6. Click **"Deploy Blueprint"**

7. Wait 5-8 minutes for:
   - Database to initialize
   - Backend to build
   - Services to start

✅ **Both backend and database are created!**

#### Option B: Manual Setup (If Blueprint fails)

**Step B1: Create Web Service**

1. Dashboard → Click **"New +"** → **"Web Service"**

2. Connect GitHub repository:
   - Select: `nexus-ims-pro`
   - Click **"Connect"**

3. Service Configuration:
   ```
   Name: nexus-ims-backend
   Environment: Java
   Build Command: mvn clean package -DskipTests
   Start Command: java -Xmx256m -Xms128m -jar ims-backend/target/ims-0.0.1-SNAPSHOT.jar --spring.profiles.active=render
   Instance Type: Free
   ```

4. Click **"Create Web Service"**

5. Watch build in Logs tab (takes 3-5 minutes)

**Step B2: Create PostgreSQL Database**

1. Dashboard → Click **"New +"** → **"PostgreSQL"**

2. Database Configuration:
   ```
   Name: nexus-ims-db
   Database Name: nexus_ims_db
   User: postgres
   PostgreSQL Version: 15
   Region: (same as backend)
   Plan: Free
   ```

3. Click **"Create Database"**

4. Wait 2-3 minutes for initialization

**Step B3: Connect Database to Backend**

1. Go to Backend Web Service

2. Click **"Environment"** tab

3. Add these from database service:
   ```
   JDBC_DATABASE_URL = [copy internal connection string]
   DB_USER = postgres
   DB_PASSWORD = [copy password]
   ```

---

### STEP 4: Set Environment Variables (3 min)

1. Backend Service → **"Environment"** tab

2. You should already have from database connection:
   ```
   JDBC_DATABASE_URL = postgres://user:pass@internal-host:5432/nexus_ims_db
   DB_USER = postgres
   DB_PASSWORD = (auto-filled from database)
   ```

3. **Add these 3 new variables:**

   **Variable 1: JWT_SECRET**
   ```
   Key: JWT_SECRET
   Value: (generate random 64+ characters)
   
   To generate (Windows PowerShell):
   -join ((1..64) | ForEach-Object { [char](Get-Random -Minimum 33 -Maximum 126) })
   
   Or use: https://www.random.org/bytes/?num=32&format=h&hex=true
   (repeat twice to make 64 chars)
   ```

   **Variable 2: CORS_ORIGINS**
   ```
   Key: CORS_ORIGINS
   Value: https://your-frontend-url.onrender.com,http://localhost:5173
   
   (Replace with your actual frontend URL)
   (The second URL is for local testing)
   ```

   **Variable 3: SPRING_PROFILES_ACTIVE**
   ```
   Key: SPRING_PROFILES_ACTIVE
   Value: render
   ```

4. All variables should now be set:
   ```
   ✓ JDBC_DATABASE_URL
   ✓ DB_USER
   ✓ DB_PASSWORD
   ✓ JWT_SECRET
   ✓ CORS_ORIGINS
   ✓ SPRING_PROFILES_ACTIVE
   ```

5. Click **"Save"** button in top right

6. Render auto-redeploys service with new variables ✅

---

### STEP 5: Wait for Deployment (5 min)

1. Go to Backend Service → **"Logs"** tab

2. Watch the build process:
   ```
   ✓ Build started
   ✓ Downloading dependencies
   ✓ Compiling code
   ✓ Running tests
   ✓ Building JAR
   ✓ Deploying...
   ✓ Service is live!
   ```

3. Look for:
   ```
   "Started ImsApplication in X seconds"
   OR
   "Application started successfully"
   ```

4. Status should change to **"Live"** (green) ✅

---

### STEP 6: Get Your Backend URL (1 min)

1. Backend Service → **"Settings"** tab

2. Scroll down to **"Public URL"**

3. Copy the URL (looks like):
   ```
   https://nexus-ims-prod-abc123.onrender.com
   ```

4. **Save this!** You'll need it for:
   - Frontend configuration
   - CORS settings
   - Testing API calls

---

## ⚙️ CONFIGURATION DETAILS

### render.yaml Explained

```yaml
services:
  - type: web                              # Web service (backend)
    name: nexus-ims-backend               # Service name
    env: java                              # Java runtime
    plan: free                             # Free tier
    buildCommand: mvn clean package        # Build command
    startCommand: java -jar ...            # Start command
    healthCheckPath: /api/health           # Health endpoint
    
    envVars:
      - key: DATABASE_URL                  # Database connection
        fromDatabase: ...                  # Auto-linked from DB
      
      - key: JWT_SECRET                    # Your secret
        sync: false                        # Don't sync to build

databases:
  - name: nexus-ims-db                    # Database name
    databaseName: nexus_ims_db            # DB name in PostgreSQL
    user: postgres                         # DB user
    plan: free                             # Free tier
```

### application-render.properties Explained

```properties
# Database Configuration
spring.datasource.url=${JDBC_DATABASE_URL}    # From env var
spring.datasource.username=${DB_USER}        # From env var
spring.datasource.password=${DB_PASSWORD}    # From env var
spring.datasource.driver-class-name=...      # PostgreSQL driver

# Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update          # Auto-create tables
spring.jpa.properties.hibernate.dialect=...   # PostgreSQL dialect

# JWT Configuration
ims.jwt.secret=${JWT_SECRET}                  # From env var
ims.jwt.expiration=86400000                   # 24 hours

# Server Configuration
server.port=${PORT:8080}                      # Render assigns port
server.servlet.context-path=/api              # API prefix

# CORS Configuration
spring.web.cors.allowed-origins=${CORS_ORIGINS}  # From env var
```

### Environment Variables Explained

| Variable | Source | Purpose |
|----------|--------|---------|
| `JDBC_DATABASE_URL` | PostgreSQL service | Database connection string |
| `DB_USER` | PostgreSQL service | Database username |
| `DB_PASSWORD` | PostgreSQL service | Database password |
| `JWT_SECRET` | You generate | Token signing key (64+ chars) |
| `CORS_ORIGINS` | You provide | Frontend URLs allowed to call API |
| `SPRING_PROFILES_ACTIVE` | Set to "render" | Activates this Spring profile |
| `PORT` | Render assigns | Server port (usually 8080) |

---

## 🔍 VERIFICATION

### Test 1: Health Check

```bash
curl https://your-backend.onrender.com/api/health
```

**Expected Response:**
```json
{
  "status": "UP"
}
```

✅ If you see this, backend is working!

### Test 2: Check Logs

1. Backend Service → **"Logs"** tab

2. Look for these messages:
   ```
   ✓ Starting ImsApplication
   ✓ HikariPool - Starting
   ✓ Database connection successful
   ✓ Application started successfully
   ```

3. **No error messages?** ✅ Everything is good!

### Test 3: Database Connection

1. Logs tab

2. Look for:
   ```
   ✓ Connected to PostgreSQL
   ✓ Creating tables
   ✓ Migration complete
   ```

✅ Database is connected and working!

### Test 4: API Endpoint

```bash
# Test login endpoint
curl -X POST https://your-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

**Expected Response:** Should get 200 OK with JWT token

✅ API is responding correctly!

---

## 🚨 TROUBLESHOOTING

### ❌ Build Fails - "Cannot find Maven"

**Error in Logs:**
```
Cannot run program 'mvn'
```

**Solution:**
1. Render provides Java but you need to check build command
2. Correct build command: `mvn clean package -DskipTests`
3. Verify `render.yaml` has correct command
4. Commit and push fix: `git push origin main`
5. Render auto-rebuilds

---

### ❌ Database Connection Fails

**Error in Logs:**
```
Cannot connect to database
Access denied for user 'postgres'
```

**Solution:**
1. Check database shows "Available" (green) in Dashboard
2. Copy exact connection string from database service
3. Paste into `JDBC_DATABASE_URL` env var
4. Check `DB_USER` = exactly `postgres`
5. Check `DB_PASSWORD` matches database password
6. Click Save in Environment tab
7. Backend auto-redeploys

**Get correct connection string:**
1. Dashboard → click `nexus-ims-db` service
2. Look for "Internal Database URL"
3. Copy entire connection string
4. Paste in backend environment

---

### ❌ Service Shows "Unhealthy"

**Error in Logs:**
```
Health check failed
Service unhealthy
```

**Solution:**
1. Backend might still be starting (wait 2-3 min)
2. Check if `/api/health` endpoint exists
3. Make sure Spring Actuator is in pom.xml (should be)
4. Health endpoint should return 200 OK
5. Wait 5 minutes
6. If still failing, restart: Service → click "Restart" button

---

### ❌ Out of Memory

**Error in Logs:**
```
OutOfMemoryError: Java heap space
Exception in thread
Service crashed
```

**Solution:**
1. Free tier has 512MB RAM
2. Java uses ~300MB
3. Currently tuned to use: `-Xmx256m -Xms128m`
4. This should be enough
5. If not, upgrade to paid tier
6. Or optimize database queries

---

### ❌ Port Binding Error

**Error in Logs:**
```
Port 8080 already in use
Bind exception
```

**Solution:**
1. Don't hardcode port to 9001 (local dev port)
2. Use environment variable: `${PORT:8080}`
3. Spring Boot auto-detects PORT env var
4. Render assigns a port automatically
5. Check: `server.port=${PORT:8080}` in properties file (already correct)

---

### ❌ Can't Access Backend URL

**Issue:**
```
https://your-backend.onrender.com returns 404 or connection error
```

**Solution:**
1. Check service shows "Live" (green status)
2. Wait 5 minutes for everything to start
3. Try health endpoint: `/api/health`
4. Check logs for any error messages
5. Ensure HTTPS (not HTTP)
6. If localhost works but Render doesn't, check build logs

---

## 📊 MONITORING

### View Logs Anytime
1. Dashboard → Backend Service
2. Click **"Logs"** tab
3. Real-time logs displayed
4. Search by keyword
5. Download logs if needed

### View Resource Usage
1. Dashboard → Backend Service
2. Click **"Metrics"** tab (if available)
3. Shows CPU, memory, network usage
4. Helps identify performance issues

### View Deployments
1. Dashboard → Backend Service
2. Click **"Deployments"** tab
3. History of all deployments
4. Redeploy previous versions
5. View deployment logs

---

## 🔄 UPDATING BACKEND

### Deploy Updates

```bash
# Make changes locally
# ... edit files ...

# Commit and push
git add .
git commit -m "Update backend"
git push origin main
```

**Render auto-detects push and:**
1. Rebuilds automatically
2. Tests the build
3. Deploys if successful
4. Rolls back if fails

### Rollback (if needed)

1. Dashboard → Backend Service
2. Click **"Deployments"**
3. Find previous deployment
4. Click "Redeploy"
5. Instant rollback ✅

---

## 🎯 NEXT STEPS

✅ Backend is live on Render!

**Next:**
1. Copy backend URL
2. Deploy frontend on Render
3. Update frontend with backend URL
4. Test API connection
5. Deploy complete! 🎉

---

## ✅ CHECKLIST

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] render.yaml detected (Blueprint) OR services created manually
- [ ] PostgreSQL database initialized
- [ ] 6 environment variables set
- [ ] Build completed (no errors in logs)
- [ ] Service status shows "Live" (green)
- [ ] Health endpoint returns 200 OK
- [ ] Can see logs
- [ ] Backend URL copied
- [ ] CORS_ORIGINS configured (for frontend)

---

## 📞 HELP & SUPPORT

### Quick Links
- Render Dashboard: https://dashboard.render.com
- Render Docs: https://render.com/docs
- Java on Render: https://render.com/docs/native-runtimes#java
- PostgreSQL on Render: https://render.com/docs/databases

### Check These If Issues
1. Render Logs tab
2. Application logs in logs
3. Database connection logs
4. This troubleshooting section

---

**Your backend is now live on Render with HTTPS!** 🚀

*Time: ~15 minutes*
*Cost: FREE*
*HTTPS: ✅ Automatic*
*Database: ✅ Managed & Backed Up*

---

*Render Backend Complete Deployment Guide v1.0 | May 2026*
