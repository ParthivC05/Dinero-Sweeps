import express from 'express';
import CasinoGame from '../models/CasinoGame.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const games = await CasinoGame.find({ is_active: true }).lean();
    res.json({ success: true, games });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/launch', async (req, res) => {
  const { gameId, mode } = req.body;
  try {
    const game = await CasinoGame.findOne({ casino_game_id: gameId, is_active: true }).lean();
  if (!game) return res.status(404).json({ error: 'Game not found' });
  const moreDetails = game.more_details || {};
    let launchUrl = null;
    if (mode === 'fun') {
      launchUrl = moreDetails.demo_url || moreDetails.demoUrl || null;
    } else if (mode === 'real') {
      launchUrl = moreDetails.real_url || moreDetails.realUrl || null;
    }
    if (!launchUrl) return res.status(404).json({ error: 'Launch URL not found for this mode' });
  res.json({ url: launchUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 