import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5">Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
          <Link href="/register" variant="body2">Don't have an account? Register</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;