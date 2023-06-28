const express = require('express')
const router = express.Router()

const {joinRoom, play} = require('../controllers/playerController')

router.post('/joinroom/:pin', joinRoom)
router.put('/play/:id', play)

module.exports = router