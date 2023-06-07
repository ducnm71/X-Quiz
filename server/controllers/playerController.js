const asyncHandler = require('express-async-handler')
const roomModel = require('../models/roomModel')
const playerModel = require('../models/playerModel')

const app = require('../app')
const http = require('http').Server(app)
const io = require('socket.io')(http)


const joinRoom = () => {

  io.on('connection', (socket) => {
    socket.on('join', asyncHandler(async(req, res) => {
      const pin = req.params.pin
      const {name} = req.body
      const checkRoom = await roomModel.findOne({pin: pin}).populate('players')
      if(!checkRoom) {
          res.status(401)
          throw new Error('Room not found!')
      }
  
      const newPlayer = await playerModel.create({name})
      if(newPlayer){
          checkRoom.players.push(newPlayer._id)
          newPlayer.roomId = checkRoom._id
          await checkRoom.save()
          await newPlayer.save()
        }
  
      await playerModel.find({roomId: checkRoom._id}, (err, players) => {
        if (err) {
          throw new Error(`${err}`)
        }
        socket.broadcast.to(checkRoom._id).emit('player joined', {
          players: players.map(player => player.name)
        })
        socket.emit('players', {
          players: players.map(player => player.name)
        })
  
      })
      socket.join(checkRoom._id)
  }))
  })
}

 

module.exports = {joinRoom}