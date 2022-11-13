import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';


cloudinary.config({ 
    cloud_name: process.env.Cloudinary_Cloud_Name, 
    api_key: process.env.Cloudinary_API_Key, 
    api_secret: process.env.Cloudinary_API_Secret,
    cloudinary_url: process.env.Cloudinary_URL
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'MoviesPictureGallery',
        allowedFormats: ["png", "jpeg", "jpg", "pdf"]
    }
  } as any);
  
  const parser = multer( { storage: storage} );

  module.exports = {
    cloudinary,
    storage
  }
