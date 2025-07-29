# Notes App - Full Stack Application

A modern, responsive note-taking application built with React (TypeScript) frontend and Node.js backend with MongoDB database.

## Features

- **User Authentication**
  - Email & OTP verification
  - Google OAuth integration
  - JWT-based authorization
  
- **Note Management**
  - Create notes with optional titles
  - View all user notes
  - Delete notes
  - Responsive grid layout

- **Modern UI/UX**
  - Mobile-first responsive design
  - Clean, modern interface
  - Smooth animations and transitions
  - Error handling with user-friendly messages

## Technology Stack

### Frontend
- **React 19** with TypeScript
- **React Router** for navigation
- **React Hook Form** for form handling
- **Tailwind CSS** for styling
- **Google OAuth** for authentication
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Nodemailer** for email services
- **Google Auth Library** for OAuth

## Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- Gmail account for email services
- Google Cloud Console project for OAuth

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Intershala
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-secure
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-gmail-app-password
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
PORT=5000
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file in the client directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

### 4. Environment Configuration

#### MongoDB Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace `<password>` with your database user password

#### Gmail App Password
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password for the application
3. Use this App Password in the `GMAIL_PASS` environment variable

#### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins: `http://localhost:3000`
6. Add authorized redirect URIs: `http://localhost:3000`

## Running the Application

### Development Mode

1. **Start the Backend Server:**
```bash
cd server
npm run dev
```
The server will run on `http://localhost:5000`

2. **Start the Frontend Development Server:**
```bash
cd client
npm start
```
The client will run on `http://localhost:3000`

### Production Build

1. **Build the Frontend:**
```bash
cd client
npm run build
```

2. **Build the Backend:**
```bash
cd server
npm run build
```

3. **Start Production Server:**
```bash
cd server
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to email
- `POST /api/auth/verify-otp` - Verify OTP and get JWT token
- `POST /api/auth/google-login` - Google OAuth login

### Notes (Protected Routes)
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create a new note
- `DELETE /api/notes/:id` - Delete a specific note

## Project Structure

```
Intershala/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/        # Auth context
│   │   ├── pages/          # Page components
│   │   ├── routes/         # Route configuration
│   │   ├── services/       # API services
│   │   └── ...
│   ├── package.json
│   └── ...
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── index.ts        # Server entry point
│   ├── package.json
│   └── ...
└── README.md
```

## Features Implementation

### Authentication Flow
1. User enters email on signup page
2. OTP is sent to the provided email
3. User verifies OTP to get JWT token
4. Token is stored in localStorage for persistence
5. Protected routes check for valid JWT token

### Google OAuth Flow
1. User clicks "Sign in with Google"
2. Google OAuth popup opens
3. User authorizes the application
4. ID token is sent to backend for verification
5. Backend creates/finds user and returns JWT token

### Note Management
1. Authenticated users can create notes
2. Notes are stored with user reference
3. Users can only view/delete their own notes
4. Real-time UI updates after CRUD operations

## Security Features

- JWT tokens with expiration
- Protected API routes with middleware
- Input validation on both frontend and backend
- CORS configuration
- Environment variables for sensitive data

## Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interface
- Optimized for various screen sizes

## Error Handling

- Comprehensive error messages
- Network error handling
- Form validation errors
- API error responses

## Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `build` folder
3. Set environment variables in deployment platform

### Backend (Heroku/Railway)
1. Set up environment variables
2. Deploy the server code
3. Ensure MongoDB connection is accessible

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact [your-email@example.com]