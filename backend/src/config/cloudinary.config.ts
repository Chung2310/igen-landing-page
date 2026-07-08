import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'igentech',
  api_key: process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_KEY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_SECRET_API,
});

export default cloudinary;
