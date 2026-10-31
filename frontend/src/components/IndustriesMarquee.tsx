import { useEffect, useState } from 'react';
import './IndustriesMarquee.css';
import { IndustryLineIcon } from './IndustryLineIcon';

const industries = [
  { name: 'Bán lẻ & TMĐT', icon: 'retail' },
  { name: 'Sản xuất', icon: 'manufacturing' },
  { name: 'Giáo dục & Đào tạo', icon: 'education' },
  { name: 'F&B & Dịch vụ', icon: 'hospitality' },
  { name: 'Bất động sản', icon: 'property' },
  { name: 'Logistics & Vận tải', icon: 'logistics' },
  { name: 'Tài chính & Kế toán', icon: 'finance' },
  { name: 'Y tế & Sức khỏe', icon: 'healthcare' },
] as const;

const getVisibleCount = () => {
  if (typeof window === 'undefined') return 5;
  if (window.innerWidth <= 720) return 2;
  if (window.innerWidth <= 1350) return 4;
  return 5;
};

export function IndustriesMarquee() {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const updateVisibleCount = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', updateVisibleCount);

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches);
    updateMotionPreference();
    motionPreference.addEventListener('change', updateMotionPreference);

    return () => {
      window.removeEventListener('resize', updateVisibleCount);
      motionPreference.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      if (!document.hidden) setCurrentIndex((index) => index + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    if (transitionEnabled) return;
    let nextFrame = 0;
    const frame = requestAnimationFrame(() => {
      nextFrame = requestAnimationFrame(() => setTransitionEnabled(true));
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(nextFrame);
    };
  }, [transitionEnabled]);

  const loopedIndustries = [...industries, ...industries.slice(0, 5)];

  return (
    <section className="industries-marquee" aria-labelledby="industries-title">
      <div className="industries-marquee__inner">
        <h2 className="industries-marquee__heading" id="industries-title">
          Đồng hành trong nhiều lĩnh vực
        </h2>
        <div className="industries-marquee__viewport">
          <ul
            className={`industries-marquee__list${transitionEnabled ? '' : ' industries-marquee__list--resetting'}`}
            style={{ transform: `translateX(-${currentIndex * 100 / visibleCount}%)` }}
            onTransitionEnd={(event) => {
              if (event.target !== event.currentTarget || currentIndex < industries.length) return;
              setTransitionEnabled(false);
              setCurrentIndex(0);
            }}
          >
            {loopedIndustries.map(({ name, icon }, index) => (
              <li
                className={`industries-marquee__item${index >= industries.length ? ' industries-marquee__item--clone' : ''}`}
                key={`${name}-${index}`}
                style={{ flexBasis: `${100 / visibleCount}%` }}
                aria-hidden={index >= industries.length}
              >
                <IndustryLineIcon type={icon} />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
