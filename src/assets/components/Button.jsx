
import Button from '@mui/material/Button';
import "../../pages/HomePage.css"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useEffect } from 'react';

export default function DisableElevation({ isDisabled }) {
  useEffect(()=>{
    console.log(isDisabled)
  },[isDisabled])
  return (
    <Button disabled={isDisabled} variant="contained" >
      <h3>Filter</h3><FilterAltIcon sx={{ fontSize: 20 }} />
    </Button>
  );
}