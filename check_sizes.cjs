const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getFiles(fullPath, files);
    } else if (/\.(jpg|jpeg|png|webp|avif|svg)$/i.test(entry.name)) {
      const stats = fs.statSync(fullPath);
      files.push({
        path: fullPath.replace(__dirname, ''),
        sizeKB: (stats.size / 1024).toFixed(1),
        sizeBytes: stats.size
      });
    }
  }
  return files;
}

const assetsDir = path.join(__dirname, 'src', 'assets');
if (fs.existsSync(assetsDir)) {
  const images = getFiles(assetsDir);
  images.sort((a, b) => b.sizeBytes - a.sizeBytes);
  console.log('Top 15 largest image files:');
  images.slice(0, 15).forEach(img => {
    console.log(`- ${img.path}: ${img.sizeKB} KB`);
  });
  
  const totalSize = images.reduce((acc, img) => acc + img.sizeBytes, 0);
  console.log(`Total image size: ${(totalSize / 1024 / 1024).toFixed(2)} MB in ${images.length} files`);
} else {
  console.log('src/assets directory not found');
}
