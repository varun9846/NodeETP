const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Serve the HTML file with the input fields and button
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else if (req.url === '/convert') {
    // Handle the conversion request
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const temp = parseFloat(params.get('temp'));
      const unit = params.get('unit');
      let result;
      if (unit === 'C') {
        result = (temp * 9/5) + 32;
      } else if (unit === 'F') {
        result = (temp - 32) * 5/9;
      }
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(result.toString());
    });
  } else {
    // Serve 404 page for other requests
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
// Q8b create a node js web server application 
// with the http module for conversion between celcius and fahrenheit.accept 
// temperature values from the input text fields of client 
// page and provide the output values as a response with click event on a button