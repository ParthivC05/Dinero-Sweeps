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
import jwt from 'jsonwebtoken';
import Message from './models/message.js';  
import ChatGroup from './models/ChatGroup.js';

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

app.get('/api/chat/:groupId', async (req, res) => {
  const messages = await Message.find({ groupId: req.params.groupId }).sort({ createdAt: 1 });
  res.json(messages);
});

io.on('connection', async (socket) => {
  const messages = await Message.find({}).sort({ createdAt: 1 }).limit(100);
  socket.emit('chat_history', messages);

  socket.on('send_message', async (msg) => {
    const messageObj = {
      userId: msg.userId || 'anonymous',
      username: msg.username || 'Anonymous',
      message: msg.text,
      messageType: 'MESSAGE'
    };
    const saved = await Message.create(messageObj);
    console.log('Saved to MongoDB:', saved);
    io.emit('receive_message', saved);
  });
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
    ttl: 24 * 60 * 60, 
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', 
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, 
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


io.on('connection', async (socket) => {
  const messages = await Message.find({}).sort({ createdAt: 1 }).limit(100);
  socket.emit('chat_history', messages);

  socket.on('send_message', async (msg) => {
    const messageObj = {
      userId: msg.userId || 'anonymous',
      username: msg.username || 'Anonymous',
      message: msg.text,
      messageType: 'MESSAGE'
    };
    const saved = await Message.create(messageObj);
    console.log('Saved to MongoDB:', saved);
    io.emit('receive_message', saved);
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