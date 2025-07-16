const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const FRONTEND_URL = process.env.FRONTEND_URL;

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login?error=google' }),
  async (req, res) => {
    // Find or create user in DB here, then:
    const user = req.user; // or your DB user
    const payload = {
      id: user.id,
      email: user.email,
      name: user.displayName,
      provider: user.provider
    };
    const token = jwt.sign(payload, process.env.JWT_LOGIN_SECRET, { expiresIn: '2h' });
    res.redirect(`${FRONTEND_URL}/oauth-callback?token=${token}`);
  }
);

// Facebook OAuth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login?error=facebook' }),
  (req, res) => {
    // Generate your JWT/access token here
    // Redirect to frontend with token
    const token = req.user.token; // Assume user object has token
    res.redirect(`http://localhost:5173/oauth-callback?token=${token}`);
  }
);

module.exports = router; 