const asyncHandler = require('express-async-handler');
const roomModel = require('../models/roomModel');
const playerModel = require('../models/playerModel');


const joinRoom = asyncHandler(async (req, res) => {
  const pin = req.params.pin;
  const { name } = req.body;
  const checkRoom = await roomModel.findOne({ pin: pin }).populate('players');
  if (!checkRoom) {
    res.status(401);
    throw new Error('Room not found!');
  }

  const newPlayer = await playerModel.create({ name });
  if (newPlayer) {
    checkRoom.players.push(newPlayer._id);
    newPlayer.roomId = checkRoom._id;
    await checkRoom.save();
    await newPlayer.save();
    res.status(200).json(checkRoom);
  } else {
    res.status(400);
    throw new Error('Invalid input data');
  }

    await playerModel.find({pin: pin}).toArray((err, players) => {
        if(err) {
            console.log(err);
            return
        }
        _io.emit('updatePlayer', players)
        return res.send(players)
    })
});


module.exports = {joinRoom};

