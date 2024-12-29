import React, { useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

interface ImageUploadProps {
  onImageUpload?: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      setError(null);

      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_upload_preset'); // Replace with your upload preset

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/your-cloud-name/image/upload`, // Replace with your cloud name
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      const url = data.secure_url;
      setImageUrl(url);
      onImageUpload?.(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size should be less than 10MB');
        return;
      }
      uploadImage(file);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <label
          className="block w-full px-4 py-2 text-sm text-white bg-primary-600 rounded-lg cursor-pointer hover:bg-primary-700 transition-colors text-center"
        >
          {uploading ? 'Uploading...' : 'Choose Image'}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-4">
          {error}
        </div>
      )}

      {imageUrl && (
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
