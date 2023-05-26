const mongoose = require('mongoose');
const schema = mongoose.Schema;

const playerSchema = new schema({
  name: { type: String, required: true },
  pin: {type: String},
  roomId: {type: mongoose.Schema.Types.ObjectId, ref:'Room'},
  correctAnswers: {type: Number}
});

const Player = mongoose.model('Player', playerSchema)

module.exports = Player
