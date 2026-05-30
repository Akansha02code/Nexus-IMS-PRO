# 🚀 RENDER DEPLOYMENT GUIDE - HTTPS (BACKEND)

## Overview
- **Frontend**: Deploy on Render Static Site ✅ HTTPS built-in
- **Backend**: Deploy on Render Web Service ✅ HTTPS built-in  
- **Database**: Deploy on Render PostgreSQL ✅ Managed

**Total Cost**: FREE tier available for both!

---

## 📋 Architecture

```
User Browser
    ↓
    ├─→ https://your-app.onrender.com (Frontend - Render Static)
    │   └─→ API calls to Backend
    │
    └─→ https://your-backend.onrender.com (Backend - Render Web Service)
        └─→ Database (Render PostgreSQL or MySQL)
```

---

## ⚡ STEP 1: Prepare Backend for Render

### 1.1 Update Backend Configuration

Create `ims-backend/src/main/resources/application-render.properties`:
```properties
spring.application.name=ims

# Database Configuration - Render PostgreSQL
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

# Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

# JWT Configuration
ims.jwt.secret=${JWT_SECRET:9a67475df22d0192e2134567890abcdef1234567890abcdef1234567890abcdef}
ims.jwt.expiration=86400000

# Server Configuration
server.port=${PORT:8080}
server.servlet.context-path=/api

# CORS Configuration
spring.web.cors.allowed-origins=${CORS_ORIGINS:https://localhost:3000,http://localhost:5173}
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
spring.web.cors.max-age=3600

# Logging
logging.level.root=INFO
logging.level.com.ims=DEBUG

# Connection Pool
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=20000
```

### 1.2 Add PostgreSQL Driver to pom.xml

Update `ims-backend/pom.xml` - add this in `<dependencies>`:
```xml
<!-- PostgreSQL Driver -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- MySQL Driver (keep for backward compatibility) -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
```

### 1.3 Create Render Configuration File

Create `render.yaml` in project root:
```yaml
services:
  - type: web
    name: nexus-ims-backend
    env: java
    plan: free
    buildCommand: mvn clean package -DskipTests
    startCommand: java -jar ims-backend/target/ims-0.0.1-SNAPSHOT.jar --spring.profiles.active=render
    healthCheckPath: /api/health
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: nexus-ims-db
          property: connectionString
      - key: DB_USER
        fromDatabase:
          name: nexus-ims-db
          property: user
      - key: DB_PASSWORD
        fromDatabase:
          name: nexus-ims-db
          property: password
      - key: JWT_SECRET
        value: ${JWT_SECRET}
      - key: CORS_ORIGINS
        value: ${CORS_ORIGINS}
      - key: SPRING_PROFILES_ACTIVE
        value: render
    routes:
      - path: /api
        matchType: prefix

databases:
  - name: nexus-ims-db
    dbName: nexus_ims_db
    user: ${DB_USER}
    plan: free
    region: ${REGION}
```

---

## 🚀 STEP 2: Create Render Account & Project

### 2.1 Create Account
1. Go to **https://render.com**
2. Sign up with GitHub
3. Connect your GitHub account

### 2.2 Create New Project

**Method A: Using render.yaml (Recommended)**
1. Go to **https://dashboard.render.com**
2. Click **"New +"** → **"Blueprint"**
3. Select your GitHub repo
4. Render auto-detects `render.yaml`
5. Configure environment variables
6. Click **"Deploy"**

**Method B: Manual Setup**
1. Click **"New +"** → **"Web Service"**
2. Select your GitHub repo
3. Configure settings (see Step 2.3)

### 2.3 Configure Web Service

| Setting | Value |
|---------|-------|
| Name | `nexus-ims-backend` |
| Environment | Java |
| Build Command | `mvn clean package -DskipTests` |
| Start Command | `java -jar ims-backend/target/ims-0.0.1-SNAPSHOT.jar --spring.profiles.active=render` |
| Instance Type | Free |
| Region | Recommended |

