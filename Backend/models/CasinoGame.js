import mongoose from 'mongoose';

const CasinoGameSchema = new mongoose.Schema({
  id: Number,
  name: String,
  casino_game_id: String,
  casino_category_id: Number,
  casino_provider_id: Number,
  thumbnail_url: String,
  mobile_thumbnail_url: String,
  is_active: Boolean,
  is_featured: Boolean,
  description: String,
  has_freespins: Boolean,
  restrictions: mongoose.Schema.Types.Mixed,
  devices: mongoose.Schema.Types.Mixed,
  return_to_player: mongoose.Schema.Types.Mixed,
  wagering_contribution: Number,
  more_details: mongoose.Schema.Types.Mixed
});

export default mongoose.model('CasinoGame', CasinoGameSchema, 'casino_games'); 