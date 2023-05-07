const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);

  if (pathname === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (pathname === '/factorial') {
    const query = url.parse(req.url, true).query;
    const num = parseInt(query.num);

    if (isNaN(num)) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Bad Request');
    } else {
      const factorials = [];
      let factorial = 1;

      for (let i = 1; i <= num; i++) {
        factorial *= i;
        factorials.push(factorial);
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(factorials));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

// Q4 b create a Note JS web server application with
//  http module to find a series of factorial numbers up to a given number accept a number 
//  from input text field of the 
// client page and provide the output values as a response with the click event button