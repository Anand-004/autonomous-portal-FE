import React from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import pdf from './../../pdfs/receipt.pdf';
import { Download } from '@mui/icons-material';

const PDFGenerator = ({ id, receiptData, allReceiptData }) => {
  // Function to create a single student's PDF
  const createPDFForStudent = async (student) => {
    const templateBytes = await fetch(pdf).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(templateBytes);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 5;
    const color = rgb(0, 0, 0);

    const pages = pdfDoc.getPages();
    let firstPage = pages[0]; // Use the first page of the template
    let yPosition = 733; // Initial y-position for student data

    // Populate the dynamic fields on the PDF for the student
    firstPage.drawText(`${student.name}`, { x: 110, y: yPosition, size: fontSize, font, color });
    firstPage.drawText(`${student.regNo}`, { x: 455, y: yPosition + 12, size: fontSize, font, color });
    firstPage.drawText(`${student.dob}`, { x: 455, y: yPosition, size: fontSize, font, color });
    firstPage.drawText(`Rs.${student.totalFees}`, { x: 430, y: 100, size: fontSize, color });
    firstPage.drawText(`${student.arrears}`, { x: 160, y: 100, size: fontSize, color });

    // Add subjects
    let subjectYPosition = 680;
    student.subjects.forEach((subject) => {
      firstPage.drawText(
        `0${subject.semester}          ${subject.code}         ${subject.title}`,
        { x: 32, y: subjectYPosition, size: fontSize, font, color }
      );
      subjectYPosition -= 15;
    });

    // If the content overflows, add a new page
    if (subjectYPosition < 100) {
      firstPage = pdfDoc.addPage(); // Add a new page
      yPosition = 733; // Reset yPosition
    }

    // Save the modified PDF for one student
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  };

  // For all students
  const createPDFForStudents = async (students) => {
    const templateBytes = await fetch(pdf).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(templateBytes);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 5;
    const color = rgb(0, 0, 0);
  
    // Loop over each student to create a page for each with individual data
    for (const student of students) {
      const [templatePage] = await pdfDoc.copyPages(pdfDoc, [0]); // Create a fresh copy of the template page
      const page = pdfDoc.addPage(templatePage); // Add the copied page to the document
      let yPosition = 733; // Initial y-position for student data
  
      // Populate the dynamic fields on the PDF for each student
      page.drawText(student.name || "", { x: 110, y: yPosition, size: fontSize, font, color });
      page.drawText(`${student.regNo}` || "", { x: 455, y: yPosition + 12, size: fontSize, font, color });
      page.drawText(student.dob || "", { x: 455, y: yPosition, size: fontSize, font, color });
      page.drawText(`Rs.${student.totalFees || 0}`, { x: 430, y: 100, size: fontSize, font, color });
      page.drawText(`${student.arrears}` || "", { x: 160, y: 100, size: fontSize, font, color });
  
      // Add subjects
      let subjectYPosition = 680;
      student.subjects.forEach((subject) => {
        page.drawText(
          `0${subject.semester}          ${subject.code}         ${subject.title}`,
          { x: 32, y: subjectYPosition, size: fontSize, font, color }
        );
        subjectYPosition -= 15;
      });
  
      // Adjust for content overflow
      if (subjectYPosition < 100) {
        const [overflowTemplatePage] = await pdfDoc.copyPages(pdfDoc, [0]); // Add a new template page for overflow
        pdfDoc.addPage(overflowTemplatePage);
        subjectYPosition = 733; // Reset yPosition for overflow page
      }
    }
    // removes the template 
    pdfDoc.removePage(0);
    // Save the modified PDF containing all students' data
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  };
  
  // For all students
  const handleGeneratePDFs = async () => {
    if (!allReceiptData || allReceiptData.length === 0) {
      console.warn('No student data available.');
      return;
    }
  
    const pdfBytes = await createPDFForStudents(allReceiptData);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

    // Generate individual PDF
  const handleGeneratePDF = async () => {
    if (!receiptData) {
      console.warn('No student data available.');
      return;
    }

    const pdfBytes = await createPDFForStudent(receiptData);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <>
    {receiptData&&
      <Button onClick={handleGeneratePDF} variant="outlined">
        <DescriptionIcon />
      </Button>}
      {allReceiptData && (
        <Button onClick={handleGeneratePDFs} variant="outlined" style={{ marginLeft: '10px' }}>
          Download All <Download />
        </Button>
      )}
    </>
  );
};

export default PDFGenerator;
