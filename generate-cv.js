const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

// Create a document
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 50, bottom: 50, left: 50, right: 50 },
});

// Path to save the PDF
const publicDir = path.join(__dirname, "public");
const filePath = path.join(publicDir, "Mohammed_Mesoud_Resume.pdf");

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Pipe its output somewhere, like to a file or HTTP response
const writeStream = fs.createWriteStream(filePath);
doc.pipe(writeStream);

// Header
doc.fillColor("#ff7f00").fontSize(24).text("Mohammed Mesoud", 50, 50);

doc.fillColor("#000000").fontSize(14).text("Full Stack Developer", 50, 80);

// Contact Information
doc
  .fontSize(10)
  .text("South Wello, Kombolcha", 400, 50, { align: "right" })
  .text("mesoudmohammed393@gmail.com", 400, 65, { align: "right" })
  .text("+251903169980", 400, 80, { align: "right" });

// Line separator
doc
  .moveTo(50, 110)
  .lineTo(550, 110)
  .lineWidth(2)
  .strokeColor("#ff7f00")
  .stroke();

// Professional Summary
doc.fillColor("#ff7f00").fontSize(16).text("Professional Summary", 50, 130);

doc
  .fillColor("#000000")
  .fontSize(10)
  .text(
    "Passionate Full Stack Developer with over 3 years of experience creating modern web applications. ",
    50,
    160,
    { continued: true }
  )
  .text(
    "Specializing in React, Next.js, and Node.js with a strong focus on user experience and performance. ",
    50,
    175,
    { continued: true }
  )
  .text(
    "Proven track record of delivering scalable solutions for clients and personal projects.",
    50,
    190
  );

// Technical Skills
doc.fillColor("#ff7f00").fontSize(16).text("Technical Skills", 50, 220);

doc
  .fillColor("#000000")
  .fontSize(10)
  .text("• React", 50, 250)
  .text("• Next.js", 50, 265)
  .text("• JavaScript", 50, 280)
  .text("• TypeScript", 50, 295)
  .text("• Node.js", 50, 310)
  .text("• Python", 50, 325)
  .text("• MongoDB", 150, 250)
  .text("• Tailwind CSS", 150, 265)
  .text("• HTML/CSS", 150, 280)
  .text("• Git", 150, 295)
  .text("• UI/UX Design", 150, 310);

// Professional Experience
doc.fillColor("#ff7f00").fontSize(16).text("Professional Experience", 50, 350);

// Experience 1
doc.fillColor("#000000").fontSize(12).text("Student Internship", 50, 380);

doc
  .fillColor("#ff7f00")
  .fontSize(11)
  .text("Kombolcha Textile Share Company (KTSC)", 50, 395);

doc
  .fillColor("#000000")
  .fontSize(10)
  .text("Jan 2025 – Mar 2025", 400, 380, { align: "right" })
  .text(
    "• Developed web-based shopping platform with HTML, CSS, JS, PHP, XAMPP",
    50,
    415
  )
  .text("• Improved online presence and sales/inventory systems", 50, 430)
  .text(
    "• Collaborated on system analysis, testing, and secure database operations",
    50,
    445
  )
  .text("• Gained real-world software engineering experience", 50, 460);

// Experience 2
doc
  .fillColor("#000000")
  .fontSize(12)
  .text("Remote Freelance Developer", 50, 485);

doc.fillColor("#ff7f00").fontSize(11).text("Self-Employed", 50, 500);

doc
  .fillColor("#000000")
  .fontSize(10)
  .text("2024 – Present", 400, 485, { align: "right" })
  .text(
    "• Built full-stack apps with real-time features (chat, dashboards, e-commerce)",
    50,
    520
  )
  .text("• Delivered end-to-end projects from design to deployment", 50, 535)
  .text("• Managed client communication and project timelines", 50, 550)
  .text("• Specialized in responsive, modern web applications", 50, 565);

// Experience 3
doc
  .fillColor("#000000")
  .fontSize(12)
  .text("Open Source & Personal Projects", 50, 590);

doc.fillColor("#ff7f00").fontSize(11).text("Independent Developer", 50, 605);

doc
  .fillColor("#000000")
  .fontSize(10)
  .text("2023 – Present", 400, 590, { align: "right" })
  .text("• Created food ordering website with admin dashboard", 50, 625)
  .text("• Built Quran Listening App with React Native", 50, 640)
  .text("• Developed real-time communication system with Socket.io", 50, 655)
  .text("• Continuously learning new technologies", 50, 670);

// Education
doc.fillColor("#ff7f00").fontSize(16).text("Education", 50, 700);

doc
  .fillColor("#000000")
  .fontSize(12)
  .text("Bachelor of Science in Information Science", 50, 730);

doc.fillColor("#ff7f00").fontSize(11).text("Haramaya University", 50, 745);

doc
  .fillColor("#000000")
  .fontSize(10)
  .text("2022 - 2025", 400, 730, { align: "right" })
  .text(
    'Graduated with honors. Specialized in information systems and data management. Completed thesis on "Information Systems in Modern Organizations".',
    50,
    765,
    { width: 500 }
  );

// Finalize PDF file
doc.end();

writeStream.on("finish", function () {
  console.log("CV generated successfully at:", filePath);
});
