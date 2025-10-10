import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

export async function GET() {
  try {
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, "Mohammed_Mesoud_Resume.pdf");

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Header with gradient effect
    const gradientTop = 150;
    const gradientHeight = 40;
    
    // Create a gradient-like effect manually
    for (let i = 0; i < gradientHeight; i++) {
      const ratio = i / gradientHeight;
      const r = Math.floor(255 * (1 - ratio) + 255 * ratio);
      const g = Math.floor(127 * (1 - ratio) + 165 * ratio);
      const b = Math.floor(0 * (1 - ratio) + 0 * ratio);
      
      doc
        .strokeColor([r, g, b])
        .lineWidth(1)
        .moveTo(0, gradientTop + i)
        .lineTo(600, gradientTop + i)
        .stroke();
    }

    // Profile section
    doc.fillColor("#ffffff").fontSize(28).text("Mohammed Mesoud", 50, 50);
    doc.fillColor("#ffffff").fontSize(16).text("Senior Full Stack Developer", 50, 90);

    // Contact information
    doc.fillColor("#ffffff").fontSize(12)
      .text("San Francisco, CA", 400, 50, { align: "right" })
      .text("hello@example.com", 400, 65, { align: "right" })
      .text("(123) 456-7890", 400, 80, { align: "right" })
      .text("linkedin.com/in/mohammedmesoud", 400, 95, { align: "right" })
      .text("github.com/mome64", 400, 110, { align: "right" });

    // Section separator
    doc.moveTo(50, 140).lineTo(550, 140).lineWidth(3).strokeColor("#ff7f00").stroke();

    // Professional Summary
    doc.fillColor("#ff7f00").fontSize(18).text("Professional Summary", 50, 160);
    doc.fillColor("#333333").fontSize(11)
      .text(
        "Passionate Full Stack Developer with over 5 years of experience creating modern web applications. ",
        50,
        190,
        { continued: true, width: 500 }
      )
      .text(
        "Specializing in React, Next.js, and Node.js with a strong focus on user experience and performance. ",
        { continued: true }
      )
      .text(
        "Proven track record of delivering scalable solutions for enterprise clients.",
        { width: 500 }
      );

    // Technical Skills
    doc.fillColor("#ff7f00").fontSize(18).text("Technical Skills", 50, 250);
    
    // Skills columns
    const skillsLeft = [
      "• React", "• Next.js", "• JavaScript", "• TypeScript", 
      "• Node.js", "• Python", "• GraphQL"
    ];
    
    const skillsRight = [
      "• MongoDB", "• PostgreSQL", "• AWS", "• Docker", 
      "• Git", "• UI/UX Design", "• Tailwind CSS"
    ];
    
    doc.fillColor("#333333").fontSize(11);
    
    // Left column
    skillsLeft.forEach((skill, index) => {
      doc.text(skill, 50, 280 + (index * 15));
    });
    
    // Right column
    skillsRight.forEach((skill, index) => {
      doc.text(skill, 180, 280 + (index * 15));
    });

    // Professional Experience
    doc.fillColor("#ff7f00").fontSize(18).text("Professional Experience", 50, 420);

    // Senior Full Stack Developer
    doc.fillColor("#333333").fontSize(13).text("Senior Full Stack Developer", 50, 450);
    doc.fillColor("#ff7f00").fontSize(12).text("Tech Innovations Inc.", 50, 465);
    doc.fillColor("#333333").fontSize(11).text("2020 - Present", 400, 450, { align: "right" });
    
    const exp1Points = [
      "• Led development of scalable web applications using React, Node.js, and cloud technologies",
      "• Implemented microservices architecture reducing latency by 40%",
      "• Mentored junior developers and established CI/CD pipelines"
    ];
    
    exp1Points.forEach((point, index) => {
      doc.text(point, 50, 485 + (index * 15), { width: 500 });
    });

    // Add page break
    doc.addPage();
    
    // Frontend Developer (Page 2)
    doc.fillColor("#333333").fontSize(13).text("Frontend Developer", 50, 50);
    doc.fillColor("#ff7f00").fontSize(12).text("Digital Solutions Ltd.", 50, 65);
    doc.fillColor("#333333").fontSize(11).text("2018 - 2020", 400, 50, { align: "right" });
    
    const exp2Points = [
      "• Developed responsive web applications for enterprise clients",
      "• Improved page load speed by 35% through optimization techniques",
      "• Collaborated with UX designers to implement pixel-perfect interfaces"
    ];
    
    exp2Points.forEach((point, index) => {
      doc.text(point, 50, 85 + (index * 15), { width: 500 });
    });

    // Web Developer
    doc.fillColor("#333333").fontSize(13).text("Web Developer", 50, 150);
    doc.fillColor("#ff7f00").fontSize(12).text("Creative Web Agency", 50, 165);
    doc.fillColor("#333333").fontSize(11).text("2016 - 2018", 400, 150, { align: "right" });
    
    const exp3Points = [
      "• Built custom websites and e-commerce solutions for small to medium businesses",
      "• Managed client relationships and project timelines"
    ];
    
    exp3Points.forEach((point, index) => {
      doc.text(point, 50, 185 + (index * 15), { width: 500 });
    });

    // Education
    doc.fillColor("#ff7f00").fontSize(18).text("Education", 50, 230);
    doc.fillColor("#333333").fontSize(13).text("Bachelor of Science in Computer Science", 50, 260);
    doc.fillColor("#ff7f00").fontSize(12).text("University of Technology", 50, 275);
    doc.fillColor("#333333").fontSize(11).text("2012 - 2016", 400, 260, { align: "right" });
    doc.text(
      'Specialized in web development and software engineering. Completed thesis on "Modern JavaScript Frameworks and Performance Optimization".',
      50,
      295,
      { width: 500 }
    );

    // Projects Section
    doc.fillColor("#ff7f00").fontSize(18).text("Key Projects", 50, 350);
    
    // Project 1
    doc.fillColor("#333333").fontSize(13).text("E-Commerce Platform", 50, 380);
    doc.fillColor("#ff7f00").fontSize(11).text("React, Node.js, MongoDB", 50, 395);
    doc.fillColor("#333333").fontSize(11).text(
      "Full-featured e-commerce solution with payment integration, user authentication, and admin dashboard.",
      50,
      410,
      { width: 500 }
    );

    // Project 2
    doc.fillColor("#333333").fontSize(13).text("Task Management App", 50, 440);
    doc.fillColor("#ff7f00").fontSize(11).text("Next.js, TypeScript, PostgreSQL", 50, 455);
    doc.fillColor("#333333").fontSize(11).text(
      "Collaborative task management application with real-time updates and team features.",
      50,
      470,
      { width: 500 }
    );

    // Footer with page number
    doc.fillColor("#999999").fontSize(10).text("Page 2", 500, 750);

    doc.end();

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    return NextResponse.json({
      success: true,
      message: "CV generated successfully",
      filePath: "/Mohammed_Mesoud_Resume.pdf",
    });
  } catch (error) {
    console.error("Error generating CV:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error generating CV",
        error: error.message,
      },
      { status: 500 }
    );
  }
}