import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ onLogin }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', data);
      localStorage.setItem('token', res.data.token);
      onLogin();
      navigate('/profile');
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Email" fullWidth margin="normal" {...register('email')} />
          <TextField label="Password" type="password" fullWidth margin="normal" {...register('password')} />
          <Button type="submit" fullWidth variant="contained">Login</Button>
        </form>
      </Paper>
    </Box>
  );
}
