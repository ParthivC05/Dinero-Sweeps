import express from 'express';
import { sqlDb } from '../server.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await sqlDb.query('SELECT * FROM casino_games LIMIT 12');
    res.json({ success: true, games: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/launch', async (req, res) => {
  const { gameId } = req.body;
  const { rows } = await sqlDb.query('SELECT * FROM casino_games WHERE casino_game_id = $1', [gameId]);
  const game = rows[0];
  if (!game) return res.status(404).json({ error: 'Game not found' });

  const moreDetails = game.more_details || {};
  const launchUrl = moreDetails.demo_url;
  if (!launchUrl) return res.status(404).json({ error: 'Demo URL not found' });
  res.json({ url: launchUrl });
});

export default router; 