import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.tiff', '.bmp'];

async function getImageFiles(dir) {
  let imageFiles = [];
  const items = await fs.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      imageFiles.push(...(await getImageFiles(fullPath)));
    } else if (IMAGE_EXTENSIONS.includes(path.extname(item.name).toLowerCase())) {
      imageFiles.push(fullPath);
    }
  }

  return imageFiles;
}

async function convertToWebP(imagePath) {
  const ext = path.extname(imagePath);
  const outputPath = imagePath.replace(ext, '.webp');

  // Skip se il file webp esiste già
  try {
    await fs.access(outputPath);
    console.log(`⏭️  Saltato (già convertito): ${path.relative(PUBLIC_DIR, imagePath)}`);
    return;
  } catch {
    // File non esiste, procedi con la conversione
  }

  try {
    await sharp(imagePath).webp({ quality: 85 }).toFile(outputPath);

    const originalStats = await fs.stat(imagePath);
    const webpStats = await fs.stat(outputPath);
    const savings = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1);

    console.log(
      `✅ Convertito: ${path.relative(PUBLIC_DIR, imagePath)} → ${path.basename(outputPath)} (risparmio: ${savings}%)`,
    );

    // Rimuovi il file originale
    await fs.unlink(imagePath);
  } catch (error) {
    console.error(`❌ Errore nella conversione di ${path.relative(PUBLIC_DIR, imagePath)}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Inizio conversione immagini in WebP...\n');

  try {
    const imageFiles = await getImageFiles(PUBLIC_DIR);

    const items = await fs.readdir(PUBLIC_DIR, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(PUBLIC_DIR, item.name);

      if (item.isDirectory()) {
        imageFiles.push(...(await getImageFiles(fullPath)));
      } else if (IMAGE_EXTENSIONS.includes(path.extname(item.name).toLowerCase())) {
        imageFiles.push(fullPath);
      }
    }

    if (imageFiles.length === 0) {
      console.log('ℹ️  Nessuna immagine trovata da convertire.');
      return;
    }

    console.log(`📸 Trovate ${imageFiles.length} immagini da processare\n`);

    for (const imagePath of imageFiles) {
      await convertToWebP(imagePath);
    }

    console.log('\n✨ Conversione completata!');
  } catch (error) {
    console.error('❌ Errore durante la conversione:', error);
    process.exit(1);
  }
}

main();
