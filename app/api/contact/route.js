import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Log incoming request for debugging
    console.log("Contact form submission:", { name, email, message });

    // Validate input
    if (!name || !email || !message) {
      console.log("Missing required fields");
      return NextResponse.json(
        {
          error: "Missing required fields",
          fields: { name: !!name, email: !!email, message: !!message },
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format:", email);
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if environment variables are set
    if (!process.env.CONTACT_EMAIL || !process.env.CONTACT_EMAIL_PASSWORD) {
      console.error("Missing environment variables for email configuration");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create transporter using environment variables with more robust configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log("SMTP transporter verified successfully");
    } catch (verifyError) {
      console.error("SMTP transporter verification failed:", verifyError);
      return NextResponse.json(
        {
          error: "Email service configuration error",
          details: verifyError.message,
        },
        { status: 500 }
      );
    }

    // Define email options
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Portfolio Contact Form - ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #007bff, #0056b3);
              color: white;
              padding: 30px 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 600;
            }
            .content {
              padding: 30px;
            }
            .content p {
              margin: 15px 0;
              font-size: 16px;
            }
            .field-label {
              font-weight: bold;
              color: #007bff;
              display: block;
              margin-bottom: 5px;
            }
            .field-value {
              background-color: #f8f9fa;
              padding: 12px 15px;
              border-left: 4px solid #007bff;
              border-radius: 4px;
              margin-bottom: 20px;
            }
            .message-content {
              background-color: #f8f9fa;
              padding: 15px;
              border-radius: 4px;
              border-left: 4px solid #28a745;
            }
            .footer {
              background-color: #f1f1f1;
              padding: 20px;
              text-align: center;
              font-size: 14px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <p>You have received a new message through your portfolio contact form.</p>
              
              <div class="field-value">
                <span class="field-label">Name:</span>
                <span>${name}</span>
              </div>
              
              <div class="field-value">
                <span class="field-label">Email:</span>
                <span>${email}</span>
              </div>
              
              <div class="field-value">
                <span class="field-label">Message:</span>
                <div class="message-content">${message.replace(
                  /\n/g,
                  "<br>"
                )}</div>
              </div>
            </div>
            <div class="footer">
              <p>This message was sent from your portfolio website contact form.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    console.log("Sending email with options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", info.messageId);

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully!",
        messageId: info.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // More detailed error logging
    if (error.code) {
      console.error("Error code:", error.code);
    }
    if (error.command) {
      console.error("Error command:", error.command);
    }

    return NextResponse.json(
      { error: "Failed to send message", details: error.message },
      { status: 500 }
    );
  }
}
