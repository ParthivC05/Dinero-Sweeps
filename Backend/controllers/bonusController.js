import BonusCode from '../models/BonusCode.js';
import User from '../models/User.js';

export const redeemBonus = async (req, res) => {
  const { code } = req.body;
  if (!code || !/^[a-zA-Z0-9]{10}$/.test(code)) {
    return res.status(400).json({ error: 'Invalid code format.' });
  }
  const bonus = await BonusCode.findOne({ code });
  if (!bonus) return res.status(404).json({ error: 'Invalid code.' });
  if (bonus.expiresAt < new Date()) return res.status(400).json({ error: 'Code expired.' });

  const user = await User.findById(req.user._id);
  if (user.bonusHistory && user.bonusHistory.some(b => b.code === code)) {
    return res.status(400).json({ error: 'Code already redeemed.' });
  }

  user.bonusHistory = user.bonusHistory || [];
  user.bonusHistory.push({
    code,
    redeemedAt: new Date(),
    rewardType: bonus.rewardType,
    rewardAmount: bonus.rewardAmount
  });
  await user.save();

  bonus.totalRedemptions += 1;
  await bonus.save();

  res.json({
    message: 'Bonus successfully applied!',
    rewardType: bonus.rewardType,
    rewardAmount: bonus.rewardAmount
  });
}; 