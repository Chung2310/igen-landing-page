import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
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

    // Left card sliding entrance
    gsap.fromTo(
      '.reveal-card-left',
      { x: -100, y: 50, opacity: 0, rotation: -5 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.reveal-card-left',
          start: 'top 85%',
        },
      }
    );

    // Right card sliding entrance
    gsap.fromTo(
      '.reveal-card-right',
      { x: 100, y: 50, opacity: 0, rotation: 5 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        delay: 0.2,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.reveal-card-right',
          start: 'top 85%',
        },
      }
    );

    // Bottom team cards entrance
    gsap.utils.toArray('.reveal-card-bottom').forEach((el: unknown, i) => {
      const cardEl = el as HTMLElement;
      gsap.fromTo(
        cardEl,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: 0.3 + i * 0.1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: cardEl,
            start: 'top 90%',
          },
        }
      );
    });

    // Tilt cards mouse trackers
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

    // Body text reveal triggers
    const texts = document.querySelectorAll('.reveal-text');
    texts.forEach((el) => {
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
    };
  }, []);

  return (
    <main className="flex flex-col w-full relative z-10">

      {/* Hero section */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] overflow-hidden pt-32 dof-target-section" id="hero-section">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-transparent to-transparent z-0"></div>
        <div className="absolute inset-0 grid-bg-dark opacity-20 z-0"></div>
        <div className="bg-text-overlap top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">MISSION</div>

        <div className="relative z-20 max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter text-white leading-none mb-6 hero-main-title">
            <div className="overflow-hidden">
              <span className="block translate-y-full reveal-hero-text bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
                Về Chúng Tôi
              </span>
            </div>
          </h1>
          <p className="text-xl text-gray-400 font-light leading-relaxed tracking-wide opacity-0 reveal-hero-fade max-w-2xl mt-4">
            Kiến tạo hệ sinh thái AI thông minh, đồng hành cùng doanh nghiệp trong kỷ nguyên số.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 relative z-20 section-transition dof-target-section" id="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
            <div className="order-2 md:order-1 glass-premium rounded-3xl p-10 reveal-card-left tilt-card relative">
              <div className="card-particles"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-display font-bold text-white mb-6">Câu chuyện của chúng tôi</h3>
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
            <div className="order-1 md:order-2 reveal-card-right">
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass-premium flex items-center justify-center tilt-card">
                <img
                  src="/IMG_7181.jpeg"
                  alt="iGen Technology Office"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Partners Section */}
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 reveal-text">
              Đối tác <span className="text-primary italic">Chiến lược</span>
            </h2>
            <p className="text-gray-400 reveal-text">Đồng hành cùng sự phát triển bền vững của các doanh nghiệp hàng đầu.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                name: 'Công ty TNHH viện Quốc tế Luxdefa',
                logo: '/luxdefa.png',
                desc: 'Viện thẩm mỹ công nghệ cao đạt chuẩn quốc tế, nâng tầm trải nghiệm chăm sóc sắc đẹp.',
              },
              {
                name: 'Công ty TNHH sản xuất nhôm đúc',
                logo: '/sản xuất nhôm đúc.png',
                desc: 'Doanh nghiệp sản xuất và gia công cơ khí nhôm đúc mỹ thuật công nghệ cao, uy tín và chất lượng.',
              },
              {
                name: 'Công ty Cổ phần Sâm Ngọc Linh',
                logo: '/sâm ngọc linh.png',
                desc: 'Thương hiệu quốc gia phát triển và chế biến các sản phẩm từ sâm quý Ngọc Linh thượng hạng.',
              },
              {
                name: 'Công ty xe điện Kaishi Việt Nhật',
                logo: '/xe điện.png',
                desc: 'Nhà phân phối và lắp ráp phương tiện giao thông chạy điện thông minh Kaishi tiêu chuẩn Nhật Bản.',
              },
            ].map((partner, i) => (
              <div
                key={partner.name}
                className="glass-premium rounded-3xl overflow-hidden reveal-card-bottom tilt-card interactable group flex flex-col"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="card-particles"></div>

                {/* Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden flex-shrink-0">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                  />
                  {/* Subtle top-fade overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1315]/60 to-transparent pointer-events-none"></div>
                </div>

                {/* Info below image */}
                <div className="flex flex-col flex-1 p-5 md:p-6 text-left">
                  <h4 className="text-sm md:text-base font-display font-bold text-white mb-2 leading-snug group-hover:text-primary transition-colors duration-300">
                    {partner.name}
                  </h4>
                  <p className="text-[#82a1a8] text-xs leading-relaxed font-light">
                    {partner.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
};
