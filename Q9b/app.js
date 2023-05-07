const express = require('express');
const app = express();
const fs = require('fs');

// Serve the HTML file with the input field and button
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle the button click event
app.get('/download', (req, res) => {
  const fileName = req.query.fileName; // Get the file name from the query string
  const filePath = __dirname + '/files/' + fileName; // Construct the file path
  res.download(filePath); // Transfer the requested file using the download() function
});

// Create a text file with student information
const students = [
  { regNo: '001', name: 'John Doe', grade: 'A' },
  { regNo: '002', name: 'Jane Smith', grade: 'B' },
  { regNo: '003', name: 'Bob Johnson', grade: 'C' },
  { regNo: '001', name: 'John Doe', grade: 'A' },
  { regNo: '002', name: 'Jane Smith', grade: 'B' },
  { regNo: '003', name: 'Bob Johnson', grade: 'C' }
];
const fileContent = students.map(s => `${s.regNo},${s.name},${s.grade}`).join('\n');
fs.writeFileSync(__dirname + '/files/students.txt', fileContent);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
// Q9BCreate an express application for the following scenario to accept a file name from 
// the input text field of a user web page and transfer the requested file using download () 
// function from the server as a response to the button click event from the user web page.
//  Create a text file and add student information (Reg. No., Name, Grade) in the server system.
