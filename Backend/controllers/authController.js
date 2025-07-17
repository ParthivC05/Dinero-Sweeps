import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Helper to generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// Register
export const register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, dateOfBirth } = req.body;
    if (!username || !email || !password || !firstName || !lastName || !dateOfBirth) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }
    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return res.status(400).json({ success: false, error: 'Username or email already exists.' });
    }
    const user = new User({ username, email, password, firstName, lastName, dateOfBirth, loginMethod: 'local' });
    await user.save();
    res.status(201).json({ success: true, message: 'Registration successful.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password required.' });
    }
    const user = await User.findOne({ $or: [{ username }, { email: username }] });
    if (!user || user.loginMethod !== 'local') {
      return res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }
    const token = generateToken(user._id);
    res.json({ success: true, data: { user, accessToken: token } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Google OAuth
export const googleAuth = (req, res, next) => next();
export const googleCallback = (req, res) => {
  if (!req.user) return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
  const token = generateToken(req.user._id);
  res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${token}`);
};

// Facebook OAuth
export const facebookAuth = (req, res, next) => next();
export const facebookCallback = (req, res) => {
  if (!req.user) return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
  const token = generateToken(req.user._id);
  res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${token}`);
}; 