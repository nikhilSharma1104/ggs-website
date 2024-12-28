const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import models
const AdmissionApplication = require('./models/AdmissionApplication');

// Routes
app.post('/api/admissions', async (req, res) => {
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
      message: 'Error submitting application',
      error: error.message
    });
  }
});

app.get('/api/admissions', async (req, res) => {
  try {
    const applications = await AdmissionApplication.find();
    res.status(200).json({
      success: true,
      data: applications
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error fetching applications',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
