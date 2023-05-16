const express = require('express');
const router = express.Router();

const { addQuestion, getQuestions } = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addQuestion);
router.get('/', getQuestions);

module.exports = router;
