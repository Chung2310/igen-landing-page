import { Request, Response } from 'express';
import { ServiceService } from '../services/service.service';

export class ServiceController {
  static async createService(req: Request, res: Response) {
    try {
      const service = await ServiceService.createService(req.body);
      return res.status(201).json({
        success: true,
        message: 'Tạo sản phẩm/dịch vụ mới thành công.',
        data: service,
      });
    } catch (error: unknown) {
      const err = error as Error;
      return res.status(400).json({
        success: false,
        message: err.message || 'Lỗi khi tạo sản phẩm/dịch vụ.',
      });
    }
  }

  static async getServices(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const category = req.query.category as string;
      const status = req.query.status as string;
      const search = req.query.search as string;

      const result = await ServiceService.getServices({ page, limit, category, status, search });
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách sản phẩm/dịch vụ thành công.',
        data: result,
      });
    } catch (error: unknown) {
      const err = error as Error;
      return res.status(500).json({
        success: false,
        message: err.message || 'Lỗi hệ thống.',
      });
    }
  }

  static async getServiceBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const service = await ServiceService.getServiceBySlug(slug);
      if (!service) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy sản phẩm/dịch vụ yêu cầu.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Lấy chi tiết sản phẩm/dịch vụ thành công.',
        data: service,
      });
    } catch (error: unknown) {
      const err = error as Error;
      return res.status(500).json({
        success: false,
        message: err.message || 'Lỗi hệ thống.',
      });
    }
  }

  static async updateService(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = await ServiceService.updateService(id, req.body);
      if (!service) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy sản phẩm/dịch vụ cần chỉnh sửa.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Cập nhật sản phẩm/dịch vụ thành công.',
        data: service,
      });
    } catch (error: unknown) {
      const err = error as Error;
      return res.status(400).json({
        success: false,
        message: err.message || 'Lỗi khi cập nhật sản phẩm/dịch vụ.',
      });
    }
  }

  static async deleteService(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = await ServiceService.deleteService(id);
      if (!service) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy sản phẩm/dịch vụ cần xóa.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Xóa sản phẩm/dịch vụ thành công.',
      });
    } catch (error: unknown) {
      const err = error as Error;
      return res.status(500).json({
        success: false,
        message: err.message || 'Lỗi hệ thống.',
      });
    }
  }
}
