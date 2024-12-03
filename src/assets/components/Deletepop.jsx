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
          // preview-start
          const confirmed = await dialogs.confirm('Are you sure? want to Delete the Student Data', {
            okText: 'Yes',
            cancelText: 'No',
          });
          if (confirmed) {
            
            await dialogs.alert("Data Deleted");
          } else {
            await dialogs.alert('deletion cancelled');
          }
          // preview-end
        }}
      >
        <DeleteIcon sx={{ color: "red",fontSize: 30 }} />
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
