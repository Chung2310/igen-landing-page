import { Router } from 'express';
import { UploadController } from '../../controllers/upload.controller';
import { authenticate, requireAdmin } from '../../middlewares/auth.middleware';
import { upload } from '../../middlewares/upload.middleware';

const router = Router();

// Route for single image upload, protected for admin users only
router.post(
  '/',
  authenticate,
  requireAdmin,
  upload.single('image'),
  UploadController.uploadImage
);

export default router;
