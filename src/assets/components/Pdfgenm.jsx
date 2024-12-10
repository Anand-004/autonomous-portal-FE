import React from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import attendanceTemplate from './../../pdfs/marksheet2.pdf';

const Pdfgenm = ({ data }) => {
  const createPDFForStudent = async (students, department, degree, semester, subjectName, subjectCode) => {
    const templateBytes = await fetch(attendanceTemplate).then((res) => res.arrayBuffer());
    const baseTemplate = await PDFDocument.load(templateBytes);
    const pdfDoc = await PDFDocument.create();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 8;
    const color = rgb(0, 0, 0);

    // Helper function to add a new template page to the PDF
    const addTemplatePage = async () => {
      const [templatePage] = await pdfDoc.copyPages(baseTemplate, [0]);
      return pdfDoc.addPage(templatePage);
    };

    let currentPage = await addTemplatePage(); // Start with the first page
    let yPosition = 578; // Starting y-position for student data
    const rowHeight = 21; // Row height for each student entry
    const maxRowsPerPage = 22; // Adjust this based on the layout capacity
    let rowsOnCurrentPage = 0; // Track rows on the current page

    // Fill static fields on a page
    const fillStaticFields = (page) => {
      page.drawText(degree, { x: 120, y: 680, size: fontSize, font, color });
      page.drawText(subjectName, { x: 140, y: 662, size: fontSize, font, color });
      page.drawText(subjectCode.includes('+') ? subjectCode.slice(0,6) : subjectCode, { x: 500, y: 661, size: fontSize, font, color });
      page.drawText(`0${semester}`, { x: 480, y: 681, size: fontSize, font, color });
      page.drawText(department, { x: 140, y: 680, size: fontSize, font, color });
    };

    // Fill static fields for the first page
    fillStaticFields(currentPage);

    // Insert student data
    let sno = 1;
    for (const student of students) {
      if (rowsOnCurrentPage >= maxRowsPerPage) {
        // Add a new template page if max rows exceeded
        currentPage = await addTemplatePage();
        fillStaticFields(currentPage);
        yPosition = 578;
        rowsOnCurrentPage = 0;
      }
      if(sno<10){
        currentPage.drawText(`  ${sno}`, { x: 65, y: yPosition, size: fontSize, font, color });

      }else{
        currentPage.drawText(`${sno}`, { x: 65, y: yPosition, size: fontSize, font, color });

      }
      currentPage.drawText(`${student.reg_no}`, { x: 95, y: yPosition, size: fontSize, font, color });
      // currentPage.drawText(`${student.name}`, { x: 177, y: yPosition, size: fontSize, font, color });

      yPosition -= rowHeight;
      rowsOnCurrentPage++;
      sno++;
    }

    // Save the modified PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  };

  const handleGeneratePDF = async () => {
    const { department, degree, semester, subject_code, subject_name, studentData } = data;

    // Generate PDF for students
    const pdfBytes = await createPDFForStudent(studentData, department, degree, semester, subject_name, subject_code);

    // Create a Blob and generate a URL for the new tab
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Open the PDF in a new tab
    window.open(url, '_blank');
  };

  return (
    <div>
     <Button
  onClick={handleGeneratePDF}
  variant="contained"
  color="success"
  startIcon={<DescriptionIcon />}
  sx={{
    '&:hover': {
      backgroundColor: 'darkblue', // Change the background color on hover
      color: 'white', // Change text color on hover
      transform: 'scale(1.05)', // Slightly enlarge the button
      transition: 'all 0.3s ease-in-out', // Smooth transition for the hover effect
    },
  }}
>
  Generate Mark Sheet
</Button>

    </div>
  );
};

export default Pdfgenm;
