import mongoose from 'mongoose';

const BonusCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  rewardType: { type: String, enum: ['GC', 'SC', 'other'], required: true },
  rewardAmount: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
  maxRedemptions: { type: Number, default: 1 },
  totalRedemptions: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('BonusCode', BonusCodeSchema); 