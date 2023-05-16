const asyncHandler = require('express-async-handler');

const questionSchema = require('../models/questionModel');

const addQuestion = asyncHandler(async (req, res) => {
  const { title, description, options, correctAnswer } = req.body;
  const questionExists = await questionSchema.findOne({ title });
  if (questionExists) {
    res.status(400);
    throw new Error('Question already exists');
  }
  const newQuestion = await questionSchema.create({user:req.user._id, title, description, options, correctAnswer });
  if (newQuestion) {
    res.status(201).json({
      _id: newQuestion._id,
      title: newQuestion.title,
      description: newQuestion.description,
      options: newQuestion.options,
      correctAnswer: newQuestion.correctAnswer,
    });
  } else {
    res.status(400);
    throw new Error('Invalid input data');
  }
});

const getQuestions = asyncHandler(async (req, res) => {
  const questions = await questionSchema.find({})
  res.json(questions)
})

module.exports = { addQuestion, getQuestions };
