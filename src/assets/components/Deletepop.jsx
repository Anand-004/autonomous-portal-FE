import * as React from 'react';
import { DialogsProvider, useDialogs } from '@toolpad/core/useDialogs';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteBatch } from '../../services/api/main';

function DemoContent({ dept, batch }) {
  const dialogs = useDialogs();
  return (
    <div>
      <Button
        onClick={async () => {
          const confirmed = await dialogs.confirm('Are you sure? Want to delete the student data?', {
            okText: 'Yes',
            cancelText: 'No',
          });
          console.log({
              department_id : dept,
              batch: batch
            })
          if (confirmed) {
            const reqData = {
              department_id : dept,
              batch: batch
            }
            await deleteBatch(reqData)
            await dialogs.alert("Data Deleted");
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

export default function ConfirmDialog({ dept, batch }) {
  return (
    <DialogsProvider>
      <DemoContent dept={dept} batch={ batch } />
    </DialogsProvider>
  );
}
