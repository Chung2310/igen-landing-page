import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared entrance animations, driven by class names:
 * - `.hero-reveal`            — staggered fade-up on page load
 * - `.stat-number`            — count-up number (data-value / data-prefix / data-suffix)
 * - `.reveal-text`            — fade-up when scrolled into view
 * - `.reveal-steps-container` — staggers its `.reveal-step` children on scroll
 * - `.reveal-items-container` — staggers its `.reveal-item` children on scroll
 */
export const useRevealAnimations = () => {
  useEffect(() => {
    // Respect reduced-motion: skip all animations, content stays visible
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tweens: gsap.core.Tween[] = [];

    const heroEls = gsap.utils.toArray<HTMLElement>('.hero-reveal');
    if (heroEls.length) {
      tweens.push(
        gsap.fromTo(
          heroEls,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
        )
      );
    }

    gsap.utils.toArray<HTMLElement>('.stat-number').forEach((el) => {
      const value = Number(el.dataset.value || 0);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const counter = { n: 0 };
      tweens.push(
        gsap.to(counter, {
          n: value,
          duration: 1.8,
          delay: 0.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = prefix + Math.round(counter.n).toLocaleString('vi-VN') + suffix;
          },
        })
      );
    });

    gsap.utils.toArray<HTMLElement>('.reveal-text').forEach((el) => {
      tweens.push(
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
    });

    gsap.utils.toArray<HTMLElement>('.reveal-steps-container').forEach((container) => {
      const steps = container.querySelectorAll('.reveal-step');
      if (!steps.length) return;
      tweens.push(
        gsap.fromTo(
          steps,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: { trigger: container, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      );
    });

    gsap.utils.toArray<HTMLElement>('.reveal-items-container').forEach((container) => {
      const items = container.querySelectorAll('.reveal-item');
      if (!items.length) return;
      tweens.push(
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: container, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      );
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);
};
