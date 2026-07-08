import path from 'path';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import routesV1 from './routes/v1';
import swaggerDocument from './swagger/api.swagger';
import User from './models/user.model';
import Service from './models/service.model';
import Article from './models/article.model';

const app: Application = express();

// Trust reverse proxy headers (X-Forwarded-For, X-Forwarded-Proto, etc.)
app.set('trust proxy', true);

// Configure CORS using allowed origins from environment variable
const allowedOrigins = process.env.LINK_COR 
  ? process.env.LINK_COR.split(',').map(item => item.trim()) 
  : ['http://localhost:5173', 'http://localhost:5001'];

const corsOptionsDelegate = (req: Request, callback: (err: Error | null, options?: cors.CorsOptions) => void) => {
  const origin = req.header('Origin');
  let isAllowed = false;

  if (!origin) {
    isAllowed = true;
  } else {
    const host = req.header('Host');
    const protocol = req.protocol;
    const sameOrigin = origin === `${protocol}://${host}`;

    if (sameOrigin || allowedOrigins.indexOf(origin) !== -1) {
      isAllowed = true;
    }
  }

  if (isAllowed) {
    callback(null, { origin: true, credentials: true });
  } else {
    console.warn(`CORS Warning: Origin ${origin} không có quyền truy cập.`);
    callback(null, { origin: false });
  }
};

