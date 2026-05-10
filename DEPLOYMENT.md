# Deployment Guide - Jemimah Johnson and Associates

This guide will help you deploy your application to:
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Render PostgreSQL (or your existing MySQL)

## Prerequisites

- GitHub account with your code pushed
- Vercel account (connect with GitHub)
- Render account (connect with GitHub)
- Domain name (optional)

---

## Step 1: Push Code to GitHub

1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a repository on GitHub
3. Add remote and push:
   ```bash
   git remote add origin https://github.com/your-username/jemimah-johnson-webapp.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Deploy Backend to Render

### Option A: Use Render MySQL Database

1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "PostgreSQL"
3. Name: `jemimah-johnson-db`
4. Database: `jemimah_johnson`
5. User: `jemimah_johnson_user`
6. Region: Choose closest to your users
7. Click "Create Database"

### Option B: Use Your Existing MySQL Database

If you want to use your existing MySQL database (e.g., from XAMPP), you'll need to:
1. Export your database from XAMPP
2. Import it to a cloud MySQL service (e.g., PlanetScale, AWS RDS, Azure MySQL)
3. Update the connection details in Render environment variables

### Deploy Backend Service

1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `jemimah-johnson-backend`
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build:backend`
   - **Start Command**: `node dist/server.js`
   - **Runtime**: `Node 18+`

4. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   DB_HOST=your-database-host
   DB_PORT=3306
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_NAME=jemimah_johnson
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=30d
   ADMIN_EMAIL=admin@jemimahjohnston.com
   ADMIN_PASSWORD=your-admin-password
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

5. Click "Deploy Web Service"

6. After deployment, note your backend URL:
   - `https://jemimah-johnson-backend.onrender.com`

---

## Step 3: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:
   ```
   VITE_API_URL=https://jemimah-johnson-backend.onrender.com
   ```

6. Click "Deploy"

7. After deployment, note your frontend URL:
   - `https://your-app-name.vercel.app`

---

## Step 4: Update CORS Configuration

1. Go to your Render backend service
2. Click "Environment"
3. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL=https://your-app-name.vercel.app
   ```

4. Click "Save Changes"
5. Render will automatically redeploy with the new configuration

---

## Step 5: Update M-Pesa Callback URL

If you set up M-Pesa payments, update the callback URL:

1. Go to Safaricom Developer Portal
2. Update your callback URL to:
   ```
   https://jemimah-johnson-backend.onrender.com/api/mpesa/callback
   ```

---

## Step 6: Test Production Deployment

1. Open your Vercel frontend URL
2. Test client login
3. Test admin login
4. Test inquiry submission
5. Verify all features work as expected

---

## Step 7: Add Custom Domain (Optional)

### Vercel Frontend
1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Render Backend
1. Go to Render service settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

---

## Environment Variables Reference

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend-url.onrender.com
```

### Backend (Render)
```
NODE_ENV=production
PORT=5000
DB_HOST=your-database-host
DB_PORT=3306
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=jemimah_johnson
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
ADMIN_EMAIL=admin@jemimahjohnston.com
ADMIN_PASSWORD=your-admin-password
FRONTEND_URL=https://your-vercel-app.vercel.app

# Email (optional - currently disabled)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@jemimahjohnston.com

# M-Pesa (optional)
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_PASSKEY=your_passkey
MPESA_SHORTCODE=174379
MPESA_ENVIRONMENT=sandbox
MPESA_CALLBACK_URL=https://your-backend-url.onrender.com/api/mpesa/callback

# Document Encryption (optional)
ENCRYPTION_KEY=your_32_byte_hex_encryption_key
```

---

## Troubleshooting

### Backend won't start
- Check Render logs for errors
- Verify database connection details
- Ensure all environment variables are set

### Frontend can't connect to backend
- Verify VITE_API_URL is correct
- Check CORS configuration on backend
- Verify backend is running and accessible

### Database connection errors
- Verify database credentials
- Check if database is accessible from Render
- Ensure database allows remote connections

### M-Pesa callbacks not working
- Verify callback URL is correct and publicly accessible
- Check Safaricom Developer Portal configuration
- Test with ngrok for local development

---

## Post-Deployment Tasks

1. Set up email notifications (Gmail 2FA and App Password)
2. Register on Safaricom Developer Portal for M-Pesa credentials
3. Generate encryption key for document encryption
4. Set up monitoring and error tracking
5. Configure backup strategy for database
6. Set up SSL certificates for custom domain

---

## Cost Estimates

### Vercel (Frontend)
- Free tier: 100GB bandwidth, 6GB builds
- Pro: $20/month for additional features

### Render (Backend + Database)
- Free tier: 750 hours/month, 256MB RAM
- Starter: $7/month for better performance
- Database: Free tier (PostgreSQL) or $7/month (MySQL)

---

## Support

If you encounter issues:
- Check Render logs: Dashboard → Service → Logs
- Check Vercel logs: Dashboard → Project → Logs
- Review this guide for common issues
- Contact support for platform-specific issues
