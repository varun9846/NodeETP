const http = require('http');
const qs = require('querystring');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // serve the HTML form for inputting values
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <html>
        <head>
          <title>Sort Values</title>
        </head>
        <body>
          <form method="POST">
            <label for="values">Enter values:</label><br>
            <input type="text" id="values" name="values"><br>
            <button type="submit">Sort</button>
          </form>
        </body>
      </html>
    `);
    res.end();
  } else if (req.method === 'POST') {
    // read the posted data from the request body
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // once all data has been read, parse the values and sort them
    req.on('end', () => {
      const values = qs.parse(body).values.split(',');
      values.sort();

      // send the sorted values as the response
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(`Sorted values: ${values.join(', ')}`);
      res.end();
    });
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
// create a node js web server application with
//  the http module to perform sort Operations on a given set of values .
//  Accept a series of values from the input text fields of client page
//  and provide the output values as response with click event on a button