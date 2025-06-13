import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfileForm({ onSubmitSuccess }) {
  const [employee, setEmployee] = useState({});
  const [repos, setRepos] = useState([]);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/me')
      .then(res => setEmployee(res.data));
  }, []);

  const onDrop = useCallback(files => setResume(files[0]), []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append('resume', resume);
    fd.append('repos', JSON.stringify(repos));
    await axios.post('http://localhost:5000/api/profile', fd);
    onSubmitSuccess();
  };

  return (
    <Box maxWidth="md" mx="auto" mt={2}>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Employee Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="Name" value={employee.name || ''} fullWidth InputProps={{ readOnly: true }} />
            <TextField label="Email" value={employee.email || ''} fullWidth sx={{ mt: 2 }} InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Employee ID" value={employee.id || ''} fullWidth InputProps={{ readOnly: true }} />
            <TextField label="Location" value={employee.location || ''} fullWidth sx={{ mt: 2 }} InputProps={{ readOnly: true }} />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6">GitHub Repositories</Typography>
        <MuiChipsInput value={repos} onChange={setRepos} fullWidth />
      </Paper>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6">Upload Resume</Typography>
        <Box {...getRootProps()} sx={{ border: '2px dashed gray', p: 4, textAlign: 'center' }}>
          <input {...getInputProps()} />
          <Typography>{resume ? resume.name : 'Drag & drop resume here'}</Typography>
        </Box>
      </Paper>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" onClick={handleSubmit}>Save / Submit</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
