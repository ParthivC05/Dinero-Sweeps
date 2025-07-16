# Backend Setup Guide - reCAPTCHA & CORS

## reCAPTCHA Setup

### 1. Get reCAPTCHA Keys
1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new site or use existing one
3. Choose reCAPTCHA v2 "I'm not a robot" Checkbox
4. Add your domains:
   - `localhost` (for development)
   - `127.0.0.1` (for development)
   - `dinero-sweeps.vercel.app` (for production)
5. Copy both the **Site Key** and **Secret Key**

### 2. Environment Variables
Add to your `.env` file:
```env
# reCAPTCHA Configuration
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
```

### 3. Frontend Environment Variables
In your frontend `.env` file:
```env
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
VITE_API_BASE_URL=http://localhost:4000
```

## CORS Configuration

### Current Setup
The backend is configured to allow requests from:
- All origins specified in `ALLOWED_ORIGIN` environment variable
- Common development origins:
  - `http://localhost:3000`
  - `http://localhost:5173`
  - `http://127.0.0.1:3000`
  - `http://127.0.0.1:5173`
  - `https://dinero-sweeps.vercel.app`

### Environment Variables for CORS
Add to your `.env` file:
```env
ALLOWED_ORIGIN=http://localhost:3000,http://localhost:5173,https://dinero-sweeps.vercel.app
```

## Installation & Dependencies

### Install node-fetch (if not already installed)
```bash
npm install node-fetch
```

### Required Environment Variables
Make sure these are set in your `.env` file:
```env
# Database
DB_SYNC=false
DB_PORT=5432
DB_WRITE_HOST=localhost
DB_READ_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# App
NODE_ENV=development
PORT=4000
USER_BACKEND_URL=http://localhost:4000
USER_FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGIN=http://localhost:3000,http://localhost:5173,https://dinero-sweeps.vercel.app

# JWT
JWT_LOGIN_SECRET=your_jwt_secret
JWT_LOGIN_TOKEN_EXPIRY=2h

# reCAPTCHA
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
```

## Testing the Setup

### 1. Test reCAPTCHA Verification
```bash
curl -X POST http://localhost:4000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "TestPass123",
    "captchaToken": "test_token"
  }'
```

### 2. Test CORS
From your frontend, the login request should now work without CORS errors.

## Troubleshooting

### CORS Issues
1. Check that your frontend URL is in the `ALLOWED_ORIGIN` list
2. Ensure the backend is running on the correct port
3. Check browser console for specific CORS error messages

### reCAPTCHA Issues
1. Verify the secret key is correct in your `.env` file
2. Check that the site key is correct in your frontend `.env` file
3. Ensure both keys are from the same reCAPTCHA site
4. Check backend logs for reCAPTCHA verification errors

### Network Issues
1. Ensure the backend is running and accessible
2. Check that the `VITE_API_BASE_URL` points to the correct backend URL
3. Verify firewall settings if testing from different machines

## Security Notes

1. **Never expose the reCAPTCHA secret key** in frontend code
2. **Always verify reCAPTCHA tokens** on the backend before processing login
3. **Use HTTPS in production** for secure communication
4. **Regularly rotate JWT secrets** and reCAPTCHA keys
5. **Monitor failed login attempts** and implement rate limiting if needed 