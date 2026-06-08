import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import cloudinary from '../config/cloudinary.config';

export class UploadController {
  static async uploadImage(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Không tìm thấy tệp ảnh tải lên.',
        });
      }

      // Upload buffer to Cloudinary using upload_stream
      const uploadStream = () => {
        return new Promise<string>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'igentech',
            },
            (error, result) => {
              if (error) {
                return reject(error);
              }
              if (result && result.secure_url) {
                resolve(result.secure_url);
              } else {
                reject(new Error('Tải lên Cloudinary thất bại.'));
              }
            }
          );

          stream.end(req.file!.buffer);
        });
      };

      const secureUrl = await uploadStream();

      return res.status(200).json({
        success: true,
        message: 'Tải lên hình ảnh thành công.',
        url: secureUrl,
      });
    } catch (error: unknown) {
      const err = error as Error;
      return res.status(500).json({
        success: false,
        message: err.message || 'Lỗi khi tải ảnh lên Cloudinary.',
      });
    }
  }
}
