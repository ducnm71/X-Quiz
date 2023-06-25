const {io} = require('../app')
const roomModel = require('../models/roomModel')
const playerModel = require('../models/playerModel')




const socketApi = () => {
  io.on('connection', function(socket) {
    console.log('A client connected');
    let playerId
    let intervalId;
    let questionIndex;
    let roomPin = '';
    
    socket.on('getroom', async(pin) => {
      socket.join(pin)
      const room = await roomModel.findOne({pin: pin}).populate('players')
      socket.emit('updatePlayers', room.players)
    })
           
    socket.on('startQuiz', (pin) => {
      roomPin = pin;
      questionIndex = 0;
      sendQuestion();
      intervalId = setInterval(sendQuestion, 5000)
  });
    const sendQuestion = async () =>{
        const room = await roomModel.findOne({pin: roomPin}).populate('questions')
        const questions = room.questions
        if (questionIndex < questions.length) {
            const question = questions[questionIndex];
            io.to(roomPin).emit('question', question);
            console.log(questionIndex);
            questionIndex++;
        } else {
            clearInterval(intervalId);
            scoreTable()
        }
    }
             

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

                        socket.on('answer',async (selectedAnswerIndex) => {
                          const room = await roomModel.findOne({pin: pin}).populate('questions')
                          const questions = room.questions
                          console.log(selectedAnswerIndex);
                          console.log(questionIndex);
                          if (questionIndex > 0 && questionIndex <= questions.length) {
                              const currentQuestion = questions[questionIndex - 1];
                              const correctAnswer = currentQuestion.correctAnswer
                              console.log(currentQuestion.options[correctAnswer]);
                              if (selectedAnswerIndex === currentQuestion.options[correctAnswer]) {
                                newPlayer.score += 10;
                                io.to(pin).emit('answerResult', { isCorrect: true, score: newPlayer.score });
                              } else {
                                io.to(pin).emit('answerResult', { isCorrect: false, score: newPlayer.score });
                              }
                              console.log( newPlayer.score);
                            }
                    
                            await newPlayer.save()
                          });
                    }
                }
            }
        } catch (err) {
            console.error(err)
        }
    })
    
    
    
                                            
    socket.on('stopQuiz', () => {
        clearInterval(intervalId);
        scoreTable()
    });

    const scoreTable = async () => {
        const result = await  roomModel.findOne({pin: roomPin}).populate('players')
        const score = result.players.map((player) => {
            return {name: player.name, score: player.score}
        })
        io.to(roomPin).emit('score', score)
    }

    
    
                                
    // Xử lý sự kiện khi một người chơi ngắt kết nối
    socket.on('disconnect', function() {
      console.log('A client disconnected');
      clearInterval(intervalId)
    });
  });
}

module.exports = socketApi