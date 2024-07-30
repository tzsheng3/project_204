const express = require('express');
const app = express();

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

app.post('/api/register', (req, res) => {
  // handle registration logic here
  res.json({ success: true }); // or res.json({ success: false });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});