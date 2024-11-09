import * as React from 'react';
import Button from '@mui/material/Button';
import "../../pages/HomePage.css"
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function DisableElevation() {
  return (
    <Button variant="contained" >
      <h3>Filter</h3><FilterAltIcon sx={{ fontSize: 20 }} />
    </Button>
  );
}