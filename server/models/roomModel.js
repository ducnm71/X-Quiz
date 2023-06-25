const mongoose = require('mongoose');
const schema = mongoose.Schema;

const roomSchem = new schema({
  name: { type: String, require: true },
  pin: { type: String, require: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  userId: {type: mongoose.Schema.Types.ObjectId, require: true}
});

const Room = mongoose.model('Room', roomSchem);

module.exports = Room;
