const express = require('express');
const app = express();

// Define a route that accepts two numbers as parameters
app.get('/calculate/:num1/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);

  // Perform arithmetic operations on the two numbers
  const sum = num1 + num2;
  const difference = num1 - num2;
  const product = num1 * num2;
  const quotient = num1 / num2;

  // Send the results as a JSON response
  res.json({ sum, difference, product, quotient });
});

// Serve the client page with a button to trigger the calculation
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Arithmetic Calculator</h1>
        <form action="/calculate/10/5">
          <button type="submit">Calculate</button>
        </form>
        <script>
          const button = document.querySelector('button');
          button.addEventListener('click', async () => {
            const response = await fetch('/calculate/10/5');
            const data = await response.json();
            console.log(data);
          });
        </script>
      </body>
    </html>
  `);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});