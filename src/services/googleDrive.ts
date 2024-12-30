import axios from 'axios';

export interface DriveImage {
  id: string;
  name: string;
  webViewLink: string;
  thumbnailLink: string;
  category?: string;
}

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

// Function to get images from a specific folder
export const getImagesFromFolder = async (folderId: string): Promise<DriveImage[]> => {
  if (!API_KEY) {
    throw new Error('Google Drive API key is missing. Please check your environment variables.');
  }

  try {
    const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
    const response = await axios.get(
      `https://www.googleapis.com/drive/v3/files`,
      {
        params: {
          q: query,
          key: API_KEY,
          fields: 'files(id, name, webViewLink, thumbnailLink)',
          orderBy: 'name',
        },
      }
    );

    if (!response.data || !response.data.files) {
      console.warn('No images found in the folder');
      return [];
    }

    return response.data.files.map((file: any) => ({
      id: file.id,
      name: file.name,
      webViewLink: file.webViewLink,
      thumbnailLink: file.thumbnailLink,
      category: getCategoryFromFileName(file.name),
    }));
  } catch (error) {
    console.error('Error fetching images from Google Drive:', error);
    throw error;
  }
};

// Helper function to extract category from file name
const getCategoryFromFileName = (fileName: string): string => {
  // Remove the file extension
  const nameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
  // Split by underscore or hyphen and get the first part
  return nameWithoutExtension.split(/[-_]/)[0].trim();
};
