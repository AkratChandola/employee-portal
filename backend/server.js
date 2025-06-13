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

const path = require('path');

app.post('/api/profile', upload.single('resume'), async (req, res) => {
  try {
    const { repos } = req.body;
    const originalPath = req.file.path; 
    const fileExt = path.extname(req.file.originalname); 

    const newFilename = `${user.id}_${user.name.replace(/\s+/g, '_')}${fileExt}`;
    const newPath = path.join('uploads', newFilename);

    fs.renameSync(originalPath, newPath);

    const resumeBuffer = fs.readFileSync(newPath);
    const parsed = await pdfParse(resumeBuffer);
    console.log('Parsed Resume Text:', parsed.text);

    res.json({
      message: 'Resume uploaded and renamed',
      fileName: newFilename,
      parsedText: parsed.text,
      repos: JSON.parse(repos)
    });
  } catch (err) {
    console.error('Error uploading/resuming file:', err);
    res.status(500).json({ error: 'Failed to handle resume file' });
  }
});


app.listen(5000, () => console.log('Backend running on port 5000'));
