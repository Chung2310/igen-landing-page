import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, GraduationCap, Megaphone, Settings, TrendingUp } from 'lucide-react';
import { AIProcessorHero } from '../components/AIProcessorHero';
import { ServiceExplorer } from '../components/ServiceExplorer';
import { IndustriesMarquee } from '../components/IndustriesMarquee';
import { HomeIndustries } from '../components/HomeIndustries';
import { useRevealAnimations } from '../hooks/useRevealAnimations';
import { usePillarSpread } from '../hooks/usePillarSpread';
import './HomePillars.css';
import './HomeVision.css';
import { useCtaReveal } from '../hooks/useCtaReveal';

const pillars = [
  {
    icon: TrendingUp,
    title: 'Tư vấn & Chuyển đổi Số',
    desc: 'Đánh giá cách vận hành và lập lộ trình số hóa phù hợp.',
    slug: 'tu-van-chuyen-doi-so',
  },
  {
    icon: Megaphone,
    title: 'AI Marketing & Vận Hành',
    desc: 'Dùng AI để làm nội dung, chăm sóc khách hàng và giảm việc lặp lại.',
    slug: 'ai-marketing-van-hanh',
  },
  {
    icon: Settings,
    title: 'Nền Tảng AI Theo Yêu Cầu',
    desc: 'Xây dựng công cụ AI theo quy trình và dữ liệu riêng của doanh nghiệp.',
    slug: 'nen-tang-ai-theo-yeu-cau',
  },
  {
    icon: GraduationCap,
    title: 'Học viện doanh nghiệp 1 người',
    desc: 'Học cách dùng AI cho marketing, bán hàng và công việc hằng ngày.',
    slug: 'hoc-vien-doanh-nghiep-1-nguoi',
  },
];

const faqItems = [
  {
    q: 'Tích hợp AI có cần lập trình phức tạp không?',
    a: 'Không cần. iGen cung cấp các giải pháp đóng gói sẵn và hỗ trợ tích hợp API trực tiếp vào các hệ thống hiện có (như CRM, Website, Chat) nên việc triển khai rất nhanh chóng.'
  },
  {
    q: 'AI có thay thế hoàn toàn nhân sự của tôi không?',
    a: 'AI không thay thế con người, nhưng nhân sự biết sử dụng AI sẽ thay thế nhân sự không biết dùng AI. Mục tiêu của iGen là giúp nhân sự tăng năng suất từ 3 - 5 lần.'
  },
  {
    q: 'Chi phí triển khai giải pháp AI tại iGen như thế nào?',
    a: 'Chi phí được tối ưu theo quy mô và nhu cầu thực tế của từng doanh nghiệp. Chúng tôi có các gói giải pháp linh hoạt từ SMB đến Doanh nghiệp lớn để đảm bảo lợi nhuận đầu tư (ROI) tốt nhất.'
  },
  {
    q: 'Dữ liệu của doanh nghiệp tôi có được bảo mật không?',
    a: 'Có. iGen cam kết bảo mật thông tin tuyệt đối bằng hợp đồng pháp lý (NDA) và triển khai các giải pháp lưu trữ dữ liệu an toàn trên cloud hoặc server riêng biệt của khách hàng.'
  }
];

