import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
const passport = require('../configs/passport.config');

import config from '@src/configs/app.config';
import i18n from '@src/libs/i18n';
import routes from '@src/rest-resources/routes';
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware';

const app = express();

// Secure HTTP headers
app.use(helmet({
  crossOriginOpenerPolicy: false,
  originAgentCluster: false,
}));

// Parse JSON body and keep raw body for signature verification if needed
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString(); // Optional: for signature verification, Stripe, etc.
  },
}));

// Logging requests
app.use(morgan('tiny'));

// Internationalization setup
app.use(i18n.init);

// Session middleware
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// ✅ CORS configuration - Allow all origins
const corsOptions = {
  credentials: true,
  origin: true, // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
};

console.log('🚀 CORS Configuration loaded - All origins allowed');

app.use(cors(corsOptions));

// Additional CORS headers for preflight requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Mount your REST API routes
app.use(routes);

// Fallback route for unmatched requests
app.use(async (req, res) => {
  res.status(404).json({ message: 'Welcome to player backend' });
});

// Global error handler
app.use(errorHandlerMiddleware);

export default app;
