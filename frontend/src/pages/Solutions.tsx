import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import { SilkBackground } from '../components/SilkBackground';

gsap.registerPlugin(ScrollTrigger);

interface ServiceData {
  _id?: string;
  title: string;
  slug: string;
  shortDesc: string;
  icon: string;
  thumbnail?: string;
  category: string;
  features: string[];
}

const MOCK_SERVICES: ServiceData[] = [
  { title: 'Học viện doanh nghiệp 1 người', slug: 'hoc-vien-doanh-nghiep-1-nguoi', shortDesc: 'Biến AI thành đội ngũ nhân sự số của riêng bạn. Học cách tự động hóa marketing, bán hàng, chăm sóc khách hàng và vận hành.', icon: 'school', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60', category: 'AI', features: ['Mô hình Doanh nghiệp 1 Người', 'Tự động hóa quy trình bằng AI', 'Xây dựng đội ngũ AI Agent'] },
  { title: 'Chuyển Đổi AI Doanh Nghiệp', slug: 'chuyen-doi-ai-doanh-nghiep', shortDesc: 'Không chỉ đào tạo, chúng tôi trực tiếp chuyển giao quy trình và giải pháp AI phù hợp với từng doanh nghiệp.', icon: 'business', thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60', category: 'AI', features: ['Đào tạo AI cho đội ngũ nhân sự', 'Chuyển giao quy trình vận hành AI', 'Tích hợp AI vào SOP doanh nghiệp'] },
  { title: 'Nền Tảng AI Theo Yêu Cầu', slug: 'nen-tang-ai-theo-yeu-cau', shortDesc: 'Chúng tôi thiết kế và phát triển các ứng dụng AI chuyên biệt giúp tự động hóa công việc, quản lý dữ liệu.', icon: 'settings', thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60', category: 'AI', features: ['Phát triển ứng dụng AI theo yêu cầu', 'Thiết kế hệ thống ERP thông minh', 'Chatbot & Trợ lý AI chuyên biệt'] },
  { title: 'AI Marketing & Vận Hành', slug: 'ai-marketing-van-hanh', shortDesc: 'Ứng dụng AI vào marketing, truyền thông và quản trị doanh nghiệp nhằm tự động hóa quy trình, nâng cao hiệu quả.', icon: 'campaign', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60', category: 'AI', features: ['AI Marketing đa kênh', 'Tự động hóa nội dung & truyền thông', 'Trợ lý AI chăm sóc khách hàng'] },
  { title: 'Thiết kế Website', slug: 'thiet-ke-website', shortDesc: 'Website chuyên nghiệp, tối ưu SEO, hiệu suất cao.', icon: 'language', thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=60', category: 'Web', features: ['Responsive', 'SEO', 'SSL'] },
  { title: 'Phát triển App Di động', slug: 'phat-trien-ung-dung-di-dong', shortDesc: 'App iOS & Android chất lượng cao.', icon: 'phone_android', thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60', category: 'Mobile', features: ['iOS & Android', 'Push Notification', 'Offline'] },
  { title: 'Mini App Zalo', slug: 'mini-app-zalo', shortDesc: 'Tiếp cận 75 triệu người dùng Zalo.', icon: 'chat', thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60', category: 'Mobile', features: ['ZaloPay', 'Zalo OA', 'Không cài đặt'] },
  { title: 'Giải pháp AI & Automation', slug: 'giai-phap-ai-automation', shortDesc: 'Tự động hóa quy trình, tích hợp AI.', icon: 'psychology', thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60', category: 'AI', features: ['Chatbot', 'NLP', 'Computer Vision'] },
  { title: 'Hệ thống E-Commerce', slug: 'he-thong-e-commerce', shortDesc: 'Nền tảng thương mại điện tử toàn diện.', icon: 'shopping_cart', thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60', category: 'E-Commerce', features: ['Thanh toán đa kênh', 'Quản lý kho', 'CRM'] },
  { title: 'Tư vấn & Chuyển đổi Số', slug: 'tu-van-chuyen-doi-so', shortDesc: 'Chiến lược số hóa toàn diện cho doanh nghiệp.', icon: 'trending_up', thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60', category: 'Consulting', features: ['Đánh giá', 'Roadmap', 'ERP/CRM'] },
];

const PILLARS = MOCK_SERVICES.slice(0, 4);

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const Solutions: React.FC = () => {
  const [services, setServices] = useState<ServiceData[]>(MOCK_SERVICES);

  const fetchServices = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/services`, { params: { limit: 20, status: 'active' } });
      if (res.data?.success && res.data.data.docs.length > 0) {
        setServices(res.data.data.docs);
      }
    } catch {
      // Keep mock data when API offline
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    const reveals = gsap.utils.toArray<HTMLElement>('.reveal-text');
    const triggers = reveals.map((el) =>
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        }
      )
    );
    return () => {
      triggers.forEach((t) => t.scrollTrigger?.kill());
    };
  }, []);

  return (
    <main className="flex flex-col w-full relative">

      {/* Hero Section */}
      <section className="relative pt-40 pb-44 md:pt-48 md:pb-52 overflow-hidden">
        <SilkBackground />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            AI Solutions Suite
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-ink leading-[1.1] mb-6">
            Hệ sinh thái giải pháp AI toàn diện
          </h1>
          <p className="text-lg md:text-xl text-body max-w-2xl leading-relaxed">
            Khám phá sức mạnh của trí tuệ nhân tạo được thiết kế riêng cho sự phát triển vượt bậc của doanh nghiệp bạn.
          </p>
        </div>
      </section>

      {/* Four Pillars Section */}
      <section className="section">
        <div className="container-page">
          <div className="mb-14 text-center max-w-3xl mx-auto reveal-text">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
              Bốn trụ cột <span className="text-primary">cốt lõi</span>
            </h2>
            <p className="text-body text-lg">Nền tảng vững chắc cho mọi chiến lược chuyển đổi số.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((p) => (
              <div key={p.slug} className="card card-hover p-8 md:p-10 flex flex-col reveal-text">
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-3xl">{p.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-ink mb-3">{p.title}</h3>
                <p className="text-body leading-relaxed flex-1">{p.shortDesc}</p>
                <RouterLink to={`/solutions/${p.slug}`} className="link-arrow mt-6">
                  Xem chi tiết <span className="material-symbols-outlined text-base">arrow_forward</span>
                </RouterLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="section section-alt">
        <div className="container-page">
          <div className="mb-12 text-center reveal-text">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-3">
              Tất cả <span className="text-primary">dịch vụ</span>
            </h2>
            <p className="text-body text-lg">Khám phá toàn bộ danh mục giải pháp công nghệ của iGen.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <RouterLink
                key={svc.slug}
                to={`/solutions/${svc.slug}`}
                className="card card-hover overflow-hidden flex flex-col group reveal-text"
              >
                {/* Thumbnail banner at the top of the card */}
                <div className="aspect-video w-full relative overflow-hidden bg-surface-alt border-b border-line flex-shrink-0">
                  {svc.thumbnail ? (
                    <img
                      src={svc.thumbnail}
                      alt={svc.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary/30">
                      <span className="material-symbols-outlined text-5xl">category</span>
                    </div>
                  )}
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur text-primary text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm">
                    {svc.category}
                  </span>
                </div>

                {/* Content wrapper inside */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-lg">{svc.icon}</span>
                    </div>
                    <span className="text-xs text-muted font-medium">iGen Solution</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-ink mb-2 group-hover:text-primary transition-colors">{svc.title}</h3>
                  <p className="text-sm text-body leading-relaxed mb-4 line-clamp-3 flex-1">{svc.shortDesc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {svc.features.slice(0, 3).map((f, fi) => (
                      <span key={fi} className="text-xs px-2.5 py-1 rounded-full bg-primary-light text-primary font-medium">{f}</span>
                    ))}
                  </div>
                  
                  <span className="link-arrow mt-auto">
                    Xem chi tiết <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </span>
                </div>
              </RouterLink>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};
