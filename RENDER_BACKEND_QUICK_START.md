# 🚀 RENDER BACKEND - QUICK START (15 MINUTES)

## ⚡ FASTEST PATH TO PRODUCTION

Get your backend live on Render with HTTPS in just **15 minutes**!

---

## 📋 WHAT YOU'LL HAVE

```
https://your-backend.onrender.com (HTTPS ✅)
    ↓
PostgreSQL Database (Managed by Render)
    ↓
Spring Boot Backend (Live & Scalable)
```

**Cost**: FREE (free tier included!)

---

## ✅ STEP-BY-STEP (4 STEPS)

### ⏱️ STEP 1: Push Code to GitHub (2 min)

```bash
cd c:\Users\Akansha Pramod Sahoo\Desktop\projects\CodeB_javafullstack

# If not already done
git init
git add .
git commit -m "Render backend deployment ready"
git remote add origin https://github.com/YOUR_USERNAME/nexus-ims-pro.git
git branch -M main
git push -u origin main
```

---

### ⏱️ STEP 2: Create Render Account (2 min)

1. Go to **https://render.com**
2. Click **"Sign Up"**
3. Select **"GitHub"**
4. Authorize Render to access GitHub
5. Done! Account created ✅

---

### ⏱️ STEP 3: Deploy Backend with Database (8 min)

#### Option A: Using Blueprint (RECOMMENDED - Auto-creates DB)

1. Go to **https://dashboard.render.com**
2. Click **"New +"** → **"Blueprint"**
3. Select your GitHub repo (`nexus-ims-pro`)
4. **Click Deploy** → Render auto-detects `render.yaml`
5. Wait 5-8 minutes for:
   - Backend to build
   - Database to initialize
   - Service to start

✅ **Done!** Both backend and database deployed!

#### Option B: Manual Setup (If Blueprint doesn't work)

**Step 1: Create Web Service**
1. Dashboard → **"New +"** → **"Web Service"**
2. Select your GitHub repo
3. Fill in:
   - **Name**: `nexus-ims-backend`
   - **Environment**: `Java`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -Xmx256m -Xms128m -jar ims-backend/target/ims-0.0.1-SNAPSHOT.jar --spring.profiles.active=render`
   - **Instance Type**: `Free`
4. Click **"Create Web Service"**

**Step 2: Add Database**
1. Dashboard → **"New +"** → **"PostgreSQL"**
2. Fill in:
   - **Name**: `nexus-ims-db`
   - **Database Name**: `nexus_ims_db`
   - **User**: `postgres`
   - **Region**: Same as backend
   - **Version**: `15`
   - **Plan**: `Free`
3. Click **"Create Database"**
4. Wait 2-3 minutes for database to initialize

---

### ⏱️ STEP 4: Set Environment Variables (3 min)

1. Go to Backend Service → **"Environment"** tab

2. Add these 6 variables:

```
JDBC_DATABASE_URL = (copy from database service - connection string)
DB_USER = postgres
DB_PASSWORD = (copy from database service)
JWT_SECRET = (generate: see below)
CORS_ORIGINS = https://your-frontend.onrender.com,http://localhost:5173
SPRING_PROFILES_ACTIVE = render
```

**How to get Database URL:**
1. Click on database service
2. Copy the **"Internal Database URL"** or connection string
3. Paste in `JDBC_DATABASE_URL`

**How to generate JWT_SECRET:**
```bash
# Windows (PowerShell)
-join ((1..64) | ForEach-Object { [char](Get-Random -Minimum 33 -Maximum 126) })

# OR use online: https://www.random.org/bytes/?num=32&format=h&hex=true
# (then repeat the string to make 64 chars)
```

3. Click **"Save"** 
4. Backend auto-redeploys with new variables ✅

---

## 🎉 YOU'RE DONE!

### Your Backend is Live!

After deployment (5-10 minutes), you'll have:

```
Backend URL:  https://your-backend.onrender.com
API Health:   https://your-backend.onrender.com/api/health
Database:     PostgreSQL (Managed)
HTTPS:        ✅ Automatic
```

---

## 🔗 GET YOUR BACKEND URL

1. Go to Backend Service
2. Click **"Settings"**
3. Copy the **"Public URL"**
4. Example: `https://nexus-ims-prod-abc123.onrender.com`
5. **Save this! You'll need it for frontend!**

