import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type HeroConfig = {
  root: string;
  copy: string;
  visual?: string;
  atmosphere?: boolean;
  pointer?: boolean;
};

const heroConfigs: HeroConfig[] = [
  { root: '.about-hero', copy: '.about-hero__copy', visual: '.about-hero__visual' },
  { root: '.contact-hero', copy: '.contact-hero__copy', visual: '.contact-hero__visual' },
  { root: '.erp-hero', copy: '.erp-hero-copy', visual: '.erp-hero-visual' },
  { root: '.news-hero', copy: '.news-hero__copy', visual: '.news-hero__highlights', pointer: false },
  { root: '.solutions-hero', copy: '.solutions-hero__copy', visual: '.solutions-hero__visual' },
  { root: '.software-hero', copy: '.software-hero__copy', visual: '.software-visual' },
  { root: '.pillar-hero', copy: '.pillar-hero__copy', visual: '.pillar-hero__visual' },
  { root: '[data-motion-hero="products"]', copy: '[data-motion-copy]', visual: '[data-motion-visual]', pointer: false },
  { root: '[data-motion-hero="service-detail"]', copy: '[data-motion-copy]', atmosphere: false, pointer: false },
];

export const useHeroMotion = (pathname: string) => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cleanup = () => {};
    let retryTimer = 0;
    let attempts = 0;
    const setup = () => {
      const config = heroConfigs.find(({ root }) => document.querySelector(root));
      if (!config) {
        if (attempts++ < 30) retryTimer = window.setTimeout(setup, 150);
        return;
      }

      const hero = document.querySelector<HTMLElement>(config.root);
      const copy = hero?.querySelector<HTMLElement>(config.copy);
      if (!hero || !copy) {
        if (attempts++ < 30) retryTimer = window.setTimeout(setup, 150);
        return;
      }

      const visual = config.visual ? hero.querySelector<HTMLElement>(config.visual) : null;
      const visualImage = visual?.querySelector<HTMLElement>('img') ?? visual;
      const title = copy.querySelector<HTMLElement>('h1');
      const lead = copy.querySelector<HTMLElement>('p');
      const eyebrow = copy.querySelector<HTMLElement>('nav, [class*="eyebrow"]');
      const actions = copy.querySelector<HTMLElement>('[class*="actions"], [class*="highlights"], [class*="stats"]');

      hero.classList.add('hero-motion');
      let atmosphere: HTMLDivElement | null = null;
      if (config.atmosphere !== false) {
        atmosphere = document.createElement('div');
        atmosphere.className = 'hero-motion__atmosphere';
        atmosphere.setAttribute('aria-hidden', 'true');
        hero.classList.add('hero-motion--layered');
        hero.prepend(atmosphere);
      }

      const context = gsap.context(() => {
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (atmosphere) {
          intro.fromTo(atmosphere, { scale: .88, xPercent: -4, opacity: 0 }, { scale: 1, xPercent: 0, opacity: 1, duration: 1.5 }, 0);
        }
        if (visual) {
          intro.fromTo(visual,
            { clipPath: 'inset(8% 8% 8% 90% round 22px)', x: 54, y: 22, scale: .91, rotation: 3 },
            { clipPath: 'inset(0% 0% 0% 0% round 0px)', x: 0, y: 0, scale: 1, rotation: 0, duration: 1.22, ease: 'power3.inOut', clearProps: 'clipPath' },
            .08,
          );
        }
        if (eyebrow) intro.fromTo(eyebrow, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .62 }, .18);
        if (title) {
          intro.fromTo(title,
            { y: 62, rotationX: -7, clipPath: 'inset(0 0 100% 0)' },
            { y: 0, rotationX: 0, clipPath: 'inset(0 0 0% 0)', duration: .92, clearProps: 'clipPath' },
            .3,
          );
        }
        if (lead) intro.fromTo(lead, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .7 }, .63);
        if (actions) intro.fromTo(actions, { y: 27, opacity: 0 }, { y: 0, opacity: 1, duration: .72 }, .79);

        if (visualImage) {
          gsap.to(visualImage, {
            yPercent: -7,
            scale: 1.035,
            rotation: -.8,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .7 },
          });
        }
        if (atmosphere) {
          gsap.to(atmosphere, {
            yPercent: -9,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .9 },
          });
        }
      }, hero);

      let removePointer = () => {};
      if (config.pointer !== false && visualImage && window.matchMedia('(pointer: fine)').matches) {
        const moveX = gsap.quickTo(visualImage, 'x', { duration: .72, ease: 'power3.out' });
        const moveY = gsap.quickTo(visualImage, 'y', { duration: .72, ease: 'power3.out' });
        const tiltX = gsap.quickTo(visualImage, 'rotationX', { duration: .85, ease: 'power3.out' });
        const tiltY = gsap.quickTo(visualImage, 'rotationY', { duration: .85, ease: 'power3.out' });
        const onMove = (event: PointerEvent) => {
          const bounds = hero.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - .5;
          const y = (event.clientY - bounds.top) / bounds.height - .5;
          moveX(x * 22);
          moveY(y * 16);
          tiltX(-y * 3);
          tiltY(x * 4);
        };
        const onLeave = () => {
          moveX(0); moveY(0); tiltX(0); tiltY(0);
        };
        hero.addEventListener('pointermove', onMove);
        hero.addEventListener('pointerleave', onLeave);
        removePointer = () => {
          hero.removeEventListener('pointermove', onMove);
          hero.removeEventListener('pointerleave', onLeave);
        };
      }

      cleanup = () => {
        removePointer();
        context.revert();
        atmosphere?.remove();
        hero.classList.remove('hero-motion', 'hero-motion--layered');
      };
      ScrollTrigger.refresh();
    };
    const frame = window.requestAnimationFrame(setup);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(retryTimer);
      cleanup();
    };
  }, [pathname]);
};
