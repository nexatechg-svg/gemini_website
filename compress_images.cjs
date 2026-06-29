const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function getFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getFiles(fullPath, files);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

const assetsDir = path.join(__dirname, 'src', 'assets');

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  // Read file stats
  const originalStats = fs.statSync(filePath);
  const originalSize = originalStats.size;
  
  if (originalSize < 10 * 1024) {
    // Skip very small files under 10KB
    console.log(`Skipping tiny file: ${path.basename(filePath)} (${(originalSize/1024).toFixed(1)} KB)`);
    return;
  }

  try {
    const s = sharp(filePath);
    const metadata = await s.metadata();
    
    // Choose sensible maximum dimensions
    let resized = s;
    const maxWidth = 1200; // Perfect for web images
    if (metadata.width && metadata.width > maxWidth) {
      resized = s.resize({ width: maxWidth, withoutEnlargement: true });
      console.log(`Resizing: ${path.basename(filePath)} from width ${metadata.width} to ${maxWidth}`);
    }

    let buffer;
    if (ext === '.webp') {
      buffer = await resized.webp({ quality: 75, effort: 4 }).toBuffer();
    } else if (ext === '.jpg' || ext === '.jpeg') {
      buffer = await resized.jpeg({ quality: 75, progressive: true, mozjpeg: true }).toBuffer();
    } else if (ext === '.png') {
      // Convert PNG to optimized PNG, or check if we should keep PNG
      buffer = await resized.png({ compressionLevel: 9, palette: true, quality: 75 }).toBuffer();
    }

    if (buffer && buffer.length < originalSize) {
      fs.writeFileSync(filePath, buffer);
      const savings = originalSize - buffer.length;
      console.log(`Optimized: ${path.basename(filePath)} | Original: ${(originalSize/1024).toFixed(1)}KB -> Compressed: ${(buffer.length/1024).toFixed(1)}KB | Saved: ${(savings / originalSize * 100).toFixed(1)}%`);
    } else {
      console.log(`Kept original for: ${path.basename(filePath)} (compression didn't reduce size)`);
    }
  } catch (err) {
    console.error(`Error compressing ${filePath}:`, err.message);
  }
}

async function run() {
  if (!fs.existsSync(assetsDir)) {
    console.error('Assets directory not found');
    return;
  }
  
  console.log('--- Starting Image Compression ---');
  const files = getFiles(assetsDir);
  console.log(`Found ${files.length} images to process...`);
  
  for (const file of files) {
    await compressImage(file);
  }
  
  console.log('--- Image Compression Complete ---');
}

run().catch(console.error);