---

## ✅ VERIFY BACKEND IS WORKING

### Test 1: Health Check
```bash
curl https://your-backend.onrender.com/api/health
```

Should return:
```json
{"status":"UP"}
```

### Test 2: Check Logs
1. Backend Service → **"Logs"**
2. Look for: `Started ImsApplication in X seconds`
3. ✅ If you see this, backend is working!

### Test 3: Database Connection
In Logs, look for:
- `HikariPool - Starting`
- `Connected to PostgreSQL`
- No error messages

---

## 🚨 TROUBLESHOOTING

### ❌ Build Failed

**Check Logs:**
1. Backend Service → **"Logs"**
2. Look for error messages
3. Common issues:
   - Java not installed (Render provides it)
   - Maven syntax error
   - Missing dependencies

**Solution:**
```bash
# Test locally first
mvn clean package -DskipTests

# Fix any errors
git add . && git commit -m "Fix build"
git push origin main

# Render auto-rebuilds
```

### ❌ Database Won't Connect

**Error in Logs:** `Cannot connect to database`

**Solution:**
1. Check database shows "Available" in Dashboard
2. Get correct connection string from database service
3. Paste exact URL in `JDBC_DATABASE_URL`
4. Make sure `DB_USER` = `postgres`
5. Copy exact password from database service
6. Wait 5 minutes and retry

### ❌ Service Shows "Unhealthy"

**Error:** Health checks failing

**Solution:**
1. Check logs for errors
2. Make sure health endpoint works: `/api/health`
3. Check if database connection is working
4. Increase health check timeout in `render.yaml`
5. Restart service: Backend → **"Restart"**

### ❌ Service Keeps Restarting

**Reason:** Usually out of memory on free tier

**Solution:**
1. Free tier = 512MB RAM
2. Java uses ~300MB
3. Usually works fine
4. If not, upgrade plan to paid tier
5. Or optimize Spring Boot configuration

### ❌ Port Binding Error

**Error:** `Port 8080 already in use`

**Solution:**
1. Don't hardcode port
2. Use environment variable: `${PORT:8080}`
3. Let Render assign port
4. Spring Boot auto-detects PORT env var

---

## 📊 ENVIRONMENT VARIABLES QUICK REFERENCE

| Name | Source | Where to Find |
|------|--------|---------------|
| `JDBC_DATABASE_URL` | Database service | Dashboard → Database → Connection String |
| `DB_USER` | Always | `postgres` |
| `DB_PASSWORD` | Database service | Dashboard → Database → Password |
| `JWT_SECRET` | Generate | Random 64+ characters |
| `CORS_ORIGINS` | Your frontend | Your frontend Render URL or domain |
| `SPRING_PROFILES_ACTIVE` | Fixed | Always `render` |

---

## 🎯 NEXT STEPS

✅ **Backend is now live!**

### Next:
1. Copy your backend URL
2. Deploy frontend on Render (see RENDER_FRONTEND_QUICK_START.md)
3. Update frontend with your backend URL
4. Test API connection

---

## 📞 HELP

| Issue | Check |
|-------|-------|
| Build fails | Local `mvn clean package` works? |
| DB won't connect | Database shows "Available"? |
| Service unhealthy | Logs say anything about errors? |
| Can't access API | Backend shows "Live" status? |

**Full Guide:** [RENDER_BACKEND_DEPLOYMENT.md](RENDER_BACKEND_DEPLOYMENT.md)

---

## 💰 COST

**FREE** ✅

- Free tier includes everything you need
- 512MB RAM (sufficient for backend)
- 100GB database storage
- No credit card required for free tier

If you need more:
- Paid plans start at $7/month

---

## 📋 CHECKLIST

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Blueprint deployed OR services created manually
- [ ] PostgreSQL database created
- [ ] 6 environment variables set
- [ ] Build completed (check logs)
- [ ] Service shows "Live"
- [ ] Health endpoint returns 200 OK
- [ ] Database connection verified
- [ ] Backend URL copied for frontend

---

**You're live on Render!** 🚀

*Time: 15 minutes | Cost: FREE | HTTPS: ✅*

---

*Render Backend Quick Start v1.0 | May 2026*
