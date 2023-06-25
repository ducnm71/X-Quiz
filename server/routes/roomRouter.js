const express = require('express')
const router = express.Router()

const {createRoom, getPin,getRoom} = require ('../controllers/roomController.js')
const {protect} = require('../middleware/authMiddleware.js')

router.post('/createroom/:id',createRoom)
router.get('/getpin/:id', getPin)
router.get('/getroom/:userid', getRoom)

module.exports = router