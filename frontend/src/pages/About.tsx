import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Eye, Gem, Handshake, Lightbulb, Settings, ShieldCheck, Target, UsersRound } from 'lucide-react';
import { useRevealAnimations } from '../hooks/useRevealAnimations';
import './About.css';

const ABOUT_PILLARS = [
  { icon: Target, title: 'Sứ mệnh', description: 'Giúp doanh nghiệp ứng dụng AI hiệu quả.' },
  { icon: Eye, title: 'Tầm nhìn', description: 'Trở thành đối tác AI đáng tin cậy.' },
  { icon: Gem, title: 'Giá trị cốt lõi', description: 'Đổi mới, thực tiễn, hiệu quả, đồng hành.' },
  { icon: UsersRound, title: 'Đối tượng phục vụ', description: 'Doanh nghiệp và tổ chức muốn ứng dụng AI.' },
];

const ABOUT_VALUES = [
  { icon: Lightbulb, title: 'Đổi mới', description: 'Không ngừng cải tiến' },
  { icon: BarChart3, title: 'Thực tiễn', description: 'Giải quyết việc thực tế' },
  { icon: ShieldCheck, title: 'Hiệu quả', description: 'Đo lường bằng kết quả' },
  { icon: Handshake, title: 'Đồng hành', description: 'Đi cùng khách hàng' },
];

const PARTNERS = [
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
];

export const About: React.FC = () => {
  useRevealAnimations();
  const [solutionCount, setSolutionCount] = useState(1);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSolutionCount(10);
      return;
    }

    let intervalId: number | undefined;
    let nextCount = 1;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        nextCount += 1;
        setSolutionCount(nextCount);
        if (nextCount === 10) window.clearInterval(intervalId);
      }, 170);
    }, 450);

    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-shell about-hero__layout">
          <div className="about-hero__copy">
            <h1 className="hero-reveal">Kiến tạo hệ sinh thái <span>AI thông minh</span></h1>
            <p className="hero-reveal">Giúp doanh nghiệp ứng dụng AI vào công việc hằng ngày.</p>
            <div className="about-stats hero-reveal">
              <div className="about-stat" aria-label="10+ giải pháp công nghệ">
                <span className="about-stat__icon"><Settings aria-hidden="true" /></span>
                <span aria-hidden="true"><strong key={solutionCount}>{solutionCount}+</strong><small>Giải pháp công nghệ</small></span>
              </div>
            </div>
          </div>
          <div className="hero-reveal about-hero__visual">
            <img
              src="/1784790636892_7758341297950364477_7758341297950364477_c57e0eedbac222f2a8030ee453edc516.jpg"
              alt="Đội ngũ và đối tác iGen Technology tại sự kiện"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="about-shell about-story__layout">
          <div className="about-story__copy reveal-text">
            <h2>Từ ý tưởng đến <span>giải pháp AI</span></h2>
            <p>iGen phát triển giải pháp AI cho vận hành, marketing, bán hàng và chăm sóc khách hàng.</p>
            <p>Chúng tôi triển khai, đào tạo và chuyển giao để doanh nghiệp áp dụng AI vào công việc thực tế.</p>
            <Link className="about-story__link" to="/contact">Tìm hiểu thêm <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="about-pillars reveal-items-container">
            {ABOUT_PILLARS.map(({ icon: Icon, title, description }) => (
              <div className="about-pillar reveal-item" key={title}>
                <span className="about-pillar__icon"><Icon aria-hidden="true" /></span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </div>
            ))}
          </div>
          <div className="about-story__visual reveal-text">
            <img src="/IMG_7181.jpeg" alt="Đội ngũ iGen Technology tại văn phòng" loading="lazy" />
            <blockquote><span>“</span><p>“Công nghệ tạo giá trị khi được ứng dụng đúng cách.”</p><cite>— iGen Technology</cite></blockquote>
          </div>
        </div>
        <div className="about-values">
          <h2>Giá trị<br />chúng tôi theo đuổi</h2>
          {ABOUT_VALUES.map(({ icon: Icon, title, description }) => (
            <div className="about-value" key={title}>
              <span><Icon aria-hidden="true" /></span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-alt about-partners">
        <div className="container-page">
          <div className="mb-14 text-center reveal-text">
            <h2 className="text-3xl md:text-[36px] font-medium tracking-normal text-ink mb-4">
              Đối tác <span className="text-primary">chiến lược</span>
            </h2>
            <p className="text-body text-lg">Đồng hành cùng sự phát triển bền vững của các doanh nghiệp hàng đầu.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 reveal-items-container">
            {PARTNERS.map((partner) => (
              <div key={partner.name} className="card card-hover overflow-hidden flex flex-col group reveal-item">
                <div className="relative w-full aspect-[4/3] overflow-hidden flex-shrink-0 bg-surface-alt">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col flex-1 p-5 text-left">
                  <h4 className="text-sm md:text-base font-semibold text-ink mb-2 leading-snug group-hover:text-primary transition-colors">
                    {partner.name}
                  </h4>
                  <p className="text-muted text-xs leading-relaxed">{partner.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};
