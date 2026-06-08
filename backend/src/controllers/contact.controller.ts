import { Request, Response } from 'express';
import { ContactService } from '../services/contact.service';

export class ContactController {
  static async createContact(req: Request, res: Response) {
    try {
      const contact = await ContactService.createContact(req.body);
      return res.status(201).json({
        success: true,
        message: 'Gửi tin nhắn liên hệ thành công. Chúng tôi sẽ phản hồi sớm nhất có thể.',
        data: contact,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || 'Lỗi khi gửi thông tin liên hệ.',
      });
    }
  }

  static async getContacts(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string;
      const search = req.query.search as string;

      const result = await ContactService.getContacts({
        page,
        limit,
        status,
        search,
      });

      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách liên hệ thành công.',
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi hệ thống.',
      });
    }
  }

  static async updateContactStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const contact = await ContactService.updateContactStatus(id, status);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy liên hệ yêu cầu.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Cập nhật trạng thái liên hệ thành công.',
        data: contact,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || 'Lỗi khi cập nhật trạng thái liên hệ.',
      });
    }
  }
}
