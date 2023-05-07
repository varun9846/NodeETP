const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const { method, url: requestUrl } = req;
  const { pathname, query } = url.parse(requestUrl);

  if (method === 'GET' && pathname === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Search Page</title></head>');
    res.write('<body>');
    res.write('<h1>Search Page</h1>');
    res.write('<form action="/search" method="post">');
    res.write('<label for="searchQuery">Search Query:</label>');
    res.write('<input type="text" name="searchQuery" id="searchQuery">');
    res.write('<button type="submit">Search</button>');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  if (method === 'POST' && pathname === '/search') {
    let requestBody = '';

    req.on('data', (chunk) => {
      requestBody += chunk.toString();
    });

    req.on('end', () => {
      const { searchQuery } = querystring.parse(requestBody);

      // Perform search operation on the given set of values here...
      const searchResults = performSearch(searchQuery);

      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<head><title>Search Results</title></head>');
      res.write('<body>');
      res.write(`<h1>Search Results for "${searchQuery}"</h1>`);
      res.write('<ul>');

      // Output search results as list items
      searchResults.forEach((result) => {
        res.write(`<li>${result}</li>`);
      });

      res.write('</ul>');
      res.write('</body>');
      res.write('</html>');
      return res.end();
    });
  }

  // Handle 404 Not Found errors
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.write('404 Not Found');
  res.end();
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

function performSearch(searchQuery) {
  // Perform search operation on the given set of values and return the results
  const results = ['Result 1', 'Result 2', 'Result 3'];
  return results;
}
