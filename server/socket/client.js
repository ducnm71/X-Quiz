const {io} = require('../bin/www')

io.emit('connection', () => {
    console.log('Connect to server');
    process.stdin.on('joinRoom', (playerName) => {
        client.write(playerName)
    })
})

client.on('updatePlayers', (player) =>{
    console.log(player);
})

client.emit('joinRoom', (playerName) => {
    console.log(playerName);
})

client.emit('leaveRoom', (playerName) => {
    console.log('a player is out', playerName);
});