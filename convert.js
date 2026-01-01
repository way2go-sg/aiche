import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// CONFIGURATION
const inputFolder = './src/assets/testimonials'; // Where your big images are
const outputFolder = './src/assets/testimonials-webp'; // Where new images go
const quality = 80; // 0-100 (80 is usually the sweet spot)

if (!fs.existsSync(outputFolder)){
    fs.mkdirSync(outputFolder);
}

fs.readdir(inputFolder, (err, files) => {
    if (err) console.log(err);
    else {
        files.forEach(file => {
            const inputPath = path.join(inputFolder, file);
            const extension = path.extname(file).toLowerCase();

            // Only process images
            if (['.jpg', '.jpeg', '.png'].includes(extension)) {
                const outputFilename = path.basename(file, extension) + '.webp';
                const outputPath = path.join(outputFolder, outputFilename);

                sharp(inputPath)
                    .webp({ quality: quality })
                    .toFile(outputPath)
                    .then(() => console.log(`Converted: ${file} -> ${outputFilename}`))
                    .catch(err => console.error(`Error converting ${file}:`, err));
            }
        });
    }
});