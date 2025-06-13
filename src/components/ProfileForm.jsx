
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function ProfileForm() {
  const [employee, setEmployee] = useState({ name: '', email: '' });
  const [resume, setResume] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/me')
      .then(res => setEmployee(res.data))
      .catch(console.error);
  }, []);

  const onDrop = useCallback(files => setResume(files[0]), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, multiple: false,
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc', '.docx'] }
  });

  const handleSubmit = async () => {
    const fd = new FormData();
    if (resume) fd.append('resume', resume);
    fd.append('repos', JSON.stringify(repos));

    await axios.post('http://localhost:5000/api/profile', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert('Profile submitted!');
  };

  return (
    <Box maxWidth={600} mx="auto" mt={2}>
      {/* Employee Info */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>Employee Info</Typography>
        <TextField label="Name" value={employee.name} fullWidth margin="normal" InputProps={{ readOnly: true }} />
        <TextField label="Email" value={employee.email} fullWidth margin="normal" InputProps={{ readOnly: true }} />
      </Paper>

      {/* Resume Upload */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>Upload Resume</Typography>
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed grey',
            p: 4,
            textAlign: 'center',
            bgcolor: isDragActive ? '#eee' : '#fafafa'
          }}
        >
          <input {...getInputProps()} />
          <Typography>
            {resume ? resume.name : 'Drag & drop your resume (PDF/DOC)'}
          </Typography>
        </Box>
      </Paper>

      {/* GitHub Repos */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>GitHub Repositories</Typography>
        <MuiChipsInput value={repos} onChange={setRepos} fullWidth placeholder="repo-name" />
      </Paper>

      <Button variant="contained" fullWidth onClick={handleSubmit}>Save / Submit</Button>
    </Box>
  );
}
