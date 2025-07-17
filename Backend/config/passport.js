import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import User from '../models/User.js';

const passportConfig = (passport) => {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // Google
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/callback',
    scope: ['profile', 'email'],
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          username: profile.emails[0].value.split('@')[0] + Math.random().toString(36).substr(2, 5),
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          loginMethod: 'google',
        });
      }
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }));

  // Facebook
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/api/v1/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name'],
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ facebookId: profile.id });
      if (!user) {
        const email = profile.emails?.[0]?.value || `${profile.id}@facebook.com`;
        user = await User.create({
          facebookId: profile.id,
          email,
          username: email.split('@')[0] + Math.random().toString(36).substr(2, 5),
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          loginMethod: 'facebook',
        });
      }
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }));
};

export default passportConfig; 