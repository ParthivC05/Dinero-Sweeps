import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import passportConfig from './config/passport.js';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import 'dotenv/config';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
});
const PORT = process.env.PORT || 8004;

// MongoDB connection
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

// CORS for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session (for OAuth)
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
}));

// Passport
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/v1/auth', authRoutes);

// --- Live Chat Logic ---
const offensiveWords = ['badword1', 'badword2']; // Add your list
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

// Error handler
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