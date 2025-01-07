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
const createTransporter = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify the connection
    await transporter.verify();
    console.log('Email server connection verified');
    return transporter;
  } catch (error) {
    console.error('Failed to create email transporter:', error);
    return null;
  }
};

let emailTransporter = null;
createTransporter().then(transporter => {
  emailTransporter = transporter;
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Try to create transporter if it doesn't exist
    if (!emailTransporter) {
      emailTransporter = await createTransporter();
    }

    const emailConfigured = emailTransporter !== null;
    
    res.status(200).json({ 
      status: 'healthy',
      email: {
        configured: emailConfigured,
        user: process.env.EMAIL_USER ? 'set' : 'missing',
        pass: process.env.EMAIL_PASS ? 'set' : 'missing',
        transporter: emailConfigured ? 'connected' : 'failed'
      },
      cors: {
        enabled: true,
        domains: corsOptions.origin
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission');
  
  try {
    if (!emailTransporter) {
      emailTransporter = await createTransporter();
      if (!emailTransporter) {
        throw new Error('Email service not available');
      }
    }

    const { name, email, phone, subject, message } = req.body;
    console.log('Form data:', { name, email, phone, subject });

    if (!name || !email || !message) {
      throw new Error('Missing required fields');
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
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

    const info = await emailTransporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    res.status(200).json({ 
      message: 'Message sent successfully!',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      message: 'Failed to send message. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Admissions endpoint
app.post('/api/admissions', async (req, res) => {
  console.log('Received admissions form submission');
  
  try {
    if (!emailTransporter) {
      emailTransporter = await createTransporter();
      if (!emailTransporter) {
        throw new Error('Email service not available');
      }
    }

    const { studentName, grade, parentName, email, phone, message } = req.body;
    console.log('Form data:', { studentName, grade, parentName, email, phone });

    if (!studentName || !grade || !parentName || !email || !phone) {
      throw new Error('Missing required fields');
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
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

    const info = await emailTransporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    res.status(200).json({ 
      message: 'Application submitted successfully!',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      message: 'Failed to submit application. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Careers endpoint
app.post('/api/careers', async (req, res) => {
  console.log('Received careers form submission');
  
  try {
    if (!emailTransporter) {
      emailTransporter = await createTransporter();
      if (!emailTransporter) {
        throw new Error('Email service not available');
      }
    }

    const { position, department, firstName, lastName, email, phone, experience, education, coverLetter } = req.body;
    console.log('Form data:', { position, department, firstName, lastName, email, phone });

    if (!position || !department || !firstName || !lastName || !email || !phone || !experience || !education || !coverLetter) {
      throw new Error('Missing required fields');
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
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

    const info = await emailTransporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    res.status(200).json({ 
      message: 'Application submitted successfully!',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      message: 'Failed to submit application. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
