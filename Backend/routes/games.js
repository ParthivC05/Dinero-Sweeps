import express from 'express';
import { sqlDb } from '../server.js';
import provider from '../services/provider.js'; 
import ensureAuthenticated from '../middleware/ensureAuthenticated.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await sqlDb.query('SELECT * FROM casino_games LIMIT 12');
    res.json({ success: true, games: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/launch', (req, res, next) => {
  if (req.body.mode === 'real') {
    return ensureAuthenticated(req, res, next);
  }
  next();
}, async (req, res) => {
  const { gameId, mode } = req.body; 
  const userId = req.user?.id; 

  const { rows } = await sqlDb.query('SELECT * FROM casino_games WHERE casino_game_id = $1', [gameId]);
  const game = rows[0];
  if (!game) return res.status(404).json({ error: 'Game not found' });

  let launchUrl;
  try {
    if (mode === 'real') {
      launchUrl = await provider.createRealSession({ userId, game });
    } else {
      const moreDetails = game.more_details || {};
      launchUrl = moreDetails.demo_url || (await provider.createDemoSession({ game }));
    }
    res.json({ url: launchUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to launch game' });
  }
});

export default router; 