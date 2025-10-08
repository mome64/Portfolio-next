const fs = require("fs");
const path = require("path");

// Function to remove comments from a JavaScript/JSX file
function removeComments(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");

    // Remove single-line comments (//) but preserve URLs and other valid uses
    // More careful regex that avoids matching URLs (http://, https://, ftp://, etc.)
    content = content.replace(/(?<![:"'`])\/\/[^\n]*$/gm, "");

    // Remove multi-line comments (/* */) but preserve license comments if needed
    // Preserve comments that look like they might be important (containing copyright, license, etc.)
    content = content.replace(
      /\/\*((?!copyright|license|licensed)[\s\S])*?\*\//gi,
      ""
    );

    // Remove JSX comments ({/* */})
    content = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");

    // Remove any remaining empty JSX comment placeholders
    content = content.replace(/\{\s*\}/g, "");

    // Clean up extra blank lines (more than 2 consecutive newlines)
    content = content.replace(/\n{3,}/g, "\n\n");

    // Trim trailing whitespace from each line
    content = content.replace(/[ \t]+$/gm, "");

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Comments removed from ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Function to process all files in a directory recursively
function processDirectory(dirPath) {
  try {
    const items = fs.readdirSync(dirPath);

    items.forEach((item) => {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // Recursively process subdirectories
        processDirectory(itemPath);
      } else if (
        stat.isFile() &&
        (item.endsWith(".js") || item.endsWith(".jsx")) &&
        !item.endsWith(".config.js") &&
        !item.endsWith(".config.mjs")
      ) {
        // Process JavaScript/JSX files, but skip config files
        removeComments(itemPath);
      }
    });
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error.message);
  }
}

// Main execution
const componentsDir = path.join(__dirname, "app", "components");
const appDir = path.join(__dirname, "app");
console.log("Removing comments from component files...");
processDirectory(componentsDir);
console.log("Removing comments from main app files...");
processDirectory(appDir);
console.log("Comment removal completed!");
