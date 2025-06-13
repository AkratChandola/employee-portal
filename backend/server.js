const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Sample User
const user = {
  name: "Akrat Chandola",
  email: "akrat.chandola@infosys.com",
  id: "1337798",
  location: "Pune",
  password: "123456"
};

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === user.email && password === user.password) {
    res.json({ token: 'mock-token' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/me', (req, res) => {
  res.json(user);
});

app.post('/api/profile', upload.single('resume'), async (req, res) => {
  const { repos } = req.body;
  const resumeBuffer = fs.readFileSync(req.file.path);
  const parsed = await pdfParse(resumeBuffer);
  console.log('Parsed Resume Text:', parsed.text);
  res.json({ message: 'Resume uploaded', repos: JSON.parse(repos) });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
