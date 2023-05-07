const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // Create a readable stream from the employee.txt file
  const stream = fs.createReadStream('employee.txt', { encoding: 'utf8' });

  // Set the response headers
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Disposition', 'attachment; filename="employee.txt"');

  // Pipe the stream to the response object
  stream.pipe(res);
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
// implement a node js application to create a readable stream 
// with an employee.txt file ( add basic employee details in file ) .
// read the employee details from the above 
// stream and send the data as response to client request from the browser













// // const http = require('http');
// const fs = require('fs');

// const server = http.createServer((req, res) => {
//   // create a readable stream from the employee.txt file
//   const stream = fs.createReadStream('employee.txt', { encoding: 'utf8' });
  
//   // set the response headers
//   res.writeHead(200, { 'Content-Type': 'text/plain' });

//   // pipe the stream to the response object
//   stream.pipe(res);
// });

// server.listen(3000, () => {
//   console.log('Server running at http://localhost:3000');
// });
