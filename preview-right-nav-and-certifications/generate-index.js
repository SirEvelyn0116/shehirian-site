const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const previewsDir = __dirname;
const indexPath = path.join(previewsDir, 'index.html');

// Load branch configuration from branches.json
let branchConfig = { branches: [] };
const configPath = path.join(previewsDir, 'branches.json');
if (fs.existsSync(configPath)) {
  try {
    branchConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (err) {
    console.warn('Warning: Could not parse branches.json, using defaults');
  }
}

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

// Helper function to format date in EST/EDT
function formatDateEST(date) {
  return date.toLocaleString('en-US', { 
    timeZone: 'America/New_York',
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

// Helper function to calculate time since last modified
function getTimeSince(date) {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'just now';
}

// Get all directories with valid index.html files
const existingBranches = fs.readdirSync(previewsDir)
  .filter(name => {
    const fullPath = path.join(previewsDir, name);
    try {
      const stat = fs.statSync(fullPath);
      return stat.isDirectory() && fs.existsSync(path.join(fullPath, 'index.html'));
    } catch (err) {
      return false;
    }
  });

// Merge configuration with actual directories
const branches = existingBranches.map(name => {
  const fullPath = path.join(previewsDir, name);
  const lastModified = getLastCommitTime(fullPath);
  
  // Find configuration for this branch
  const config = branchConfig.branches.find(b => b.name === name) || {};
  
  // Parse dates from config or use current time as fallback
  const created = config.created ? new Date(config.created) : lastModified;
  
  return {
    name,
    type: config.type || 'feature',
    created: created,
    createdStr: formatDateEST(created),
    lastModified: lastModified,
    lastModifiedStr: formatDateEST(lastModified),
    timeSince: getTimeSince(lastModified)
  };
});

// Separate branches by type
const previews = branches.filter(b => b.type === 'preview').sort((a, b) => b.lastModified - a.lastModified);
const features = branches.filter(b => b.type === 'feature').sort((a, b) => b.lastModified - a.lastModified);

// Helper function to render a branch item
function renderBranch(branchObj) {
  const thumbJPG = `${branchObj.name}/thumbnail.jpg`;
  const thumbPNG = `${branchObj.name}/thumbnail.png`;
  const thumbPath = fs.existsSync(path.join(previewsDir, thumbJPG))
    ? thumbJPG
    : fs.existsSync(path.join(previewsDir, thumbPNG))
    ? thumbPNG
    : null;

  return `
    <div class="preview">
      ${
        thumbPath
          ? `<img src="./${thumbPath}" alt="${branchObj.name} thumbnail">`
          : `<div class="fallback">📄</div>`
      }
      <div class="preview-info">
        <a href="./${branchObj.name}/index.html">${branchObj.name}</a>
        <div class="metadata">
          <div class="date">Created: ${branchObj.createdStr}</div>
          <div class="date">Last modified: ${branchObj.lastModifiedStr}</div>
          <div class="time-since">${branchObj.timeSince}</div>
        </div>
      </div>
    </div>
  `;
}

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
      margin-bottom: 1rem;
      border-bottom: 1px solid #ddd;
      padding-bottom: 0.5rem;
    }
    h2 {
      font-size: 1.4rem;
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: #555;
    }
    .section-divider {
      margin: 2rem 0;
      border-top: 2px solid #ccc;
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
      font-size: 1.1rem;
      color: #007acc;
      text-decoration: none;
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    .preview a:hover {
      text-decoration: underline;
    }
    .metadata {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }
    .preview .date {
      font-size: 0.85rem;
      color: #666;
    }
    .preview .time-since {
      font-size: 0.85rem;
      color: #888;
      font-style: italic;
      margin-top: 0.15rem;
    }
    .empty-message {
      color: #999;
      font-style: italic;
      padding: 1rem;
    }
  </style>
</head>
<body>
  <h1>Branch Previews</h1>
  
  <h2>Previews</h2>
  ${previews.length > 0 
    ? previews.map(renderBranch).join('') 
    : '<div class="empty-message">No preview branches available</div>'
  }
  
  <div class="section-divider"></div>
  
  <h2>Feature Tests</h2>
  ${features.length > 0 
    ? features.map(renderBranch).join('') 
    : '<div class="empty-message">No feature test branches available</div>'
  }
</body>
</html>
`;

fs.writeFileSync(indexPath, html.trim());
console.log(`✅ Generated index.html with ${previews.length} preview(s) and ${features.length} feature test(s).`);
