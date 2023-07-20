const express = require('express');
const router = express.Router();

const { addQuestion, getQuestions, updateQuestion,deleteQuestion } = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/addquestion/:id', addQuestion);
router.get('/getquestion/:id', getQuestions);
router.put('/updatequestion/:id', updateQuestion)
router.delete('/:quesId/:roomId', deleteQuestion);

module.exports = router;
