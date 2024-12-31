import axios from 'axios';
import { CacheService } from './cacheService';

export interface DriveImage {
  id: string;
  name: string;
  webViewLink: string;
  thumbnailLink: string;
  category?: string;
  mimeType: string;
}

const CACHE_KEY = 'galleryImages';

// Function to fetch fresh images from Google Drive
const fetchImagesFromDrive = async (folderId: string): Promise<DriveImage[]> => {
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  if (!API_KEY) {
    throw new Error('Google Drive API key is missing');
  }

  try {
    // Query for all image types
    const query = `'${folderId}' in parents and (
      mimeType contains 'image/'
    ) and trashed = false`;

    const response = await axios.get(
      'https://www.googleapis.com/drive/v3/files',
      {
        params: {
          q: query,
          key: API_KEY,
          fields: 'files(id, name, mimeType, thumbnailLink)',
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
      mimeType: file.mimeType,
      webViewLink: `https://drive.google.com/uc?export=view&id=${file.id}`,
      thumbnailLink: file.thumbnailLink || `https://drive.google.com/thumbnail?id=${file.id}`,
      category: getCategoryFromFileName(file.name),
    }));
  } catch (error) {
    console.error('Error fetching images from Google Drive:', error);
    throw error;
  }
};

// Function to get images with caching
export const getImagesFromFolder = async (folderId: string, forceRefresh: boolean = false): Promise<DriveImage[]> => {
  try {
    return await CacheService.getOrFetch<DriveImage[]>(
      CACHE_KEY,
      () => fetchImagesFromDrive(folderId),
      forceRefresh
    );
  } catch (error) {
    console.error('Error getting images:', error);
    // If cache fails, try fetching directly
    return fetchImagesFromDrive(folderId);
  }
};

// Helper function to extract category from file name
const getCategoryFromFileName = (fileName: string): string => {
  // Remove file extension and get first part before underscore
  const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, '');
  const parts = nameWithoutExtension.split('_');
  return parts[0] || 'Uncategorized';
};
