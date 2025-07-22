import mongoose from 'mongoose';
const ChatGroupSchema = new mongoose.Schema({
  name: String,
  isGlobal: { type: Boolean, default: false }
});
const ChatGroup = mongoose.model('ChatGroup', ChatGroupSchema);
export default ChatGroup;