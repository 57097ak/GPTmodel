import React from 'react';
import { AppBar, Toolbar, Typography, Link, Button, useTheme, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");
      fullyLogout(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fullyLogout = (data) => {
    if (data.success) {
      localStorage.removeItem("authToken");
      navigate("/login");
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Saas App
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <Link href="/" color="inherit" underline="none" sx={{ mx: 2 }}>
            Home
          </Link> */}
          {!loggedIn ? (
            <>
              <Link href="/login" color="inherit" underline="none" sx={{ mx: 2 }}>
                Login
              </Link>
              <Link href="/register" color="inherit" underline="none" sx={{ mx: 2 }}>
                Register
              </Link>
            </>
          ) : (
            <Button color="inherit" sx={{ mx: 2 }} onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
