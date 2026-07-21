const fs = require('fs');
const { SVGPathData } = require('svg-pathdata');

const svgFile = 'C:\\Users\\oabd3\\OneDrive\\Desktop\\VibeCoding-Projects\\My Portfolio\\omar-portfolio\\client\\public\\client\\public\\logo.svg';
// Read the original from Downloads to be safe
const origSvgFile = 'C:\\Users\\oabd3\\Downloads\\vectorised-760f92c0.svg';
let content = fs.readFileSync(origSvgFile, 'utf8');

// Match all <path ... d="..." />
const pathRegex = /<path([^>]*)d="([^"]+)"([^>]*)>/g;

let newPaths = [];

let match;
while ((match = pathRegex.exec(content)) !== null) {
  const [fullMatch, before, d, after] = match;
  
  // Clean out any existing fill attributes
  const cleanBefore = before.replace(/fill="[^"]*"/g, '');
  const cleanAfter = after.replace(/fill="[^"]*"/g, '');
  
  // Parse and convert to absolute
  const pathData = new SVGPathData(d).toAbs();
  
  let currentSubpath = [];
  let subpaths = [];
  
  for (const cmd of pathData.commands) {
    if (cmd.type === SVGPathData.MOVE_TO) {
      if (currentSubpath.length > 0) {
        subpaths.push(currentSubpath);
      }
      currentSubpath = [cmd];
    } else {
      currentSubpath.push(cmd);
    }
  }
  if (currentSubpath.length > 0) {
    subpaths.push(currentSubpath);
  }
  
  for (const sub of subpaths) {
    // Check bounding box of the subpath
    let maxX = 0;
    for (const cmd of sub) {
      if (cmd.x !== undefined && cmd.x > maxX) {
        maxX = cmd.x;
      }
    }
    
    // Convert back to string
    const newD = new SVGPathData(sub).encode();
    
    // If it's the dot (maxX > 2500), color it blue, else keep original fill
    if (maxX > 2500) {
      newPaths.push(`<path ${cleanBefore} fill="#3b82f6" d="${newD}" ${cleanAfter}/>`);
    } else {
      newPaths.push(`<path ${cleanBefore} fill="#FFF" d="${newD}" ${cleanAfter}/>`);
    }
  }
}

// Replace the original paths with the new ones
const newContent = content.replace(/<path[^>]+>/g, '') // remove old paths
    .replace('</svg>', newPaths.join('\n') + '\n</svg>');

fs.writeFileSync(svgFile, newContent, 'utf8');
console.log("Done modifying SVG safely!");
