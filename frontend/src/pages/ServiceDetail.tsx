import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';
import { SilkBackground } from '../components/SilkBackground';
import { getVideoEmbed } from '../utils/videoEmbed';
import { type ServiceData, MOCK_SERVICES } from '../utils/servicesData';

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
