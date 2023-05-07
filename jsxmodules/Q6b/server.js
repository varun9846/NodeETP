http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);
  const { number } = querystring.parse(query);

  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <html>
        <head>
          <title>Sum of Digits Calculator</title>
        </head>
        <body>
          <h1>Sum of Digits Calculator</h1>
          <form action="/calculate" method="get">
            <label for="number">Enter a number:</label>
            <input type="text" id="number" name="number" required>
            <button type="submit">Calculate</button>
          </form>
        </body>
      </html>
    `);
    res.end();
  } else if (pathname === '/calculate') {
    const sum = number.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(`The sum of digits of ${number} is ${sum}`);
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// // Q6b create a Node JS web server application with 
// the http module for computing the sum of digits of a given number. 
// accept the number from an input text field of the client page 
// and provide the output value as the response with the click event on a Button