const mongoose = require('mongoose');
const schema = mongoose.Schema;

const playerSchema = new schema({
  name: { type: String, required: true },
  pin: {type: String},
  roomId: {type: mongoose.Schema.Types.ObjectId, ref:'Room'},
  answer: {type: Number},
  score: {type: Number, default: 0}
});

const Player = mongoose.model('Player', playerSchema)

module.exports = Player
