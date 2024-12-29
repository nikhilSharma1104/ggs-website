import { Cloudinary } from '@cloudinary/url-gen';

// Initialize Cloudinary with your cloud name
const cld = new Cloudinary({
  cloud: {
    cloudName: 'your-cloud-name' // Replace with your cloud name
  }
});

export default cld;
