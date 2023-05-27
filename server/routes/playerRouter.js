const express = require('express')
const router = express.Router()

const {joinRoom} = require('../controllers/playerController')

router.post('/joinroom/:pin', joinRoom)

module.exports = router