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
          // preview-start
          const confirmed = await dialogs.confirm('Are you sure? want to Delete the Student Data', {
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
            // await deleteBatch(reqData)
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

export default function ConfirmDialog({ dept, batch }) {
  return (
    <DialogsProvider>
      <DemoContent dept={dept} batch={ batch } />
    </DialogsProvider>
  );
}
