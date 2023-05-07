const http = require('http');
const fs = require('fs');

// Create server
const server = http.createServer((req, res) => {
  // Handle GET request
  if (req.method === 'GET') {
    // Serve source.txt file
    if (req.url === '/source.txt') {
      fs.readFile('source.txt', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error reading file');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(data);
        }
      });
    }
    // Serve duplicate.txt file
    else if (req.url === '/duplicate.txt') {
      fs.copyFile('original.txt', 'duplicate.txt', (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error copying file');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('File copied successfully');
        }
      });
    }
    // Serve 404 error for all other requests
    else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  }
});

// Start server
server.listen(3000, () => {
  console.log('Server running on port 3000');
});


//  include http module to create a server application 
// and use the fs module to duplicate the origina.txt as the duplicate.txt file in the server 
// with client(user ) request from the browser. create a source.txt and 
// add personal information (name,city,state) in the server system for duplication