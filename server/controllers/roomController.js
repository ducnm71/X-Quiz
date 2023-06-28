const asyncHandler = require('express-async-handler');
const roomModel = require('../models/roomModel');
const userModel = require('../models/userModel');
const playerModel = require('../models/playerModel');

const checkZoom = (arr, input) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === input) {
      return true;
    }
  }
  return false;
};

const createRoom = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const userId = req.params.id;
  const checkUser = await userModel.findById(userId).populate('rooms');
  const check = checkZoom(checkUser.rooms, name);

  if (check) {
    res.status(401);
    throw new Error('This zoom has already existed!');
  } else {
    const newRoom = await roomModel.create({ name, userId });
    if (newRoom) {
      checkUser.rooms.push(newRoom._id);
      await checkUser.save();
      res.status(200).json(newRoom);
    } else {
      res.status(400);
      throw new Error('Invalid data of zoom!');
    }
  }
});

const getPin = asyncHandler(async (req, res) => {
  const roomId = req.params.id;
  const checkRoom = await roomModel.findOne({ _id: roomId });
  if (!checkRoom) {
    res.status(401);
    throw new Error('This zoom not found!');
  }

  checkRoom.pin = Math.random().toString(36).substring(2, 8);
  await playerModel.deleteMany({ roomId: checkRoom._id });
  checkRoom.players = [];
  await checkRoom.save();
  res.status(200).json(checkRoom);
});

const getRoom = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userid;
    const result = await roomModel.find({ userId: userId });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
});

const deleteRoom = asyncHandler(async (req, res) => {
  const idroom = req.params.idroom;
  const checkRoom = await roomModel.findByIdAndDelete(idroom);
  if (!checkRoom) {
    res.status(401).json({ msg: 'Delete failed!' });
  }
  res.status(201).json({ msg: 'Delete Successfully!' });
});

module.exports = {
  createRoom,
  getPin,
  getRoom,
  deleteRoom,
};
