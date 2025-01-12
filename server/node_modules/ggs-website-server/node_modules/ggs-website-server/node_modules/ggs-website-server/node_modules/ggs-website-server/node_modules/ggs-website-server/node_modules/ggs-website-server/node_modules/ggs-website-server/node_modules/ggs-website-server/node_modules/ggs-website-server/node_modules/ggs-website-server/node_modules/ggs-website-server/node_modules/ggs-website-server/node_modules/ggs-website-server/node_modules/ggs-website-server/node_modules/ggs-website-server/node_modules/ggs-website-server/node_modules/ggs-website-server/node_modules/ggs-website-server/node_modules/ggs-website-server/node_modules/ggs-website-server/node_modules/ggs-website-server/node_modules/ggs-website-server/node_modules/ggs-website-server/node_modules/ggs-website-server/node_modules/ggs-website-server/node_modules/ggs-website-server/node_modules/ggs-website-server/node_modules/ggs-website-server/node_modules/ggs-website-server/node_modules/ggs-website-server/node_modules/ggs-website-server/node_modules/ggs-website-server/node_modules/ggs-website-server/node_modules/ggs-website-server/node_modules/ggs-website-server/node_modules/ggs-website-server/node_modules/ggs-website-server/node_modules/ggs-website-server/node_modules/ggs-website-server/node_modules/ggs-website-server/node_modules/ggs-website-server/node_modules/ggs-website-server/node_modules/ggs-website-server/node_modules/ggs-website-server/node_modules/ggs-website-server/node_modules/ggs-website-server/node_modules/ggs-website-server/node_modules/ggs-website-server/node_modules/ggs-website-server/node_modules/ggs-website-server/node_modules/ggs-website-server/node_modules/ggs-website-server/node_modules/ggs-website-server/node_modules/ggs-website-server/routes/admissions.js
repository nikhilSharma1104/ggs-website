const express = require('express');
const router = express.Router();
const AdmissionApplication = require('../models/AdmissionApplication');

// POST /api/admissions - Submit a new admission application
router.post('/', async (req, res) => {
  try {
    const application = new AdmissionApplication(req.body);
    await application.save();
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
