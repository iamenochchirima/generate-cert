import fs from 'fs';
import moment from 'moment';
import PDFDocument from 'pdfkit';

// Array of names
const names = ["Enoch", "John", "Jane"];

// Loop through each name
names.forEach((name, index) => {
  // Create the PDF document
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
  });

  // Pipe the PDF into a name.pdf file
  doc.pipe(fs.createWriteStream(`${name}.pdf`));

  // Draw the certificate image
  doc.image("images/certificate.jpg", 8, 8, { width: 842 });

  // Set the font to Dancing Script
  doc.font("fonts/PPTelegraf-Regular.otf");

  // Draw the name
  doc.fontSize(60).text(name, 20, 265, {
    align: "center",
  });

  // Draw the date
  doc.fontSize(17).text(moment().format("Do YYYY"), -275, 438, {
    align: "center",
  });

  // Finalize the PDF and the stream
  doc.end();

  // Notify when all certificates are created
  if (index === names.length - 1) {
    console.log("All certificates created successfully!");
  }
});
