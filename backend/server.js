const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.get('/api/me', (req, res) => {
  res.json({ name: 'Alice Doe', email: 'alice@example.com' });
});

app.post('/api/profile', upload.single('resume'), (req, res) => {
  console.log('Resume:', req.file);
  console.log('Repos:', req.body.repos);
  res.send({ message: 'Profile saved' });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
