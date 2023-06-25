const express = require('express');
const router = express.Router();

const { addQuestion, getQuestions } = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/addquestion/:id',addQuestion);
router.get('/getques/:id', getQuestions);

module.exports = router;
