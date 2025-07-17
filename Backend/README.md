# Dinero Sweeps Backend API

A comprehensive Node.js backend API for the Dinero Sweeps gaming platform, built with Express.js, MongoDB, and JWT authentication.

## Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - Google OAuth 2.0 integration
  - Facebook OAuth 2.0 integration
  - Password reset functionality
  - Account lockout protection

- 🎮 **Gaming Platform**
  - User profile management
  - Wallet and balance management
  - Game integration framework
  - Transaction history
  - Referral system

- 🛡️ **Security**
  - Input validation with express-validator
  - Rate limiting
  - CORS protection
  - Helmet security headers
  - Password hashing with bcrypt

- 📊 **Monitoring & Logging**
  - Winston logging
  - Request/response logging
  - Error tracking
  - Health check endpoints

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, Passport.js
- **Validation**: express-validator
- **Security**: bcryptjs, helmet, cors
- **Logging**: Winston
- **OAuth**: Google OAuth 2.0, Facebook OAuth 2.0

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=8004
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/dinero_sweeps
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   JWT_REFRESH_SECRET=your-refresh-secret-key
   JWT_REFRESH_EXPIRES_IN=30d
   
   # OAuth Configuration
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   FACEBOOK_APP_ID=your-facebook-app-id
   FACEBOOK_APP_SECRET=your-facebook-app-secret
   
   # Frontend URLs
   FRONTEND_URL=http://localhost:5173
   
   # reCAPTCHA Configuration
   RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
   RECAPTCHA_SITE_KEY=your-recaptcha-site-key
   
   # Session Configuration
   SESSION_SECRET=your-session-secret-key
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/v1/auth/register` | Register new user | Public |
| POST | `/api/v1/auth/login` | User login | Public |
| POST | `/api/v1/auth/logout` | User logout | Private |
| POST | `/api/v1/auth/forgot-password` | Request password reset | Public |
| POST | `/api/v1/auth/reset-password` | Reset password | Public |
| POST | `/api/v1/auth/refresh` | Refresh JWT token | Public |
| GET | `/api/v1/auth/google` | Google OAuth login | Public |
| GET | `/api/v1/auth/google/callback` | Google OAuth callback | Public |
| GET | `/api/v1/auth/facebook` | Facebook OAuth login | Public |
| GET | `/api/v1/auth/facebook/callback` | Facebook OAuth callback | Public |

### User Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/v1/user/profile` | Get user profile | Private |
| PUT | `/api/v1/user/profile` | Update user profile | Private |
| PUT | `/api/v1/user/change-password` | Change password | Private |
| GET | `/api/v1/user/stats` | Get user statistics | Private |

### Gaming

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/v1/game` | Get all games | Private |
| GET | `/api/v1/game/:id` | Get game by ID | Private |
| POST | `/api/v1/game/bet` | Place bet | Private |
| GET | `/api/v1/game/history` | Get game history | Private |

### Wallet

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/v1/wallet/balance` | Get wallet balance | Private |
| GET | `/api/v1/wallet/transactions` | Get transaction history | Private |
| POST | `/api/v1/wallet/deposit` | Create deposit | Private |
| POST | `/api/v1/wallet/withdrawal` | Create withdrawal | Private |
| GET | `/api/v1/wallet/transactions/:id` | Get transaction by ID | Private |

### System

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/health` | Health check | Public |

## Authentication

### JWT Token

Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### OAuth Flow

1. User clicks OAuth button
2. Redirected to OAuth provider
3. User authorizes the application
4. Redirected back to callback URL
5. Server processes OAuth response
6. User redirected to frontend with tokens

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## Validation

All input is validated using express-validator:

- **Registration**: Username, email, password, personal info
- **Login**: Username/email, password
- **Profile Updates**: Personal information
- **Game Bets**: Game ID, amount
- **Wallet Transactions**: Amount, type

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Rate Limiting**: Prevents abuse
- **Input Validation**: Sanitizes all inputs
- **CORS**: Configurable cross-origin requests
- **Helmet**: Security headers
- **Account Lockout**: After failed login attempts

## Development

### Project Structure

```
backend/
├── config/           # Configuration files
│   ├── database.js   # MongoDB connection
│   ├── logger.js     # Winston logging
│   └── passport.js   # OAuth configuration
├── controllers/      # Route controllers
│   └── authController.js
├── middleware/       # Custom middleware
│   ├── auth.js       # Authentication middleware
│   ├── validation.js # Input validation
│   ├── errorHandler.js
│   └── notFound.js
├── models/          # Mongoose models
│   └── User.js
├── routes/          # API routes
│   ├── auth.js
│   ├── user.js
│   ├── game.js
│   └── wallet.js
├── logs/            # Log files
├── server.js        # Main application file
├── package.json
└── README.md
```

### Scripts

- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon
- `npm test`: Run tests

### Environment Variables

See `env.example` for all required environment variables.

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Set secure JWT secrets
4. Configure OAuth credentials
5. Set up proper CORS origins
6. Enable HTTPS
7. Configure logging
8. Set up monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details. 