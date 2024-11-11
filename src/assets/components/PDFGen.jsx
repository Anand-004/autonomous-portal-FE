import React, { useEffect, useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import pdf from './../../pdfs/template.pdf';
import DescriptionIcon from '@mui/icons-material/Description';

function PDFGenerator({ id, handleReceipt, receiptData }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  // Function to create the PDF
  const createPDF = async (student) => {
    const templateBytes = await fetch(pdf).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(templateBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Define font and styling
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 5;
    const color = rgb(0, 0, 0);

    // Add dynamic data to the PDF
    firstPage.drawText(`${student.name}`, { x: 110, y: 733, size: fontSize, font, color });
    firstPage.drawText(`${student.regNo}`, { x: 455, y: 745, size: fontSize, font, color });
    firstPage.drawText(`${student.dob}`, { x: 455, y: 733, size: fontSize, font, color });
    firstPage.drawText(`Rs.${student.totalFees}`, { x: 430, y: 100, size: fontSize, color });
    firstPage.drawText(`${student.arrears}`, { x: 160, y: 100, size: fontSize, color });

    // Add subjects dynamically
    let yPosition = 680;
    student.subjects.forEach((subject) => {
      firstPage.drawText(`${subject.semester}       ${subject.code}         ${subject.title}`, { x: 35, y: yPosition, size: fontSize, font, color });
      yPosition -= 15;
    });

    // Save the modified PDF as a byte array
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  };

  const handleGeneratePDF = async () => {
    if (!receiptData || receiptData.length === 0) {
      console.warn("No student data available.");
      return;
    }

    // Use the latest receiptData directly
    const pdfBytes = await createPDF(receiptData[0]);
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    // Open the PDF in a new tab
    window.open(url, '_blank');
  };

  useEffect(() => {
    if (receiptData && receiptData.length > 0) {
      handleGeneratePDF(); // Generate PDF after receiptData updates
    }
  }, [receiptData]);

  return (
    <div>
      <button
        id={id}
        onClick={async (e) => {
          await handleReceipt(e.target.id); // Update receipt data
        }}
      >
        <span style={{ pointerEvents: "none" }}><DescriptionIcon /></span>
      </button>
    </div>
  );
}

export default PDFGenerator;
