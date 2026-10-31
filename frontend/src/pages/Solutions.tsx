import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight, GraduationCap, Megaphone, Settings, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { useRevealAnimations } from '../hooks/useRevealAnimations';
import { type ServiceData, MOCK_SERVICES } from '../utils/servicesData';
import { SERVICE_COVERS } from '../utils/serviceCovers';
import './Solutions.css';

const PILLAR_SLUGS = [
  'tu-van-chuyen-doi-so',
  'ai-marketing-van-hanh',
  'nen-tang-ai-theo-yeu-cau',
  'hoc-vien-doanh-nghiep-1-nguoi',
];

const PILLARS = PILLAR_SLUGS
  .map((slug) => MOCK_SERVICES.find((s) => s.slug === slug))
  .filter((s): s is ServiceData => Boolean(s));

const PILLAR_HIGHLIGHTS = [
  { icon: TrendingUp, title: 'Tư vấn & Chuyển đổi số', description: 'Chiến lược và lộ trình số hóa phù hợp.' },
  { icon: Megaphone, title: 'AI Marketing & Vận hành', description: 'Tự động hóa quy trình, nâng cao hiệu quả.' },
  { icon: Settings, title: 'Nền tảng AI theo yêu cầu', description: 'Ứng dụng AI thiết kế riêng cho doanh nghiệp.' },
  { icon: GraduationCap, title: 'Học viện doanh nghiệp 1 người', description: 'Học cách vận hành và phát triển cùng AI.' },
];

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const Solutions: React.FC = () => {
  const [services, setServices] = useState<ServiceData[]>(MOCK_SERVICES);

  const fetchServices = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/services`, { params: { limit: 20, status: 'active' } });
      if (res.data?.success && res.data.data.docs.length > 0) {
        const apiServices: ServiceData[] = res.data.data.docs;
        const apiSlugs = new Set(apiServices.map((service) => service.slug));
        const addedServices = MOCK_SERVICES.filter((service) => service.order >= 11 && !apiSlugs.has(service.slug));
        setServices([...apiServices, ...addedServices]);
      }
    } catch {
      // Keep mock data when API offline
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const pillars = PILLAR_SLUGS
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is ServiceData => Boolean(s));
  const activePillars = pillars.length === PILLAR_SLUGS.length ? pillars : PILLARS;

  useRevealAnimations(services.length);

  return (
    <main className="solutions-page">

      {/* Hero Section */}
      <section className="solutions-hero">
        <div className="solutions-hero__inner">
          <div className="solutions-hero__copy">
            <h1 className="hero-reveal">Hệ sinh thái giải pháp<br /><span>AI</span> toàn diện</h1>
            <p className="hero-reveal">Khám phá sức mạnh của trí tuệ nhân tạo được thiết kế riêng cho sự phát triển vượt bậc của doanh nghiệp bạn.</p>
            <div className="solutions-hero__actions hero-reveal">
              <a href="#solutions-pillars" className="solutions-hero__primary">Khám phá giải pháp <ArrowRight size={19} aria-hidden="true" /></a>
              <RouterLink to="/contact" className="solutions-hero__secondary">Liên hệ tư vấn</RouterLink>
            </div>
          </div>
          <div className="solutions-hero__visual hero-reveal">
            <img src="/solutions-hero-robot.png" alt="Minh họa robot AI bên máy tính phân tích dữ liệu" fetchPriority="high" />
          </div>
        </div>
      </section>

      {/* Four Pillars Section */}
      <section className="solutions-pillars" id="solutions-pillars">
        <div className="solutions-pillars__inner">
          <div className="solutions-pillars__heading">
            <h2>Bốn trụ cột <span>cốt lõi</span></h2>
            <p>Nền tảng vững chắc cho mọi chiến lược chuyển đổi số.</p>
          </div>

          <div className="solutions-pillars__grid">
            {activePillars.map((p, index) => {
              const highlight = PILLAR_HIGHLIGHTS[index];
              const Icon = highlight.icon;
              return (
                <RouterLink key={p.slug} to={`/solutions/${p.slug}`} className="solutions-pillars__card">
                  <span className="solutions-pillars__icon"><Icon aria-hidden="true" /></span>
                  <span className="solutions-pillars__text"><strong>{highlight.title}</strong><small>{highlight.description}</small></span>
                  <span className="solutions-pillars__arrow"><ArrowRight size={18} aria-hidden="true" /></span>
                </RouterLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="section section-alt" id="solutions-catalog">
        <div className="container-page">
          <div className="mb-12 text-center reveal-text">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-3">
              Tất cả <span className="text-primary">dịch vụ</span>
            </h2>
            <p className="text-body text-lg">Khám phá toàn bộ danh mục giải pháp công nghệ của iGen.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal-items-container">
            {services.map((svc) => (
              <RouterLink
                key={svc.slug}
                to={`/solutions/${svc.slug}`}
                className="card card-hover overflow-hidden flex flex-col group reveal-item"
              >
                {/* Thumbnail banner at the top of the card */}
                <div className="aspect-video w-full relative overflow-hidden bg-surface-alt border-b border-line flex-shrink-0">
                  {SERVICE_COVERS[svc.slug] || svc.thumbnail ? (
                    <img
                      src={SERVICE_COVERS[svc.slug] || svc.thumbnail}
                      alt={svc.title}
                      loading="lazy"
                      decoding="async"
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
                  
                  <h3 className="text-lg font-medium text-ink mb-2 group-hover:text-primary transition-colors">{svc.title}</h3>
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
