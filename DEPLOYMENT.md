# 🚀 MoneyWise Deployment Guide

## Prerequisites
- MongoDB Atlas account
- Vercel account (free)
- GitHub account (already set up)

## Step 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or login
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<dbname>` with `moneywise`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/moneywise?retryWrites=true&w=majority
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import your `moneyWise` repository
5. Configure environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Any random string (e.g., `my-super-secret-jwt-key-2024`)
   - `NEXTAUTH_SECRET`: Any random string (e.g., `my-nextauth-secret-2024`)
   - `NEXTAUTH_URL`: Will be auto-set by Vercel
6. Click "Deploy"
7. Wait 2-3 minutes
8. Your app is live! 🎉

### Option B: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
cd moneywise
vercel
```

4. Follow prompts and add environment variables when asked

## Step 3: Set Environment Variables in Vercel

If you didn't add them during deployment:

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Add these variables:

| Variable | Value |
|----------|-------|
| MONGODB_URI | Your MongoDB connection string |
| JWT_SECRET | Random secret key (min 32 characters) |
| NEXTAUTH_SECRET | Random secret key (min 32 characters) |
| NEXTAUTH_URL | Your Vercel deployment URL |

4. Redeploy the project

## Step 4: Test Your Deployment

1. Visit your Vercel URL
2. Create a new account
3. Complete onboarding
4. Test all features:
   - Dashboard
   - Learning modules
   - Quizzes
   - Tools
   - Stories

## 🔒 Security Checklist

- ✅ Change JWT_SECRET to a strong random string
- ✅ Change NEXTAUTH_SECRET to a strong random string
- ✅ Use strong MongoDB password
- ✅ Whitelist Vercel IPs in MongoDB (or allow all for testing)
- ✅ Never commit .env.local to Git

## 🐛 Troubleshooting

### Database Connection Error
- Check MongoDB connection string is correct
- Ensure MongoDB cluster is running
- Check network access settings in MongoDB Atlas
- Add `0.0.0.0/0` to IP whitelist (for testing)

### Build Errors
- Check all dependencies are installed
- Ensure Node.js version is 18+ in Vercel settings
- Check build logs in Vercel dashboard

### Authentication Issues
- Verify JWT_SECRET is set correctly
- Clear browser cookies and try again
- Check browser console for errors

## 📱 Custom Domain (Optional)

1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update NEXTAUTH_URL to your custom domain

## 🔄 Continuous Deployment

Every push to `main` branch will automatically deploy to Vercel!

```bash
git add .
git commit -m "Your changes"
git push origin main
```

## 📊 Monitoring

- View deployment logs in Vercel dashboard
- Monitor MongoDB usage in Atlas dashboard
- Check analytics in Vercel

## 🎉 You're Done!

Your MoneyWise app is now live and helping people learn financial literacy!

Share the link with friends and family to help them avoid financial mistakes. 🚀
