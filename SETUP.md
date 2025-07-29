# Quick Setup Guide

## Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Gmail account with App Password
- Google Cloud Console project

## Environment Setup

### 1. Server Environment (.env in server folder)
```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-secure
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-gmail-app-password
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
PORT=5000
```

### 2. Client Environment (.env in client folder)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

## Quick Start

### Option 1: Use the batch script (Windows)
```bash
# Double-click start-dev.bat or run:
start-dev.bat
```

### Option 2: Manual start
```bash
# Terminal 1 - Start backend
cd server
npm install
npm run dev

# Terminal 2 - Start frontend
cd client
npm install
npm start
```

## Application URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Features Implemented
✅ Email & OTP authentication
✅ Google OAuth integration
✅ JWT-based authorization
✅ Create, read, delete notes
✅ Mobile-responsive design
✅ Error handling
✅ Form validation
✅ Modern UI without external CSS frameworks

## Project Structure
```
Intershala/
├── client/          # React frontend
├── server/          # Node.js backend
├── README.md        # Detailed documentation
├── deploy.md        # Deployment guide
├── start-dev.bat    # Quick start script
└── SETUP.md         # This file
```

## Next Steps
1. Configure your environment variables
2. Set up MongoDB Atlas
3. Configure Google OAuth
4. Set up Gmail App Password
5. Run the application
6. Deploy to cloud (see deploy.md)

## Troubleshooting
- Make sure MongoDB connection string is correct
- Verify Google OAuth credentials
- Check that Gmail App Password is set up correctly
- Ensure all environment variables are set
- Check that ports 3000 and 5000 are available