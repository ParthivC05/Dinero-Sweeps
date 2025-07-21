import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, 
  firstName: { type: String },
  lastName: { type: String },
  dateOfBirth: { type: Date },
  loginMethod: { type: String, enum: ['local', 'google', 'facebook'], default: 'local' },
  googleId: { type: String },
  facebookId: { type: String },
  avatar: { type: String }, 
  phone: { type: String },
  address: { type: String },
  communicationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    call: { type: Boolean, default: false },
  },
  verificationDocs: [{
    type: { type: String, enum: ['id', 'address'], required: true },
    url: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    uploadedAt: { type: Date, default: Date.now },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: { type: Date },
    rejectionReason: { type: String },
  }],
  verificationStatus: { type: String, enum: ['unverified', 'pending', 'verified', 'rejected'], default: 'unverified' },
  selfExclusion: {
    isActive: { type: Boolean, default: false },
    reason: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    type: { type: String, enum: ['temporary', 'permanent'] },
  },
  stats: {
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    totalBets: { type: Number, default: 0 },
  },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User; 