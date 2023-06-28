const { io } = require('../app');
const roomModel = require('../models/roomModel');
const playerModel = require('../models/playerModel');

const socketApi = () => {
  io.on('connection', function (socket) {
    console.log('A client connected');

    let intervalId;
    let questionIndex;
    let roomPin = '';

    socket.on('getroom', async (pin) => {
      socket.join(pin);
      const room = await roomModel.findOne({ pin: pin }).populate('players');
      socket.emit('updatePlayers', room.players);
    });
    socket.on('startQuiz', (pin) => {
      roomPin = pin;
      questionIndex = 0;
      sendQuestion();
      intervalId = setInterval(sendQuestion, 7000);
    });
    const sendQuestion = async () => {
      const room = await roomModel.findOne({ pin: roomPin }).populate('questions');
      const questions = room.questions;
      if (questionIndex < questions.length) {
        const question = questions[questionIndex];
        io.to(roomPin).emit('question', question, questionIndex);
        //console.log(questionIndex);
        questionIndex++;
      } else {
        clearInterval(intervalId);
        scoreTable();
      }
    };
    // Xử lý sự kiện khi nhập mã PIN và tên người chơi
    socket.on('join', async ({ pin, name }) => {
      try {
        const checkRoom = await roomModel.findOne({ pin: pin }).populate('players');

        if (!checkRoom) {
          socket.emit('roomNotFound');
        } else {
          const checkExist = checkRoom.players.find((players) => players.name === name);
          if (checkExist) {
            socket.emit('existed');
          } else {
            //socket.emit('joined', { pin, name });
            socket.join(pin);
            const newPlayer = await playerModel.create({ name });
            if (newPlayer) {
              checkRoom.players.push(newPlayer._id);
              newPlayer.roomId = checkRoom._id;
              await checkRoom.save();
              await newPlayer.save();

              const players = await playerModel.find({ roomId: checkRoom._id });
              io.to(pin).emit('updatePlayers', players);

              socket.on('leave', async () => {
                socket.leave(pin);
                const player = await playerModel.findByIdAndDelete(newPlayer._id);
                console.log(player.name + ' lelf');
                checkRoom.players = checkRoom.players.filter((player) => player._id !== newPlayer._id);
                await checkRoom.save();
                const players = await playerModel.find({ roomId: checkRoom._id });
                io.to(pin).emit('updatePlayers', players);
              });
              socket.on('answer', async ({ selectedAnswerIndex, qi }) => {
                const room = await roomModel.findOne({ pin: pin }).populate('questions');
                const questions = room.questions;
                if (qi >= 0 && qi <= questions.length) {
                  const currentQuestion = questions[qi];
                  const correctAnswer = currentQuestion.correctAnswer;

                  if (selectedAnswerIndex === currentQuestion.options[correctAnswer]) {
                    newPlayer.score += 10;
                    io.to(pin).emit('answerResult', { isCorrect: true, score: newPlayer.score });
                  } else {
                    io.to(pin).emit('answerResult', { isCorrect: false, score: newPlayer.score });
                  }
                }

                await newPlayer.save();
              });
            }

            await newPlayer.save();
          }
        }
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('stopQuiz', () => {
      clearInterval(intervalId);
      scoreTable();
    });

    const scoreTable = async () => {
      const result = await roomModel.findOne({ pin: roomPin }).populate('players');
      const score = result.players.map((player) => {
        return { name: player.name, score: player.score };
      });
      io.to(roomPin).emit('score', score);
    };

    // Xử lý sự kiện khi một người chơi ngắt kết nối
    socket.on('clientDisconnect', function () {
      console.log('A client disconnected');
      socket.leave(roomPin);
      clearInterval(intervalId);
    });
  });
};

module.exports = socketApi;
