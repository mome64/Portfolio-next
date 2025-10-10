const fs = require("fs");
const path = require("path");

// Check if we have the necessary dependencies
try {
  const sharp = require("sharp");

  // Convert logo-dark.png to logo-dark.jpg
  const inputPath = path.join(__dirname, "public", "images", "logo-dark.png");
  const outputPath = path.join(__dirname, "public", "images", "logo-dark.jpg");

  if (fs.existsSync(inputPath)) {
    sharp(inputPath)
      .jpeg({ quality: 90 })
      .toFile(outputPath)
      .then(() => {
        console.log("Successfully converted logo-dark.png to logo-dark.jpg");
      })
      .catch((err) => {
        console.error("Error converting image:", err);
      });
  } else {
    console.log("logo-dark.png not found, creating a simple placeholder");

    // Create a simple placeholder JPG file
    const placeholder = Buffer.from([
      0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00,
    ]);
    fs.writeFileSync(outputPath, placeholder);
    console.log("Created placeholder logo-dark.jpg");
  }
} catch (err) {
  console.log("sharp library not available, creating a simple placeholder");

  // Create a simple placeholder JPG file
  const outputPath = path.join(__dirname, "public", "images", "logo-dark.jpg");
  const placeholder = Buffer.from([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00,
  ]);
  fs.writeFileSync(outputPath, placeholder);
  console.log("Created placeholder logo-dark.jpg");
}
