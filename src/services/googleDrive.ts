import axios from 'axios';
import { CacheService } from './cacheService';

export interface DriveImage {
  id: string;
  name: string;
  webViewLink: string;
  thumbnailLink: string;
  category?: string;
}

// Function to fetch fresh images from Google Drive
const fetchImagesFromDrive = async (folderId: string): Promise<DriveImage[]> => {
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  if (!API_KEY) {
    throw new Error('Google Drive API key is missing. Please check your environment variables.');
  }

  try {
    const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
    const response = await axios.get(
      'https://www.googleapis.com/drive/v3/files',
      {
        params: {
          q: query,
          key: API_KEY,
          fields: 'files(id, name)',
          orderBy: 'name',
          pageSize: 1000,
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
      // For full-size image viewing
      webViewLink: `https://lh3.googleusercontent.com/d/${file.id}`,
      // For thumbnail
      thumbnailLink: `https://lh3.googleusercontent.com/d/${file.id}=w400-h400-p-k-nu`,
      category: getCategoryFromFileName(file.name),
    }));
  } catch (error) {
    console.error('Error fetching images from Google Drive:', error);
    throw error;
  }
};

// Function to get images with caching
export const getImagesFromFolder = async (folderId: string, forceRefresh: boolean = false): Promise<DriveImage[]> => {
  const cacheKey = `drive_images_${folderId}`;
  
  try {
    const images = await CacheService.getOrFetch<DriveImage[]>(
      cacheKey,
      () => fetchImagesFromDrive(folderId),
      forceRefresh
    );
    return images;
  } catch (error) {
    console.error('Error getting images:', error);
    throw error;
  }
};

// Helper function to extract category from file name
const getCategoryFromFileName = (fileName: string): string => {
  const parts = fileName.split('_');
  return parts[0] || 'Uncategorized';
};
