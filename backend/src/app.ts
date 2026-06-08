import path from 'path';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import routesV1 from './routes/v1';
import swaggerDocument from './swagger/api.swagger';
import User from './models/user.model';
import Service from './models/service.model';

const app: Application = express();

// Configure CORS using allowed origins from environment variable
const allowedOrigins = process.env.LINK_COR 
  ? process.env.LINK_COR.split(',').map(item => item.trim()) 
  : ['http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, postman, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS Policy: Origin ${origin} không có quyền truy cập.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Swagger documentation route
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - swagger-ui-express bundles its own @types/express causing version conflict
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Version 1 Router
app.use('/api/v1', routesV1);

// Serve frontend static files from compiled dist
const frontendDistPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendDistPath));

// Wildcard fallback for React Router SPA
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// Seed default Admin User
export const seedAdmin = async () => {
  try {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminEmail    = process.env.ADMIN_EMAIL    || 'admin@igen.vn';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';

    const existingAdmin = await User.findOne({ username: adminUsername });
    if (!existingAdmin) {
      const admin = new User({
        username: adminUsername,
        email: adminEmail,
        passwordHash: adminPassword, // Schema pre hook will encrypt this password
        role: 'admin',
      });
      await admin.save();
      console.log('--- Default Admin User Seeded ---');
      console.log(`Username : ${adminUsername}`);
      console.log(`Email    : ${adminEmail}`);
      console.log(`Password : ${adminPassword}`);
      console.log('---------------------------------');
    }
  } catch (error) {
    console.error('Failed to seed default admin:', error);
  }
};

// Seed default Services data
export const seedServices = async () => {
  try {
    const count = await Service.countDocuments();
    if (count > 0) return;

    const defaultServices = [
      {
        title: 'Thiết kế Website',
        slug: 'thiet-ke-website',
        shortDesc: 'Website chuyên nghiệp, tối ưu SEO, hiệu suất cao cho doanh nghiệp.',
        description: 'Chúng tôi thiết kế và phát triển website từ landing page đến hệ thống thương mại điện tử phức tạp. Đội ngũ iGen đảm bảo mỗi sản phẩm đạt chuẩn UX/UI hiện đại, tải nhanh và thân thiện với công cụ tìm kiếm.',
        icon: 'language',
        category: 'Web',
        features: ['Responsive Design', 'Tối ưu SEO', 'CMS dễ sử dụng', 'Bảo mật SSL', 'Tốc độ tải nhanh'],
        status: 'active',
        order: 1,
      },
      {
        title: 'Phát triển Ứng dụng Di động',
        slug: 'phat-trien-ung-dung-di-dong',
        shortDesc: 'App iOS & Android chất lượng cao, trải nghiệm người dùng vượt trội.',
        description: 'iGen phát triển ứng dụng di động native và cross-platform cho iOS và Android. Từ thiết kế UI/UX đến triển khai trên App Store và Google Play, chúng tôi đồng hành cùng bạn trong suốt hành trình.',
        icon: 'phone_android',
        category: 'Mobile',
        features: ['iOS & Android', 'React Native / Flutter', 'Push Notification', 'Offline Support', 'Analytics tích hợp'],
        status: 'active',
        order: 2,
      },
      {
        title: 'Mini App Zalo',
        slug: 'mini-app-zalo',
        shortDesc: 'Tiếp cận 75 triệu người dùng Zalo với Mini App tích hợp.',
        description: 'Mini App Zalo giúp doanh nghiệp tiếp cận khách hàng trực tiếp trên nền tảng Zalo — không cần cài đặt, tức thì, tiện lợi. iGen có đội ngũ chuyên biệt về Zalo Mini App với nhiều dự án thực chiến.',
        icon: 'chat',
        category: 'Mobile',
        features: ['Tích hợp ZaloPay', 'Zalo OA liên kết', 'Không cần cài đặt', 'Tốc độ cao', 'Tiếp cận 75M user'],
        status: 'active',
        order: 3,
      },
      {
        title: 'Giải pháp AI & Automation',
        slug: 'giai-phap-ai-automation',
        shortDesc: 'Tự động hóa quy trình, tích hợp AI vào vận hành doanh nghiệp.',
        description: 'Ứng dụng trí tuệ nhân tạo để tự động hóa quy trình, phân tích dữ liệu và cải thiện hiệu suất doanh nghiệp. iGen cung cấp giải pháp AI từ chatbot thông minh đến hệ thống phân tích dự đoán.',
        icon: 'psychology',
        category: 'AI',
        features: ['Chatbot AI', 'Phân tích dữ liệu', 'Automation workflow', 'NLP tiếng Việt', 'Computer Vision'],
        status: 'active',
        order: 4,
      },
      {
        title: 'Hệ thống E-Commerce',
        slug: 'he-thong-e-commerce',
        shortDesc: 'Nền tảng thương mại điện tử toàn diện, tích hợp thanh toán đa kênh.',
        description: 'iGen xây dựng hệ thống E-Commerce từ cửa hàng trực tuyến đơn giản đến marketplace phức tạp. Tích hợp đa kênh thanh toán, quản lý kho hàng, vận chuyển và CRM.',
        icon: 'shopping_cart',
        category: 'E-Commerce',
        features: ['Thanh toán đa kênh', 'Quản lý kho', 'Omnichannel', 'Flash Sale', 'Báo cáo thống kê'],
        status: 'active',
        order: 5,
      },
      {
        title: 'Tư vấn & Chuyển đổi Số',
        slug: 'tu-van-chuyen-doi-so',
        shortDesc: 'Tư vấn chiến lược và triển khai chuyển đổi số toàn diện cho doanh nghiệp.',
        description: 'Đội ngũ chuyên gia iGen đồng hành cùng doanh nghiệp trong hành trình chuyển đổi số: đánh giá hiện trạng, hoạch định chiến lược, lựa chọn công nghệ phù hợp và triển khai từng bước.',
        icon: 'trending_up',
        category: 'Consulting',
        features: ['Đánh giá hiện trạng', 'Roadmap số hóa', 'Triển khai ERP/CRM', 'Đào tạo nhân sự', 'Hỗ trợ hậu triển khai'],
        status: 'active',
        order: 6,
      },
    ];

    await Service.insertMany(defaultServices);
    console.log('--- Default Services Seeded (6 items) ---');
  } catch (error) {
    console.error('Failed to seed default services:', error);
  }
};

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Global error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Lỗi hệ thống nội bộ.',
  });
});

export default app;