---

## 🗄️ STEP 3: Setup Database on Render

### 3.1 Create PostgreSQL Database

1. In Render Dashboard, click **"New +"** → **"PostgreSQL"**
2. Configuration:
   - **Name**: `nexus-ims-db`
   - **Database**: `nexus_ims_db`
   - **User**: `postgres`
   - **Region**: Same as backend
   - **PostgreSQL Version**: 15
   - **Plan**: Free

3. Wait for database to initialize (2-3 minutes)

### 3.2 Get Database Connection Details

1. Click on database service
2. Copy these details:
   - **Internal Database URL**: `postgres://user:password@localhost:5432/nexus_ims_db`
   - **External Database URL**: (for external tools)
   - **Host**
   - **Port**
   - **Database**
   - **User**
   - **Password**

---

## ⚙️ STEP 4: Set Environment Variables

### 4.1 Backend Environment Variables

Go to **Backend Service** → **Environment** tab → Add these:

```
DATABASE_URL = postgresql://user:password@host:5432/nexus_ims_db
DB_USER = postgres
DB_PASSWORD = (from database)
JWT_SECRET = (generate random 64+ char string)
CORS_ORIGINS = https://your-frontend.onrender.com
SPRING_PROFILES_ACTIVE = render
PORT = (Render assigns automatically)
```

**To generate JWT_SECRET:**
```bash
# Windows (PowerShell)
-join ((1..64) | ForEach-Object { [char](Get-Random -Minimum 33 -Maximum 126) })

# Linux/Mac
openssl rand -hex 32
```

---

## 🚀 STEP 5: Deploy Backend

### 5.1 Automatic Deployment
1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Add Render configuration"
   git push origin main
   ```
2. Render auto-deploys! (Takes 5-10 minutes)

### 5.2 Monitor Deployment
1. Go to Backend Service
2. Click **"Logs"** tab
3. Watch build progress
4. Look for: "Build successful" and "Service live"

### 5.3 Get Backend URL
1. Backend Service → **Settings**
2. Copy the **"Public URL"** (e.g., `https://nexus-ims-backend.onrender.com`)
3. **Save this for frontend!**

---

## ✅ STEP 6: Verify Backend

### Test 1: Health Check
```bash
curl https://your-backend.onrender.com/api/health
```

Expected response:
```json
{"status":"UP"}
```

### Test 2: Check Logs
1. Backend Service → **Logs**
2. Look for:
   - "Started ImsApplication"
   - No error messages
   - Database connection successful

### Test 3: Database Connection
1. Backend Service → **Logs**
2. Look for:
   - "HikariPool - Starting"
   - "Database connection successful"

---

## 📊 ENVIRONMENT VARIABLES REFERENCE

| Variable | Value | Example |
|----------|-------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host:5432/db` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | Auto-generated |
| `JWT_SECRET` | JWT signing key | 64+ character random string |
| `CORS_ORIGINS` | Frontend URL | `https://your-app.onrender.com` |
| `SPRING_PROFILES_ACTIVE` | Active profile | `render` |
| `PORT` | Server port | Auto-assigned by Render |

---

## 🔧 TROUBLESHOOTING - BACKEND ISSUES

### ❌ Build Fails

**Error: "Cannot run program 'mvn'"**
- Solution: Maven must be in environment
- Render provides Java but you need to specify build command correctly
- Check: `mvn clean package -DskipTests`

**Error: "Java version mismatch"**
- Solution: Render supports Java 11, 17, 21
- Add to `render.yaml`:
  ```yaml
  buildCommand: java -version
  ```

### ❌ Database Connection Failed

**Error: "Access denied for user 'postgres'"**
```
Solution:
1. Get correct DATABASE_URL from Render
2. Format: postgresql://user:password@host:port/database
3. Check password has no special characters (or encode them)
4. Verify CORS_ORIGINS doesn't cause DB issues
```

