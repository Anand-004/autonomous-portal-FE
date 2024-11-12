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
    
    
    
    // Redirect to login page
    navigate('/');
// Clear authentication data (e.g., token) from local storage
   sessionStorage.removeItem('token');

   //clears all storage by logout session and route to /
   window.location.href = window.location.href;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RVS Technical Campus-Coimbatore
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
