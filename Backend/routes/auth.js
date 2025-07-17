import express from 'express';
import passport from 'passport';
import { register, login, googleAuth, googleCallback, facebookAuth, facebookCallback } from '../controllers/authController.js';

const router = express.Router();

// Local auth
router.post('/register', register);
router.post('/login', login);

// Google OAuth
router.get('/google', googleAuth, passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleCallback);

// Facebook OAuth
router.get('/facebook', facebookAuth, passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), facebookCallback);

export default router; 