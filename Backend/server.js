import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import helmet from 'helmet';
import compression from 'compression';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import authRoutes from './routes/auth.js';
import passportConfig from './config/passport.js';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import 'dotenv/config';

import gamesRouter from './routes/games.js';
import usersRouter from './routes/users.js';

const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(compression());

const allowedOrigins = [
  'http://localhost:5173',
  'https://dinero-sweeps.vercel.app'
];

const corsOriginFunction = function (origin, callback) {
  if (!origin) return callback(null, true);
  if (allowedOrigins.includes(origin)) {
    return callback(null, true);
  } else {
    return callback(new Error('Not allowed by CORS'));
  }
};

app.use(cors({
  origin: corsOriginFunction,
  credentials: true,
}));

const io = new SocketIOServer(server, {
  cors: {
    origin: corsOriginFunction,
    credentials: true,
  },
});
const PORT = process.env.PORT || 8004;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60, // 1 day
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/games', gamesRouter);
app.use('/api/v1/users', usersRouter);

const offensiveWords = ['badword1', 'badword2']; 
function isOffensive(text) {
  return offensiveWords.some(word => text.toLowerCase().includes(word));
}
let messages = [];

io.on('connection', (socket) => {
  socket.emit('chat_history', messages);
  socket.on('send_message', (msg) => {
    let messageObj;
    if (isOffensive(msg.text)) {
      messageObj = { ...msg, text: 'Deleted because of offensive content', offensive: true };
    } else {
      messageObj = { ...msg, offensive: false };
    }
    messages.push(messageObj);
    io.emit('receive_message', messageObj);
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Server error',
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Socket.IO server ready`);
}); 