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
    'http://localhost:3000'
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    email: process.env.EMAIL_USER ? 'configured' : 'missing',
    cors: 'enabled for gurukulamglobalschool.in'
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL,
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
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
});

// Admissions endpoint
app.post('/api/admissions', async (req, res) => {
  try {
    const { studentName, grade, parentName, email, phone, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL,
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
    res.status(500).json({ message: 'Failed to submit application. Please try again.' });
  }
});

// Careers endpoint
app.post('/api/careers', async (req, res) => {
  try {
    const { position, department, firstName, lastName, email, phone, experience, education, coverLetter } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL,
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
    res.status(500).json({ message: 'Failed to submit application. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
