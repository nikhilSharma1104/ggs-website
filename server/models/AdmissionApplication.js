const mongoose = require('mongoose');

const admissionApplicationSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Student name is required']
  },
  grade: {
    type: String,
    required: [true, 'Grade is required']
  },
  parentName: {
    type: String,
    required: [true, 'Parent name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
  },
  message: {
    type: String
  },
  applicationStatus: {
    type: String,
    enum: ['pending', 'under_review', 'accepted', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'admissionformdata' });

module.exports = mongoose.model('AdmissionApplication', admissionApplicationSchema);
