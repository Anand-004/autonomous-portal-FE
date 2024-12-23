import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export default function AppBar1() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <img 
            src="src/images/rvs_logo-removebg-preview.png" 
            alt="logo" 
            style={{ width: 50, height: 50, marginRight: 16 }} 
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RVS Technical Campus-Coimbatore (Autonomous)
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
