
import Button from '@mui/material/Button';
import "../../pages/HomePage.css"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useEffect } from 'react';

export default function DisableElevation({ isDisabled, handleFilter}) {
  useEffect(()=>{
    console.log(isDisabled)
  },[isDisabled])
  return (
    <Button size="large" onClick={handleFilter} disabled={isDisabled} variant="contained"  sx={{
      color: 'white', // Default color
      backgroundColor: '#1976d2', // Default background color
      '&:hover': {
        backgroundColor: '#005bb5', // New color on hover
        color: 'white', // Text color on hover
      },
    }}>
      <h3>Filter</h3><FilterAltIcon sx={{ fontSize: 20 }} />
    </Button>
  );
}