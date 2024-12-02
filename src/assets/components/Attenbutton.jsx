import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ColorButtons() {
  return (
    <Stack direction="row" spacing={10}> {/* Increase spacing between buttons */}
      <Button
        variant="contained"
        color="secondary"
        sx={{
          '&:hover': {
            backgroundColor: 'primary.main',
            color: '#fff',
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
            backgroundColor: 'info.main',
            color: '#fff',
          },
        }}
      >
        Marksheet
      </Button>
    </Stack>
  );
}
