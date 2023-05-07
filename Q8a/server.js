const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Define a route to handle incoming requests from clients
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Listen for incoming connections from clients
io.on('connection', (socket) => {
  console.log('A client has connected');

  // Display student details in the server console
  console.log('Student name: Varun Sharma');
  console.log('Student ID: 12019846');
  console.log('Student program: Computer Science');

  // Send a series of even numbers to the client every 2 seconds
  let i = 0;
  const intervalId = setInterval(() => {
    i += 2;
    socket.emit('evenNumber', i);
  }, 2000);

  // Listen for disconnection events from the client
  socket.on('disconnect', () => {
    console.log('A client has disconnected');

    // Stop sending even numbers to the client
    clearInterval(intervalId);

    // Display a thank you message in the server console
    console.log('Thank you for using our service!');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
// Q8 a implement a client-server application with the express ,http and socket io modules
//  to display the student (your) details in the server console after getting a request (connection)
// from a client . Then trigger events from the server to display a series of even numbers after 
// every 2 seconds  on the client web page . Finally display thank you in the server console with
//  termination of connect from the client