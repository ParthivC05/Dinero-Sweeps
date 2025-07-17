import crypto from 'crypto';

console.log('🔐 Generating secure secrets for Dinero Sweeps...\n');

// Generate JWT secrets
const jwtSecret = crypto.randomBytes(64).toString('hex');
const jwtRefreshSecret = crypto.randomBytes(64).toString('hex');
const sessionSecret = crypto.randomBytes(64).toString('hex');

console.log('=== BACKEND .env ===');
console.log(`JWT_SECRET=${jwtSecret}`);
console.log(`JWT_REFRESH_SECRET=${jwtRefreshSecret}`);
console.log(`SESSION_SECRET=${sessionSecret}`);
console.log('\n=== FRONTEND .env ===');
console.log('VITE_API_BASE_URL=http://localhost:8004/api/v1');
console.log('VITE_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI');
console.log('\n=== STILL NEEDED ===');
console.log('1. Google OAuth: https://console.cloud.google.com/');
console.log('2. Facebook OAuth: https://developers.facebook.com/');
console.log('3. reCAPTCHA: https://www.google.com/recaptcha/admin');
console.log('4. MongoDB: https://www.mongodb.com/atlas (or local)');
console.log('\n✅ Copy these secrets to your .env files!'); 