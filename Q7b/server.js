const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/') {
    // Serve the HTML file with the input form
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (pathname === '/armstrong') {
    // Generate Armstrong numbers up to the given number
    const n = parseInt(query.n);
    const armstrongNumbers = [];

    for (let i = 1; i <= n; i++) {
      let sum = 0;
      let temp = i;
      while (temp > 0) {
        const digit = temp % 10;
        sum += digit ** 3;
        temp = Math.floor(temp / 10);
      }
      if (sum === i) {
        armstrongNumbers.push(i);
      }
    }

    // Send the Armstrong numbers as the response
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(armstrongNumbers));
  } else {
    // Serve a 404 page for any other requests
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});


// Q7b create a node js web server
//  application with http module to produce a series of Armstrong numbers up to a given number
//   .accept a number from input text field of the 
// client page and provide the output values as a response with the click event on button