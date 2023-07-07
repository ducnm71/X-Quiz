const express = require('express')
const router = express.Router()

const {joinRoom, play, leave} = require('../controllers/playerController')

router.post('/joinroom/:pin', joinRoom)
router.put('/play/:id', play)
router.delete('/:playerId/:roomId', leave)

module.exports = router