import express from 'express';
import multer from 'multer';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import libre from 'libreoffice-convert';
import sharp from 'sharp';

const libreConvert = promisify(libre.convert);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('dist'));

// Convert to PDF
app.post('/convert-to-pdf', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const inputPath = req.file.path;
  const outputPath = path.join(__dirname, 'downloads', `${req.file.originalname}.pdf`);

  try {
    let pdfBuffer;

    if (req.file.mimetype.includes('image')) {
      // Convert image to PDF
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([metadata.width, metadata.height]);
      
      const imageEmbed = await pdfDoc.embedJpg(await fs.promises.readFile(inputPath));
      page.drawImage(imageEmbed, {
        x: 0,
        y: 0,
        width: metadata.width,
        height: metadata.height,
      });
      
      pdfBuffer = await pdfDoc.save();
    } else if (req.file.mimetype.includes('officedocument')) {
      // Convert Office document to PDF
      const docxBuf = await fs.promises.readFile(inputPath);
      pdfBuffer = await libreConvert(docxBuf, '.pdf', undefined);
    } else {
      // Assume it's a text file and create a simple PDF
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const content = await fs.promises.readFile(inputPath, 'utf-8');
      page.drawText(content, {
        x: 50,
        y: page.getHeight() - 50,
        size: 12,
      });
      pdfBuffer = await pdfDoc.save();
    }

    await fs.promises.writeFile(outputPath, pdfBuffer);

    res.download(outputPath, `${req.file.originalname}.pdf`, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      }

      // Clean up temporary files
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  } catch (error) {
    console.error('Error converting file:', error);
    res.status(500).send('Error converting file');
  }
});

// Split PDF
app.post('/split-pdf', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const inputPath = req.file.path;
  const outputDir = path.join(__dirname, 'downloads');

  try {
    const pdfDoc = await PDFDocument.load(await fs.promises.readFile(inputPath));
    const pageCount = pdfDoc.getPageCount();

    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);

      const pdfBytes = await newPdf.save();
      await fs.promises.writeFile(path.join(outputDir, `page_${i + 1}.pdf`), pdfBytes);
    }

    // Create a zip file of all split PDFs
    // Note: You'll need to implement this part, possibly using a library like 'archiver'

    res.download(zipPath, 'split_pdfs.zip', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      }

      // Clean up temporary files
      fs.unlinkSync(inputPath);
      // Delete all split PDFs and zip file
    });
  } catch (error) {
    console.error('Error splitting PDF:', error);
    res.status(500).send('Error splitting PDF');
  }
});

// Merge PDFs
app.post('/merge-pdfs', upload.array('files'), async (req, res) => {
  if (!req.files || req.files.length < 2) {
    return res.status(400).send('At least two files are required for merging.');
  }

  const outputPath = path.join(__dirname, 'downloads', 'merged.pdf');

  try {
    const mergedPdf = await PDFDocument.create();

    for (const file of req.files) {
      const pdfDoc = await PDFDocument.load(await fs.promises.readFile(file.path));
      const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    await fs.promises.writeFile(outputPath, pdfBytes);

    res.download(outputPath, 'merged.pdf', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      }

      // Clean up temporary files
      req.files.forEach((file) => fs.unlinkSync(file.path));
      fs.unlinkSync(outputPath);
    });
  } catch (error) {
    console.error('Error merging PDFs:', error);
    res.status(500).send('Error merging PDFs');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});