import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Link, Collapse, Alert } from '@mui/material'; // Importing Alert
import { useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      await axios.post("/api/auth/login", { email, password }, config);
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else if (error.message) {
        setError(error.message);
      }

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        width={isNotMobile ? '60%' : '95%'}
        p="3rem"
        m="3rem auto"
        borderRadius={5}
        boxShadow={3}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography component="h1" variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
          Login
        </Typography>
        {error && (
          <Collapse in={error}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Collapse>
        )}
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { fontSize: '0.9rem' } }}
            InputProps={{ style: { fontSize: '0.9rem' } }}
            sx={{ color: theme.palette.text.primary }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { fontSize: '0.9rem' } }}
            InputProps={{ style: { fontSize: '0.9rem' } }}
            sx={{ color: theme.palette.text.primary }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, fontSize: '0.9rem', padding: '0.75rem', backgroundColor: theme.palette.primary.main }}
          >
            Login
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Link href="/forgot-password" variant="body2" sx={{ fontSize: '0.9rem' }}>
              Forgot password?
            </Link>
            <Link href="/register" variant="body2" sx={{ fontSize: '0.9rem' }}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginScreen;