app.use(cors(corsOptionsDelegate));

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
        order: 5,
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
        order: 6,
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
        order: 7,
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
        order: 8,
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
        order: 9,
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
        order: 10,
      },
      {
        title: 'Học viện doanh nghiệp 1 người',
        slug: 'hoc-vien-doanh-nghiep-1-nguoi',
        shortDesc: 'Biến AI thành đội ngũ nhân sự số của riêng bạn. Học cách tự động hóa marketing, bán hàng, chăm sóc khách hàng và vận hành.',
        description: 'Chúng tôi đào tạo và chuyển giao hệ thống vận hành bằng AI giúp cá nhân và doanh nghiệp tối ưu nguồn lực, tự động hóa quy trình và giảm phụ thuộc vào nhân sự truyền thống. Từ marketing, bán hàng, chăm sóc khách hàng đến quản trị nội bộ, AI sẽ trở thành đội ngũ hỗ trợ giúp doanh nghiệp vận hành hiệu quả hơn.',
        icon: 'school',
        category: 'AI',
        features: [
          'Mô hình Doanh nghiệp 1 Người',
          'Tự động hóa quy trình bằng AI',
          'Xây dựng đội ngũ AI Agent',
          'Marketing & CSKH tự động',
          'Tăng năng suất – Giảm chi phí',
          'Hệ thống vận hành 24/7'
        ],
        status: 'active',
        order: 1,
      },
      {
        title: 'Chuyển Đổi AI Doanh Nghiệp',
        slug: 'chuyen-doi-ai-doanh-nghiep',
        shortDesc: 'Không chỉ đào tạo, chúng tôi trực tiếp chuyển giao quy trình và giải pháp AI phù hợp với từng doanh nghiệp.',
        description: 'Giúp doanh nghiệp ứng dụng AI vào hoạt động thực tế thông qua chương trình đào tạo chuyên sâu và chuyển giao giải pháp phù hợp với từng mô hình kinh doanh. Chúng tôi đồng hành từ tư duy, quy trình đến triển khai, giúp doanh nghiệp nâng cao năng suất, tối ưu chi phí và xây dựng hệ thống vận hành thông minh.',
        icon: 'business',
        category: 'AI',
        features: [
          'Đào tạo AI cho đội ngũ nhân sự',
          'Chuyển giao quy trình vận hành AI',
          'Tích hợp AI vào SOP doanh nghiệp',
          'Tối ưu năng suất làm việc',
          'Giảm chi phí vận hành',
          'Đồng hành triển khai thực tế'
        ],
        status: 'active',
        order: 2,
      },
      {
        title: 'Nền Tảng AI Theo Yêu Cầu',
        slug: 'nen-tang-ai-theo-yeu-cau',
        shortDesc: 'Chúng tôi thiết kế và phát triển các ứng dụng AI chuyên biệt giúp tự động hóa công việc, quản lý dữ liệu.',
        description: 'Mỗi doanh nghiệp đều có những nhu cầu và quy trình vận hành riêng biệt. iGen Technology thiết kế và phát triển các nền tảng AI theo yêu cầu, giúp tự động hóa công việc, tối ưu quản lý dữ liệu và nâng cao hiệu suất vận hành. Từ chatbot AI, trợ lý AI, ERP đến các hệ thống chuyên biệt, mọi giải pháp đều được xây dựng để phục vụ đúng mục tiêu kinh doanh của khách hàng.',
        icon: 'settings',
        category: 'AI',
        features: [
          'Phát triển ứng dụng AI theo yêu cầu',
          'Thiết kế hệ thống ERP thông minh',
          'Chatbot & Trợ lý AI chuyên biệt',
          'Tự động hóa quy trình vận hành',
          'Tích hợp AI vào hệ thống hiện có',
          'Tùy biến theo từng ngành nghề'
        ],
        status: 'active',
        order: 3,
      },
      {
        title: 'AI Marketing & Vận Hành',
        slug: 'ai-marketing-van-hanh',
        shortDesc: 'Ứng dụng AI vào marketing, truyền thông và quản trị doanh nghiệp nhằm tự động hóa quy trình, nâng cao hiệu quả.',
        description: 'iGen Technology giúp doanh nghiệp ứng dụng AI vào toàn bộ hoạt động marketing và vận hành, từ xây dựng nội dung, quảng cáo, chăm sóc khách hàng đến quản lý công việc và quy trình nội bộ. Nhờ tự động hóa bằng AI, doanh nghiệp có thể gia tăng năng suất, tối ưu chi phí và tập trung nguồn lực cho các hoạt động tạo ra doanh thu.',
        icon: 'campaign',
        category: 'AI',
        features: [
          'AI Marketing đa kênh',
          'Tự động hóa nội dung & truyền thông',
          'Trợ lý AI chăm sóc khách hàng',
          'Tối ưu quy trình vận hành',
          'Nâng cao năng suất đội ngũ',
          'Giảm chi phí tăng trưởng doanh nghiệp'
        ],
        status: 'active',
        order: 4,
      },
    ];

    const defaultThumbnails: Record<string, string> = {
      'thiet-ke-website': 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=60',
      'phat-trien-ung-dung-di-dong': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60',
      'mini-app-zalo': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60',
      'giai-phap-ai-automation': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
      'he-thong-e-commerce': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60',
      'tu-van-chuyen-doi-so': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60',
      'hoc-vien-doanh-nghiep-1-nguoi': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
      'chuyen-doi-ai-doanh-nghiep': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60',
      'nen-tang-ai-theo-yeu-cau': 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60',
      'ai-marketing-van-hanh': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    };

    const defaultVideos: Record<string, string[]> = {
      'hoc-vien-doanh-nghiep-1-nguoi': [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      ],
      'chuyen-doi-ai-doanh-nghiep': [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      ]
    };

    let insertedCount = 0;
    let updatedCount = 0;
    for (const svc of defaultServices) {
      const exists = await Service.findOne({ slug: svc.slug });
      if (!exists) {
        await Service.create({
          ...svc,
          thumbnail: defaultThumbnails[svc.slug] || '',
          videos: defaultVideos[svc.slug] || []
        });
        insertedCount++;
      } else {
        exists.title = svc.title;
        exists.shortDesc = svc.shortDesc;
        exists.description = svc.description;
        exists.icon = svc.icon;
        exists.category = svc.category;
        exists.features = svc.features;
        exists.status = svc.status as 'active' | 'inactive';
        exists.order = svc.order;
        // Preserve admin modifications but assign default fallback if empty
        exists.thumbnail = exists.thumbnail || defaultThumbnails[svc.slug] || '';
        exists.videos = exists.videos && exists.videos.length > 0 ? exists.videos : (defaultVideos[svc.slug] || []);
        await exists.save();
        updatedCount++;
      }
    }
    if (insertedCount > 0 || updatedCount > 0) {
      console.log(`--- Seeded default services: ${insertedCount} created, ${updatedCount} updated ---`);
    }
  } catch (error) {
    console.error('Failed to seed default services:', error);
  }
};

