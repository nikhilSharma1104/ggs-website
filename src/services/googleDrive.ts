import { google } from 'googleapis';

export interface DriveImage {
  id: string;
  name: string;
  webViewLink: string;
  thumbnailLink: string;
  category?: string;
}

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

// Function to initialize the Google Drive API client
const initializeGoogleDrive = async () => {
  try {
    // You'll need to replace these with your actual credentials
    const credentials = {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URI,
    };

    const oauth2Client = new google.auth.OAuth2(
      credentials.client_id,
      credentials.client_secret,
      credentials.redirect_uri
    );

    // Set credentials if you have a token
    if (process.env.REACT_APP_GOOGLE_REFRESH_TOKEN) {
      oauth2Client.setCredentials({
        refresh_token: process.env.REACT_APP_GOOGLE_REFRESH_TOKEN,
      });
    }

    return google.drive({ version: 'v3', auth: oauth2Client });
  } catch (error) {
    console.error('Error initializing Google Drive:', error);
    throw error;
  }
};

// Function to get images from a specific folder
export const getImagesFromFolder = async (folderId: string): Promise<DriveImage[]> => {
  try {
    const drive = await initializeGoogleDrive();

    // Query files in the specified folder
    const response = await drive.files.list({
      q: `'${folderId}' in parents and (mimeType contains 'image/')`,
      fields: 'files(id, name, webViewLink, thumbnailLink)',
      pageSize: 100,
    });

    const files = response.data.files;
    if (!files || files.length === 0) {
      return [];
    }

    // Transform the files into our DriveImage format
    return files.map((file) => ({
      id: file.id || '',
      name: file.name || '',
      webViewLink: file.webViewLink || '',
      thumbnailLink: file.thumbnailLink || '',
      // You can add category based on folder structure or file naming convention
      category: getCategoryFromFileName(file.name || ''),
    }));
  } catch (error) {
    console.error('Error fetching images from Google Drive:', error);
    throw error;
  }
};

// Helper function to extract category from file name (you can customize this)
const getCategoryFromFileName = (fileName: string): string => {
  // Example: "Campus_MainBuilding.jpg" -> "Campus"
  const category = fileName.split('_')[0];
  return category || 'Uncategorized';
};
