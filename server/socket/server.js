const {io} = require('../app')
const roomModel = require('../models/roomModel')
const playerModel = require('../models/playerModel')




const socketApi = () => {
  io.on('connection', function(socket) {
    console.log('A client connected');
  
    // Xử lý sự kiện khi nhập mã PIN và tên người chơi
    socket.on('join', async({pin, name}) => {
      try{
          
          const checkRoom = await roomModel.findOne({pin: pin})
          
          if (!checkRoom) {
            socket.emit('roomNotFound')
          } else {

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
        } catch (err) {
            console.error(err)
        }
    })
    
    let intervalId;
    let questionIndex = 0;
                                            
    // const sendQuestion = (questions) =>{
    //     if (questionIndex < questions.length) {
    //         const question = questions[questionIndex];
    //         socket.emit('question', question);
    //         questionIndex++;
    //     } else {
    //         clearInterval(intervalId);
    //     }
    // }
                                            
    socket.on('startQuiz',async (pin) => {
        const room = await roomModel.findOne({pin: pin}).populate('questions')
        const questions = room.questions
        questionIndex = 0;
        // sendQuestion(questions);
        intervalId = setInterval(() => {
            if (questionIndex < questions.length) {
                const question = questions[questionIndex];
                socket.emit('question', question);
                questionIndex++;
            } else {
                clearInterval(intervalId);
            }
        }, 1000);
    });
                                            
    socket.on('stopQuiz', () => {
        clearInterval(intervalId);
    });
                                
                                
    // Xử lý sự kiện khi một người chơi ngắt kết nối
    socket.on('disconnect', function() {
      console.log('A client disconnected');
    });
  });
}

module.exports = socketApi