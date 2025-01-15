import express from 'express';
import multer from 'multer';
import JobApplication from '../models/JobApplication';
import { uploadToGoogleDrive } from '../services/googleDrive';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Submit a new job application
router.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    // Upload resume to Google Drive if file is present
    let resumeUrl = null;
    if (req.file) {
      const uploadResult = await uploadToGoogleDrive(req.file);
      resumeUrl = uploadResult.webViewLink;
    }

    // Create application with resume URL
    const applicationData = {
      ...req.body,
      resumeUrl,
    };

    const application = new JobApplication(applicationData);
    await application.save();

    res.status(201).json({ 
      message: 'Application submitted successfully', 
      application,
    });
  } catch (error) {
    console.error('Error in job application:', error);
    res.status(400).json({ 
      message: 'Error submitting application', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Get all applications (admin only - you should add authentication)
router.get('/applications', async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error });
  }
});

export default router;
