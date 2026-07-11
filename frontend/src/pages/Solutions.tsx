import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { SilkBackground } from '../components/SilkBackground';
import { useRevealAnimations } from '../hooks/useRevealAnimations';
import { type ServiceData, MOCK_SERVICES } from '../utils/servicesData';

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

  useRevealAnimations(services.length);

  return (
    <main className="flex flex-col w-full relative">

      {/* Hero Section */}
      <section className="relative pt-40 pb-44 md:pt-48 md:pb-52 overflow-hidden">
        <SilkBackground />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
          <span className="hero-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            AI Solutions Suite
          </span>
          <h1 className="hero-reveal text-4xl md:text-6xl font-extrabold tracking-tight text-ink leading-[1.1] mb-6">
            Hệ sinh thái giải pháp AI toàn diện
          </h1>
          <p className="hero-reveal text-lg md:text-xl text-body max-w-2xl leading-relaxed">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-items-container">
            {PILLARS.map((p) => (
              <div key={p.slug} className="card card-hover p-8 md:p-10 flex flex-col reveal-item">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal-items-container">
            {services.map((svc) => (
              <RouterLink
                key={svc.slug}
                to={`/solutions/${svc.slug}`}
                className="card card-hover overflow-hidden flex flex-col group reveal-item"
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
