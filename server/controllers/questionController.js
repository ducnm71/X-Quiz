const asyncHandler = require('express-async-handler');

const questionSchema = require('../models/questionModel');
const roomModel = require('../models/roomModel');

const checkQues = (arr, input) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title === input) {
      return true;
    }
  }
  return false;
};

const addQuestion = asyncHandler(async (req, res) => {
  const { title, description, options, correctAnswer } = req.body;
  const roomId = req.params.id;
  const checkRoom = await roomModel.findById(roomId).populate('questions');
  const check = checkQues(checkRoom.questions, title);

  if (check) {
    res.status(400);
    throw new Error('Question already exists');
  } else {
    const newQuestion = await questionSchema.create({ title, description, options, correctAnswer });
    if (newQuestion) {
      checkRoom.questions.push(newQuestion._id);
      await checkRoom.save();
      res.status(201).json(newQuestion);
    } else {
      res.status(400);
      throw new Error('Invalid input data');
    }
  }
});

const getQuestions = asyncHandler(async (req, res) => {
  const checkRoom = await roomModel.findById(req.params.id).populate('questions');
  if (checkRoom) {
    const questions = checkRoom.questions;
    res.status(200).json(questions);
  } else {
    res.status(404);
    throw new Error('failed');
  }
});

const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await questionSchema.findByIdAndDelete(req.params.quesId);
  const room = await roomModel.findById(req.params.roomId);
  room.questions = room.questions.filter((id) => id != req.params.quesId);

  await room.save();

  if (room.questions) {
    res.status(201).json(room.questions);
  } else {
    res.status(401);
    throw new Error('Delete failed!');
  }
});

module.exports = { addQuestion, getQuestions, deleteQuestion };
