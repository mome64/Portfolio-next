const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Ensure the favicon directory exists
const faviconDir = path.join(__dirname, 'public', 'favicon');
if (!fs.existsSync(faviconDir)) {
  fs.mkdirSync(faviconDir, { recursive: true });
}

// Input logo path
const logoPath = path.join(__dirname, 'public', 'images', 'Logo.jpg');

// Generate different favicon sizes
const sizes = [16, 32, 48, 192, 512];

async function generateFavicons() {
  try {
    console.log('Generating favicons...');
    
    // Generate PNG favicons
    for (const size of sizes) {
      const outputPath = path.join(faviconDir, `favicon-${size}x${size}.png`);
      await sharp(logoPath)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`Generated ${size}x${size} favicon`);
    }
    
    // Generate apple touch icon
    const appleIconPath = path.join(faviconDir, 'apple-touch-icon.png');
    await sharp(logoPath)
      .resize(180, 180)
      .png()
      .toFile(appleIconPath);
    console.log('Generated apple touch icon');
    
    console.log('Favicon generation complete!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();