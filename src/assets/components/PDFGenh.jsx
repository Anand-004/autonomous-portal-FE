import React from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import pdf from './../../pdfs/hallticket.pdf';
import { Download } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import ArticleIcon from '@mui/icons-material/Article';

const PDFGenh = ({ dept, receiptData, allReceiptData }) => {
   // Function to create a single student's PDF
   const createPDFForStudent = async (student) => {
    console.log(student)
    const templateBytes = await fetch(pdf).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(templateBytes);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 5;
    const color = rgb(0, 0, 0);

    const pages = pdfDoc.getPages();
    let firstPage = pages[0]; // Use the first page of the template
    let yPosition = 670; // Initial y-position for student data

    // Populate the dynamic fields on the PDF for the student
    firstPage.drawText(`${student.name}`, { x: 100, y: 706, size: fontSize, font, color });
    firstPage.drawText(`B.E.${dept.department}`,{ x: 310, y: 706-18 , size: fontSize, font, color });

    firstPage.drawText(`${student.regNo}`, { x: 310, y: 706, size: fontSize, font, color });
    firstPage.drawText(`${student.dob}`, { x: 100, y: 670, size: fontSize, font, color });
    // firstPage.drawText(`2021`, { x: 455, y: yPosition - 12, size: fontSize, font, color });
    // firstPage.drawText(`Total Fees : Rs.${student.totalFees}`, { x: 430, y: 233, size: 9,font, color });
    // firstPage.drawText(`No of Subjects: ${student.arrears}`, { x: 160, y: 233, size: fontSize,font, color });

    // Add subjects
    let subjectYPosition = 637;
    student.subjects.forEach((subject) => {
      firstPage.drawText(
        `0${subject.semester}                       ${subject.code}                       ${subject.title}`,
        { x: 80, y: subjectYPosition, size: fontSize, font, color }
      );
      subjectYPosition -= 10;
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
   page.drawText(`${student.name}`, { x: 100, y: 706, size: fontSize, font, color });
   page.drawText(`B.E.${dept?.department}` , { x: 310, y: 706-18 , size: fontSize, font, color });

   page.drawText(`${student.regNo}`, { x: 310, y: 706, size: fontSize, font, color });
   page.drawText(`${student.dob}`, { x: 100, y: 670, size: fontSize, font, color });
      // page.drawText(`Rs.${student.totalFees || 0}`, { x: 430, y: 100, size: fontSize, font, color });
      // page.drawText(`${student.arrears}` || "", { x: 160, y: 100, size: fontSize, font, color });
  
      // Add subjects
      let subjectYPosition = 637;
      student.subjects.forEach((subject) => {
        page.drawText(
        `0${subject.semester}                       ${subject.code}                       ${subject.title}`,
        { x: 80, y: subjectYPosition, size: fontSize, font, color }
      );
      subjectYPosition -= 10;
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
    
    // Create an anchor element to download the file with a specific filename
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'All_Students_Receipts.pdf'; // Set your desired filename here
    document.body.appendChild(anchor);
    // anchor.click();
    window.open(url, '_blank');


    // Clean up by revoking the object URL and removing the anchor
    URL.revokeObjectURL(url);
    document.body.removeChild(anchor);
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

     // Create an anchor element to download the file with a specific filename
     const anchor = document.createElement('a');
     anchor.href = url;
     anchor.download = `${receiptData.name.replace(' ', '_')}_FeesReceipt`; // Set your desired filename here
     document.body.appendChild(anchor);
    //  anchor.click();
     window.open(url, '_blank');

 
     // Clean up by revoking the object URL and removing the anchor
     URL.revokeObjectURL(url);
     document.body.removeChild(anchor);
  };



  

  return (
    <>
    {receiptData&&
      <Button onClick={handleGeneratePDF} variant="none" >
        <ArticleIcon  sx={{ color: 'red', fontSize: 24, mr: 0 }} />
      </Button>}
      {allReceiptData && (
        <Button onClick={handleGeneratePDFs} variant="outlined" style={{ marginLeft: '10px' }}>
          Download All <Download />
        </Button>
      )}
    </>
  );
};


export default PDFGenh;