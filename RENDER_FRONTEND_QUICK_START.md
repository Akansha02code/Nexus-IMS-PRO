# 🚀 RENDER FRONTEND - QUICK START (5 MINUTES)

## ⚡ DEPLOY FRONTEND TO RENDER

Get your frontend live in just **5 minutes**!

---

## 📋 WHAT YOU'LL HAVE

```
https://your-app.onrender.com (HTTPS ✅)
    ↓
React 18 + Vite Frontend (Live & Scalable)
```

**Cost**: FREE (free tier included!)

---

## ✅ STEP-BY-STEP (3 STEPS)

### ⏱️ STEP 1: Prepare Frontend (1 min)

Update `ims-frontend/.env.production`:
```
VITE_API_URL=https://your-backend.onrender.com/api
VITE_APP_TITLE=Nexus IMS Pro
```

Replace `your-backend.onrender.com` with your actual Render backend URL!

---

### ⏱️ STEP 2: Push to GitHub (1 min)

```bash
cd c:\Users\Akansha Pramod Sahoo\Desktop\projects\CodeB_javafullstack

git add .
git commit -m "Update frontend for Render deployment"
git push origin main
```

---

### ⏱️ STEP 3: Deploy on Render (3 min)

1. Go to **https://dashboard.render.com**
2. Click **"New +"** → **"Static Site"**
3. Select your GitHub repo (`nexus-ims-pro`)
4. Fill in:
   - **Name**: `nexus-ims-frontend`
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `dist`
   - **Root Directory**: `ims-frontend` (if monorepo)
5. Click **"Create Static Site"**
6. Wait 2-3 minutes for deployment ✅

---

## 🎉 YOU'RE DONE!

### Your Frontend is Live!

After deployment:

```
Frontend URL: https://your-app.onrender.com (HTTPS ✅)
Access at:    https://your-app.onrender.com
```

---

## 🔗 GET YOUR FRONTEND URL

1. Go to Frontend Service
2. Copy the **"Public URL"**
3. Example: `https://nexus-ims-app.onrender.com`

---

## 🔌 CONNECT FRONTEND TO BACKEND

### Update Backend CORS

1. Go to **Render Dashboard** → Backend Service → Environment
2. Update `CORS_ORIGINS`:
   ```
   https://your-app.onrender.com,http://localhost:5173
   ```
3. Click **"Save"** - backend auto-redeploys

---

## ✅ VERIFY FRONTEND IS WORKING

1. Open `https://your-app.onrender.com` in browser
2. Login page should load ✅
3. Try login: `admin` / `admin123`
4. Dashboard should appear ✅

---

## 🚨 TROUBLESHOOTING

### ❌ Build Failed

**Check Logs:**
1. Frontend Service → **"Logs"**
2. Look for error

**Solution:**
```bash
# Test locally
npm run build

# Fix errors
git add . && git commit -m "Fix build"
git push origin main
# Auto-redeploys
```

### ❌ Blank Page or 404

**Solution:**
1. Check `VITE_API_URL` is correct
2. Backend should be running
3. Check browser console (F12) for errors
4. Clear cache: Ctrl+Shift+Delete
5. Redeploy: Frontend Service → **"Redeploy"**

### ❌ API Calls Return 404

**Solution:**
1. Check backend `CORS_ORIGINS` includes your frontend URL
2. Backend must be live and responding
3. Check `VITE_API_URL` ends with `/api`
4. Wait for backend to finish redeploying

---

## 📊 QUICK REFERENCE

| Item | Value |
|------|-------|
| **Build Command** | `npm ci && npm run build` |
| **Publish Directory** | `dist` |
| **Root Directory** | `ims-frontend` |
| **Environment Variable** | `VITE_API_URL` |
| **Health Check** | Open URL in browser |
| **Auto-deploy** | On push to main ✅ |
| **HTTPS** | ✅ Free & Automatic |
| **URL Example** | `https://nexus-ims-app.onrender.com` |

---

## ✅ CHECKLIST

- [ ] Backend URL copied
- [ ] `.env.production` updated with backend URL
- [ ] Code pushed to GitHub
- [ ] Frontend service created on Render
- [ ] Build completed successfully
- [ ] Frontend URL accessible
- [ ] Backend CORS updated
- [ ] Can access frontend in browser
- [ ] Login works
- [ ] API calls working

---

**Your frontend is now live on Render!** 🎉

*Next: Test everything and manage from Render dashboard*

---

*Render Frontend Quick Start v1.0 | May 2026*
