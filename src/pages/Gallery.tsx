import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImagesFromFolder } from '../services/googleDrive';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  description?: string;
  fullSizeUrl: string;
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Create unique categories array
  const categories = ['all', ...images
    .map(img => img.category)
    .filter((category, index, self) => self.indexOf(category) === index)
  ];

  // Filter images based on selected category
  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory);

  const fetchImages = async (forceRefresh: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const folderId = process.env.REACT_APP_GOOGLE_DRIVE_GALLERY_FOLDER_ID;
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

      if (!folderId) {
        throw new Error('Google Drive Gallery folder ID not configured');
      }

      if (!apiKey) {
        throw new Error('Google Drive API key not configured');
      }

      const driveImages = await getImagesFromFolder(folderId, forceRefresh);
      
      const galleryImages: GalleryImage[] = driveImages
        .filter(img => img.mimeType.startsWith('image/'))
        .map(img => ({
          id: img.id,
          url: img.thumbnailLink,
          title: img.name.split('_').slice(1).join(' ').replace(/\.[^/.]+$/, ''),
          category: img.category || 'Uncategorized',
          description: '',
          fullSizeUrl: img.webViewLink,
        }));

      setImages(galleryImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshGallery = async () => {
    try {
      setIsRefreshing(true);
      await fetchImages(true);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Gallery
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Capturing moments and memories from our vibrant school life
        </motion.p>
        
        <motion.button
          onClick={refreshGallery}
          disabled={isRefreshing}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all
            ${isRefreshing 
              ? 'bg-secondary-700 cursor-not-allowed'
              : 'bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700'
            } text-white shadow-lg shadow-secondary-500/30`}
          whileHover={{ scale: isRefreshing ? 1 : 1.05 }}
          whileTap={{ scale: isRefreshing ? 1 : 0.95 }}
        >
          {isRefreshing ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Refreshing...
            </span>
          ) : (
            'Refresh Gallery'
          )}
        </motion.button>
      </div>

      {/* Category Filter */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all
              ${selectedCategory === category
                ? 'bg-secondary-500 text-white shadow-lg shadow-secondary-500/30'
                : 'bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 border border-white/20'
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-400 py-10">
          <p>{error}</p>
        </div>
      )}

      {/* Gallery Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        layout
      >
        <AnimatePresence>
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              layoutId={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="aspect-square relative overflow-hidden rounded-2xl cursor-pointer group bg-primary-800/50"
              onClick={() => setSelectedImage(image)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  // Fallback to full size URL if thumbnail fails
                  const target = e.target as HTMLImageElement;
                  if (target.src !== image.fullSizeUrl) {
                    target.src = image.fullSizeUrl;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-medium text-lg">{image.title}</h3>
                  {image.description && (
                    <p className="text-gray-200 text-sm mt-2">{image.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-7xl w-full h-full flex items-center justify-center p-4">
              <button
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-50"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <FaTimes size={24} />
              </button>
              
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-50"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
              >
                <FaChevronLeft size={24} />
              </button>
              
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-50"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
              >
                <FaChevronRight size={24} />
              </button>

              <div 
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  key={selectedImage.id}
                  src={selectedImage.fullSizeUrl}
                  alt={selectedImage.title}
                  className="max-h-[85vh] max-w-full w-auto h-auto object-contain rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    console.error('Failed to load full-size image:', selectedImage.fullSizeUrl);
                    // If the full-size image fails, try using the thumbnail
                    if (target.src !== selectedImage.url) {
                      target.src = selectedImage.url;
                    }
                  }}
                />
              </div>
              
              <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 p-4 rounded-lg mx-4">
                <h2 className="text-2xl font-medium mb-2">{selectedImage.title}</h2>
                {selectedImage.description && (
                  <p className="text-gray-300">{selectedImage.description}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
