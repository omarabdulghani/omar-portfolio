const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function parseTsToJsObject(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const result = ts.transpileModule(content, {
    compilerOptions: { module: ts.ModuleKind.CommonJS }
  });
  
  const tempFile = filePath.replace('.ts', '_temp.cjs');
  fs.writeFileSync(tempFile, result.outputText);
  
  const obj = require(tempFile);
  fs.unlinkSync(tempFile);
  return obj;
}

const enPath = path.join(__dirname, 'en.ts');
const nlPath = path.join(__dirname, 'nl.ts');

try {
  const enModule = parseTsToJsObject(enPath);
  const nlModule = parseTsToJsObject(nlPath);
  
  const enKeys = Object.keys(enModule)[0];
  const nlKeys = Object.keys(nlModule)[0];
  
  const en = enModule[enKeys];
  const nl = nlModule[nlKeys];

  let missingInNl = [];
  let missingInEn = [];

  function compareObjects(obj1, obj2, currentPath = '', obj1Name = 'en', obj2Name = 'nl') {
    const keys1 = Object.keys(obj1 || {});
    const keys2 = Object.keys(obj2 || {});

    keys1.forEach(key => {
      const newPath = currentPath ? `${currentPath}.${key}` : key;
      if (!keys2.includes(key)) {
        if (obj1Name === 'en') missingInNl.push(newPath);
        else missingInEn.push(newPath);
      } else {
        if (typeof obj1[key] === 'object' && obj1[key] !== null && !Array.isArray(obj1[key])) {
          compareObjects(obj1[key], obj2[key], newPath, obj1Name, obj2Name);
        }
      }
    });
  }

  compareObjects(en, nl, '', 'en', 'nl');
  compareObjects(nl, en, '', 'nl', 'en');

  console.log(JSON.stringify({ missingInNl, missingInEn }, null, 2));
} catch(e) {
  console.error(e);
}
