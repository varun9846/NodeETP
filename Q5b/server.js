const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

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
  } else if (pathname === '/fibonacci') {
    const num = parseInt(query.num);

    if (isNaN(num)) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Bad Request');
    } else {
      const fib = fibonacci(num);

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(fib.toString());
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

function fibonacci(num) {
  const fib = [0, 1];

  for (let i = 2; i <= num; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  return fib.slice(0, num + 1);
}

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});