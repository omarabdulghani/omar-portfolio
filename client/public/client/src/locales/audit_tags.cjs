const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', '..', '..', 'client', 'src');
// Adjusting path properly assuming we're running it from somewhere
const portfolioPath = path.resolve(__dirname, 'c:/Users/oabd3/OneDrive/Desktop/VibeCoding-Projects/My Portfolio/omar-portfolio/client/public/client/src/pages/Portfolio.tsx');
const projectDetailPath = path.resolve(__dirname, 'c:/Users/oabd3/OneDrive/Desktop/VibeCoding-Projects/My Portfolio/omar-portfolio/client/public/client/src/pages/ProjectDetail.tsx');

function extractTagsFromPortfolio(content) {
  const projectRegex = /id:\s*"([^"]+)"[\s\S]*?tags:\s*\[(.*?)\]/g;
  let match;
  const tagsMap = {};
  while ((match = projectRegex.exec(content)) !== null) {
    const id = match[1];
    const tagsRaw = match[2];
    const tags = tagsRaw.split(',').map(t => t.trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '')).filter(t => t);
    tagsMap[id] = tags;
  }
  return tagsMap;
}

function extractTagsFromDetail(content) {
  // It's a Record<string, any> object
  const projectRegex = /"([^"]+)":\s*\{[\s\S]*?tags:\s*\[(.*?)\]/g;
  let match;
  const tagsMap = {};
  while ((match = projectRegex.exec(content)) !== null) {
    const id = match[1];
    const tagsRaw = match[2];
    const tags = tagsRaw.split(',').map(t => t.trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '')).filter(t => t);
    tagsMap[id] = tags;
  }
  return tagsMap;
}

try {
  const pContent = fs.readFileSync(portfolioPath, 'utf8');
  const dContent = fs.readFileSync(projectDetailPath, 'utf8');

  const pTags = extractTagsFromPortfolio(pContent);
  const dTags = extractTagsFromDetail(dContent);

  const results = {};
  for (const id in pTags) {
    results[id] = {
      portfolioTags: pTags[id],
      detailTags: dTags[id] || []
    };
  }

  console.log(JSON.stringify(results, null, 2));

} catch (e) {
  console.error(e);
}
