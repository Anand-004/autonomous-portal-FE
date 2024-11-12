import React from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import pdf from './../../pdfs/template.pdf';
import { Download } from '@mui/icons-material';

const PDFGenerator = ({ id, receiptData, allReceiptData }) => {
  // Function to create a single student's PDF
  const createPDFForStudent = async (student) => {
    const templateBytes = await fetch(pdf).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(templateBytes);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
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
        `${subject.semester}       ${subject.code}         ${subject.title}`,
        { x: 35, y: subjectYPosition, size: fontSize, font, color }
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

  // Function to generate a PDF with receipts for all students
  const createPDFForAllStudents = async (students) => {
    const pdfDoc = await PDFDocument.create(); // Create a new PDF document
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 5;
    const color = rgb(0, 0, 0);

    // Loop through all students and add their data to the template
    for (const student of students) {
      const templateBytes = await fetch(pdf).then((res) => res.arrayBuffer());
      const templateDoc = await PDFDocument.load(templateBytes);
      const pages = templateDoc.getPages();
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
          `${subject.semester}       ${subject.code}         ${subject.title}`,
          { x: 35, y: subjectYPosition, size: fontSize, font, color }
        );
        subjectYPosition -= 15;
      });

      // If the content overflows, add a new page for the next student
      if (subjectYPosition < 100) {
        firstPage = pdfDoc.addPage(); // Add a new page for the next student
        yPosition = 733; // Reset yPosition
      }

      // Import the modified page into the main PDF
      const [newPage] = await pdfDoc.copyPages(templateDoc, [0]);
      pdfDoc.addPage(newPage);
    }

    // Save and return the combined PDF with all students
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
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

  // Generate all students' PDF
  const handleDownloadAll = async () => {
    if (!allReceiptData || allReceiptData.length === 0) {
      console.warn('No student data available.');
      return;
    }

    const pdfBytes = await createPDFForAllStudents(allReceiptData);
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
        <Button onClick={handleDownloadAll} variant="outlined" style={{ marginLeft: '10px' }}>
          Download All <Download />
        </Button>
      )}
    </>
  );
};

export default PDFGenerator;
