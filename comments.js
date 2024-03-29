// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Create server
const app = express();

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up comments route
app.get('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred on the server.');
    } else {
      res.send(data);
    }
  });
});

// Set up comments route
app.post('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred on the server.');
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (err) => {
        if (err) {
          res.status(500).send('An error occurred on the server.');
        } else {
          res.send('Comment added successfully!');
        }
      });
    }
  });
});

// Set up port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});