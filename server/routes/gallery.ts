import express from 'express';
import multer from 'multer';
import { uploadToGoogleDrive, listGalleryImages, deleteFromGoogleDrive } from '../config/googleDrive';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for images
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only image files are allowed!'));
    }
  }
});

// Upload image to gallery
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { fileId, webViewLink } = await uploadToGoogleDrive(req.file, 'gallery');

    res.status(201).json({
      message: 'Image uploaded successfully',
      fileId,
      webViewLink
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});

// Get all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await listGalleryImages();
    res.json(images);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    res.status(500).json({ error: 'Error fetching gallery images' });
  }
});

// Delete image from gallery
router.delete('/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    await deleteFromGoogleDrive(fileId);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Error deleting image' });
  }
});

export default router;
