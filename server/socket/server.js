const {io} = require('../app')


// Player list management
let players = {};
      
// function addPlayer(playerName) {
//   players.push(playerName);
// }

// function removePlayer(playerName) {
//   var index = players.indexOf(playerName);
//   if (index !== -1) {
//     players.splice(index, 1);
//   }
// }

// function getPlayerList() {
//   return players;
// }

const socketApi = () => {
  io.on('connection', function(socket) {
    console.log('A client connected');
  
    // Xử lý sự kiện khi nhập mã PIN và tên người chơi
    socket.on('join', function(data) {
      const room = data.room;
      const playerName = data.playerName;
  
      // Kiểm tra xem phòng có tồn tại không
      if (!players[room]) {
        players[room] = [];
      }
  
      // Kiểm tra xem tên người chơi đã tồn tại trong phòng chưa
      if (players[room].includes(playerName)) {
        socket.emit('joinError', 'Tên người chơi đã tồn tại trong phòng');
        console.log('Tên người chơi đã tồn tại trong phòng');
        return;
      }
  
      // Thêm người chơi vào danh sách và gửi thông báo cho tất cả các client trong phòng
      players[room].push(playerName);
      socket.join(room);
      io.to(room).emit('updatePlayers', players[room]);
      socket.emit('joinSuccess');
      console.log(`${playerName} has joined in ${room}`);
    });
  
    // Xử lý sự kiện khi một người chơi rời khỏi phòng
    socket.on('leave', function(room, playerName) {
      // Kiểm tra xem phòng có tồn tại không
      if (!players[room]) {
        return;
      }
  
      // Xóa người chơi khỏi danh sách và gửi thông báo cho tất cả các client trong phòng
      var index = players[room].indexOf(playerName);
      if (index !== -1) {
        players[room].splice(index, 1);
      }
      socket.leave(room);
      io.to(room).emit('updatePlayers', players[room]);
    });
  
    // Xử lý sự kiện khi một người chơi ngắt kết nối
    socket.on('disconnect', function() {
      console.log('A client disconnected');
    });
  });
}

module.exports = socketApi