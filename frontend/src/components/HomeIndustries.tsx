import { Fragment, useEffect, useRef, useState } from 'react';
import { INDUSTRIES } from '../data/industries';
import './HomeIndustries.css';

type IndustrySlug = (typeof INDUSTRIES)[number]['slug'];

const descriptions: Record<IndustrySlug, string> = {
  'san-xuat': 'Kết nối dữ liệu và tự động hóa công việc lặp lại để đội ngũ theo dõi hoạt động sản xuất rõ ràng hơn.',
  'tai-chinh-ngan-hang': 'Tổ chức dữ liệu, báo cáo và luồng phê duyệt giúp nghiệp vụ tài chính được quản lý chặt chẽ.',
  'ban-le-thuong-mai-dien-tu': 'Liên thông bán hàng, tồn kho và chăm sóc khách hàng để trải nghiệm mua sắm liền mạch hơn.',
  'giao-duc': 'Đơn giản hóa việc quản lý học viên, nội dung và tương tác trong môi trường học tập số.',
  'cham-soc-suc-khoe': 'Hỗ trợ quản lý lịch hẹn, hồ sơ và trao đổi thông tin giữa các bộ phận với sự chú trọng đến bảo mật.',
  'giai-tri-truyen-thong': 'Sắp xếp quy trình sản xuất nội dung, phân phối và đo lường tương tác trên nhiều kênh.',
  'du-lich-luu-tru': 'Kết nối đặt chỗ, chăm sóc khách và vận hành lưu trú trong một trải nghiệm thuận tiện.',
  'dich-vu-chuyen-nghiep': 'Chuẩn hóa dự án, tài liệu và phối hợp nhóm để phục vụ khách hàng nhất quán hơn.',
};

export function HomeIndustries() {
  const [activeIndex, setActiveIndex] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title || window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 900px)').matches) return;
    const words = Array.from(title.querySelectorAll<HTMLElement>('.home-industries__title-word'));
    let animations: Animation[] = [];
    const observer = new IntersectionObserver(([entry]) => {
      animations.forEach((animation) => animation.cancel());
      animations = [];
      if (!entry.isIntersecting) return;
      const center = (words.length - 1) / 2;
      animations = words.map((word, index) => {
        const direction = index < center ? 1 : -1;
        return word.animate([
          {
            transform: `translate(${direction * 24}px, 24px) rotateY(${direction * 55}deg)`,
            clipPath: 'inset(0 50% 0 50%)',
          },
          { transform: 'translate(0, 0) rotateY(0)', clipPath: 'inset(0 0% 0 0%)' },
        ], {
          duration: 1100,
          delay: Math.abs(index - center) * 90,
          easing: 'cubic-bezier(.16, 1, .3, 1)',
          fill: 'both',
        });
      });
    }, { threshold: 0, rootMargin: '-90px 0px -25px 0px' });
    observer.observe(title);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <section className="home-industries" aria-labelledby="home-industries-title">
      <div className="home-industries__inner">
        <div className="home-industries__heading">
          <h2 id="home-industries-title" ref={titleRef} aria-label="Công nghệ ứng dụng theo từng lĩnh vực">
            {'Công nghệ ứng dụng theo từng lĩnh vực'.split(' ').map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                {index > 0 && ' '}
                <span className={`home-industries__title-mask${index >= 4 ? ' is-accent' : ''}`} aria-hidden="true">
                  <span className="home-industries__title-word">{word}</span>
                </span>
              </Fragment>
            ))}
          </h2>
          <p>Mỗi ngành có cách vận hành riêng. iGen tìm điểm công nghệ có thể hỗ trợ công việc thực tế.</p>
        </div>

        <div className="home-industries__explorer">
          <div className="home-industries__visual">
            {INDUSTRIES.map((industry, index) => (
              <img
                key={industry.slug}
                className={index === activeIndex ? 'is-active' : ''}
                src={industry.image}
                alt={`Minh họa lĩnh vực ${industry.name.toLowerCase()}`}
                aria-hidden={index !== activeIndex}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>

          <div className="home-industries__list" role="group" aria-label="Chọn lĩnh vực">
            {INDUSTRIES.map((industry, index) => (
              <button
                type="button"
                key={industry.slug}
                className={index === activeIndex ? 'is-active' : ''}
                aria-pressed={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                {industry.name}
              </button>
            ))}
          </div>

          <div className="home-industries__message" aria-live="polite">
            <span className="home-industries__message-rule" aria-hidden="true" />
            <div className="home-industries__message-content">
              {INDUSTRIES.map((industry, index) => (
                <div
                  key={industry.slug}
                  className={`home-industries__message-slide${index === activeIndex ? ' is-active' : ''}`}
                  aria-hidden={index !== activeIndex}
                >
                  <p>{descriptions[industry.slug]}</p>
                </div>
              ))}
            </div>
            <div className="home-industries__watermark" aria-hidden="true">
              <img className="home-industries__watermark-mark" src="/icon-favicon.png" alt="" />
              <span className="home-industries__watermark-word">
                <img src="/brand-icon.png" alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
