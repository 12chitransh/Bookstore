# 🚀 Quick Deployment Guide

## Backend Deployment (Railway)

1. **Go to Railway**: https://railway.app
2. **Sign up/Login** with GitHub
3. **Create New Project** → "Deploy from GitHub repo"
4. **Connect Repository**: Select `12chitransh/Bookstore`
5. **Configure Settings**:
   - **Root Directory**: `backend`
   - **Environment Variables** (add these in Railway dashboard):
     ```
     PORT=5000
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend-domain.vercel.app
     JWT_SECRET=71ad6fc8afc42fee296e925b0d31de7910f3f886c9ceb24ad5798fb1e77aa3dc746d0a00dafe63164d43e962f146728b5232c9d745783d28430ba72d1acc752b
     ADMIN_EMAIL=admin@bookstore.com
     ADMIN_PASSWORD=SecureAdmin123!
     STRIPE_SECRET_KEY=sk_test_your_stripe_key
     STRIPE_PUBLIC_KEY=pk_test_your_stripe_key
     ```
6. **Deploy**: Railway will automatically build and deploy
7. **Get Backend URL**: Copy the generated Railway domain (e.g., `https://bookstore-backend-production.up.railway.app`)

## Frontend Deployment (Vercel)

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Import Project** → "From GitHub"
4. **Connect Repository**: Select `12chitransh/Bookstore`
5. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend/bookstore`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**:
     ```
     VITE_API_URL=https://your-railway-backend-url
     ```
6. **Deploy**: Vercel will build and deploy automatically
7. **Update Backend**: Go back to Railway and update `FRONTEND_URL` with your Vercel domain

## Alternative: Deploy Both on Railway

If you prefer one platform:

1. **Backend on Railway** (as above)
2. **Frontend on Railway**:
   - Create new project
   - Root Directory: `frontend/bookstore`
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Environment: `VITE_API_URL=https://your-backend-url`

## Testing Deployment

1. **Frontend**: Visit your Vercel domain
2. **API Test**: Visit `https://your-backend-url/api/health`
3. **Books API**: Visit `https://your-backend-url/api/books`

## Important Notes

- **Update URLs**: Make sure to update the actual URLs in both environment variables
- **Stripe Keys**: Add real Stripe keys for payment processing
- **Admin Credentials**: Change default admin password in production
- **HTTPS**: Both platforms provide SSL certificates automatically

## Cost

- **Railway**: Free tier includes 512MB RAM, 1GB disk
- **Vercel**: Free tier with generous limits
- **Total**: Can run completely free for small applications