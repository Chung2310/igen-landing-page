import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'Lỗi không xác định.';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { username, email, password, role } = req.body;
      const user = await AuthService.register({ username, email, password, role });
      
      return res.status(201).json({
        success: true,
        message: 'Đăng ký tài khoản thành công.',
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error: unknown) {
      return res.status(400).json({
        success: false,
        message: getErrorMessage(error) || 'Lỗi đăng ký tài khoản.',
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.login(username, password);

      // Set cookie for Refresh Token
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công.',
        data: {
          accessToken,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (error: unknown) {
      return res.status(400).json({
        success: false,
        message: getErrorMessage(error) || 'Lỗi đăng nhập.',
      });
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const token = req.cookies.refreshToken;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Không tìm thấy Refresh Token trong cookies.',
        });
      }

      const { accessToken, user } = await AuthService.refresh(token);

      return res.status(200).json({
        success: true,
        message: 'Làm mới Access Token thành công.',
        data: {
          accessToken,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (error: unknown) {
      return res.status(401).json({
        success: false,
        message: getErrorMessage(error) || 'Refresh Token không hợp lệ.',
      });
    }
  }

  static async getMe(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Chưa đăng nhập.',
        });
      }

      const user = await AuthService.getUserById(req.user.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy người dùng.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Lấy thông tin cá nhân thành công.',
        data: user,
      });
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        message: getErrorMessage(error) || 'Lỗi hệ thống.',
      });
    }
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie('refreshToken');
    return res.status(200).json({
      success: true,
      message: 'Đăng xuất thành công.',
    });
  }
}
