import React, { useEffect, useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import pdf from './../../pdfs/ogfte.pdf';
import { Download } from '@mui/icons-material';
import { blue } from '@mui/material/colors';

const PDFGenerator = ({ dept, receiptData, allReceiptData, btnContent }) => {
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
    firstPage.drawText(`${student.name}`, { x: 130, y: 674, size: fontSize, font, color });
    firstPage.drawText(`B.E.${dept.department}`, { x: 130, y: 674-12, size: fontSize, font, color });

    firstPage.drawText(`${student.regNo}`, { x: 455, y: yPosition + 12, size: fontSize, font, color });
    firstPage.drawText(`${student.dob}`, { x: 455, y: yPosition, size: fontSize, font, color });
    firstPage.drawText(`2021`, { x: 455, y: yPosition - 12, size: fontSize, font, color });
    firstPage.drawText(`Total Fees : Rs.${student.totalFees}`, { x: 430, y: 233, size: 9,font, color });
    firstPage.drawText(`No of Subjects: ${student.arrears}`, { x: 160, y: 233, size: fontSize,font, color });

    // Add subjects
    let subjectYPosition = 615;
    student.subjects.forEach((subject) => {
      firstPage.drawText(
        `0${subject.semester}                ${subject.code}                            ${subject.title}`,
        { x: 53, y: subjectYPosition, size: fontSize, font, color }
      );
      subjectYPosition -= 12;
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
  const createPDFForStudents = async (students,department) => {
    
    const templateBytes = await fetch(pdf).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(templateBytes);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 5;
    const color = rgb(0, 0, 0);
  
    // Loop over each student to create a page for each with individual data
    for (const student of students) {
      
      const [templatePage] = await pdfDoc.copyPages(pdfDoc, [0]); // Create a fresh copy of the template page
      const page = pdfDoc.addPage(templatePage); // Add the copied page to the document
      let yPosition = 670; // Initial y-position for student data
  
      // Populate the dynamic fields on the PDF for each student
      page.drawText(student.name || "", { x: 130, y: 674, size: fontSize, font, color });
      page.drawText(`B.E.${dept?.department}` , { x: 130, y: 674-12, size: fontSize, font, color });

      page.drawText(`${student.regNo}` || "", { x: 455, y: yPosition + 12, size: fontSize, font, color });
      page.drawText(student.dob || "",  { x: 455, y: yPosition, size: fontSize, font, color });
      page.drawText(`2021` || "", { x: 455, y: yPosition - 12, size: fontSize, font, color });

      page.drawText(`Rs.${student.totalFees || 0}`, { x: 430, y: 233, size: 9,font, color });
      page.drawText(`${student.arrears}` || "", { x: 160, y: 233, size: fontSize,font, color });
  
      // Add subjects
      let subjectYPosition = 615;
      let subjectXPosition = 32;
      student.subjects.forEach((subject) => {
        // if(subjectYPosition > 1000) {  
        //   subjectXPosition = 70;
        //   subjectYPosition = 680;
        // }
        page.drawText(
          `0${subject.semester}                ${subject.code}                            ${subject.title}`,
          { x: 53, y: subjectYPosition, size: fontSize, font, color }
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

    const pdfBytes = await createPDFForStudent(receiptData,dept);
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

  const toIndianCurrency = (num) => {
   const curr = num.toLocaleString('en-IN', {
      // style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
   });
return curr;
};

  

  return (
    <>
    {receiptData&&
      <Button onClick={handleGeneratePDF} variant="none" >
        <div style={{display:"flex"}}>
          <span style={{ marginRight: "20px" }}><DescriptionIcon  sx={{ color: blue[500], fontSize: 24, mr: 0 }} /></span>
          <span style={{ fontFamily:"monospace" }}>{`Rs.${toIndianCurrency(receiptData.totalFees)}/-`}</span>
        </div>
      </Button>}
      {allReceiptData && (
        <Button onClick={ handleGeneratePDFs } variant="outlined" style={{ marginLeft: '10px'}}>
          { btnContent } <Download />
        </Button>
      )}
    </>
  );
};

export default PDFGenerator;
