import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, "Mohammed_Mesoud_Resume.pdf");


    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "CV file not found" }, { status: 404 });
    }


    const fileBuffer = fs.readFileSync(filePath);


    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="Mohammed_Mesoud_Resume.pdf"',
      },
    });
  } catch (error) {
    console.error("Error serving CV:", error);
    return NextResponse.json({ error: "Failed to serve CV" }, { status: 500 });
  }
}
