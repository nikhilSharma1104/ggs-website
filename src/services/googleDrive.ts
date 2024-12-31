import { cacheService } from './cacheService';

export interface DriveImage {
  id: string;
  name: string;
  thumbnailLink: string;
  webViewLink: string;
  category: string;
}

const CACHE_KEY_GALLERY = 'gallery_images';
const CACHE_KEY_STUDENT_LIFE = 'student_life_images';

interface GoogleDriveFile {
  id: string;
  name: string;
  thumbnailLink: string;
  webViewLink: string;
}

async function fetchImagesFromFolder(folderId: string): Promise<DriveImage[]> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'&fields=files(id,name,thumbnailLink,webViewLink)&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data = await response.json();
    return data.files.map((file: GoogleDriveFile) => ({
      id: file.id,
      name: file.name,
      thumbnailLink: `https://drive.google.com/uc?id=${file.id}`,
      webViewLink: `https://drive.google.com/uc?id=${file.id}`,
      category: getCategoryFromFilename(file.name)
    }));
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

function getCategoryFromFilename(filename: string): string {
  // Assuming filename format: category_title.extension
  const parts = filename.split('_');
  return parts[0] || 'Uncategorized';
}

export async function getGalleryImages(): Promise<DriveImage[]> {
  const cachedImages = cacheService.get<DriveImage[]>(CACHE_KEY_GALLERY);
  if (cachedImages) {
    return cachedImages;
  }

  const folderId = process.env.REACT_APP_GOOGLE_DRIVE_GALLERY_FOLDER_ID;
  if (!folderId) {
    console.error('Gallery folder ID not configured');
    return [];
  }

  const images = await fetchImagesFromFolder(folderId);
  if (images.length > 0) {
    cacheService.set(CACHE_KEY_GALLERY, images);
  }
  return images;
}

export async function getStudentLifeImages(): Promise<DriveImage[]> {
  const cachedImages = cacheService.get<DriveImage[]>(CACHE_KEY_STUDENT_LIFE);
  if (cachedImages) {
    return cachedImages;
  }

  const folderId = process.env.REACT_APP_GOOGLE_DRIVE_STUDENT_LIFE_FOLDER_ID;
  if (!folderId) {
    console.error('Student life folder ID not configured');
    return [];
  }

  const images = await fetchImagesFromFolder(folderId);
  if (images.length > 0) {
    cacheService.set(CACHE_KEY_STUDENT_LIFE, images);
  }
  return images;
}

// Helper function to get direct Google Drive image URL
export function getImageUrl(fileId: string): string {
  return `https://drive.google.com/uc?id=${fileId}`;
}
