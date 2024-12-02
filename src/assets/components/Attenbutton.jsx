import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ColorButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          '&:hover': {
            backgroundColor: 'primary.main', // Change background on hover
            color: '#fff', // Optional: Change text color
          },
        }}
      >
        Attendance
      </Button>
      <Button
        variant="contained"
        color="success"
        sx={{
          '&:hover': {
            backgroundColor: 'info.main', // Change background on hover
            color: '#fff', // Optional: Change text color
          },
        }}
      >
        Marksheet
      </Button>
    </Stack>
  );
}
