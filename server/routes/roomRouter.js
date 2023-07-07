const express = require('express');
const router = express.Router();

const { createRoom, getPin, getRoom, deleteRoom } = require('../controllers/roomController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.get('/getpin/:id', getPin);
router.get('/getroom/:userid', getRoom);
router.post('/createroom/:id', createRoom);
router.delete('/:idroom', deleteRoom);

module.exports = router;
