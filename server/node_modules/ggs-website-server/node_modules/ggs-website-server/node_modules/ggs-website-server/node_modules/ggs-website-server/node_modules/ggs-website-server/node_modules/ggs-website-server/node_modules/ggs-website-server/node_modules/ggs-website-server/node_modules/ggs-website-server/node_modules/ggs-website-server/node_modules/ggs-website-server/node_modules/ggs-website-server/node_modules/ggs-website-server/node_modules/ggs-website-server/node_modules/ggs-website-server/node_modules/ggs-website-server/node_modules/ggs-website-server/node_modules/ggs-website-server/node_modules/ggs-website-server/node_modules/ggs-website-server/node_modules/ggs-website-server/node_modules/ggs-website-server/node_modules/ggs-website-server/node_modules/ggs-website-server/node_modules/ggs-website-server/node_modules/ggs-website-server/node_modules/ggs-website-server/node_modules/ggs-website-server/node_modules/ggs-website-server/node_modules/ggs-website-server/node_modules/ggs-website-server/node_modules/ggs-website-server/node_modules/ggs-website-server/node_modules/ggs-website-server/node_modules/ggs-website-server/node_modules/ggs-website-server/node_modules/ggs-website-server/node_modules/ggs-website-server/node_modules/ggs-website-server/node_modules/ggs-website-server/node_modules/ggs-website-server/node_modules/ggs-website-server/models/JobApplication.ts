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
    type: Number,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  resumeUrl: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String,
    required: true
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
