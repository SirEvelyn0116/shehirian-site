const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const previewsDir = __dirname;
const indexPath = path.join(previewsDir, 'index.html');

// Helper function to get last commit time for a branch directory
function getLastCommitTime(branchPath) {
  try {
    // Try to get the last commit timestamp from the branch's git history
    const gitDir = path.join(branchPath, '.git');
    if (fs.existsSync(gitDir)) {
      const timestamp = execSync(
        'git log -1 --format=%ct',
        { cwd: branchPath, encoding: 'utf8' }
      ).trim();
      if (timestamp) {
        return new Date(parseInt(timestamp) * 1000);
      }
    }
  } catch (err) {
    // If git command fails, fall back to directory mtime
  }
  
  // Fallback to directory modification time
  const stat = fs.statSync(branchPath);
  return stat.mtime;
}

// Get all directories, filter out deleted branches, and sort by last modified date
const branches = fs.readdirSync(previewsDir)
  .filter(name => {
    const fullPath = path.join(previewsDir, name);
    try {
      const stat = fs.statSync(fullPath);
      // Only include directories that have an index.html file (valid previews)
      return stat.isDirectory() && fs.existsSync(path.join(fullPath, 'index.html'));
    } catch (err) {
      // Skip if path doesn't exist or can't be accessed
      return false;
    }
  })
  .map(name => {
    const fullPath = path.join(previewsDir, name);
    const mtime = getLastCommitTime(fullPath);
    return {
      name,
      mtime: mtime,
      mtimeStr: mtime.toLocaleString('en-US', { 
        timeZone: 'America/New_York',
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  })
  .sort((a, b) => b.mtime - a.mtime); // Sort by most recent first

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
    .preview-info {
      flex: 1;
    }
    .preview a {
      font-size: 1rem;
      color: #007acc;
      text-decoration: none;
      display: block;
      margin-bottom: 0.25rem;
    }
    .preview a:hover {
      text-decoration: underline;
    }
    .preview .date {
      font-size: 0.85rem;
      color: #666;
    }
  </style>
</head>
<body>
  <h1>Feature Branch Previews</h1>
  ${branches.map(branchObj => {
    const branch = branchObj.name;
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
        <div class="preview-info">
          <a href="./${branch}/index.html">${branch}</a>
          <div class="date">Last updated: ${branchObj.mtimeStr}</div>
        </div>
      </div>
    `;
  }).join('')}
</body>
</html>
`;

fs.writeFileSync(indexPath, html.trim());
console.log(`✅ Generated index.html with ${branches.length} previews and thumbnails.`);
