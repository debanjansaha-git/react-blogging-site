const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/posts', (req, res) => {
  res.json([{ id: 1, title: 'Test Post', content: 'This is a test.' }]);
});

app.listen(3002, () => {
  console.log('Server running on http://localhost:3002');
});
