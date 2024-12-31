import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ImageUploadProps {
  onUploadComplete: (file: File) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete, className = '' }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      onUploadComplete(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onUploadComplete(e.target.files[0]);
    }
  };

  return (
    <motion.div
      className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                 ${isDragging ? 'border-secondary-500 bg-secondary-500/10' : 'border-gray-600 hover:border-gray-500'}
                 ${className}`}
      whileHover={{ scale: 1.02 }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept="image/*"
      />
      <div className="text-white/80">
        <p className="mb-2">Drag and drop an image here, or click to select</p>
        <p className="text-sm">Supports: JPG, PNG, GIF (max 5MB)</p>
      </div>
    </motion.div>
  );
};

export default ImageUpload;
