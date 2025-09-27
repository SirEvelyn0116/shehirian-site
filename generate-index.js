const fs = require('fs');
const path = require('path');

const previewsDir = path.join(__dirname, 'gh-pages');
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
    body {
      font-family: system-ui, sans-serif;
      background: #f9f9f9;
      color: #333;
      padding: 2rem;
      max-width: 800px;
      margin: auto;
    }
    h1 {
      font-size: 1.8rem;
      margin-bottom: 2rem;
      border-bottom: 1px solid #ddd;
      padding-bottom: 0.5rem;
    }
    .preview {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
      padding: 0.5rem;
      border-radius: 6px;
      transition: background 0.2s ease;
    }
    .preview:hover {
      background: #eee;
    }
    .preview img {
      width: 100px;
      height: auto;
      margin-right: 1rem;
      border-radius: 4px;
      border: 1px solid #ccc;
      object-fit: cover;
    }
    .preview .fallback {
      width: 100px;
      height: 75px;
      margin-right: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ddd;
      color: #666;
      font-size: 2rem;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
    .preview a {
      font-size: 1rem;
      color: #007acc;
      text-decoration: none;
    }
    .preview a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>Feature Branch Previews</h1>
  ${branches.map(branch => {
    const thumbJPG = `${branch}/thumbnail.jpg`;
    const thumbPNG = `${branch}/thumbnail.png`;
    const thumbPath = fs.existsSync(path.join(previewsDir, thumbJPG))
      ? thumbJPG
      : fs.existsSync(path.join(previewsDir, thumbPNG))
      ? thumbPNG
      : null;

    return `
      <div class="preview">
        ${
          thumbPath
            ? `<img src="./${thumbPath}" alt="${branch} thumbnail">`
            : `<div class="fallback">📄</div>`
        }
        <a href="./${branch}/index.html">${branch}</a>
      </div>
    `;
  }).join('')}
</body>
</html>
`;

fs.writeFileSync(indexPath, html.trim());
console.log(`✅ Generated index.html with ${branches.length} previews and thumbnails.`);
