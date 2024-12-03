import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import marksheetTemplate from './../../pdfs/marksheet.pdf';

const Pdfgenm = ({data}) => {
  const [pdfUrl, setPdfUrl] = useState(null); // State to store the generated PDF URL

  const data1 = {
    "studentData": [
      { "name": "ANIRUTH", "reg_no": 712922104008, "id": "674d8d7e9677925bcf4491b1" },
      { "name": "DIBHAKAR B", "reg_no": 712922104016, "id": "674d8d8a9677925bcf4492aa" },
      { "name": "GOKUL N", "reg_no": 712922104020, "id": "674d8d919677925bcf449318" },
      { "name": "JAGANATH J", "reg_no": 712922104027, "id": "674d8d9c9677925bcf4493df" },
      { "name": "MIDHUN DAS", "reg_no": 712922104034, "id": "674d8da79677925bcf4494b2" },
      { "name": "NAZEEF A", "reg_no": 712922104036, "id": "674d8daa9677925bcf4494f9" },
      { "name": "SABARIMANI D", "reg_no": 712922104043, "id": "674d8db49677925bcf4495a3" },
      { "name": "VIGNESHWARAN M", "reg_no": 712922104054, "id": "674d8dc59677925bcf4496b8" },
      { "name": "AVINASH S", "reg_no": 712922104702, "id": "674d8ddb9677925bcf449815" },
      { "name": "HARI RAMA KRISHNAN", "reg_no": 712922104704, "id": "674d8de09677925bcf449866" }
    ],
    "department": "Computer Science and Engineering",
    "degree": "B.E",
    "semester": 2,
    "subject_code": "CS3251",
    "subject_name": "Programming In C"
  };

  const createPDFForStudent = async (students, department, degree, semester, subjectName, subjectCode) => {
    const templateBytes = await fetch(marksheetTemplate).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(templateBytes);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 8;
    const color = rgb(0, 0, 0);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Fill in static fields
    firstPage.drawText(degree, { x: 120, y: 680, size: fontSize, font, color });
    firstPage.drawText(subjectName, { x: 140, y: 662, size: fontSize, font, color });
    firstPage.drawText(subjectCode, { x: 500, y: 661, size: fontSize, font, color });
    firstPage.drawText(`0${semester}`, { x: 480, y: 681, size: fontSize, font, color });
    firstPage.drawText(department, { x: 140, y: 680, size: fontSize, font, color });

    let yPosition = 578; // Start for student data
    let xposistion=65;
    const rowHeight = 21;

    // firstPage.drawText("S.No", { x: 30, y: yPosition, size: fontSize, font, color });
    // firstPage.drawText("Register No", { x: 70, y: yPosition, size: fontSize, font, color });
    // firstPage.drawText("Name of the Student", { x: 150, y: yPosition, size: fontSize, font, color });
    // yPosition -= rowHeight;

    // Insert student data
    let sno = 1;
    students.forEach((student) => {
      firstPage.drawText(`${sno}`, { x: xposistion, y: yPosition, size: fontSize, font, color });
      firstPage.drawText(`${student.reg_no}`, { x: xposistion+30, y: yPosition, size: fontSize, font, color });
    //   firstPage.drawText(`${student.name}`, { x: xposistion+112, y: yPosition, size: fontSize, font, color });
      yPosition -= rowHeight;
      sno=sno+1;

      // Check for page overflow and create a new page
      // if (yPosition < 50) {
      //   const [newPage] = await pdfDoc.copyPages(pdfDoc, [0]);
      //   pdfDoc.addPage(newPage);
      //   yPosition = 700; // Reset position for new page
      // }
      // sno += 1;
    });

    // Save the modified PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  };

  const handleGeneratePDF = async () => {
    const { department, degree, semester, subject_code, subject_name, studentData } = data;

    // Generate PDF for students
    const pdfBytes = await createPDFForStudent(studentData, department, degree, semester, subject_name, subject_code);

    // Create a Blob and generate a URL for the iframe
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url); // Set the generated URL for the iframe
  };

  return (
    <div>
      <Button onClick={handleGeneratePDF} variant="contained" color="primary" startIcon={<DescriptionIcon />}>
        Generate Attendance Sheet
      </Button>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          title="Generated PDF"
          style={{ width: '100%', height: '600px', marginTop: '20px', border: '1px solid #ccc' }}
        ></iframe>
      )}
    </div>
  );
};

export default Pdfgenm;
