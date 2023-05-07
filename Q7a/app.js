const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse incoming form data
app.use(express.urlencoded({ extended: true }));

// Define a route for the form page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/form.html');
});

// Define a route to handle form submissions
app.post('/submit', (req, res) => {
  const { name, regNo, rollNo, mobile, email } = req.body;

  // Check that all fields are not empty
  if (!name || !regNo || !rollNo || !mobile || !email) {
    return res.send('All fields are required');
  }

  // Check that registration number and roll number have digits only
  if (!/^\d+$/.test(regNo) || !/^\d+$/.test(rollNo)) {
    return res.send('Registration number and roll number must have digits only');
  }

  // Check that student name does not have any digit
  if (/\d/.test(name)) {
    return res.send('Student name must not have any digit');
  }

  // Check that all fields have at least 5 characters
  if (name.length < 5 || regNo.length < 5 || rollNo.length < 5 || mobile.length < 5 || email.length < 5) {
    return res.send('All fields must have at least 5 characters');
  }

  // If all validations pass, show a success message
  res.send('Form submitted successfully');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// Q7a  create an express 
// application to accept student name ,reg number 
// , roll number , mobile number and mail id from input text fields of a client page
//  and perform a chain of validations on the data in the server application.
//  check all the fields are not empty, minimum and maximum lengths of data.
//  add a submit button on the client 
// web page to submit the data and display the warning messages if required.