// Seed default Articles data
export const seedArticles = async () => {
  try {
    const defaultArticles = [
      {
        title: 'iGen Technology chính thức ra mắt Hệ sinh thái Giải pháp AI toàn diện',
        slug: 'igen-technology-ra-mat-he-sinh-thai-giai-phap-ai',
        content: `<h2>1. Tầm nhìn chiến lược chuyển đổi số bằng Trí tuệ Nhân tạo</h2>
<p>Trong bối cảnh nền kinh tế số phát triển vượt bậc, việc tích hợp Trí tuệ Nhân tạo (AI) vào hoạt động sản xuất kinh doanh không còn là một lựa chọn, mà đã trở thành yếu tố sống còn giúp doanh nghiệp duy trì năng lực cạnh tranh. Nhận thức rõ điều đó, iGen Technology đã nghiên cứu và phát triển thành công Hệ sinh thái Giải pháp AI toàn diện bao gồm 4 trụ cột công nghệ chính: Website AI, Studio AI, Agency Marketing AI và Trợ lý AI.</p>
<p>Lễ công bố diễn ra với sự tham gia của đông đảo đại diện từ các cơ quan quản lý, viện nghiên cứu và hơn 100 doanh nghiệp đối tác hàng đầu Việt Nam.</p>
<img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80" alt="Lễ ra mắt Hệ sinh thái AI" class="my-8 rounded-2xl w-full object-cover max-h-[400px] shadow-lg" />
<h2>2. 4 Trụ cột cốt lõi định hình tương lai vận hành doanh nghiệp</h2>
<ul>
  <li><strong>Website AI:</strong> Nền tảng web thông minh tự động tối ưu hóa giao diện (UI/UX) và nội dung theo hành vi thực tế của khách hàng, giúp gia tăng tối đa tỷ lệ chuyển đổi mua hàng một cách tự động.</li>
  <li><strong>Studio AI:</strong> Công nghệ người mẫu ảo (Virtual Models) sản xuất hình ảnh, video quảng cáo và tư liệu truyền thông chất lượng 4K chỉ trong vài giây, giảm tới 90% chi phí sản xuất truyền thống.</li>
  <li><strong>Agency Marketing AI:</strong> Hệ thống tự động thu thập thông tin thị trường, tối ưu hóa ngân sách quảng cáo đa kênh và lập kế hoạch nội dung tự động dựa trên dữ liệu lớn.</li>
  <li><strong>Trợ lý AI (AI Assistant):</strong> Đội ngũ nhân viên ảo hoạt động liên tục 24/7, hỗ trợ tư vấn chăm sóc khách hàng đa kênh và tích hợp thanh toán Auto-checkout thông minh.</li>
</ul>
<h2>3. Cam kết đồng hành cùng doanh nghiệp Việt</h2>
<p>Phát biểu tại sự kiện, đại diện iGen Technology khẳng định: "Chúng tôi không chỉ cung cấp công nghệ, mà cung cấp giải pháp tăng trưởng thực tế. Các công cụ AI được bản địa hóa tối đa để phù hợp với ngôn ngữ, hành vi mua sắm và thói quen tiêu dùng của người Việt Nam."</p>`,
        excerpt: 'Giới thiệu sự kiện công bố 4 giải pháp trụ cột của iGen Tech trong việc thúc đẩy chuyển đổi số toàn diện cho doanh nghiệp Việt Nam.',
        category: 'AI Trends',
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
        author: 'iGen Admin',
        status: 'published',
        publishedAt: new Date('2026-06-09T09:00:00.000Z'),
      },
      {
        title: 'Cách Website AI giúp doanh nghiệp tăng 150% tỷ lệ chuyển đổi',
        slug: 'cach-website-ai-tang-ty-le-chuyen-doi',
        content: `<h2>1. Rào cản của những trang web truyền thống</h2>
<p>Một website tĩnh truyền thống thường được thiết kế dựa trên cảm tính của lập trình viên hoặc nhà quản lý. Điều này dẫn đến việc giao diện không phù hợp với hành vi thực tế của đa số khách hàng truy cập, gây lãng phí chi phí marketing và làm giảm đáng kể tỷ lệ chuyển đổi đơn hàng.</p>
<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80" alt="Phân tích dữ liệu hành vi người dùng trên Website AI" class="my-8 rounded-2xl w-full object-cover max-h-[400px] shadow-lg" />
<h2>2. Giải pháp đột phá từ Website AI của iGen Technology</h2>
<p>Website AI giải quyết triệt để vấn đề này bằng cách tích hợp trí tuệ nhân tạo trực tiếp vào mã nguồn website. Hệ thống hoạt động qua 3 giai đoạn thông minh:</p>
<ul>
  <li><strong>Theo dõi & Phân tích hành vi:</strong> AI tự động thu thập và phân tích bản đồ nhiệt (Heatmap), cử chỉ cuộn trang và thời gian tương tác của người dùng trên từng phần của trang web.</li>
  <li><strong>Tự động điều chỉnh giao diện (CRO):</strong> Dựa trên dữ liệu thu thập, hệ thống tự động chạy các bài kiểm tra A/B testing ẩn và tinh chỉnh các nút kêu gọi hành động (CTA), vị trí banner hoặc bố cục nội dung để tối đa hóa tương tác.</li>
  <li><strong>SEO thông minh theo thời gian thực:</strong> Tự động nghiên cứu từ khóa, tạo thẻ meta, viết lại mô tả sản phẩm và tối ưu hóa cấu trúc schema để website luôn đạt thứ hạng cao nhất trên Google mà không cần nhân sự SEO thủ công.</li>
</ul>
<h2>3. Kết quả thực tiễn từ khách hàng áp dụng</h2>
<p>Theo báo cáo thống kê từ các doanh nghiệp đã nâng cấp lên nền tảng Website AI của iGen Tech, tỷ lệ giữ chân khách hàng (Retention Rate) tăng trung bình 45%, và tỷ lệ chuyển đổi mua hàng (Conversion Rate) ghi nhận mức tăng trưởng đột phá lên tới 150% chỉ sau 3 tháng vận hành.</p>`,
        excerpt: 'Phân tích giải pháp tự động hóa thiết kế giao diện UI/UX và tối ưu SEO sâu bằng trí tuệ nhân tạo để bứt phá doanh số.',
        category: 'Tech Insights',
        thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=60',
        author: 'iGen Admin',
        status: 'published',
        publishedAt: new Date('2026-06-08T09:00:00.000Z'),
      },
      {
        title: 'Studio AI: Cuộc cách mạng sản xuất hình ảnh quảng cáo bằng Người mẫu ảo',
        slug: 'studio-ai-san-xuat-hinh-anh-nguoi-mau-ao',
        content: `<h2>1. Chi phí sản xuất hình ảnh truyền thống - Gánh nặng của doanh nghiệp bán lẻ</h2>
<p>Đối với ngành thời trang và thương mại điện tử, việc liên tục chụp ảnh sản phẩm mới là vô cùng tốn kém. Chi phí thuê người mẫu, nhiếp ảnh gia, thuê studio, trang điểm và hậu kỳ hình ảnh có thể chiếm tới 30-40% ngân sách vận hành ban đầu của một bộ sưu tập mới.</p>
<img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80" alt="Người mẫu ảo 3D sản xuất bởi Studio AI" class="my-8 rounded-2xl w-full object-cover max-h-[400px] shadow-lg" />
<h2>2. Giải pháp Studio AI: Tạo ảnh mẫu chuẩn 4K trong 5 giây</h2>
<p>Công nghệ Studio AI của iGen Technology cho phép doanh nghiệp tạo ra hình ảnh sản phẩm với độ chân thực tuyệt đối mà không cần qua bất kỳ công đoạn chụp ảnh thực tế nào:</p>
<ul>
  <li><strong>Người mẫu ảo đa dạng:</strong> Doanh nghiệp chỉ cần tải lên ảnh chụp phẳng của trang phục. AI sẽ tự động mặc bộ trang phục đó lên một người mẫu ảo có thể tùy chỉnh giới tính, độ tuổi, màu da, quốc tịch và biểu cảm khuôn mặt.</li>
  <li><strong>Bối cảnh 3D vô hạn:</strong> AI tự động tách nền và ghép sản phẩm vào những bối cảnh sang trọng từ bãi biển nhiệt đới, đường phố Paris cho đến phòng khách hiện đại tùy theo ý muốn.</li>
  <li><strong>Sản xuất video hàng loạt:</strong> Tự động chuyển đổi kịch bản viết tay thành video giới thiệu sản phẩm sống động với giọng nói AI truyền cảm và phụ đề tự động chạy mượt mà.</li>
</ul>
<h2>3. Tối ưu hóa chi phí đến 90%</h2>
<p>Nhờ Studio AI, thời gian ra mắt hình ảnh sản phẩm mới giảm từ 1-2 tuần xuống chỉ còn vài phút. Doanh nghiệp tiết kiệm được hơn 90% chi phí sản xuất hình ảnh, giúp đẩy nhanh tốc độ tiếp cận thị trường và tăng khả năng cạnh tranh vượt bậc.</p>`,
        excerpt: 'Ứng dụng mô hình AI tạo mẫu ảnh và video 4K tự động giúp tiết kiệm đến 90% chi phí sản xuất tài nguyên quảng cáo cho doanh nghiệp thời trang và bán lẻ.',
        category: 'AI Trends',
        thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=60',
        author: 'iGen Admin',
        status: 'published',
        publishedAt: new Date('2026-06-07T09:00:00.000Z'),
      },
      {
        title: 'Trợ lý AI Thế hệ mới: Tự động hóa Chăm sóc khách hàng và Auto-Checkout',
        slug: 'tro-ly-ai-tu-dong-hoa-cham-soc-khach-hang-247',
        content: `<h2>1. CSKH 24/7: Bài toán nhân sự khó giải của doanh nghiệp</h2>
<p>Khách hàng trực tuyến có thói quen mua sắm vào ban đêm và cuối tuần. Nếu doanh nghiệp không phản hồi tin nhắn tư vấn trong vòng 5 phút, tỷ lệ khách hàng bỏ sang đối thủ cạnh tranh lên tới 80%. Tuy nhiên, việc duy trì đội ngũ trực chat 24/7 tốn rất nhiều chi phí nhân sự và khó kiểm soát chất lượng câu trả lời.</p>
<img src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1000&auto=format&fit=crop&q=80" alt="Trợ lý ảo hỗ trợ CSKH và Auto-Checkout 24/7" class="my-8 rounded-2xl w-full object-cover max-h-[400px] shadow-lg" />
<h2>2. Trợ lý AI thế hệ mới từ iGen Technology</h2>
<p>Được xây dựng trên nền tảng học sâu và xử lý ngôn ngữ tự nhiên tiếng Việt chuyên sâu, Trợ lý AI của iGen mang lại trải nghiệm tương tác tự nhiên như người thật:</p>
<ul>
  <li><strong>Tự động trả lời đa kênh:</strong> Hoạt động đồng bộ trên Website, Fanpage Facebook, Zalo OA, Instagram và Telegram. Đọc hiểu được các từ viết tắt, tiếng lóng và ngữ cảnh phức tạp của khách hàng.</li>
  <li><strong>Tự động thanh toán (Auto-Checkout):</strong> Không chỉ dừng lại ở tư vấn, Trợ lý AI tích hợp trực tiếp với cổng thanh toán điện tử (Momo, VNPAY, chuyển khoản ngân hàng qua mã QR động). AI có thể tự chốt đơn, gửi link thanh toán, kiểm tra giao dịch thành công và tạo vận đơn trên hệ thống giao hàng hoàn toàn tự động.</li>
  <li><strong>Gợi ý sản phẩm thông minh (Up-sell/Cross-sell):</strong> Dựa trên nhu cầu trò chuyện của khách hàng, AI phân tích hành vi và đề xuất thêm các sản phẩm đi kèm phù hợp để gia tăng giá trị đơn hàng trung bình.</li>
</ul>
<h2>3. Tăng trưởng doanh thu đột phá</h2>
<p>Sự hiện diện của Trợ lý AI giúp doanh nghiệp đảm bảo không bỏ sót bất kỳ khách hàng nào, đồng thời giảm tải 85% công việc cho đội ngũ nhân sự chăm sóc khách hàng truyền thống, mở ra cơ hội tăng trưởng doanh thu liên tục ngay cả khi doanh nghiệp đang ngủ.</p>`,
        excerpt: 'Giải pháp nhân viên ảo đa kênh tích hợp cổng thanh toán trực tuyến giúp tối đa hóa hiệu suất kinh doanh và tối ưu chi phí nhân sự.',
        category: 'Tech Insights',
        thumbnail: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=800&auto=format&fit=crop&q=60',
        author: 'iGen Admin',
        status: 'published',
        publishedAt: new Date('2026-06-06T09:00:00.000Z'),
      },
      {
        title: 'Case Study: Viện Quốc tế Luxdefa bứt phá doanh số với Agency Marketing AI',
        slug: 'case-study-luxdefa-agency-marketing-ai',
        content: `<h2>1. Thách thức của Viện Quốc tế Luxdefa</h2>
<p>Viện Quốc tế Luxdefa là đơn vị hàng đầu trong lĩnh vực làm đẹp và chăm sóc sức khỏe cao cấp. Với đặc thù phân khúc khách hàng thượng lưu, việc tiếp cận khách hàng tiềm năng qua các kênh quảng cáo truyền thống ngày càng trở nên đắt đỏ. Chi phí trên mỗi số điện thoại quan tâm (CPL) tăng cao liên tục trong khi tỷ lệ chuyển đổi thực tế giảm sút.</p>
<img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&auto=format&fit=crop&q=80" alt="Không gian sang trọng tại Viện Quốc tế Luxdefa" class="my-8 rounded-2xl w-full object-cover max-h-[400px] shadow-lg" />
<h2>2. Giải pháp đột phá từ iGen Agency Marketing AI</h2>
<p>iGen Technology đã triển khai giải pháp Agency Marketing tích hợp trí tuệ nhân tạo toàn diện cho Luxdefa:</p>
<ul>
  <li><strong>Quét và phân tích xu hướng:</strong> Hệ thống AI quét toàn bộ dữ liệu thảo luận trên mạng xã hội liên quan đến xu hướng làm đẹp để tự động lên kế hoạch nội dung hàng tuần.</li>
  <li><strong>Tự động phân bổ ngân sách:</strong> Thuật toán AI theo dõi hiệu quả quảng cáo theo thời gian thực, tự động tăng ngân sách vào các nhóm quảng cáo hiệu quả và tắt các chiến dịch kém chất lượng trên Google Ads, Facebook Ads và TikTok Ads.</li>
  <li><strong>Tự sinh banner và thông điệp:</strong> Sử dụng Studio AI tạo ra hàng loạt phiên bản thiết kế và thông điệp khác nhau để tối ưu hóa trải nghiệm cho từng nhóm đối tượng khách hàng mục tiêu riêng biệt.</li>
</ul>
<h2>3. Những con số ấn tượng</h2>
<p>Sau 2 tháng áp dụng giải pháp Agency Marketing AI của iGen Tech, Viện Quốc tế Luxdefa đã đạt được những kết quả đáng kinh ngạc:</p>
<ul>
  <li>Chi phí quảng cáo trên mỗi khách hàng tiềm năng (CPL) giảm tới 40%.</li>
  <li>Số lượng khách hàng đặt lịch hẹn thành công qua hệ thống tăng 65%.</li>
  <li>Doanh số tổng thể tăng trưởng 120% so với quý trước đó, chứng minh hiệu quả vượt trội của việc ứng dụng AI vào tối ưu hóa tiếp thị kỹ thuật số.</li>
</ul>`,
        excerpt: 'Kết quả thực tế từ sự kết hợp của iGen Tech và Viện Quốc tế Luxdefa trong việc áp dụng AI tối ưu hóa ngân sách và quảng cáo đa kênh.',
        category: 'Case Study',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
        author: 'iGen Admin',
        status: 'published',
        publishedAt: new Date('2026-06-05T09:00:00.000Z'),
      },
      {
        title: 'iGen Technology ký kết hợp tác chiến lược cùng các đối tác doanh nghiệp lớn',
        slug: 'igen-technology-ky-ket-hop-tac-chien-luoc',
        content: `<h2>1. Cột mốc quan trọng thúc đẩy chuyển đổi số toàn diện</h2>
<p>Vừa qua, iGen Technology đã tổ chức thành công Lễ ký kết thỏa thuận hợp tác chiến lược giai đoạn 2026 - 2030 với 4 doanh nghiệp lớn trong các lĩnh vực làm đẹp, sản xuất và y dược. Sự kiện đánh dấu bước tiến quan trọng của iGen Tech trong việc đưa các giải pháp Trí tuệ nhân tạo ứng dụng sâu vào thực tiễn kinh doanh và sản xuất tại Việt Nam.</p>
<img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&auto=format&fit=crop&q=80" alt="Lễ ký kết hợp tác chiến lược iGen Tech" class="my-8 rounded-2xl w-full object-cover max-h-[400px] shadow-lg" />
<h2>2. Nội dung hợp tác chiến lược với các đối tác</h2>
<ul>
  <li><strong>Viện Quốc tế Luxdefa:</strong> iGen Tech triển khai toàn bộ giải pháp Agency Marketing AI và Trợ lý AI hỗ trợ tư vấn chăm sóc khách hàng VIP tự động, giúp nâng cao chất lượng dịch vụ chuẩn quốc tế của Luxdefa.</li>
  <li><strong>Công ty TNHH Sản xuất Nhôm đúc:</strong> Áp dụng công nghệ thiết kế AI tự động dựng phối cảnh 3D các mẫu nhôm đúc mỹ thuật theo yêu cầu riêng biệt của khách hàng chỉ trong 10 giây, giảm thiểu quy trình thiết kế thủ công tốn thời gian.</li>
  <li><strong>Công ty Cổ phần Sâm Ngọc Linh:</strong> Xây dựng hệ thống Website AI và giải pháp truy xuất nguồn gốc sản phẩm bằng AI Vision, giúp bảo vệ thương hiệu và nâng cao uy tín cho dược liệu quý của Việt Nam.</li>
  <li><strong>Công ty xe điện Kaishi Việt Nhật:</strong> Tích hợp Trợ lý ảo AI thông minh trên hệ thống màn hình điều khiển của các dòng xe điện thế hệ mới, hỗ trợ người lái tương tác bằng giọng nói tiếng Việt tự nhiên và điều hướng thông minh.</li>
</ul>
<h2>3. Cùng nhau kiến tạo tương lai số</h2>
<p>Đại diện các bên đối tác bày tỏ niềm tin vững chắc vào năng lực công nghệ và đội ngũ chuyên gia của iGen Technology. Sự kết hợp giữa năng lực sản xuất, dịch vụ cốt lõi của các doanh nghiệp truyền thống và sức mạnh công nghệ AI đột phá từ iGen Tech hứa hẹn sẽ mang đến những sản phẩm, dịch vụ tốt nhất cho người tiêu dùng Việt Nam.</p>`,
        excerpt: 'Lễ ký kết hợp tác chuyển đổi số toàn diện giữa iGen Tech với Viện Quốc tế Luxdefa, Công ty sản xuất nhôm đúc, Công ty Cổ phần Sâm Ngọc Linh và Công ty xe điện Kaishi Việt Nhật.',
        category: 'Case Study',
        thumbnail: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60',
        author: 'iGen Admin',
        status: 'published',
        publishedAt: new Date('2026-06-04T09:00:00.000Z'),
      },
    ];

    let insertedCount = 0;
    let updatedCount = 0;
    for (const art of defaultArticles) {
      const exists = await Article.findOne({ slug: art.slug });
      if (!exists) {
        await Article.create(art);
        insertedCount++;
      } else {
        exists.title = art.title;
        exists.content = art.content;
        exists.excerpt = art.excerpt;
        exists.category = art.category;
        exists.thumbnail = art.thumbnail;
        exists.author = art.author;
        exists.status = art.status as 'draft' | 'published';
        exists.publishedAt = art.publishedAt;
        await exists.save();
        updatedCount++;
      }
    }
    if (insertedCount > 0 || updatedCount > 0) {
      console.log(`--- Seeded default articles: ${insertedCount} created, ${updatedCount} updated ---`);
    }
  } catch (error) {
    console.error('Failed to seed default articles:', error);
  }
};

// Global error handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error('Global error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Lỗi hệ thống nội bộ.',
  });
});

export default app;
