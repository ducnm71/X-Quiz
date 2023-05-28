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
  const { title, description, options, answer } = req.body;
  const roomId = req.params.id;
  const checkRoom = await roomModel.findById(roomId).populate('questions');
  const check = checkQues(checkRoom.questions, title);

  if (check) {
    res.status(400);
    throw new Error('Question already exists');
  } else {
    const newQuestion = await questionSchema.create({ title, description, options, answer });
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
  const questions = await questionSchema.find({});
  res.json(questions);
});

const deleteQuestion = asyncHandler(async (req, res) => {
  const result = await questionSchema.findByIdAndDelete(req.params.id);
  if (result) {
    res.status(201).send('Delete Successfully!');
  } else {
    res.status(401);
    throw new Error('Delete failed!');
  }
});

module.exports = { addQuestion, getQuestions, deleteQuestion };
