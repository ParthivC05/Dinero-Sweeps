import express from 'express';
import multer from 'multer';
import path from 'path';
import { getProfile, updateProfile, uploadAvatar, uploadVerificationDoc, setSelfExclusion, changePassword } from '../controllers/userController.js';
import jwtAuth from '../middleware/jwtAuth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });
const docUpload = multer({ dest: 'uploads/verification/' });

router.get('/me', jwtAuth, getProfile);
router.patch('/me', jwtAuth, updateProfile);
router.post('/me/avatar', jwtAuth, upload.single('avatar'), uploadAvatar);
router.post('/me/verify', jwtAuth, docUpload.single('document'), uploadVerificationDoc);
router.post('/me/self-exclusion', jwtAuth, setSelfExclusion);
router.post('/me/change-password', jwtAuth, changePassword);

export default router; 