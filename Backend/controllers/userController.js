import User from '../models/User.js';
import fs from 'fs';

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const updates = req.body;
  delete updates.password;
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select('-password');
  res.json(user);
};

export const uploadAvatar = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const user = await User.findById(req.user._id);
  if (user.avatar) fs.unlink(user.avatar, () => {});
  user.avatar = req.file.path;
  await user.save();
  res.json({ avatar: user.avatar });
};

export const uploadVerificationDoc = async (req, res) => {
  if (!req.file || !req.body.type) return res.status(400).json({ error: 'File and type required' });
  const user = await User.findById(req.user._id);
  user.verificationDocs.push({ type: req.body.type, url: req.file.path });
  user.verificationStatus = 'pending';
  await user.save();
  res.json({ verificationDocs: user.verificationDocs });
};

export const setSelfExclusion = async (req, res) => {
  const { isActive, reason, startDate, endDate, type } = req.body;
  const user = await User.findById(req.user._id);
  user.selfExclusion = { isActive, reason, startDate, endDate, type };
  await user.save();
  res.json({ selfExclusion: user.selfExclusion });
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  if (!await user.comparePassword(oldPassword)) return res.status(400).json({ error: 'Old password incorrect' });
  user.password = newPassword;
  await user.save();
  res.json({ success: true });
}; 