export const Home: React.FC = () => {
  const location = useLocation();
  const visionNumbersRef = useRef<HTMLDivElement>(null);
  const visionHeadingRef = useRef<HTMLHeadingElement>(null);
  const pillarsGridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  useCtaReveal(ctaRef);
  usePillarSpread(pillarsGridRef);

  useEffect(() => {
    if (location.hash !== '#home-pillars') return;
    const frame = requestAnimationFrame(() => document.getElementById('home-pillars')?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, [location.hash]);

  useEffect(() => {
    const container = visionNumbersRef.current;
    if (!container) return;

    const counters = Array.from(container.querySelectorAll<HTMLElement>('[data-vision-target]'));
    const render = (counter: HTMLElement, progress: number) => {
      const eased = 1 - Math.pow(1 - progress, 3);
      const target = Number(counter.dataset.visionTarget);
      const digits = Number(counter.dataset.visionDigits);
      counter.textContent = `${Math.round(target * eased).toString().padStart(digits, '0')}+`;
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      counters.forEach((counter) => render(counter, 1));
      return;
    }

    const frames = new Map<HTMLElement, number>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const counter = entry.target as HTMLElement;
        cancelAnimationFrame(frames.get(counter) ?? 0);
        render(counter, 0);
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1400, 1);
          render(counter, progress);
          if (progress < 1) frames.set(counter, requestAnimationFrame(tick));
        };
        frames.set(counter, requestAnimationFrame(tick));
      });
    }, { threshold: 0, rootMargin: '-90px 0px -20px 0px' });

    counters.forEach((counter) => observer.observe(counter));
    return () => {
      observer.disconnect();
      frames.forEach((frame) => cancelAnimationFrame(frame));
    };
  }, []);

  useEffect(() => {
    const heading = visionHeadingRef.current;
    if (!heading || window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 900px)').matches) return;
    const words = heading.querySelectorAll<HTMLElement>('.home-vision__word-inner');
    let animations: Animation[] = [];
    const observer = new IntersectionObserver(([entry]) => {
      animations.forEach((animation) => animation.cancel());
      animations = [];
      if (!entry.isIntersecting) return;
      animations = Array.from(words, (word, index) => word.animate([
        { transform: 'translateY(115%) rotateX(-65deg) rotate(5deg)' },
        { transform: 'translateY(0) rotateX(0) rotate(0)' },
      ], {
        duration: 950,
        delay: index * 100,
        easing: 'cubic-bezier(.16, 1, .3, 1)',
        fill: 'both',
      }));
    }, { threshold: 0, rootMargin: '-90px 0px -20px 0px' });
    observer.observe(heading);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  useRevealAnimations();

  return (
    <main className="flex flex-col w-full relative">
      <AIProcessorHero />



      {/* Industries Strip */}
      <IndustriesMarquee />

      <ServiceExplorer />

      {/* Vision Section */}
      <section className="home-vision" aria-labelledby="home-vision-title">
        <div className="home-vision__inner">
          <div className="home-vision__intro">
            <div>
              <h2 id="home-vision-title" ref={visionHeadingRef} aria-label="Tầm nhìn chiến lược">
                {['Tầm', 'nhìn', 'chiến', 'lược'].map((word, index) => (
                  <React.Fragment key={word}>
                    {index > 0 && ' '}
                    <span className={`home-vision__word${index >= 2 ? ' is-accent' : ''}`} aria-hidden="true">
                      <span className="home-vision__word-inner">{word}</span>
                    </span>
                  </React.Fragment>
                ))}
              </h2>
            </div>
            <div className="home-vision__copy reveal-text">
              <p>iGen hướng tới biến AI thành công cụ dễ tiếp cận, áp dụng được vào công việc hằng ngày của doanh nghiệp Việt.</p>
              <p>Chúng tôi bắt đầu từ bài toán cụ thể, kết hợp giải pháp, đào tạo và chuyển giao để tạo ra thay đổi thiết thực, từng bước mở rộng tác động.</p>
            </div>
          </div>
          <div className="home-vision__numbers reveal-items-container" ref={visionNumbersRef}>
            <article className="home-vision__number reveal-item">
              <span className="home-vision__value" data-vision-target="1" data-vision-digits="2" aria-hidden="true">00+</span>
              <span className="sr-only">01+</span>
              <h3>Hệ sinh thái AI</h3>
              <p>Lấy nhu cầu thực tế của doanh nghiệp làm trung tâm.</p>
            </article>
            <article className="home-vision__number reveal-item">
              <span className="home-vision__value" data-vision-target="3" data-vision-digits="2" aria-hidden="true">00+</span>
              <span className="sr-only">03+</span>
              <h3>Hướng đồng hành</h3>
              <p>Giải pháp, đào tạo và chuyển giao để đội ngũ tự vận hành.</p>
            </article>
            <article className="home-vision__number reveal-item">
              <span className="home-vision__value" data-vision-target="100" data-vision-digits="1" aria-hidden="true">0+</span>
              <span className="sr-only">100+</span>
              <h3>Doanh nghiệp đầu tiên</h3>
              <p>Mục tiêu cho chặng đường đầu của iGen.</p>
            </article>
          </div>
        </div>
      </section>

      <HomeIndustries />

      {/* Pillars Showcase */}
      <section className="home-pillars" id="home-pillars" aria-labelledby="home-pillars-title">
        <svg className="home-pillars__brand-watermark" viewBox="140 315 750 315" aria-hidden="true" focusable="false">
          <image href="/brand-icon.png" width="1024" height="1024" />
        </svg>
        <div className="home-pillars__inner">
          <div className="home-pillars__heading">
            <h2 id="home-pillars-title" aria-label="Hệ sinh thái Giải pháp AI">
              {['Hệ', 'sinh', 'thái', 'Giải', 'pháp', 'AI'].map((word, index) => (
                <React.Fragment key={word}>
                  {index > 0 && ' '}
                  <span className={`home-pillars__word${index >= 3 ? ' is-accent' : ''}`} aria-hidden="true">
                    <span className="home-pillars__word-inner">{word}</span>
                  </span>
                </React.Fragment>
              ))}
            </h2>
            <p className="home-pillars__subtitle" aria-label="Giải pháp AI cho từng nhu cầu của doanh nghiệp.">
              {'Giải pháp AI cho từng nhu cầu của doanh nghiệp.'.split(' ').map((word, index) => (
                <React.Fragment key={`${word}-${index}`}>
                  {index > 0 && ' '}
                  <span className="home-pillars__subtitle-mask" aria-hidden="true">
                    <span className="home-pillars__subtitle-word">{word}</span>
                  </span>
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className="home-pillars__grid" ref={pillarsGridRef}>
            {pillars.map(({ icon: Icon, title, desc, slug }) => (
              <article className="home-pillars__card" key={slug}>
                <span className="home-pillars__icon"><Icon size={32} strokeWidth={2} aria-hidden="true" /></span>
                <Icon className="home-pillars__watermark" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link to={`/solutions/${slug}`} aria-label={`Tìm hiểu thêm về ${title}`}>
                  Tìm hiểu thêm
                  <span className="home-pillars__arrow"><ArrowRight size={18} aria-hidden="true" /></span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container-page">
          <div className="text-center mb-14 reveal-text">
            <h2 className="text-4xl md:text-5xl font-bold text-ink mb-4">
              Câu hỏi <span className="text-primary">thường gặp</span>
            </h2>
            <p className="text-lg text-body max-w-2xl mx-auto">
              Giải đáp các thắc mắc phổ biến về việc ứng dụng Trí tuệ Nhân tạo vào vận hành doanh nghiệp.
            </p>
          </div>

          <div
            className="home-faq-list max-w-4xl mx-auto space-y-5 reveal-items-container"
            onPointerLeave={(event) => {
              if (event.pointerType === 'mouse') setOpenFaqIndex(null);
            }}
          >
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  onPointerEnter={(event) => {
                    if (event.pointerType === 'mouse') setOpenFaqIndex(index);
                  }}
                  className="home-faq-card border border-line rounded-2xl bg-white overflow-hidden transition-all duration-300 reveal-item shadow-sm"
                >
                  <button
                    type="button"
                    onClick={(event) => {
                      if (event.detail > 0 && window.matchMedia('(hover: hover)').matches) {
                        setOpenFaqIndex(index);
                      } else {
                        toggleFaq(index);
                      }
                    }}
                    aria-expanded={isOpen}
                    aria-controls={`home-faq-answer-${index}`}
                    className="w-full px-7 py-6 flex items-center justify-between text-left text-lg font-semibold text-ink hover:text-primary transition-colors focus:outline-none"
                  >
                    <span>{item.q}</span>
                    <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-muted'}`}>
                      expand_more
                    </span>
                  </button>
                  <div
                    id={`home-faq-answer-${index}`}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="p-7 text-body text-base leading-relaxed bg-surface-alt border-t border-line">
                        {item.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-page">
          <div ref={ctaRef} className="home-cta relative bg-gradient-to-br from-white via-[rgba(0,255,255,0.12)] to-white border border-line rounded-3xl px-8 py-16 md:py-20 text-center overflow-hidden shadow-card">
            <svg
              className="absolute bottom-4 right-5 w-32 md:bottom-6 md:right-8 md:w-48 opacity-10 pointer-events-none select-none"
              viewBox="140 315 750 315"
              aria-hidden="true"
              focusable="false"
            >
              <image href="/brand-icon.png" width="1024" height="1024" />
            </svg>
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-ink mb-4" aria-label="Sẵn sàng chuyển đổi cùng AI?">
                {'Sẵn sàng chuyển đổi cùng AI?'.split(' ').map((word, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && ' '}
                    <span className="home-cta__word-mask" aria-hidden="true">
                      <span className="home-cta__word" style={{ '--word-index': index } as React.CSSProperties}>{word}</span>
                    </span>
                  </React.Fragment>
                ))}
              </h2>
              <p className="text-lg text-body mb-8">
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
