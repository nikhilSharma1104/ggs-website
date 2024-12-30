import express from 'express';
import JobApplication from '../models/JobApplication';

const router = express.Router();

// Submit a new job application
router.post('/apply', async (req, res) => {
  try {
    const application = new JobApplication(req.body);
    await application.save();
    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting application', error });
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
