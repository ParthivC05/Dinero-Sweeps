# Dinero Sweeps - Complete Setup Guide

This guide will help you set up both the backend and frontend for the Dinero Sweeps gaming platform.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn
- Git

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
cp env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=8004
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/dinero_sweeps

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=30d

# OAuth Configuration (Optional for development)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# Frontend URLs
FRONTEND_URL=http://localhost:5173

# reCAPTCHA Configuration
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI

# Session Configuration
SESSION_SECRET=your-session-secret-key
```

### 4. Start MongoDB
Make sure MongoDB is running on your system or use a cloud service like MongoDB Atlas.

### 5. Start the Backend Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend will be available at `http://localhost:8004`

## Frontend Setup

### 1. Navigate to Root Directory
```bash
cd ..  # If you're in the backend directory
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8004/api/v1
VITE_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
```

### 4. Start the Frontend Development Server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Project Structure

```
dinero-sweeps/
├── backend/                 # Backend API
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   └── package.json
├── src/                   # Frontend React app
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── assets/           # Static assets
│   └── index.css         # Tailwind CSS
├── package.json          # Frontend dependencies
├── tailwind.config.js    # Tailwind configuration
└── vite.config.js        # Vite configuration
```

## Features Implemented

### Backend Features
- ✅ Express.js server with proper middleware
- ✅ MongoDB integration with Mongoose
- ✅ JWT authentication
- ✅ Google & Facebook OAuth
- ✅ Input validation with express-validator
- ✅ Rate limiting and security headers
- ✅ Comprehensive error handling
- ✅ Winston logging
- ✅ User model with gaming fields
- ✅ Authentication routes (login, register, OAuth)
- ✅ User management routes
- ✅ Game routes (placeholder)
- ✅ Wallet routes (placeholder)

### Frontend Features
- ✅ React with Vite
- ✅ Tailwind CSS styling
- ✅ Modern UI components
- ✅ Form validation
- ✅ reCAPTCHA integration
- ✅ OAuth buttons
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/google` - Google OAuth
- `GET /api/v1/auth/facebook` - Facebook OAuth

### User Management
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update profile
- `GET /api/v1/user/stats` - Get user statistics

### Gaming
- `GET /api/v1/game` - Get all games
- `POST /api/v1/game/bet` - Place bet

### Wallet
- `GET /api/v1/wallet/balance` - Get balance
- `POST /api/v1/wallet/deposit` - Create deposit
- `POST /api/v1/wallet/withdrawal` - Create withdrawal

## Development Notes

### Backend
- The backend uses ES modules (import/export)
- MongoDB connection is configured with proper error handling
- JWT tokens are used for authentication
- OAuth is implemented with Passport.js
- All routes are validated and secured

### Frontend
- Uses Tailwind CSS for styling
- Lucide React for icons
- React Toastify for notifications
- Form validation with custom logic
- Responsive design for mobile and desktop

## Next Steps

1. **Complete Game Integration**: Implement actual game logic
2. **Payment Processing**: Add real payment gateways
3. **Email Service**: Implement email verification and notifications
4. **Admin Panel**: Create admin dashboard
5. **Real-time Features**: Add WebSocket for live updates
6. **Testing**: Add unit and integration tests
7. **Deployment**: Set up production deployment

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network access

2. **CORS Errors**
   - Check frontend URL in backend CORS configuration
   - Ensure both servers are running

3. **OAuth Errors**
   - Verify OAuth credentials in `.env`
   - Check callback URLs in OAuth provider settings

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

## Support

For issues or questions, please check the documentation or create an issue in the repository. 