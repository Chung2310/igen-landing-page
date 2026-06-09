import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Home: React.FC = () => {
  useEffect(() => {
    // Initial Text Reveals
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

    // Parallax Tilt for Cards
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach((card) => {
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

    // Magnetic pulling cards
    const magneticCards = document.querySelectorAll('.card-magnetic');
    magneticCards.forEach((card) => {
      const particlesContainer = card.querySelector('.card-particles');

      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

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

    // Liquid Button Mouse Tracker
    const handleLiquidMouseMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.btn-liquid');
      if (target) {
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (target as HTMLElement).style.setProperty('--x', `${x}px`);
        (target as HTMLElement).style.setProperty('--y', `${y}px`);
      }
    };
    window.addEventListener('mousemove', handleLiquidMouseMove);

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
      window.removeEventListener('mousemove', handleLiquidMouseMove);
    };
  }, []);

  return (
    <main className="flex flex-col w-full relative z-10">

      {/* Scroll Progress Bar */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" id="scrollProgress"></div>
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden pt-32 dof-target-section" id="hero-section">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-transparent to-transparent z-0"></div>
        <div className="absolute inset-0 grid-bg-dark opacity-20 z-0"></div>
        <div className="bg-text-overlap top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">iGEN</div>

        <div className="relative z-20 max-w-5xl mx-auto text-center px-4 flex flex-col items-center">
          <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter text-white leading-none mb-6 select-none hero-main-title">
            <div className="overflow-hidden">
              <span className="block translate-y-full reveal-hero-text bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
                iGen Technology
              </span>
            </div>
            <div className="overflow-hidden py-2">
              <span className="block translate-y-full reveal-hero-text text-masked-video-anim italic">
                Tiên Phong Kỷ Nguyên Doanh Nghiệp AI
              </span>
            </div>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed tracking-wide opacity-0 reveal-hero-fade max-w-2xl mt-4">
            Tiên phong kiến tạo hệ sinh thái AI và giải pháp chuyển đổi số cho doanh nghiệp Việt.
          </p>

          <div className="mt-10 flex flex-wrap gap-6 justify-center opacity-0 reveal-hero-fade">
            <Link
              to="/solutions"
              className="btn-liquid interactable px-8 py-4 bg-primary text-white rounded-full font-bold text-sm tracking-wider shadow-glow hover:bg-primary-hover transition-colors flex items-center gap-2"
            >
              Xem giải pháp <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>

          </div>
        </div>
      </section>

      {/* Intro Bento Section */}
      <section className="py-20 relative z-20 section-transition" id="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
            <div className="order-2 md:order-1 glass-premium rounded-3xl p-10 tilt-card card-magnetic relative">
              <div className="card-particles"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-display font-bold text-white mb-6">Tầm nhìn chiến lược</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  iGen Technology được thành lập với sứ mệnh xây dựng Hệ sinh thái AI toàn diện dành cho doanh nghiệp hiện đại. Chúng tôi giúp cá nhân và doanh nghiệp ứng dụng AI vào mọi hoạt động cốt lõi, từ vận hành, quản trị, marketing, bán hàng đến chăm sóc khách hàng và phát triển sản phẩm.
                </p>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Không chỉ cung cấp công nghệ, iGen Technology tập trung đào tạo, chuyển giao và triển khai các giải pháp AI thực tiễn, giúp doanh nghiệp nâng cao năng suất, tối ưu chi phí và xây dựng mô hình vận hành thông minh. Với hệ sinh thái gồm đào tạo AI, giải pháp AI doanh nghiệp, ứng dụng AI theo yêu cầu và các dịch vụ tăng trưởng bằng AI, chúng tôi đồng hành cùng khách hàng trên hành trình chuyển đổi và phát triển bền vững trong kỷ nguyên trí tuệ nhân tạo.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Với khát vọng lan tỏa giá trị của AI đến cộng đồng doanh nghiệp Việt Nam, iGen Technology đặt mục tiêu đồng hành cùng 1.000.000 doanh nghiệp trên toàn quốc trong hành trình hiểu đúng, ứng dụng hiệu quả và từng bước xây dựng doanh nghiệp vận hành bằng AI. Chúng tôi tin rằng khi AI trở nên dễ tiếp cận và được triển khai đúng cách, mọi doanh nghiệp đều có cơ hội bứt phá, nâng cao năng lực cạnh tranh và phát triển mạnh mẽ trong kỷ nguyên mới.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass-premium flex items-center justify-center tilt-card">
                <img
                  src="/ceo.jpeg"
                  alt="iGen Technology Strategic Vision"
                  className="w-full h-full object-cover object-center absolute inset-0 z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent z-10 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Quick Pillars Showcase */}
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 reveal-text">
              Hệ sinh thái <span className="text-primary italic">Giải pháp AI</span>
            </h2>
            <p className="text-gray-400 reveal-text max-w-xl mx-auto">
              Trải nghiệm dịch vụ tối ưu hiệu suất vận hành doanh nghiệp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: 'school', title: 'Học viện doanh nghiệp 1 người', desc: 'Biến AI thành đội ngũ nhân sự số của riêng bạn. Học cách tự động hóa marketing, bán hàng, chăm sóc khách hàng và vận hành để một người vẫn có thể quản lý và phát triển doanh nghiệp hiệu quả.' },
              { icon: 'business', title: 'Chuyển Đổi AI Doanh Nghiệp', desc: 'Không chỉ đào tạo, chúng tôi trực tiếp chuyển giao quy trình và giải pháp AI phù hợp với từng doanh nghiệp. Giúp tăng năng suất làm việc, giảm phụ thuộc vào nhân sự và tối ưu chi phí vận hành.' },
              { icon: 'settings', title: 'Nền Tảng AI Theo Yêu Cầu', desc: 'Mỗi doanh nghiệp có một bài toán riêng. Chúng tôi thiết kế và phát triển các ứng dụng AI chuyên biệt giúp tự động hóa công việc, quản lý dữ liệu và nâng cao hiệu quả vận hành theo đúng nhu cầu thực tế.' },
              { icon: 'campaign', title: 'AI Marketing & Vận Hành', desc: 'Ứng dụng AI vào marketing, truyền thông và quản trị doanh nghiệp nhằm tự động hóa quy trình, nâng cao hiệu quả làm việc và tạo lợi thế cạnh tranh bền vững trong kỷ nguyên số.' },
            ].map((pillar, idx) => (
              <div
                key={pillar.title}
                className="glass-premium rounded-3xl p-8 text-center tilt-card card-magnetic interactable group relative flex flex-col justify-between"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="card-particles"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-primary/50 mb-6 flex items-center justify-center overflow-hidden shadow-neon">
                    <span className="material-symbols-outlined text-3xl text-primary animate-pulse">{pillar.icon}</span>
                  </div>
                  <h4 className="text-xl font-display font-bold text-white mb-2">{pillar.title}</h4>
                  <p className="text-gray-400 text-sm">{pillar.desc}</p>
                </div>
                <div className="mt-6">
                  <Link to="/solutions" className="text-xs text-primary uppercase font-bold tracking-widest hover:text-white transition-colors">
                    Tìm hiểu thêm &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
};
