import { google } from 'googleapis';
import { Readable } from 'stream';

// Initialize Google Drive API
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

export const uploadToGoogleDrive = async (file: Express.Multer.File, folderName: string = 'Resumes') => {
  try {
    // Find or create the resumes folder
    let folderId = await findOrCreateFolder(folderName);

    // Create a readable stream from the file buffer
    const fileStream = new Readable();
    fileStream.push(file.buffer);
    fileStream.push(null);

    // Upload file to Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: `${Date.now()}_${file.originalname}`,
        mimeType: file.mimetype,
        parents: [folderId],
      },
      media: {
        mimeType: file.mimetype,
        body: fileStream,
      },
    });

    // Set file permissions to anyone with the link can view
    await drive.permissions.create({
      fileId: response.data.id!,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Get the web view link
    const fileData = await drive.files.get({
      fileId: response.data.id!,
      fields: 'webViewLink',
    });

    return {
      fileId: response.data.id,
      webViewLink: fileData.data.webViewLink,
    };
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    throw error;
  }
};

const findOrCreateFolder = async (folderName: string): Promise<string> => {
  try {
    // Check if folder exists
    const response = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
      fields: 'files(id, name)',
    });

    if (response.data.files && response.data.files.length > 0) {
      return response.data.files[0].id!;
    }

    // Create folder if it doesn't exist
    const folder = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
      },
      fields: 'id',
    });

    return folder.data.id!;
  } catch (error) {
    console.error('Error finding/creating folder:', error);
    throw error;
  }
};
