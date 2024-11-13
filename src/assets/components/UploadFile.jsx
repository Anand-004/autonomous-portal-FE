import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as XLSX from 'xlsx';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ sendData, isDisabled }) {
  React.useEffect(()=>{
    console.log("isDisabled - ", isDisabled)
  },[isDisabled]);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
  
    if (file) {
      try {
        const reader = new FileReader();
        
        reader.onload = (event) => {
          try {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            console.log(jsonData);
            sendData(jsonData);
          } catch (dataProcessingError) {
            console.error("Error processing data:", dataProcessingError);
            alert("An error occurred while processing the file data.");
          }
        };
  
        // Call `readAsArrayBuffer` here, outside the `onload` function
        reader.readAsArrayBuffer(file);
  
      } catch (fileReadingError) {
        console.error("Error reading file:", fileReadingError);
        alert("An error occurred while reading the file.");
      }
    } else {
      console.error("No file selected");
      alert("No file selected");
    }
  };
  
  return (
    <Button
      disabled={isDisabled}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        accept=".xls, .xlsx"  // Only allow Excel file types
        onChange={(e)=> handleFileUpload(e)}
        multiple={false}      // Optional: set multiple to false if you want a single file upload
      />
    </Button>
  );
}

