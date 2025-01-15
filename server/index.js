const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Debug environment variables
console.log('Environment variables loaded:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER);
console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
console.log('Current working directory:', process.cwd());

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');
const fs = require('fs').promises;

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

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
    }
  }
});

// Google Drive setup
async function getGoogleDriveService() {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, 'credentials.json'),
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });
  return google.drive({ version: 'v3', auth });
}

// Upload file to Google Drive
async function uploadToGoogleDrive(filePath, fileName) {
  try {
    const driveService = await getGoogleDriveService();
    const fileMetadata = {
      name: fileName,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID] // Folder ID where resumes will be stored
    };
    
    const media = {
      mimeType: 'application/pdf',
      body: fs.createReadStream(filePath)
    };
    
    const file = await driveService.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink'
    });
    
    console.log('File uploaded to Google Drive:', file.data);
    return file.data;
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    throw error;
  }
}

// Create email transporter
const createTransporter = async () => {
  try {
    console.log('Attempting to create email transporter...');
    console.log('Email user:', process.env.EMAIL_USER ? 'Set' : 'Not set');
    console.log('Email pass:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
    
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
app.post('/api/careers', upload.single('resume'), async (req, res) => {
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

    let driveFileInfo = null;
    // Upload resume to Google Drive if present
    if (req.file) {
      driveFileInfo = await uploadToGoogleDrive(req.file.path, req.file.originalname);
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
        <p><strong>Cover Letter:</strong></p>
        <p>${coverLetter}</p>
        ${driveFileInfo ? `<p><strong>Resume:</strong> <a href="${driveFileInfo.webViewLink}">View on Google Drive</a></p>` : ''}
      `
    };

    await emailTransporter.sendMail(mailOptions);
    res.status(200).json({ 
      message: 'Application submitted successfully',
      driveFileLink: driveFileInfo ? driveFileInfo.webViewLink : null
    });

  } catch (error) {
    console.error('Error processing career application:', error);
    res.status(500).json({ 
      message: 'Failed to submit application. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    // Clean up uploaded file
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting temporary file:', err);
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
