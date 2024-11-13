import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ButtonAppBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data and redirect
    sessionStorage.removeItem('token');
    navigate('/',{ replace: true });
    window.location.href = window.location.href;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Adjust logo styling here */}
          <img 
            src="src/images/rvs_logo-removebg-preview.png" 
            alt="logo" 
            style={{ width: 50, height: 50, marginRight: 16 }} 
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            RVS Technical Campus-Coimbatore (Autonomous) - Fees Portal
          </Typography>
          <Button
            className='navbutton'
            color="inherit"
            onClick={handleLogout}
            sx={{
              color: 'white', // Default color
              transition: 'color 0.3s ease, background-color 0.3s ease', // Smooth transition for color changes
              '&:hover': {
                color: '#1976d2', // New color on hover
                backgroundColor: 'white', // Background on hover
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
