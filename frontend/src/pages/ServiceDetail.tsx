import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';
import { SilkBackground } from '../components/SilkBackground';
import { getVideoEmbed } from '../utils/videoEmbed';

interface ServiceData {
  title: string;
  slug: string;
  shortDesc: string;
  description: string;
  icon: string;
  thumbnail?: string;
  videos?: string[];
  category: string;
  features: string[];
  status: string;
  order: number;
}

const MOCK_SERVICES: ServiceData[] = [
  {
    title: 'Thiết kế Website',
    slug: 'thiet-ke-website',
    shortDesc: 'Website chuyên nghiệp, tối ưu SEO, hiệu suất cao cho doanh nghiệp.',
    description: 'Chúng tôi thiết kế và phát triển website từ landing page đến hệ thống thương mại điện tử phức tạp. Đội ngũ iGen đảm bảo mỗi sản phẩm đạt chuẩn UX/UI hiện đại, tải nhanh và thân thiện với công cụ tìm kiếm.',
    icon: 'language', category: 'Web',
    features: ['Responsive Design', 'Tối ưu SEO', 'CMS dễ sử dụng', 'Bảo mật SSL', 'Tốc độ tải nhanh'],
    status: 'active', order: 1,
  },
  {
    title: 'Phát triển Ứng dụng Di động',
    slug: 'phat-trien-ung-dung-di-dong',
    shortDesc: 'App iOS & Android chất lượng cao, trải nghiệm người dùng vượt trội.',
    description: 'iGen phát triển ứng dụng di động native và cross-platform cho iOS và Android. Từ thiết kế UI/UX đến triển khai trên App Store và Google Play.',
    icon: 'phone_android', category: 'Mobile',
    features: ['iOS & Android', 'React Native / Flutter', 'Push Notification', 'Offline Support', 'Analytics tích hợp'],
    status: 'active', order: 2,
  },
  {
    title: 'Mini App Zalo',
    slug: 'mini-app-zalo',
    shortDesc: 'Tiếp cận 75 triệu người dùng Zalo với Mini App tích hợp.',
    description: 'Mini App Zalo giúp doanh nghiệp tiếp cận khách hàng trực tiếp trên nền tảng Zalo — không cần cài đặt, tức thì, tiện lợi.',
    icon: 'chat', category: 'Mobile',
    features: ['Tích hợp ZaloPay', 'Zalo OA liên kết', 'Không cần cài đặt', 'Tốc độ cao', 'Tiếp cận 75M user'],
    status: 'active', order: 3,
  },
  {
    title: 'Giải pháp AI & Automation',
    slug: 'giai-phap-ai-automation',
    shortDesc: 'Tự động hóa quy trình, tích hợp AI vào vận hành doanh nghiệp.',
    description: 'Ứng dụng trí tuệ nhân tạo để tự động hóa quy trình, phân tích dữ liệu và cải thiện hiệu suất doanh nghiệp.',
    icon: 'psychology', category: 'AI',
    features: ['Chatbot AI', 'Phân tích dữ liệu', 'Automation workflow', 'NLP tiếng Việt', 'Computer Vision'],
    status: 'active', order: 4,
  },
  {
    title: 'Hệ thống E-Commerce',
    slug: 'he-thong-e-commerce',
    shortDesc: 'Nền tảng thương mại điện tử toàn diện, tích hợp thanh toán đa kênh.',
    description: 'iGen xây dựng hệ thống E-Commerce từ cửa hàng trực tuyến đơn giản đến marketplace phức tạp.',
    icon: 'shopping_cart', category: 'E-Commerce',
    features: ['Thanh toán đa kênh', 'Quản lý kho', 'Omnichannel', 'Flash Sale', 'Báo cáo thống kê'],
    status: 'active', order: 5,
  },
  {
    title: 'Tư vấn & Chuyển đổi Số',
    slug: 'tu-van-chuyen-doi-so',
    shortDesc: 'Tư vấn chiến lược và triển khai chuyển đổi số toàn diện cho doanh nghiệp.',
    description: 'Đội ngũ chuyên gia iGen đồng hành cùng doanh nghiệp trong hành trình chuyển đổi số: đánh giá hiện trạng, hoạch định chiến lược, lựa chọn công nghệ phù hợp.',
    icon: 'trending_up', category: 'Consulting',
    features: ['Đánh giá hiện trạng', 'Roadmap số hóa', 'Triển khai ERP/CRM', 'Đào tạo nhân sự', 'Hỗ trợ hậu triển khai'],
    status: 'active', order: 6,
  },
  {
    title: 'Học viện doanh nghiệp 1 người',
    slug: 'hoc-vien-doanh-nghiep-1-nguoi',
    shortDesc: 'Biến AI thành đội ngũ nhân sự số của riêng bạn. Học cách tự động hóa marketing, bán hàng, chăm sóc khách hàng và vận hành.',
    description: 'Chúng tôi đào tạo và chuyển giao hệ thống vận hành bằng AI giúp cá nhân và doanh nghiệp tối ưu nguồn lực, tự động hóa quy trình và giảm phụ thuộc vào nhân sự truyền thống. Từ marketing, bán hàng, chăm sóc khách hàng đến quản trị nội bộ, AI sẽ trở thành đội ngũ hỗ trợ giúp doanh nghiệp vận hành hiệu quả hơn.',
    icon: 'school', category: 'AI',
    features: [
      'Mô hình Doanh nghiệp 1 Người',
      'Tự động hóa quy trình bằng AI',
      'Xây dựng đội ngũ AI Agent',
      'Marketing & CSKH tự động',
      'Tăng năng suất – Giảm chi phí',
      'Hệ thống vận hành 24/7'
    ],
    videos: [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    ],
    status: 'active', order: 7,
  },
  {
    title: 'Chuyển Đổi AI Doanh Nghiệp',
    slug: 'chuyen-doi-ai-doanh-nghiep',
    shortDesc: 'Không chỉ đào tạo, chúng tôi trực tiếp chuyển giao quy trình và giải pháp AI phù hợp với từng doanh nghiệp.',
    description: 'Giúp doanh nghiệp ứng dụng AI vào hoạt động thực tế thông qua chương trình đào tạo chuyên sâu và chuyển giao giải pháp phù hợp với từng mô hình kinh doanh. Chúng tôi đồng hành từ tư duy, quy trình đến triển khai, giúp doanh nghiệp nâng cao năng suất, tối ưu chi phí và xây dựng hệ thống vận hành thông minh.',
    icon: 'business', category: 'AI',
    features: [
      'Đào tạo AI cho đội ngũ nhân sự',
      'Chuyển giao quy trình vận hành AI',
      'Tích hợp AI vào SOP doanh nghiệp',
      'Tối ưu năng suất làm việc',
      'Giảm chi phí vận hành',
      'Đồng hành triển khai thực tế'
    ],
    videos: [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    ],
    status: 'active', order: 8,
  },
  {
    title: 'Nền Tảng AI Theo Yêu Cầu',
    slug: 'nen-tang-ai-theo-yeu-cau',
    shortDesc: 'Chúng tôi thiết kế và phát triển các ứng dụng AI chuyên biệt giúp tự động hóa công việc, quản lý dữ liệu.',
    description: 'Mỗi doanh nghiệp đều có những nhu cầu và quy trình vận hành riêng biệt. iGen Technology thiết kế và phát triển các nền tảng AI theo yêu cầu, giúp tự động hóa công việc, tối ưu quản lý dữ liệu và nâng cao hiệu suất vận hành. Từ chatbot AI, trợ lý AI, ERP đến các hệ thống chuyên biệt, mọi giải pháp đều được xây dựng để phục vụ đúng mục tiêu kinh doanh của khách hàng.',
    icon: 'settings', category: 'AI',
    features: [
      'Phát triển ứng dụng AI theo yêu cầu',
      'Thiết kế hệ thống ERP thông minh',
      'Chatbot & Trợ lý AI chuyên biệt',
      'Tự động hóa quy trình vận hành',
      'Tích hợp AI vào hệ thống hiện có',
      'Tùy biến theo từng ngành nghề'
    ],
    status: 'active', order: 9,
  },
  {
    title: 'AI Marketing & Vận Hành',
    slug: 'ai-marketing-van-hanh',
    shortDesc: 'Ứng dụng AI vào marketing, truyền thông và quản trị doanh nghiệp nhằm tự động hóa quy trình, nâng cao hiệu quả.',
    description: 'iGen Technology giúp doanh nghiệp ứng dụng AI vào toàn bộ hoạt động marketing và vận hành, từ xây dựng nội dung, quảng cáo, chăm sóc khách hàng đến quản lý công việc và quy trình nội bộ. Nhờ tự động hóa bằng AI, doanh nghiệp có thể gia tăng năng suất, tối ưu chi phí và tập trung nguồn lực cho các hoạt động tạo ra doanh thu.',
    icon: 'campaign', category: 'AI',
    features: [
      'AI Marketing đa kênh',
      'Tự động hóa nội dung & truyền thông',
      'Trợ lý AI chăm sóc khách hàng',
      'Tối ưu quy trình vận hành',
      'Nâng cao năng suất đội ngũ',
      'Giảm chi phí tăng trưởng doanh nghiệp'
    ],
    status: 'active', order: 10,
  },
];

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchService = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/services/${slug}`);
      if (res.data?.success) {
        setService(res.data.data);
      }
    } catch {
      // Fallback to mock data when API offline
      const found = MOCK_SERVICES.find((s) => s.slug === slug);
      setService(found || null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    const run = async () => {
      await Promise.resolve();
      await fetchService();
    };
    run();
  }, [fetchService]);

  useEffect(() => {
    if (!loading && service) {
      document.title = `${service.title} | iGen Technology`;
      gsap.fromTo(
        '.sd-reveal',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [loading, service]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-white text-ink flex flex-col items-center justify-center gap-6">
        <span className="material-symbols-outlined text-primary text-7xl">search_off</span>
        <h1 className="text-2xl font-bold">Không tìm thấy dịch vụ</h1>
        <Link to="/solutions" className="text-primary hover:underline">
          ← Quay lại danh sách dịch vụ
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-36 pb-40 overflow-hidden">
        <SilkBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="sd-reveal mb-6">
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 text-sm font-medium text-body hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Sản phẩm &amp; Dịch vụ
            </Link>
          </div>

          <div className="sd-reveal flex items-center gap-4 mb-5">
            <span className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">{service.icon}</span>
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-primary-light border border-primary/20 text-primary uppercase tracking-widest font-semibold">
              {service.category}
            </span>
          </div>

          <h1 className="sd-reveal text-4xl md:text-5xl font-extrabold text-ink leading-tight mb-6">
            {service.title}
          </h1>

          <p className="sd-reveal text-lg text-body leading-relaxed max-w-2xl">
            {service.shortDesc}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main description */}
          <div className="lg:col-span-2 sd-reveal">
            <div className="card p-8">
              <h2 className="text-xl font-semibold text-ink mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                Mô tả chi tiết
              </h2>
              <p className="text-body leading-relaxed text-base whitespace-pre-line">
                {service.description}
              </p>
            </div>
          </div>

          {/* Features sidebar */}
          <div className="sd-reveal">
            <div className="card p-8 sticky top-28">
              <h2 className="text-xl font-semibold text-ink mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">checklist</span>
                Tính năng nổi bật
              </h2>
              <ul className="space-y-3">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-body">
                    <span className="w-5 h-5 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-xs">check</span>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Service Videos */}
          {service.videos && service.videos.length > 0 && (
            <div className="lg:col-span-3 sd-reveal mt-4">
              <div className="card p-8">
                <h2 className="text-xl font-semibold text-ink mb-6 flex items-center justify-center gap-2 text-center">
                  <span className="material-symbols-outlined text-primary">play_circle</span>
                  Video giới thiệu &amp; Hướng dẫn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {service.videos.map((videoUrl, index) => {
                    const embed = getVideoEmbed(videoUrl);
                    if (!embed) return null;

                    if (embed.type === 'link') {
                      return (
                        <a
                          key={index}
                          href={embed.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="aspect-video w-full rounded-xl border border-line bg-surface-alt shadow-sm flex flex-col items-center justify-center gap-3 text-body hover:text-primary hover:border-primary/30 transition-colors"
                        >
                          <span className="material-symbols-outlined text-4xl">open_in_new</span>
                          <span className="text-sm font-semibold">Xem video</span>
                        </a>
                      );
                    }

                    return (
                      <div
                        key={index}
                        className={`w-full rounded-xl overflow-hidden bg-black border border-line shadow-sm ${
                          embed.vertical ? 'aspect-[9/16] max-w-[280px] mx-auto' : 'aspect-video'
                        }`}
                      >
                        {embed.type === 'iframe' ? (
                          <iframe
                            src={embed.src}
                            title={`${service.title} Video ${index + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full"
                          ></iframe>
                        ) : (
                          <video src={embed.src} controls className="w-full h-full object-cover">
                            Trình duyệt của bạn không hỗ trợ phát video.
                          </video>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto sd-reveal">
          <div className="rounded-3xl p-10 text-center bg-surface-alt border border-line">
            <h2 className="text-2xl font-bold text-ink mb-3">Sẵn sàng bắt đầu?</h2>
            <p className="text-body mb-8">
              Hãy để iGen đồng hành cùng bạn trong dự án <span className="text-primary font-semibold">{service.title}</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary px-8 py-3.5">
                <span className="material-symbols-outlined text-base">mail</span>
                Liên hệ tư vấn
              </Link>
              <Link to="/solutions" className="btn-secondary px-8 py-3.5">
                <span className="material-symbols-outlined text-base">grid_view</span>
                Xem tất cả dịch vụ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
