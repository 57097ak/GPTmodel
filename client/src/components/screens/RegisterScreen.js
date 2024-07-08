import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Collapse, Alert, Link } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
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
      await axios.post("/api/auth/register", { username, email, password }, config);
      navigate('/login');
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
          Register
        </Typography>
        {error && (
          <Collapse in={!!error}>
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
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{ style: { fontSize: '0.9rem' } }}
            InputProps={{ style: { fontSize: '0.9rem' } }}
            sx={{ color: theme.palette.text.primary }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            Register
          </Button>
          <Typography sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link href="/login" variant="body2">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterScreen;