**Error: "Cannot reach database host"**
```
Solution:
1. Database must be in same region as backend
2. Use internal database URL for backend
3. Wait 3-5 minutes after database creation
4. Check database status shows "Available"
```

### ❌ Service Won't Start

**Error: "Start command failed"**
```
Check:
1. JAR file exists: ims-backend/target/ims-0.0.1-SNAPSHOT.jar
2. Java path correct
3. Profile name matches: application-render.properties
4. No typos in command
```

**Error: "Port binding failed"**
```
Solution:
1. Don't hardcode port 8080
2. Use environment variable: ${PORT:8080}
3. Spring Boot will use PORT env var
```

### ❌ Health Check Fails

**Error: Service marked as unhealthy**
```
Solution:
1. Check healthCheckPath: /api/health
2. Make sure this endpoint exists
3. Endpoint should return 200 OK
4. Add health check dependency to pom.xml:
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-actuator</artifactId>
   </dependency>
```

### ❌ Out of Memory

**Error: "OutOfMemoryError" or service crashes**
```
Solution for Free Tier:
1. Free tier has 512MB RAM
2. Spring Boot uses ~300MB
3. Optimize heap size:
   -Xmx256m -Xms128m
```

---

## 📈 SCALING & OPTIMIZATION

### Free Tier Limits
- **RAM**: 512MB
- **CPU**: Shared
- **Storage**: 1GB
- **Active Services**: Limited

### Upgrade to Paid (if needed)
1. Render Dashboard → Service → **Plan**
2. Choose appropriate tier
3. Billed per minute of usage

---

## 🔄 DEPLOYMENT WORKFLOW

### First Time
```
1. Create GitHub repo with code
2. Create Render account
3. Create Web Service (backend)
4. Create PostgreSQL database
5. Set environment variables
6. Deploy (Render auto-builds)
7. Wait 5-10 minutes
8. Test health endpoint
```

### Updates
```
1. Make code changes locally
2. git add . && git commit -m "Update"
3. git push origin main
4. Render auto-deploys!
5. Monitor logs
6. Done!
```

### Rollback (if needed)
1. Render Dashboard → Deployments
2. Find previous deployment
3. Click "Redeploy"
4. Automatic rollback to previous version

---

## 📊 RENDER BACKEND SUMMARY

| Item | Details |
|------|---------|
| **Platform** | Render.com |
| **Service Type** | Web Service |
| **Language** | Java |
| **Framework** | Spring Boot 3.4.1 |
| **Database** | PostgreSQL 15 |
| **HTTPS** | ✅ Auto (Free) |
| **URL Example** | https://nexus-ims-backend.onrender.com |
| **Build Time** | 5-10 minutes |
| **Cost** | FREE (free tier) |
| **Uptime SLA** | 99.5% |

---

## 🎯 NEXT STEPS

### After Backend is Live:
1. ✅ Backend URL is `https://your-backend.onrender.com`
2. ✅ Health endpoint responds
3. ✅ Database connected
4. → Deploy Frontend (see RENDER_FRONTEND_DEPLOYMENT.md)
5. → Connect Frontend to Backend

---

## 📞 USEFUL LINKS

- **Render Dashboard**: https://dashboard.render.com
- **Render Docs**: https://render.com/docs
- **Java on Render**: https://render.com/docs/native-runtimes#java
- **PostgreSQL on Render**: https://render.com/docs/databases
- **GitHub Integration**: https://render.com/docs/github

---

## ✅ BACKEND DEPLOYMENT CHECKLIST

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] render.yaml configured
- [ ] PostgreSQL database created
- [ ] Backend service created
- [ ] Environment variables set (6 total)
- [ ] Build succeeded (check logs)
- [ ] Service shows "Live"
- [ ] Health endpoint responds (200 OK)
- [ ] Database connection verified
- [ ] Backend URL copied

---

**Backend is now live on Render with HTTPS!** 🎉

*Next: Deploy frontend on Render and connect them*

---

*Render Backend Deployment Guide v1.0 | May 2026*
