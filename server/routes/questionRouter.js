const express = require('express');
const router = express.Router();

const { addQuestion, getQuestions, deleteQuestion } = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/addquestion/:id',addQuestion);
router.get('/getques/:id', getQuestions);
router.delete('/delques/:quesId/:roomId', deleteQuestion)

module.exports = router;
