import express from 'express';
import multer from 'multer';
import { uploadToGoogleDrive } from '../config/googleDrive';
import JobApplication from '../models/JobApplication';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/msword' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .pdf, .doc and .docx format allowed!'));
    }
  }
});

// Submit job application
router.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    const { 
      position, 
      department,
      firstName,
      lastName,
      email,
      phone,
      experience,
      education,
      coverLetter 
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    // Upload file to Google Drive
    const { fileId, webViewLink } = await uploadToGoogleDrive(req.file, 'resume');

    // Create new job application
    const application = new JobApplication({
      position,
      department,
      firstName,
      lastName,
      email,
      phone,
      experience,
      education,
      resume: {
        fileId,
        webViewLink
      },
      coverLetter
    });

    await application.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      applicationId: application._id
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Error submitting application' });
  }
});

export default router;
