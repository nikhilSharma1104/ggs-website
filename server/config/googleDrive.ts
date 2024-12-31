import { google } from 'googleapis';
import path from 'path';

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../../credentials.json'),
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

// Folder IDs
const RESUMES_FOLDER_ID = process.env.REACT_APP_GOOGLE_DRIVE_RESUMES_FOLDER_ID;
const GALLERY_FOLDER_ID = process.env.REACT_APP_GOOGLE_DRIVE_GALLERY_FOLDER_ID;

export const uploadToGoogleDrive = async (file: Express.Multer.File, type: 'resume' | 'gallery') => {
  try {
    const folderId = type === 'resume' ? RESUMES_FOLDER_ID : GALLERY_FOLDER_ID;
    
    const fileMetadata = {
      name: `${Date.now()}_${file.originalname}`,
      parents: [folderId!],
    };

    const media = {
      mimeType: file.mimetype,
      body: Buffer.from(file.buffer),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id,webViewLink',
    });

    return {
      fileId: response.data.id,
      webViewLink: response.data.webViewLink,
    };
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    throw error;
  }
};

export const listGalleryImages = async () => {
  try {
    const response = await drive.files.list({
      q: `'${GALLERY_FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id, name, webViewLink, thumbnailLink)',
      orderBy: 'createdTime desc',
    });

    return response.data.files || [];
  } catch (error) {
    console.error('Error listing gallery images:', error);
    throw error;
  }
};

export const deleteFromGoogleDrive = async (fileId: string) => {
  try {
    await drive.files.delete({
      fileId: fileId,
    });
    return true;
  } catch (error) {
    console.error('Error deleting from Google Drive:', error);
    throw error;
  }
};
