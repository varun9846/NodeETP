const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Define a global visitor count variable
let visitorCount = 0;

// Define a route to serve the client-side HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// When a new client connects, increment the visitor count and log the details to the console
io.on('connection', (socket) => {
  visitorCount++;
  console.log(`New client connected! (visitor count: ${visitorCount})`);

  // Broadcast the updated visitor count to all clients if it's odd
  if (visitorCount % 2 === 1) {
    io.emit('oddVisitorCount', visitorCount);
  }

  // When a client disconnects, decrement the visitor count and log the details to the console
  socket.on('disconnect', () => {
    visitorCount--;
    console.log(`Client disconnected! (visitor count: ${visitorCount})`);

    // Broadcast the updated visitor count to all clients if it's odd
    if (visitorCount % 2 === 1) {
      io.emit('oddVisitorCount', visitorCount);
    }
  });
});

// Start the server and listen on port 3000
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Q6a implement a client server application 
// with the express http and socket are you modules
//  to display student(your) details in the server console after
//   getting a request(connection) from a client. then broadcast the only
//  odd visitor count from the server to all clients with the new client connections