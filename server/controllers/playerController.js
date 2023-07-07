const asyncHandler = require('express-async-handler');
const roomModel = require('../models/roomModel');
const playerModel = require('../models/playerModel');
const questionModel = require('../models/questionModel')


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
});

const play = asyncHandler(async(req, res) => {
  const {answer, playerId} = req.body
  const questionId = req.params.id
  const question = await questionModel.findById(questionId)
  const player = await playerModel.findById(playerId)
  const correctAnswer = question.correctAnswer
  if(question.options[correctAnswer] === answer){
    player.score += 10
    await player.save()
    res.json([player, 'Correct answer'])
  }else {
    res.send('Wrong answer')
  }
})

const leave = asyncHandler(async(req, res) => {
  const player = await playerModel.findByIdAndDelete(req.params.playerId)
  console.log(player);
  const checkRoom = await roomModel.findById(req.params.roomId)
  checkRoom.players = checkRoom.players.filter((id) => id != req.params.playerId)
  await checkRoom.save()
  res.status(200).json(checkRoom.players)
})

module.exports = {joinRoom, play, leave};

