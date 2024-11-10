import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { insertData } from './services/api/main';

const ExcelUpload = () => {
  const sendData = async(data) =>{
    const inserted = await insertData(data)
    if(inserted) console.log("Data  Inserted")
  }
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData);
        // sendData(jsonData)
      };
      reader.readAsArrayBuffer(file); 
    } else {
      console.error("No file selected");
    }
  };
  return (
    <div>
      <h2>Upload Excel File (.xlsx)</h2>

      <input 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileUpload} 
      />
    </div>
  );
};

export default ExcelUpload;
