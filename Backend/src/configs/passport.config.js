const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');
const db = require('../db/models').default;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.OAUTH_CALLBACK_BASE}/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await db.User.findOne({ where: { email: profile.emails[0].value } });
    if (!user) {
      user = await db.User.create({
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        username: profile.displayName,
        profileImage: profile.photos[0]?.value,
        isEmailVerified: true,
        password: '', // Not used for OAuth
        other: { googleId: profile.id }
      });
    }
    const payload = {
      id: user.userId,
      email: user.email,
      name: user.firstName + ' ' + user.lastName,
      provider: 'google'
    };
    const token = jwt.sign(payload, process.env.JWT_LOGIN_SECRET, { expiresIn: '2h' });
    user.token = token;
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.OAUTH_CALLBACK_BASE}/facebook/callback`,
  profileFields: ['id', 'displayName', 'photos', 'email', 'birthday']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await db.User.findOne({ where: { email: profile.emails[0].value } });
    if (!user) {
      user = await db.User.create({
        email: profile.emails[0].value,
        firstName: profile.displayName.split(' ')[0],
        lastName: profile.displayName.split(' ').slice(1).join(' '),
        username: profile.displayName,
        profileImage: profile.photos[0]?.value,
        isEmailVerified: true,
        password: '', // Not used for OAuth
        other: { facebookId: profile.id }
      });
    }
    const payload = {
      id: user.userId,
      email: user.email,
      name: user.firstName + ' ' + user.lastName,
      provider: 'facebook'
    };
    const token = jwt.sign(payload, process.env.JWT_LOGIN_SECRET, { expiresIn: '2h' });
    user.token = token;
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

module.exports = passport; 