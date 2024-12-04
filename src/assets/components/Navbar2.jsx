import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [selectedButton, setSelectedButton] = React.useState(location.pathname); // Initialize with the current route

  React.useEffect(() => {
    // Update the selected button when the route changes
    setSelectedButton(location.pathname);
  }, [location]);

  const handleToggle = (buttonName, navigateTo) => {
    if (selectedButton !== buttonName) {
      // Update the selected button and navigate to the new route
      setSelectedButton(buttonName);
      navigate(navigateTo);
    }
  };

  const handleLogout = () => {
    // Clear authentication data and redirect
    sessionStorage.removeItem('token');
    navigate('/', { replace: true });
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
            RVS Technical Campus-Coimbatore (Autonomous)
          </Typography>

          {/* HallTicket & FeesReceipt Button */}
          <Button
            color="inherit"
            onClick={() => handleToggle('/home', '/home')}
            sx={{
              color: selectedButton === '/home' ? '#1976d2' : 'white',
              backgroundColor: selectedButton === '/home' ? 'white' : 'transparent',
              transition: 'color 0.3s ease, background-color 0.3s ease, transform 0.3s ease',
              '&:hover': {
                color: '#1976d2',
                backgroundColor: 'white',
                transform: 'scale(1.05)',
              },
              marginRight: 5,
            }}
          >
            HallTicket & FeesReceipt
          </Button>

          {/* Attendance & Marksheet Button */}
          <Button
            color="inherit"
            onClick={() => handleToggle('/atten', '/atten')}
            sx={{
              color: selectedButton === '/atten' ? '#1976d2' : 'white',
              backgroundColor: selectedButton === '/atten' ? 'white' : 'transparent',
              transition: 'color 0.3s ease, background-color 0.3s ease, transform 0.3s ease',
              '&:hover': {
                color: '#1976d2',
                backgroundColor: 'white',
                transform: 'scale(1.05)',
              },
              marginRight: 5,
            }}
          >
            Attendance & Marksheet
          </Button>

          {/* Logout Button */}
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              color: 'white',
              transition: 'color 0.3s ease, background-color 0.3s ease, transform 0.3s ease',
              '&:hover': {
                color: '#1976d2',
                backgroundColor: 'white',
                transform: 'scale(1.05)',
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
