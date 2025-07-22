import mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema({
  userId: String,
  username: String,
  groupId: String,
  message: String,
  messageType: { type: String, default: 'MESSAGE' },
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', MessageSchema);
export default Message;