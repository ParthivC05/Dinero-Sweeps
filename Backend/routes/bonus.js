import express from 'express';
import jwtAuth from '../middleware/jwtAuth.js';
import { redeemBonus } from '../controllers/bonusController.js';

const router = express.Router();
router.post('/redeem', jwtAuth, redeemBonus);

export default router; 