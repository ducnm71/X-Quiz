const express = require('express')
const router = express.Router()

const {createZoom, getPin} = require ('../controllers/roomController.js')
const {protect} = require('../middleware/authMiddleware.js')

router.post('/createzoom/:id',createZoom)
router.get('/getpin/:id', getPin)

module.exports = router