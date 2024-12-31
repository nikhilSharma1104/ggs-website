export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  url: string;
  thumbnailUrl: string;
}

// Replace these URLs with your actual image URLs
export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    title: 'School Building',
    category: 'Campus',
    url: 'https://drive.google.com/uc?id=YOUR_IMAGE_ID_1',
    thumbnailUrl: 'https://drive.google.com/uc?id=YOUR_IMAGE_ID_1'
  },
  {
    id: '2',
    title: 'Sports Day',
    category: 'Events',
    url: 'https://drive.google.com/uc?id=YOUR_IMAGE_ID_2',
    thumbnailUrl: 'https://drive.google.com/uc?id=YOUR_IMAGE_ID_2'
  },
  // Add more images here
];

export const studentLifeImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Student Activities',
    category: 'Student Life',
    url: 'https://drive.google.com/uc?id=YOUR_IMAGE_ID_3',
    thumbnailUrl: 'https://drive.google.com/uc?id=YOUR_IMAGE_ID_3'
  },
  {
    id: '2',
    title: 'Classroom Learning',
    category: 'Student Life',
    url: 'https://drive.google.com/uc?id=YOUR_IMAGE_ID_4',
    thumbnailUrl: 'https://drive.google.com/uc?id=YOUR_IMAGE_ID_4'
  },
  // Add more student life images here
];

export const getImageUrl = (fileId: string): string => {
  return `https://drive.google.com/uc?id=${fileId}`;
};
