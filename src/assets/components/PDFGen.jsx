import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const pdf = require('./../pdfs/template.pdf');

// Sample student data
const students = [
  {
    name: "ABISHEK B",
    regNo: "712922104001",
    dob: "19-12-2003",
    subjects: [
      { semester:"03",code: "CS3301", title: "Data Structures" },
      { semester:"03",code: "CS3311", title: "Data Structures Laboratory" },
      { semester:"03",code: "CS3351", title: "Digital Principles and Computer Organization" },
      { semester:"03",code: "CS3352", title: "Foundations of Data Science" },
      { semester:"03",code: "CS3361", title: "Data Science Laboratory" },
      { semester:"03",code: "CS3381", title: "Object Oriented Programming Laboratory" },
      { semester:"03",code: "CS3391", title: "Object Oriented Programming" },
      { semester:"03",code: "GE3361", title: "Professional Development" },
      { semester:"03",code: "MA3354", title: "Discrete Mathematics" },
      
    ],
    totalFees: "2000",
    arrears: 2
  },
  // Add more student objects if needed
];

function PDFGenerator() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const createPDF = async (student) => {
    // Fetch the PDF template
    const templateBytes = await fetch(pdf).then(res => res.arrayBuffer());

    // Load the template PDF
    const pdfDoc = await PDFDocument.load(templateBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Define font and styling
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 5;
    const color = rgb(0, 0, 0);

    // Add dynamic data
    firstPage.drawText(`${student.name}`, { x: 110, y: 733, size: fontSize, font, color });
    firstPage.drawText(`${student.regNo}`, { x: 455, y: 745, size: fontSize, font, color });
    firstPage.drawText(`${student.dob}`, { x: 455, y: 733, size: fontSize, font, color });
    firstPage.drawText(`Rs.${student.totalFees}`, { x: 430, y: 100, size: fontSize, color: rgb(0, 0, 0) });
    firstPage.drawText(`${student.arrears}`, { x: 160, y: 100, size: fontSize, color: rgb(0, 0, 0) });
  
    // Add subjects dynamically
    let yPosition = 680;
    student.subjects.forEach((subject) => {
      firstPage.drawText(`${subject.semester}       ${subject.code}         ${subject.title}`, { x: 35, y: yPosition, size: fontSize, font, color });
      yPosition -= 15; // Adjust line height
    });

    // Save the modified PDF as a byte array
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  };

  const handleGeneratePDF = async () => {
    const pdfBytes = await createPDF(students[0]); // Generate PDF for the first student
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    // Set the Blob URL in state for previewing in the iframe
    setPdfUrl(url);
  };

  return (
    <div>
      <h1>Generate PDF Registration Form Preview</h1>
      <button onClick={handleGeneratePDF}>Generate PDF Preview</button>

      {/* Display PDF preview in iframe */}
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          title="PDF Preview"
          width="100%"
          height="600px"
          style={{ border: "1px solid #ddd", marginTop: "20px" }}
        ></iframe>
      )}
    </div>
  );
}

export default PDFGenerator;
