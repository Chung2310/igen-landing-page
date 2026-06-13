import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'igen_technology_super_secret_access_token_key_999';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'igen_technology_super_secret_refresh_token_key_888';
const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION || '15m';
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || '7d';

export class AuthService {
  static async register(userData: { username: string; email: string; password: string; role?: 'admin' | 'user' }) {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: userData.email.toLowerCase() }, { username: userData.username }],
    });

    if (existingUser) {
      throw new Error('Tên đăng nhập hoặc Email đã tồn tại trong hệ thống.');
    }

    const newUser = new User({
      username: userData.username,
      email: userData.email,
      passwordHash: userData.password, // Schema hook hashes this
      role: userData.role || 'user',
    });

    return await newUser.save();
  }

  static async login(username: string, password: string) {
    const user = await User.findOne({ username: username.trim() });
    if (!user) {
      throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác.');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác.');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { user, accessToken, refreshToken };
  }

  static async refresh(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as { id: string };
      const user = await User.findById(decoded.id);
      
      if (!user) {
        throw new Error('Không tìm thấy người dùng.');
      }

      const accessToken = this.generateAccessToken(user);
      return { accessToken, user };
    } catch {
      throw new Error('Refresh Token không hợp lệ hoặc đã hết hạn.');
    }
  }

  static async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id).select('-passwordHash');
  }

  static generateAccessToken(user: IUser): string {
    return jwt.sign(
      { id: user._id, username: user.username, email: user.email, role: user.role },
      JWT_ACCESS_SECRET,
      { expiresIn: JWT_ACCESS_EXPIRATION } as SignOptions
    );
  }

  static generateRefreshToken(user: IUser): string {
    return jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRATION,
    } as SignOptions);
  }
}
