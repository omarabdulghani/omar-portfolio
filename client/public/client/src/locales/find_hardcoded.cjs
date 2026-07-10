const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

const srcDir = path.join(__dirname, '..'); // point to src
const results = [];

walkDir(srcDir, (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Simple regex to find text between JSX tags that are mostly alphabetical and not just spaces/symbols
    // like > Some text here <
    const regex = />([^<>{]*[a-zA-Z]{3,}[^<>{]*)</g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const text = match[1].trim();
      // ignore if it's just a variable, empty, or special chars
      if (text.length > 2 && /[a-zA-Z]/.test(text) && !text.includes('messages.') && !text.includes('px') && !text.includes('rem')) {
        results.push({
          file: path.relative(srcDir, filePath),
          text: text
        });
      }
    }
  }
});

const grouped = {};
results.forEach(r => {
  if (!grouped[r.file]) grouped[r.file] = [];
  grouped[r.file].push(r.text);
});

console.log(JSON.stringify(grouped, null, 2));
