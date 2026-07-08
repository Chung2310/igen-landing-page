import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SilkBackground } from '../components/SilkBackground';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { icon: 'school', title: 'Học viện doanh nghiệp 1 người', desc: 'Biến AI thành đội ngũ nhân sự số của riêng bạn. Học cách tự động hóa marketing, bán hàng, chăm sóc khách hàng và vận hành để một người vẫn có thể quản lý và phát triển doanh nghiệp hiệu quả.' },
  { icon: 'business', title: 'Chuyển Đổi AI Doanh Nghiệp', desc: 'Không chỉ đào tạo, chúng tôi trực tiếp chuyển giao quy trình và giải pháp AI phù hợp với từng doanh nghiệp. Giúp tăng năng suất làm việc, giảm phụ thuộc vào nhân sự và tối ưu chi phí vận hành.' },
  { icon: 'settings', title: 'Nền Tảng AI Theo Yêu Cầu', desc: 'Mỗi doanh nghiệp có một bài toán riêng. Chúng tôi thiết kế và phát triển các ứng dụng AI chuyên biệt giúp tự động hóa công việc, quản lý dữ liệu và nâng cao hiệu quả vận hành theo đúng nhu cầu thực tế.' },
  { icon: 'campaign', title: 'AI Marketing & Vận Hành', desc: 'Ứng dụng AI vào marketing, truyền thông và quản trị doanh nghiệp nhằm tự động hóa quy trình, nâng cao hiệu quả làm việc và tạo lợi thế cạnh tranh bền vững trong kỷ nguyên số.' },
];

export const Home: React.FC = () => {
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
      <section className="relative pt-40 pb-48 md:pt-48 md:pb-56 overflow-hidden">
        <SilkBackground />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            Igen Technology
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-ink leading-[1.1] mb-6">
            Tiên phong kỷ nguyên<br className="hidden md:block" /> doanh nghiệp AI
          </h1>
          <p className="text-lg md:text-xl text-body font-normal leading-relaxed max-w-2xl">
            Tiên phong kiến tạo hệ sinh thái AI và giải pháp chuyển đổi số cho doanh nghiệp Việt.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/solutions" className="btn-primary shadow-lg px-7 py-3.5">
              Xem giải pháp <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>

          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="reveal-text">
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">Tầm nhìn chiến lược</h2>
              <div className="space-y-4 text-body leading-relaxed">
                <p>
                  iGen Technology được thành lập với sứ mệnh xây dựng Hệ sinh thái AI toàn diện dành cho doanh nghiệp hiện đại. Chúng tôi giúp cá nhân và doanh nghiệp ứng dụng AI vào mọi hoạt động cốt lõi, từ vận hành, quản trị, marketing, bán hàng đến chăm sóc khách hàng và phát triển sản phẩm.
                </p>
                <p>
                  Không chỉ cung cấp công nghệ, iGen Technology tập trung đào tạo, chuyển giao và triển khai các giải pháp AI thực tiễn, giúp doanh nghiệp nâng cao năng suất, tối ưu chi phí và xây dựng mô hình vận hành thông minh.
                </p>
                <p>
                  Với khát vọng lan tỏa giá trị của AI đến cộng đồng doanh nghiệp Việt Nam, iGen Technology đặt mục tiêu đồng hành cùng 1.000.000 doanh nghiệp trên toàn quốc trong hành trình hiểu đúng, ứng dụng hiệu quả và từng bước xây dựng doanh nghiệp vận hành bằng AI.
                </p>
              </div>
            </div>
            <div className="reveal-text">
              <div className="relative w-full aspect-video rounded-card overflow-hidden shadow-card">
                <img
                  src="/ceo.jpeg"
                  alt="iGen Technology Strategic Vision"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Showcase */}
      <section className="section section-alt">
        <div className="container-page">
          <div className="text-center mb-14 reveal-text">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
              Hệ sinh thái <span className="text-primary">Giải pháp AI</span>
            </h2>
            <p className="text-body max-w-xl mx-auto">
              Trải nghiệm dịch vụ tối ưu hiệu suất vận hành doanh nghiệp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="card card-hover p-8 flex flex-col reveal-text">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-2xl text-primary">{pillar.icon}</span>
                </div>
                <h4 className="text-lg font-semibold text-ink mb-2">{pillar.title}</h4>
                <p className="text-body text-sm leading-relaxed flex-1">{pillar.desc}</p>
                <Link to="/solutions" className="link-arrow mt-5">
                  Tìm hiểu thêm <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-page">
          <div className="relative bg-gradient-to-br from-white via-[rgba(0,255,255,0.12)] to-white border border-line rounded-3xl px-8 py-16 md:py-20 text-center overflow-hidden shadow-card">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">Sẵn sàng chuyển đổi cùng AI?</h2>
              <p className="text-body mb-8">
                Để iGen Technology đồng hành cùng doanh nghiệp của bạn trên hành trình ứng dụng AI hiệu quả.
              </p>
              <Link to="/contact" className="btn-primary px-7 py-3.5">
                Bắt đầu ngay <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};
