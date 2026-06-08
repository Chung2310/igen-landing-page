import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

interface ServiceData {
  _id?: string;
  title: string;
  slug: string;
  shortDesc: string;
  icon: string;
  category: string;
  features: string[];
}

const MOCK_SERVICES: ServiceData[] = [
  { title: 'Thiết kế Website', slug: 'thiet-ke-website', shortDesc: 'Website chuyên nghiệp, tối ưu SEO, hiệu suất cao.', icon: 'language', category: 'Web', features: ['Responsive', 'SEO', 'SSL'] },
  { title: 'Phát triển App Di động', slug: 'phat-trien-ung-dung-di-dong', shortDesc: 'App iOS & Android chất lượng cao.', icon: 'phone_android', category: 'Mobile', features: ['iOS & Android', 'Push Notification', 'Offline'] },
  { title: 'Mini App Zalo', slug: 'mini-app-zalo', shortDesc: 'Tiếp cận 75 triệu người dùng Zalo.', icon: 'chat', category: 'Mobile', features: ['ZaloPay', 'Zalo OA', 'Không cài đặt'] },
  { title: 'Giải pháp AI & Automation', slug: 'giai-phap-ai-automation', shortDesc: 'Tự động hóa quy trình, tích hợp AI.', icon: 'psychology', category: 'AI', features: ['Chatbot', 'NLP', 'Computer Vision'] },
  { title: 'Hệ thống E-Commerce', slug: 'he-thong-e-commerce', shortDesc: 'Nền tảng thương mại điện tử toàn diện.', icon: 'shopping_cart', category: 'E-Commerce', features: ['Thanh toán đa kênh', 'Quản lý kho', 'CRM'] },
  { title: 'Tư vấn & Chuyển đổi Số', slug: 'tu-van-chuyen-doi-so', shortDesc: 'Chiến lược số hóa toàn diện cho doanh nghiệp.', icon: 'trending_up', category: 'Consulting', features: ['Đánh giá', 'Roadmap', 'ERP/CRM'] },
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

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
    const run = async () => {
      await Promise.resolve();
      await fetchServices();
    };
    run();
  }, [fetchServices]);
  useEffect(() => {
    // Initial reveals
    const tl = gsap.timeline();
    tl.to('.reveal-hero-text', {
      y: 0,
      duration: 1.4,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 0.2,
    }).to(
      '.reveal-hero-fade',
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
      },
      '-=0.8'
    );

    // Mouse movement parallax for shapes
    const handleShapeParallax = (e: MouseEvent) => {
      const shapes = document.querySelectorAll('.shape-floater');
      shapes.forEach((shape) => {
        const speed = parseFloat(shape.getAttribute('data-speed') || '0.05');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        gsap.to(shape, {
          x,
          y,
          duration: 1,
          ease: 'power1.out',
        });
      });
    };
    window.addEventListener('mousemove', handleShapeParallax);

    // Card Magnetic & Particles Logic
    const cards = document.querySelectorAll('.card-magnetic');
    cards.forEach((card) => {
      const particlesContainer = card.querySelector('.card-particles');
      
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Magnetic Pull
        gsap.to(card, {
          x: (x - centerX) * 0.05,
          y: (y - centerY) * 0.05,
          duration: 0.5,
          ease: 'power2.out',
        });

        // Spawn particles inside card
        if (Math.random() > 0.8 && particlesContainer) {
          const particle = document.createElement('div');
          particle.className = 'micro-particle';
          particlesContainer.appendChild(particle);

          const spawnX = x + (Math.random() * 40 - 20);
          const spawnY = y + (Math.random() * 40 - 20);
          gsap.set(particle, { x: spawnX, y: spawnY, opacity: 0.8, scale: 0 });
          gsap.to(particle, {
            scale: 1.5,
            opacity: 0,
            x: spawnX + (Math.random() * 20 - 10),
            y: spawnY + (Math.random() * 20 - 10),
            duration: 0.8,
            onComplete: () => particle.remove(),
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(card, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    // Parallax Tilt for Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach((card) => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.4,
          ease: 'power1.out',
          transformPerspective: 1000,
          transformStyle: 'preserve-3d',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    // Standard scroll reveals
    const reveals = document.querySelectorAll('.reveal-text');
    reveals.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener('mousemove', handleShapeParallax);
    };
  }, []);

  return (
    <main className="flex flex-col w-full relative z-10">
      
      {/* Parallax Floating Shapes */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden" id="shape-container">
        <div className="shape-floater shape-cube top-[15%] left-[10%] animate-float" data-speed="0.05"></div>
        <div className="shape-floater shape-sphere top-[25%] right-[15%] animate-float-delayed" data-speed="0.08"></div>
        <div className="shape-floater shape-cube top-[60%] left-[5%] animate-float-reverse opacity-20 scale-75" data-speed="0.03"></div>
        <div className="shape-floater shape-sphere top-[80%] right-[8%] animate-float opacity-20 scale-150" data-speed="0.06"></div>
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden pt-20 dof-target-section" id="hero-section">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent z-0"></div>
        <div className="absolute inset-0 grid-bg-dark opacity-20 z-0"></div>
        <div className="bg-text-overlap top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">SOLUTIONS</div>
        
        {/* Decorative globe wireframe */}
        <div className="absolute right-[-10%] top-[20%] w-[800px] h-[800px] rounded-full border border-primary/10 opacity-30 animate-spin-slow pointer-events-none z-0">
          <div className="absolute inset-0 rounded-full border border-white/5 transform rotate-45"></div>
          <div className="absolute inset-0 rounded-full border border-white/5 transform -rotate-45"></div>
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/20"></div>
          <div className="absolute top-0 left-1/2 h-full w-[1px] bg-primary/20"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto text-center px-4 flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg mb-10 animate-float">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-bold text-primary-light uppercase tracking-[0.3em]">
              AI Solutions Suite
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter text-white leading-none mb-8 select-none">
            <div className="overflow-hidden">
              <span className="block translate-y-full reveal-hero-text bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
                Hệ Sinh Thế
              </span>
            </div>
            <div className="overflow-hidden py-2">
              <span className="block translate-y-full reveal-hero-text text-masked-video-anim italic">
                Giải Pháp AI
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="block translate-y-full reveal-hero-text bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
                Toàn Diện
              </span>
            </div>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-light leading-relaxed mb-12 tracking-wide opacity-0 reveal-hero-fade">
            Khám phá sức mạnh của trí tuệ nhân tạo được thiết kế riêng cho sự phát triển vượt bậc của doanh nghiệp bạn.
          </p>
        </div>
      </section>

      {/* Bento Solutions Section */}
      <section className="py-32 relative z-20 section-transition" id="ecosystem-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="mb-24 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight reveal-text">
              Bốn Trụ Cột <span className="text-primary italic relative inline-block">Cốt Lõi</span>
            </h2>
            <p className="text-gray-400 text-lg font-light reveal-text">
              Nền tảng vững chắc cho mọi chiến lược chuyển đổi số.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* website-ai-card */}
            <div className="group relative glass-premium rounded-3xl p-12 overflow-hidden interactable tilt-card card-magnetic" id="website-ai-card">
              <div className="card-particles"></div>
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#0a0f1d] opacity-90 transition-colors duration-500 group-hover:opacity-100"></div>
                <div className="absolute inset-0 bento-card-bg bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
              </div>
              <div className="relative z-10 max-w-lg h-full flex flex-col justify-between pointer-events-none">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500 shadow-glow backdrop-blur-md">
                    <span className="material-symbols-outlined text-4xl">language</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 group-hover:text-primary-light transition-colors">
                    Website AI{' '}
                    <span className="text-xs align-top bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/20 ml-3 tracking-wider">
                      PRO
                    </span>
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    Hệ thống website thông minh tự động tối ưu hóa UI/UX dựa trên hành vi người dùng, tăng tỷ lệ chuyển đổi tối đa. Bao gồm tối ưu SEO sâu và tăng tốc độ tải trang vượt trội.
                  </p>
                </div>
                <div className="mt-8 pointer-events-auto">
                  <RouterLink
                    to="/contact"
                    className="text-sm uppercase tracking-widest text-primary border border-primary/50 rounded-full px-8 py-3 group-hover:bg-primary group-hover:text-white transition-all duration-300 inline-flex items-center gap-2 shadow-[0_0_15px_rgba(0,151,178,0.3)] hover:shadow-[0_0_25px_rgba(0,151,178,0.6)]"
                  >
                    Nhận tư vấn <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </RouterLink>
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-700"></div>
            </div>

            {/* studio-ai-card */}
            <div className="group relative glass-premium rounded-3xl p-12 overflow-hidden interactable tilt-card card-magnetic" id="studio-ai-card">
              <div className="card-particles"></div>
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#0a0f1d] opacity-90 transition-colors duration-500 group-hover:opacity-100"></div>
              </div>
              <div className="relative z-10 max-w-lg h-full flex flex-col justify-between pointer-events-none">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(0,151,178,0.2)] backdrop-blur-md">
                    <span className="material-symbols-outlined text-4xl">switch_video</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 group-hover:text-primary-light transition-colors">
                    Studio AI
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    Tự động hóa sản xuất nội dung đa phương tiện. Từ hình ảnh đến video 4K chất lượng cao với người mẫu ảo (Virtual Models) chân thực chỉ trong vài giây.
                  </p>
                </div>
                <div className="mt-8 pointer-events-auto">
                  <RouterLink
                    to="/contact"
                    className="text-sm uppercase tracking-widest text-primary border border-primary/50 rounded-full px-8 py-3 group-hover:bg-primary group-hover:text-white transition-all duration-300 inline-flex items-center gap-2 shadow-[0_0_15px_rgba(0,151,178,0.3)] hover:shadow-[0_0_25px_rgba(0,151,178,0.6)]"
                  >
                    Nhận tư vấn <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </RouterLink>
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-700"></div>
            </div>

            {/* agency-card */}
            <div className="group relative glass-premium rounded-3xl p-12 overflow-hidden interactable tilt-card card-magnetic" id="agency-card">
              <div className="card-particles"></div>
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#0a0f1d] opacity-90 transition-colors duration-500 group-hover:opacity-100"></div>
              </div>
              <div className="relative z-10 max-w-lg h-full flex flex-col justify-between pointer-events-none">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(0,151,178,0.2)] backdrop-blur-md">
                    <span className="material-symbols-outlined text-4xl">campaign</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 group-hover:text-primary-light transition-colors">
                    Agency Marketing
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    Giải pháp marketing tổng thể với sức mạnh phân tích dữ liệu AI sâu rộng. Tối ưu hóa chiến dịch Social Media và Ads performance một cách tự động và chính xác.
                  </p>
                </div>
                <div className="mt-8 pointer-events-auto">
                  <RouterLink
                    to="/contact"
                    className="text-sm uppercase tracking-widest text-primary border border-primary/50 rounded-full px-8 py-3 group-hover:bg-primary group-hover:text-white transition-all duration-300 inline-flex items-center gap-2 shadow-[0_0_15px_rgba(0,151,178,0.3)] hover:shadow-[0_0_25px_rgba(0,151,178,0.6)]"
                  >
                    Nhận tư vấn <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </RouterLink>
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-700"></div>
            </div>

            {/* assistant-ai-card */}
            <div className="group relative glass-premium rounded-3xl p-12 overflow-hidden interactable tilt-card card-magnetic" id="assistant-ai-card">
              <div className="card-particles"></div>
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#0a0f1d] opacity-90 transition-colors duration-500 group-hover:opacity-100"></div>
              </div>
              <div className="relative z-10 max-w-lg h-full flex flex-col justify-between pointer-events-none">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(0,151,178,0.2)] backdrop-blur-md">
                    <span className="material-symbols-outlined text-4xl">smart_toy</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 group-hover:text-primary-light transition-colors">
                    Trợ lý AI
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    Nhân viên ảo đa năng hoạt động 24/7. Hỗ trợ CSKH, tư vấn tự động với khả năng hiểu ngôn ngữ tự nhiên và tích hợp hệ thống thanh toán Auto-checkout mượt mà.
                  </p>
                </div>
                <div className="mt-8 pointer-events-auto">
                  <RouterLink
                    to="/contact"
                    className="text-sm uppercase tracking-widest text-primary border border-primary/50 rounded-full px-8 py-3 group-hover:bg-primary group-hover:text-white transition-all duration-300 inline-flex items-center gap-2 shadow-[0_0_15px_rgba(0,151,178,0.3)] hover:shadow-[0_0_25px_rgba(0,151,178,0.6)]"
                  >
                    Nhận tư vấn <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </RouterLink>
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-700"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Dynamic Services from API */}
      <section className="py-24 relative z-20" id="services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight reveal-text">
              Tất cả <span className="text-primary italic">Dịch vụ</span>
            </h2>
            <p className="text-gray-400 text-lg reveal-text">Khám phá toàn bộ danh mục giải pháp công nghệ của iGen.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <RouterLink
                key={svc.slug}
                to={`/solutions/${svc.slug}`}
                className="group relative bg-[#0a1315] border border-[#1a2e33] rounded-3xl p-7 overflow-hidden hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 reveal-text interactable"
                id={`service-card-${i}`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/15 transition-colors duration-500"></div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-primary text-2xl">{svc.icon}</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[#82a1a8] uppercase tracking-widest">{svc.category}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{svc.title}</h3>
                <p className="text-sm text-[#82a1a8] leading-relaxed mb-5">{svc.shortDesc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {svc.features.slice(0, 3).map((f, fi) => (
                    <span key={fi} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/10">{f}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-primary uppercase tracking-widest group-hover:gap-2 transition-all">
                  Xem chi tiết
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </RouterLink>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative gradient overlay */}
      <div className="relative w-full overflow-hidden" style={{ zIndex: 10 }}>
        <div className="absolute inset-x-0 bottom-0 h-[600px] pointer-events-none z-0 mix-blend-screen opacity-60">
          <div className="absolute bottom-[-20%] left-[-20%] w-[140%] h-[100%] fluid-gradient rounded-[100%] blur-[100px] transform rotate-12"></div>
        </div>
      </div>
      
    </main>
  );
};
