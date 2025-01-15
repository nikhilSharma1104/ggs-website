import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
    enum: ['Teacher', 'Administrative Staff', 'Support Staff']
  },
  department: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  resumeUrl: {
    type: String,
    required: false
  },
  coverLetter: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Interviewed', 'Selected', 'Rejected'],
    default: 'Pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('JobApplication', jobApplicationSchema);
