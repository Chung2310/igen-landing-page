import { Request, Response } from 'express';
import { ArticleService } from '../services/article.service';

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'Lỗi không xác định.';

export class ArticleController {
  static async createArticle(req: Request, res: Response) {
    try {
      const article = await ArticleService.createArticle(req.body);
      return res.status(201).json({
        success: true,
        message: 'Tạo bài viết mới thành công.',
        data: article,
      });
    } catch (error: unknown) {
      return res.status(400).json({
        success: false,
        message: getErrorMessage(error) || 'Lỗi khi tạo bài viết.',
      });
    }
  }

  static async getArticles(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const category = req.query.category as string;
      const status = req.query.status as string;
      const search = req.query.search as string;

      const result = await ArticleService.getArticles({
        page,
        limit,
        category,
        status,
        search,
      });

      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách bài viết thành công.',
        data: result,
      });
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        message: getErrorMessage(error) || 'Lỗi hệ thống.',
      });
    }
  }

  static async getArticleBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const article = await ArticleService.getArticleBySlug(slug);
      if (!article) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy bài viết yêu cầu.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Lấy chi tiết bài viết thành công.',
        data: article,
      });
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        message: getErrorMessage(error) || 'Lỗi hệ thống.',
      });
    }
  }

  static async updateArticle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const article = await ArticleService.updateArticle(id, req.body);
      if (!article) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy bài viết cần chỉnh sửa.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Cập nhật bài viết thành công.',
        data: article,
      });
    } catch (error: unknown) {
      return res.status(400).json({
        success: false,
        message: getErrorMessage(error) || 'Lỗi khi cập nhật bài viết.',
      });
    }
  }

  static async deleteArticle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const article = await ArticleService.deleteArticle(id);
      if (!article) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy bài viết cần xóa.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Xóa bài viết thành công.',
      });
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        message: getErrorMessage(error) || 'Lỗi hệ thống.',
      });
    }
  }
}
