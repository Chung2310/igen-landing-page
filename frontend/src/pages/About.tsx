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
            Tiên phong kiến tạo hệ sinh thái AI Marketing và Công nghệ tại Việt Nam, mang đến giải pháp đột phá cho doanh nghiệp.
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
                  iGen Technology ra đời với khát vọng số hóa và tự động hóa toàn diện quy trình Marketing cho doanh nghiệp. Chúng tôi không chỉ cung cấp công cụ, mà xây dựng một hệ sinh thái thông minh giúp tối ưu hóa điểm chạm khách hàng.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Bằng việc ứng dụng các mô hình AI tiên tiến nhất, iGen Tech cam kết đồng hành cùng các thương hiệu trong hành trình chuyển đổi số, tạo ra lợi thế cạnh tranh bền vững trong kỷ nguyên AI.
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

          {/* Leaders Section */}
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 reveal-text">
              Đội ngũ <span className="text-primary italic">Chuyên gia</span>
            </h2>
            <p className="text-gray-400 reveal-text">Những tinh hoa hội tụ để kiến tạo tương lai.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Nguyễn Văn A',
                role: 'CEO & Founder',
                desc: 'Chuyên gia chiến lược AI với 15+ năm kinh nghiệm trong ngành công nghệ.',
              },
              {
                name: 'Trần Thị B',
                role: 'CTO',
                desc: 'Kiến trúc sư hệ thống AI, dẫn dắt đội ngũ kỹ sư phát triển sản phẩm lõi.',
              },
              {
                name: 'Lê Văn C',
                role: 'Head of AI Research',
                desc: 'Tiến sĩ khoa học máy tính, tập trung nghiên cứu ứng dụng LLM và Computer Vision.',
              },
            ].map((member, i) => (
              <div
                key={member.name}
                className="glass-premium rounded-3xl p-8 text-center reveal-card-bottom tilt-card interactable group relative"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="card-particles"></div>
                <div className="relative z-10">
                  <div className="w-32 h-32 mx-auto rounded-full bg-white/5 border border-primary/50 mb-6 flex items-center justify-center overflow-hidden shadow-neon">
                    <span className="material-symbols-outlined text-5xl text-gray-500 group-hover:text-primary transition-colors">
                      person
                    </span>
                  </div>
                  <h4 className="text-2xl font-display font-bold text-white mb-2">{member.name}</h4>
                  <p className="text-primary text-sm uppercase tracking-widest mb-4">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      
    </main>
  );
};
