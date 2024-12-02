import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import pdfTemplate from './../../pdfs/attendance.pdf'; 

const PdfManipulator = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleGeneratePdf = async () => {
    // Load the PDF template
    const existingPdfBytes = await fetch(pdfTemplate).then((res) => res.arrayBuffer());

    // Load the PDFDocument
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed a font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Get the first page of the PDF
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Define dynamic text
    const textFields = [
      { text: 'Name: John Doe', x: 100, y: 700, size: 12, color: rgb(0, 0, 0) },
      { text: 'Reg No: 123456789', x: 100, y: 680, size: 12, color: rgb(0, 0, 0) },
      { text: 'Subject: Computer Science', x: 100, y: 660, size: 12, color: rgb(0, 0, 0) },
    ];

    // Draw each text field
    textFields.forEach((field) => {
      firstPage.drawText(field.text, {
        x: field.x,
        y: field.y,
        size: field.size,
        font,
        color: field.color,
      });
    });

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Create a blob and generate a URL for download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  return (
    <div>
      <button onClick={handleGeneratePdf}>Generate PDF</button>
      {/* {pdfUrl && (
        // <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
        //   Download PDF
        // </a>
      )} */}
        {pdfUrl && (
        <iframe
          src={pdfUrl}
          title="PDF Preview"
          width="100%"
          height="900px"
          style={{ border: "1px solid #ddd", marginTop: "20px" }}
        ></iframe>
      )}
    </div>
  );
};

export default PdfManipulator;
