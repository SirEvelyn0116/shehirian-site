// generate-index.js
const fs = require('fs');
const path = require('path');

const previewsDir = path.join(__dirname, 'previews');
const indexPath = path.join(previewsDir, 'index.html');

const branches = fs.readdirSync(previewsDir).filter(name => {
  const fullPath = path.join(previewsDir, name);
  return fs.statSync(fullPath).isDirectory();
});

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Branch Previews</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; }
    h1 { font-size: 1.5rem; margin-bottom: 1rem; }
    ul { list-style: none; padding: 0; }
    li { margin: 0.5rem 0; }
    a { text-decoration: none; color: #007acc; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Feature Branch Previews</h1>
  <ul>
    ${branches.map(branch => `
      <li><a href="./${branch}/index.html">${branch}</a></li>
    `).join('')}
  </ul>
</body>
</html>
`;

fs.writeFileSync(indexPath, html.trim());
console.log(`✅ Generated index.html with ${branches.length} branch previews.`);
