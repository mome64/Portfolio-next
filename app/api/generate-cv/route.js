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


    doc.fillColor("#ff7f00").fontSize(24).text("Mohammed Mesoud", 50, 50);

    doc
      .fillColor("#000000")
      .fontSize(14)
      .text("Senior Full Stack Developer", 50, 80);


    doc
      .fontSize(10)
      .text("San Francisco, CA", 400, 50, { align: "right" })
      .text("hello@example.com", 400, 65, { align: "right" })
      .text("(123) 456-7890", 400, 80, { align: "right" })
      .text("linkedin.com/in/mohammedmesoud", 400, 95, { align: "right" });


    doc
      .moveTo(50, 120)
      .lineTo(550, 120)
      .lineWidth(2)
      .strokeColor("#ff7f00")
      .stroke();


    doc.fillColor("#ff7f00").fontSize(16).text("Professional Summary", 50, 140);

    doc
      .fillColor("#000000")
      .fontSize(10)
      .text(
        "Passionate Full Stack Developer with over 5 years of experience creating modern web applications. ",
        50,
        170,
        { continued: true }
      )
      .text(
        "Specializing in React, Next.js, and Node.js with a strong focus on user experience and performance. ",
        50,
        185,
        { continued: true }
      )
      .text(
        "Proven track record of delivering scalable solutions for enterprise clients.",
        50,
        200
      );


    doc.fillColor("#ff7f00").fontSize(16).text("Technical Skills", 50, 230);

    doc
      .fillColor("#000000")
      .fontSize(10)
      .text("• React", 50, 260)
      .text("• Next.js", 50, 275)
      .text("• JavaScript", 50, 290)
      .text("• TypeScript", 50, 305)
      .text("• Node.js", 50, 320)
      .text("• Python", 50, 335)
      .text("• MongoDB", 150, 260)
      .text("• PostgreSQL", 150, 275)
      .text("• AWS", 150, 290)
      .text("• Docker", 150, 305)
      .text("• Git", 150, 320)
      .text("• UI/UX Design", 150, 335);


    doc
      .fillColor("#ff7f00")
      .fontSize(16)
      .text("Professional Experience", 50, 370);


    doc
      .fillColor("#000000")
      .fontSize(12)
      .text("Senior Full Stack Developer", 50, 400);

    doc
      .fillColor("#ff7f00")
      .fontSize(11)
      .text("Tech Innovations Inc.", 50, 415);

    doc
      .fillColor("#000000")
      .fontSize(10)
      .text("2020 - Present", 400, 400, { align: "right" })
      .text(
        "• Led development of scalable web applications using React, Node.js, and cloud technologies",
        50,
        435
      )
      .text(
        "• Implemented microservices architecture reducing latency by 40%",
        50,
        450
      )
      .text(
        "• Mentored junior developers and established CI/CD pipelines",
        50,
        465
      );


    doc.fillColor("#000000").fontSize(12).text("Frontend Developer", 50, 490);

    doc
      .fillColor("#ff7f00")
      .fontSize(11)
      .text("Digital Solutions Ltd.", 50, 505);

    doc
      .fillColor("#000000")
      .fontSize(10)
      .text("2018 - 2020", 400, 490, { align: "right" })
      .text(
        "• Developed responsive web applications for enterprise clients",
        50,
        525
      )
      .text(
        "• Improved page load speed by 35% through optimization techniques",
        50,
        540
      )
      .text(
        "• Collaborated with UX designers to implement pixel-perfect interfaces",
        50,
        555
      );


    doc.fillColor("#000000").fontSize(12).text("Web Developer", 50, 580);

    doc.fillColor("#ff7f00").fontSize(11).text("Creative Web Agency", 50, 595);

    doc
      .fillColor("#000000")
      .fontSize(10)
      .text("2016 - 2018", 400, 580, { align: "right" })
      .text(
        "• Built custom websites and e-commerce solutions for small to medium businesses",
        50,
        615
      )
      .text("• Managed client relationships and project timelines", 50, 630);


    doc.fillColor("#ff7f00").fontSize(16).text("Education", 50, 660);

    doc
      .fillColor("#000000")
      .fontSize(12)
      .text("Bachelor of Science in Computer Science", 50, 690);

    doc
      .fillColor("#ff7f00")
      .fontSize(11)
      .text("University of Technology", 50, 705);

    doc
      .fillColor("#000000")
      .fontSize(10)
      .text("2012 - 2016", 400, 690, { align: "right" })
      .text(
        'Specialized in web development and software engineering. Completed thesis on "Modern JavaScript Frameworks and Performance Optimization".',
        50,
        725,
        { width: 500 }
      );


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
