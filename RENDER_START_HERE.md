# 🌐 RENDER DEPLOYMENT - START HERE

## 🎯 DEPLOY YOUR ENTIRE APP ON RENDER (20 MINUTES)

Everything you need to go from zero to production with HTTPS!

---

## 📋 ARCHITECTURE

```
┌─────────────────────────────────────────┐
│  Frontend (Static Site)                 │
│  https://your-app.onrender.com          │
│  React 18 + Vite                        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Backend (Web Service)                  │
│  https://your-backend.onrender.com      │
│  Spring Boot 3.4.1 + Java 17            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  PostgreSQL Database                    │
│  Managed by Render                      │
│  Auto-backups                           │
└─────────────────────────────────────────┘
```

---

## ⚡ QUICK DEPLOYMENT (4 STEPS)

### STEP 1: Backend on Render (8 min)
👉 Follow: [RENDER_BACKEND_QUICK_START.md](RENDER_BACKEND_QUICK_START.md)

**What you'll get:**
- ✅ Backend live on `https://your-backend.onrender.com`
- ✅ PostgreSQL database connected
- ✅ HTTPS certificate (free)
- ✅ Environment variables configured

**Save:** Backend URL (you'll need it next)

### STEP 2: Frontend on Render (5 min)
👉 Follow: [RENDER_FRONTEND_QUICK_START.md](RENDER_FRONTEND_QUICK_START.md)

**What you'll get:**
- ✅ Frontend live on `https://your-app.onrender.com`
- ✅ HTTPS certificate (free)
- ✅ Environment variables configured

### STEP 3: Connect Them (2 min)
Update Backend CORS:
```
CORS_ORIGINS = https://your-app.onrender.com,http://localhost:5173
```

### STEP 4: Test Everything (5 min)
1. Open `https://your-app.onrender.com`
2. Login: `admin` / `admin123`
3. Create test data
4. All working? ✅ You're done!

---

## 📁 DOCUMENTATION FILES

### 🚀 Quick Start Guides (Read First!)
- **[RENDER_BACKEND_QUICK_START.md](RENDER_BACKEND_QUICK_START.md)** - Backend in 15 min
- **[RENDER_FRONTEND_QUICK_START.md](RENDER_FRONTEND_QUICK_START.md)** - Frontend in 5 min

### 📚 Comprehensive Guides
- **[RENDER_BACKEND_DEPLOYMENT.md](RENDER_BACKEND_DEPLOYMENT.md)** - Complete backend reference
- **[RENDER_FRONTEND_DEPLOYMENT.md](RENDER_FRONTEND_DEPLOYMENT.md)** - Complete frontend reference (will create if needed)

### ⚙️ Configuration Files
```
✅ render.yaml                          (Infrastructure config)
✅ ims-backend/src/main/resources/
   └─ application-render.properties     (Spring Boot config)
✅ ims-backend/.env.render              (Environment template)
✅ ims-frontend/.env.production         (Environment template)
✅ ims-backend/pom.xml                  (Updated with PostgreSQL)
```

---

## 🎯 YOUR DEPLOYMENT PLAN

```
Timeline: ~20 minutes total

├─ 2 min:  Push to GitHub
│
├─ 8 min:  Deploy backend on Render
│  └─ Create web service
│  └─ Create PostgreSQL database
│  └─ Set 6 environment variables
│  └─ Watch build complete
│
├─ 5 min:  Deploy frontend on Render
│  └─ Create static site
│  └─ Set API URL
│  └─ Watch build complete
│
└─ 5 min:  Test & Connect
   └─ Update CORS
   └─ Test login
   └─ Create test data
```

---

## 📊 WHAT YOU GET

| Feature | Status | Cost |
|---------|--------|------|
| Frontend HTTPS | ✅ Auto | FREE |
| Backend HTTPS | ✅ Auto | FREE |
| Database | ✅ Managed | FREE |
| Auto-deploy | ✅ On push | FREE |
| Uptime SLA | ✅ 99.5% | FREE |
| Backups | ✅ Daily auto | FREE |
| CDN | ✅ Global | FREE |
| **Total** | **✅ Production Ready** | **FREE** |

---

## 🚀 STEP 1: BACKEND DEPLOYMENT

### Quick Version (8 min)
👉 **[RENDER_BACKEND_QUICK_START.md](RENDER_BACKEND_QUICK_START.md)**

1. Code already on GitHub ✅
2. Go to https://render.com
3. Click "New" → "Blueprint"
4. Select your repo
5. Click Deploy
6. Wait 5-8 minutes
7. **Copy backend URL**

### Result
```
Backend: https://your-backend.onrender.com/api/health ✅
Database: PostgreSQL ✅
HTTPS: ✅
```

---

## 🎨 STEP 2: FRONTEND DEPLOYMENT

### Quick Version (5 min)
👉 **[RENDER_FRONTEND_QUICK_START.md](RENDER_FRONTEND_QUICK_START.md)**

1. Update `.env.production` with backend URL
2. Push to GitHub
3. Go to https://render.com
4. Click "New" → "Static Site"
5. Select your repo, set `ims-frontend` directory
6. Click Deploy
7. Wait 2-3 minutes

### Result
```
Frontend: https://your-app.onrender.com ✅
HTTPS: ✅
```

---

## 🔗 STEP 3: CONNECT THEM

Go to Render Backend Service → Environment Variables

Update:
```
CORS_ORIGINS = https://your-app.onrender.com,http://localhost:5173
```

Backend auto-redeploys ✅

---

## ✅ STEP 4: TEST EVERYTHING

### Test 1: Frontend Loads
```
https://your-app.onrender.com
```
✅ Should show login page

### Test 2: Login Works
```
Username: admin
Password: admin123
```
✅ Should show dashboard

### Test 3: Create Data
Go to Clients → Create client
✅ Should save successfully

### Test 4: API Working
Open DevTools (F12) → Network tab
Click any menu item
✅ All requests should be 200 OK

---

## 💰 COST BREAKDOWN

### FREE Tier
- **Render Static Site** (Frontend): FREE
- **Render Web Service** (Backend): FREE
- **Render PostgreSQL** (Database): FREE
- **HTTPS Certificates**: FREE
- **Backups**: FREE
- **Total**: **FREE** ✅

### If You Need More (Paid)
- Frontend: $20+/month
- Backend: $7+/month
- Database: $7+/month
- Total: ~$35+/month (optional)

---

## 🎓 LEARNING RESOURCES

If you want to understand more:

**Render Documentation:**
- https://render.com/docs
- https://render.com/docs/native-runtimes#java
- https://render.com/docs/databases

**Spring Boot on Render:**
- https://render.com/docs/deploy-spring-boot

**GitHub Integration:**
- Auto-deploy on push
- Environment variables
- Deployment logs

---

## 🆘 NEED HELP?

### Quick Troubleshooting
1. Check [RENDER_BACKEND_QUICK_START.md](RENDER_BACKEND_QUICK_START.md) → Troubleshooting
2. Check [RENDER_FRONTEND_QUICK_START.md](RENDER_FRONTEND_QUICK_START.md) → Troubleshooting
3. View logs in Render Dashboard
4. Render support: https://support.render.com

### Common Issues

| Issue | Solution |
|-------|----------|
| Build fails | Check logs, test locally first |
| API returns 404 | Update CORS_ORIGINS, restart backend |
| Blank page | Check VITE_API_URL, clear cache |
| Database won't connect | Check connection string, wait for DB init |
| Service unhealthy | Check health endpoint logs |

---

## ✅ DEPLOYMENT CHECKLIST

### Before You Start
- [ ] Code on GitHub
- [ ] Render account ready

### Backend Deployment
- [ ] Blueprint deployed OR services created
- [ ] PostgreSQL database initialized
- [ ] 6 environment variables set
- [ ] Build succeeded
- [ ] Health endpoint returns 200
- [ ] Backend URL copied

### Frontend Deployment
- [ ] `.env.production` updated
- [ ] Code pushed
- [ ] Static site deployed
- [ ] Frontend loads
- [ ] Frontend URL copied

### Connection
- [ ] CORS_ORIGINS updated in backend
- [ ] Backend redeployed
- [ ] Login works
- [ ] Can create data

### Testing
- [ ] Frontend accessible at HTTPS
- [ ] Backend accessible at HTTPS
- [ ] API calls working
- [ ] Database operations working
- [ ] No CORS errors

---

## 📈 AFTER DEPLOYMENT

### Auto-Deploy
Push to GitHub = Auto-deploy to Render ✅

### Monitor Performance
Render Dashboard shows:
- Build status
- Deployment history
- Resource usage
- Logs

### Manual Actions
- Restart service: Dashboard → Service → Restart
- Redeploy: Dashboard → Deployments → Redeploy
- Update env vars: Dashboard → Environment

---

## 🎉 SUCCESS!

You now have:
- ✅ Production app on Render
- ✅ HTTPS on both frontend & backend
- ✅ PostgreSQL database
- ✅ Auto-scaling ready
- ✅ Daily backups
- ✅ Global CDN
- ✅ FREE tier

---

## 📞 QUICK LINKS

| Resource | Link |
|----------|------|
| Render Dashboard | https://dashboard.render.com |
| Render Docs | https://render.com/docs |
| GitHub | https://github.com/settings |
| Backend URL | https://your-backend.onrender.com |
| Frontend URL | https://your-app.onrender.com |

---

**Ready? Start with [RENDER_BACKEND_QUICK_START.md](RENDER_BACKEND_QUICK_START.md)!** 🚀

*Total time: ~20 minutes*
*Total cost: FREE*
*Result: Production HTTPS application* ✅

---

*Render Deployment Guide v1.0 | May 2026*
