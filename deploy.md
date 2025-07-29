# Deployment Guide

## Quick Deployment Options

### Frontend Deployment (Netlify)

1. **Build the project:**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `build` folder
   - Set environment variables:
     - `REACT_APP_API_URL`: Your backend URL
     - `REACT_APP_GOOGLE_CLIENT_ID`: Your Google Client ID

### Backend Deployment (Railway)

1. **Deploy to Railway:**
   - Go to [Railway](https://railway.app)
   - Connect your GitHub repository
   - Select the `server` folder as root
   - Set environment variables:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `GMAIL_USER`
     - `GMAIL_PASS`
     - `GOOGLE_CLIENT_ID`
     - `GOOGLE_CLIENT_SECRET`
     - `PORT`

### Alternative: Heroku Deployment

1. **Install Heroku CLI**
2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create Heroku app:**
   ```bash
   heroku create your-notes-app-backend
   ```

4. **Set environment variables:**
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set JWT_SECRET=your-jwt-secret
   # ... set other variables
   ```

5. **Deploy:**
   ```bash
   git subtree push --prefix server heroku main
   ```

## Environment Variables Checklist

### Backend (.env)
- [ ] `MONGODB_URI`
- [ ] `JWT_SECRET`
- [ ] `GMAIL_USER`
- [ ] `GMAIL_PASS`
- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`
- [ ] `PORT`

### Frontend (.env)
- [ ] `REACT_APP_API_URL`
- [ ] `REACT_APP_GOOGLE_CLIENT_ID`

## Post-Deployment Steps

1. Update Google OAuth settings with production URLs
2. Test all authentication flows
3. Verify email functionality
4. Test note CRUD operations
5. Check mobile responsiveness

## Monitoring

- Set up error tracking (Sentry)
- Monitor API performance
- Set up uptime monitoring
- Check database performance