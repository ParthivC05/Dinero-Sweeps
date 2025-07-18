import axios from 'axios';
import config from '../config/provider.config'; 

const provider = {
  async createDemoSession({ game }) {
    if (game.more_details?.demo_url) return game.more_details.demo_url;

    try {
      const response = await axios.post(`${config.baseUrl}/api/demo`, { gameId: game.casino_game_id });
      return response.data.url;

      return `https://provider.com/demo/${game.casino_game_id}`;
    } catch (error) {
      throw new Error('Failed to create demo session');
    }
  },

  async createRealSession({ userId, game }) {
    try {
      const response = await axios.post(`${config.baseUrl}/api/real`, { userId, gameId: game.casino_game_id });
      return response.data.url;

      return `https://provider.com/real/${game.casino_game_id}?user=${userId}`;
    } catch (error) {
      throw new Error('Failed to create real session');
    }
  }
};

export default provider;