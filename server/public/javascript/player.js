var socket = io()

// Listen for player list updates
socket.on('playerList', function(playerList) {
  updatePlayerList(playerList);
});

// Handle form submission
document.getElementById('joinForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var playerName = document.getElementById('playerName').value;
  socket.emit('joinRoom', playerName);
});

// Update the player list in the DOM
function updatePlayerList(playerList) {
  var playerListElement = document.getElementById('playerList');
  playerListElement.innerHTML = '';

  playerList.forEach(function(player) {
    var playerItem = document.createElement('li');
    playerItem.innerText = player;
    playerListElement.appendChild(playerItem);
  });
}