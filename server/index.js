require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: [
    'https://gurukulamglobalschool.in',
    'https://www.gurukulamglobalschool.in',
    'http://localhost:3000',
    'https://nikhilsharma1104.github.io'
  ],
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const emailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;
  res.status(200).json({ 
    status: 'healthy',
    email: emailConfigured ? 'configured' : 'missing',
    emailUser: process.env.EMAIL_USER ? 'set' : 'missing',
    emailPass: process.env.EMAIL_PASS ? 'set' : 'missing',
    cors: 'enabled for gurukulamglobalschool.in and github.io'
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);
  
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email configuration missing');
    }

    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      throw new Error('Missing required fields');
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h3>Message:</h3>
        <p>${message}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Contact form email sent successfully');
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending contact form email:', error);
    res.status(500).json({ 
      message: 'Failed to send message. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Admissions endpoint
app.post('/api/admissions', async (req, res) => {
  console.log('Received admissions form submission:', req.body);
  
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email configuration missing');
    }

    const { studentName, grade, parentName, email, phone, message } = req.body;

    // Validate required fields
    if (!studentName || !grade || !parentName || !email || !phone) {
      throw new Error('Missing required fields');
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `New Admission Inquiry: ${grade}`,
      html: `
        <h2>New Admission Inquiry</h2>
        <p><strong>Student Name:</strong> ${studentName}</p>
        <p><strong>Grade:</strong> ${grade}</p>
        <p><strong>Parent Name:</strong> ${parentName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Additional Message:</h3>
        <p>${message || 'No additional message'}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Admission form email sent successfully');
    res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Error sending admission form email:', error);
    res.status(500).json({ 
      message: 'Failed to submit application. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Careers endpoint
app.post('/api/careers', async (req, res) => {
  console.log('Received careers form submission:', req.body);
  
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email configuration missing');
    }

    const { position, department, firstName, lastName, email, phone, experience, education, coverLetter } = req.body;

    // Validate required fields
    if (!position || !department || !firstName || !lastName || !email || !phone || !experience || !education || !coverLetter) {
      throw new Error('Missing required fields');
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `New Career Application: ${position}`,
      html: `
        <h2>New Career Application</h2>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Education:</strong> ${education}</p>
        <h3>Cover Letter:</h3>
        <p>${coverLetter}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Career application email sent successfully');
    res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Error sending career application email:', error);
    res.status(500).json({ 
      message: 'Failed to submit application. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
