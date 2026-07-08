import multer from 'multer';
import { Request } from 'express';

// Use memory storage to store files as Buffers
const storage = multer.memoryStorage();

// Accept images and videos
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ cho phép tải lên tệp hình ảnh hoặc video.'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB limit to support videos
  },
});
