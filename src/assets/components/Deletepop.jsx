import * as React from 'react';
import { DialogsProvider, useDialogs } from '@toolpad/core/useDialogs';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function DemoContent() {
  const dialogs = useDialogs();
  return (
    <div>
      <Button
        onClick={async () => {
          const confirmed = await dialogs.confirm('Are you sure? Want to delete the student data?', {
            okText: 'Yes',
            cancelText: 'No',
          });
          if (confirmed) {
            await dialogs.alert('Data Deleted');
          } else {
            await dialogs.alert('Deletion Cancelled');
          }
        }}
        sx={{
          padding: 1,
          transition: 'transform 0.3s ease, background-color 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)', // Slight enlargement on hover
            backgroundColor: 'red',
            color:'white' 
          },
        }}
      >
        <DeleteIcon sx={{ fontSize: 30 }} />
      </Button>
    </div>
  );
}

export default function ConfirmDialog() {
  return (
    <DialogsProvider>
      <DemoContent />
    </DialogsProvider>
  );
}
