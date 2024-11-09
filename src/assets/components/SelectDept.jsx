import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
       <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 500 }} >
        <InputLabel id="Department">Department</InputLabel>
        <Select
          labelId="Department"
          id="Dept"
          value={age}
          label="Department"
          onChange={handleChange}
        >
          <MenuItem value={10}>Computer Science And Engineering</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Required*</FormHelperText>
      </FormControl>
      
    </Box>
    <Box sx={{ minWidth: 120 }}>
    <FormControl sx={{ m: 1, minWidth: 300 }} >
      <InputLabel id="StudentBatch">Batch</InputLabel>
      <Select
        labelId="StudentBatch"
        id="Batch"
        value={age}
        label="Department"
        onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      <FormHelperText>Required*</FormHelperText>
    </FormControl>
  </Box>
  </>
  
  );
}
