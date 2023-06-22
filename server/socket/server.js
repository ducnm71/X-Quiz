const {io} = require('../app')
const roomModel = require('../models/roomModel')
const playerModel = require('../models/playerModel')




const socketApi = () => {
  io.on('connection', function(socket) {
    console.log('A client connected');
  
    // Xử lý sự kiện khi nhập mã PIN và tên người chơi
    socket.on('join', async({pin, name}) => {
      try{
          
          const checkRoom = await roomModel.findOne({pin: pin}).populate('players')
          
          if (!checkRoom) {
            socket.emit('roomNotFound')
          } else {
                const checkExist = checkRoom.players.find(players => players.name === name)
                if (checkExist){
                    socket.emit('existed')
                } else{

                    socket.join(pin)
                    const newPlayer = await playerModel.create({ name});
                    if (newPlayer) {
                        checkRoom.players.push(newPlayer._id);
                        newPlayer.roomId = checkRoom._id;
                        await checkRoom.save();
                        await newPlayer.save();
                      
                        const players = await playerModel.find({roomId: checkRoom._id})
                        io.to(pin).emit('updatePlayers', players)
                    }
                }
            }
        } catch (err) {
            console.error(err)
        }
    })
    
    let intervalId;
    let questionIndex = 0;
    let roomPin = '';
                                            
    const sendQuestion = async () =>{
        const room = await roomModel.findOne({pin: roomPin}).populate('questions')
        const questions = room.questions
        if (questionIndex < questions.length) {
            const question = questions[questionIndex];
            socket.emit('question', question);
            questionIndex++;
        } else {
            clearInterval(intervalId);
        }
    }
                                            
    socket.on('startQuiz', (pin) => {
        roomPin = pin;
        questionIndex = 0;
        sendQuestion();
        intervalId = setInterval(sendQuestion, 3000)
    });
                                            
    socket.on('stopQuiz', () => {
        clearInterval(intervalId);
    });
                                
                                
    // Xử lý sự kiện khi một người chơi ngắt kết nối
    socket.on('disconnect', function() {
      console.log('A client disconnected');
      clearInterval(intervalId)
    });
  });
}

module.exports = socketApi