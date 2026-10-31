import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AIProcessorHero.css';

gsap.registerPlugin(ScrollTrigger);

const featuredServices = [
  { label: 'Phát triển phần mềm', to: '/solutions/phat-trien-ung-dung-web' },
  { label: 'AI & Tự động hóa', to: '/solutions/generative-ai' },
  { label: 'ERP & CRM', to: '/solutions/erp' },
  { label: 'Thiết kế App & Website', to: '/solutions/phat-trien-ung-dung-di-dong' },
  { label: 'Tư vấn chuyển đổi số', to: '/contact' },
];

// Simplified Vietnam silhouette, normalized to a 100 × 240 SVG box.
const VIETNAM_OUTLINE = 'M82.1 29.3 L63.4 43.2 L51.8 58.6 L48.7 69.9 L59.4 87.0 L72.5 108.3 L85.1 118.3 L93.6 131.4 L100 161.5 L98.1 190.1 L86.5 200.8 L70.5 211.3 L59.1 224.9 L41.7 240 L36.6 229.6 L40.6 218.5 L30.2 209.3 L42.3 202.8 L56.9 201.6 L50.8 191.7 L74.3 179.2 L76 159.7 L72.7 148.9 L75.3 132.6 L71.8 121.1 L61.2 109.8 L52.4 95.4 L40.8 76.2 L24.1 66.5 L28.1 60.6 L37 56.4 L31.6 42.2 L14.4 42.1 L8.2 27.3 L0 14.4 L7.5 10.5 L18.6 10.5 L32.2 8.7 L44.1 0 L50.8 6.1 L63.6 9.1 L61.4 18.4 L68 25.1 Z';

const scatterText = (text: string, seed: number) => Array.from(text).map((character, index, characters) => {
  const angle = index * 2.4 + seed * 1.15;
  const distance = 110 + (index % 5) * 25;
  const progress = index / Math.max(characters.length - 1, 1);
  const start = seed === 1 ? [255, 255, 255] : [201, 242, 255];
  const end = seed === 1 ? [119, 220, 255] : [0, 173, 252];
  const color = seed === 0 ? undefined : `rgb(${start.map((value, channel) => Math.round(value + (end[channel] - value) * progress)).join(', ')})`;

  return (
    <span
      key={`${seed}-${index}`}
      className="ai-hero__scatter-letter"
      data-scatter-x={Math.round(Math.cos(angle) * distance)}
      data-scatter-y={Math.round(Math.sin(angle) * distance - 25)}
      data-scatter-rotate={Math.round((index % 2 ? 1 : -1) * (14 + (index % 4) * 7))}
      style={{ color }}
    >
      {character === ' ' ? '\u00a0' : character}
    </span>
  );
});

export const AIProcessorHero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scene = hero.querySelector<HTMLElement>('.ai-hero__scene');
    const video = hero.querySelector<HTMLVideoElement>('.ai-hero__video');
    const shade = hero.querySelector<HTMLElement>('.ai-hero__shade');
    const mesh = hero.querySelector<HTMLElement>('.ai-hero__mesh');
    const arrow = hero.querySelector<HTMLElement>('.ai-hero__arrow');
    const arrowLead = hero.querySelector<SVGSVGElement>('.ai-hero__arrow-lead');
    const arrowSvg = hero.querySelector<SVGSVGElement>('.ai-hero__arrow-svg');
    const arrowGhost = hero.querySelector<SVGGElement>('.ai-hero__arrow-ghost');
    const arrowEcho = hero.querySelector<SVGPathElement>('.ai-hero__arrow-echo');
    const arrowShine = hero.querySelector<SVGGElement>('.ai-hero__arrow-shine');
    const eyebrow = hero.querySelector<HTMLElement>('.ai-hero__eyebrow');
    const content = hero.querySelector<HTMLElement>('.ai-hero__content');
    const lines = hero.querySelectorAll<HTMLElement>('h1 .ai-hero__scatter-line');
    const letters = hero.querySelectorAll<HTMLElement>('.ai-hero__scatter-letter');
    const supporting = hero.querySelector<HTMLElement>('.ai-hero__supporting');
    const navLinks = hero.querySelectorAll<HTMLElement>('.ai-hero__service-nav a');
    if (!scene || !video || !shade || !mesh || !arrow || !arrowLead || !arrowSvg || !arrowGhost || !arrowEcho || !arrowShine || !eyebrow || !content || !supporting) return;

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .fromTo(video, { scale: 1.12, y: 18 }, { scale: 1.04, y: 0, duration: 1.6 }, 0)
        .fromTo(shade, { opacity: 0 }, { opacity: 1, duration: 1.25, ease: 'power2.inOut' }, 0)
        .fromTo(mesh, { scale: 1.14, y: -26 }, { scale: 1, y: 0, duration: 1.55 }, .05)
        .fromTo(arrow, { x: -Math.min(window.innerWidth * .34, 580), scale: .9, rotation: -4, opacity: 0 }, {
          x: 0, scale: 1, rotation: 0, opacity: 1, duration: 1.25, ease: 'power2.inOut',
        }, .08)
        .fromTo(arrowLead, { x: -75, scale: .82, opacity: 0 }, { x: 0, scale: 1, opacity: .82, duration: .9, ease: 'power3.out' }, .33)
        .fromTo(eyebrow, { y: 34, clipPath: 'inset(0 0 100% 0)' }, {
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: .78,
          onComplete: () => gsap.set(eyebrow, { clearProps: 'clipPath' }),
        }, .23)
        .fromTo(lines, { y: 72, clipPath: 'inset(0 0 100% 0)' }, {
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: .96,
          stagger: .14,
          onComplete: () => gsap.set(lines, { clearProps: 'clipPath' }),
        }, .36)
        .fromTo(supporting, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: .8 }, .79)
        .fromTo(navLinks, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .68, stagger: .07 }, .94);

      // Let the right-hand ghost move left after the main arrow lands, so its
      // 3x faster motion is visible instead of being masked by the parent move.
      gsap.fromTo(arrowGhost,
        { x: 36, opacity: 0 },
        { x: 0, opacity: .52, duration: .31, delay: 1.35, ease: 'power3.out' },
      );

      gsap.timeline({
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: .65, invalidateOnRefresh: true },
      })
        .to(supporting, { y: -32, autoAlpha: 0, duration: .04, ease: 'none' }, .92)
        .to(mesh, { scale: 1.12, yPercent: -4, duration: 1, ease: 'none' }, 0)
        .to(video, { scale: 1.1, yPercent: -2, duration: 1, ease: 'none' }, 0)
        .to(arrowLead, { xPercent: 18, opacity: .18, duration: .5, ease: 'none' }, 0)
        .to(arrowSvg, { xPercent: 10, yPercent: -7, scale: .9, rotation: 5, opacity: .28, duration: .5, ease: 'none' }, 0)
        .to(content, {
          scale: () => window.innerWidth <= 640 ? .94 : window.innerWidth <= 900 ? .86 : .78,
          y: () => window.innerWidth <= 640 ? -12 : -42,
          transformOrigin: 'left center', duration: .04, ease: 'power2.inOut',
        }, .96)
        .to(supporting, { y: 0, autoAlpha: 1, duration: .04, ease: 'power2.inOut' }, .96)
        .to(arrowLead, { xPercent: 0, opacity: .65, duration: .04, ease: 'power2.inOut' }, .96)
        .to(arrowSvg, { xPercent: 0, yPercent: 0, scale: .82, rotation: 0, opacity: .7, duration: .04, ease: 'power2.inOut' }, .96);

      // Keep the letters scattered while scrolling down. A deliberate 5vh
      // upward scroll is needed before they gather again.
      let scattered = false;
      let furthestDown = 0;
      let lastGatherScroll = 0;
      const moveLetters = (scatter: boolean) => {
        gsap.to(letters, {
          x: scatter ? (_index, element) => Number((element as HTMLElement).dataset.scatterX) : 0,
          y: scatter ? (_index, element) => Number((element as HTMLElement).dataset.scatterY) : 0,
          rotation: scatter ? (_index, element) => Number((element as HTMLElement).dataset.scatterRotate) : 0,
          opacity: scatter ? .12 : 1,
          duration: scatter ? 1.05 : .85,
          stagger: { amount: .18, from: scatter ? 'center' : 'edges' },
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        onRefresh(self) {
          if (!scattered) lastGatherScroll = self.start;
        },
        onUpdate(self) {
          const scroll = self.scroll();
          const threshold = window.innerHeight * .05;

          if (self.direction > 0) {
            if (scattered) {
              furthestDown = Math.max(furthestDown, scroll);
            } else if (scroll - lastGatherScroll >= threshold) {
              scattered = true;
              furthestDown = scroll;
              moveLetters(true);
            }
          } else if (scattered && furthestDown - scroll >= threshold) {
            scattered = false;
            lastGatherScroll = scroll;
            moveLetters(false);
          }
        },
      });

      gsap.fromTo(arrowShine,
        { x: -340, opacity: 1 },
        { x: 800, opacity: 1, duration: .8, repeat: -1, repeatDelay: 3.5, delay: 1.35, ease: 'power2.inOut' },
      );

      gsap.timeline({ repeat: -1, repeatDelay: 1.35, delay: 1.9 })
        .fromTo(arrowEcho, { x: -12, scale: 1, opacity: 0 }, { x: 24, scale: 1.01, opacity: .25, duration: .45, ease: 'sine.inOut' })
        .to(arrowEcho, { x: 170, scale: 1.05, opacity: 0, duration: 1.15, ease: 'sine.out' });
    }, hero);

    let removePointer = () => {};
    if (window.matchMedia('(pointer: fine)').matches) {
      const moveMeshX = gsap.quickTo(mesh, 'x', { duration: .65, ease: 'power3.out' });
      const moveMeshY = gsap.quickTo(mesh, 'y', { duration: .65, ease: 'power3.out' });
      const moveVideoX = gsap.quickTo(video, 'x', { duration: .85, ease: 'power3.out' });
      const moveVideoY = gsap.quickTo(video, 'y', { duration: .85, ease: 'power3.out' });
      const moveArrowX = gsap.quickTo(arrow, 'x', { duration: .75, ease: 'power3.out' });
      const moveArrowY = gsap.quickTo(arrow, 'y', { duration: .75, ease: 'power3.out' });
      const tiltArrow = gsap.quickTo(arrow, 'rotationY', { duration: .9, ease: 'power3.out' });
      const onPointerMove = (event: PointerEvent) => {
        const bounds = scene.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        moveMeshX(x * 30);
        moveMeshY(y * 22);
        moveVideoX(x * 12);
        moveVideoY(y * 9);
        moveArrowX(x * 22);
        moveArrowY(y * 16);
        tiltArrow(x * 4);
      };
      const onPointerLeave = () => {
        moveMeshX(0); moveMeshY(0);
        moveVideoX(0); moveVideoY(0);
        moveArrowX(0); moveArrowY(0); tiltArrow(0);
      };
      scene.addEventListener('pointermove', onPointerMove);
      scene.addEventListener('pointerleave', onPointerLeave);
      removePointer = () => {
        scene.removeEventListener('pointermove', onPointerMove);
        scene.removeEventListener('pointerleave', onPointerLeave);
      };
    }

    return () => {
      removePointer();
      context.revert();
    };
  }, []);

  return (
  <section ref={heroRef} className="ai-hero ai-hero--video" aria-labelledby="ai-hero-title">
    <div className="ai-hero__scene">
    <div className="ai-hero__video-frame" aria-hidden="true">
      <video
        className="ai-hero__video"
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
      />
    </div>
    <div className="ai-hero__shade" aria-hidden="true" />
    <div className="ai-hero__mesh" aria-hidden="true" />
    <div className="ai-hero__arrow-position" aria-hidden="true">
    <div className="ai-hero__arrow">
      <div className="ai-hero__arrow-cast" />
      <svg className="ai-hero__arrow-lead" viewBox="0 0 520 720" role="presentation">
        <defs>
          <linearGradient id="igen-arrow-lead-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b5efff" />
            <stop offset=".5" stopColor="#26bfff" />
            <stop offset="1" stopColor="#087fd2" />
          </linearGradient>
        </defs>
        <path d="M110 38H220L464 360 220 682H110L354 360Z" fill="url(#igen-arrow-lead-fill)" stroke="#e6faff" strokeWidth="10" strokeLinejoin="round" />
        <path d="M131 62H209L435 360 209 658H131L381 360Z" fill="none" stroke="#d6f9ff" strokeOpacity=".62" strokeWidth="4" strokeLinejoin="round" />
      </svg>
      <svg className="ai-hero__arrow-svg" viewBox="0 0 520 720" role="presentation">
        <defs>
          <linearGradient id="igen-arrow-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#bcf1ff" />
            <stop offset="0.28" stopColor="#3bc7ff" />
            <stop offset="0.58" stopColor="#00adfc" />
            <stop offset="1" stopColor="#1672d3" />
          </linearGradient>
          <linearGradient id="igen-arrow-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".54" />
            <stop offset=".46" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#11358d" stopOpacity=".27" />
          </linearGradient>
          <linearGradient id="igen-arrow-shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".32" stopColor="#fff" stopOpacity=".22" />
            <stop offset=".5" stopColor="#fff" stopOpacity="1" />
            <stop offset=".68" stopColor="#fff" stopOpacity=".22" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="igen-arrow-shine-halo" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".48" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="igen-arrow-upper-edge" x1="110" y1="38" x2="354" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d8f8ff" stopOpacity="0" />
            <stop offset=".22" stopColor="#d8f8ff" stopOpacity=".55" />
            <stop offset=".78" stopColor="#e8fbff" stopOpacity=".62" />
            <stop offset="1" stopColor="#e8fbff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="igen-arrow-shadow-edge" x1="386" y1="360" x2="630" y2="682" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#c8efff" stopOpacity="0" />
            <stop offset=".2" stopColor="#c8efff" stopOpacity=".38" />
            <stop offset=".8" stopColor="#dff7ff" stopOpacity=".5" />
            <stop offset="1" stopColor="#dff7ff" stopOpacity="0" />
          </linearGradient>
          <filter id="igen-arrow-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="12" /></filter>
          <filter id="igen-arrow-echo-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7" /></filter>
          <filter id="igen-arrow-edge-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4" /></filter>
          <filter id="igen-arrow-aura" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="13" /></filter>
          <clipPath id="igen-arrow-clip"><path d="M110 38H220L464 360 220 682H110L354 360Z" /></clipPath>
        </defs>
        <g className="ai-hero__arrow-ghost">
          <path d="M110 38H220L464 360 220 682H110L354 360Z" transform="translate(850 0) scale(-1 1)" fill="#d5e4ec" opacity=".56" filter="url(#igen-arrow-blur)" />
          <path d="M110 38H220L464 360 220 682H110L354 360Z" transform="translate(850 0) scale(-1 1)" fill="#d5e4ec" opacity=".18" />
          <path d="M386 360L630 682" fill="none" stroke="url(#igen-arrow-shadow-edge)" strokeWidth="10" strokeLinecap="round" filter="url(#igen-arrow-edge-glow)" />
          <path d="M386 360L630 682" fill="none" stroke="url(#igen-arrow-shadow-edge)" strokeWidth="2" strokeLinecap="round" />
        </g>
        <path className="ai-hero__arrow-echo" d="M110 38H220L464 360 220 682H110L354 360Z" fill="#d5f2ff" filter="url(#igen-arrow-echo-blur)" />
        <path d="M110 38H220L464 360 220 682H110L354 360Z" fill="none" stroke="#e8fbff" strokeWidth="17" strokeLinejoin="round" opacity=".78" filter="url(#igen-arrow-aura)" />
        <path className="ai-hero__arrow-body" d="M110 38H220L464 360 220 682H110L354 360Z" fill="url(#igen-arrow-fill)" stroke="#e6faff" strokeWidth="11" strokeLinejoin="round" />
        <path d="M110 38H220L464 360 220 682H110L354 360Z" fill="url(#igen-arrow-glass)" />
        <g clipPath="url(#igen-arrow-clip)">
          <g transform="translate(188 96) rotate(-36) scale(.72 .92)">
            <path d={VIETNAM_OUTLINE} transform="translate(1.5 2)" fill="#003d70" opacity=".24" />
            <path d={VIETNAM_OUTLINE} fill="#e9faff" fillOpacity=".22" stroke="#f4fcff" strokeOpacity=".36" strokeWidth="1.2" />
          </g>
        </g>
        <path d="M131 62H209L435 360 209 658H131L381 360Z" fill="none" stroke="#e6faff" strokeOpacity=".48" strokeWidth="3" strokeLinejoin="round" />
        <path d="M110 38L354 360" fill="none" stroke="url(#igen-arrow-upper-edge)" strokeWidth="10" strokeLinecap="round" filter="url(#igen-arrow-edge-glow)" />
        <path d="M110 38L354 360" fill="none" stroke="url(#igen-arrow-upper-edge)" strokeWidth="2" strokeLinecap="round" />
        <g clipPath="url(#igen-arrow-clip)">
          <g className="ai-hero__arrow-shine">
            <rect x="0" y="-100" width="280" height="920" fill="url(#igen-arrow-shine-halo)" transform="skewX(-12)" />
            <rect x="87" y="-100" width="106" height="920" fill="url(#igen-arrow-shine)" transform="skewX(-12)" />
          </g>
        </g>
      </svg>
    </div>
    </div>
    <div className="ai-hero__inner">
      <div className="ai-hero__content">
        <p className="ai-hero__eyebrow" aria-label="Bứt phá cùng AI">
          <span className="ai-hero__scatter-line" aria-hidden="true">{scatterText('Bứt phá cùng AI', 0)}</span>
        </p>
        <h1 id="ai-hero-title" aria-label="Dẫn đầu kỷ nguyên số">
          <span className="ai-hero__scatter-line" aria-hidden="true">{scatterText('Dẫn đầu', 1)}</span>
          <span className="ai-hero__scatter-line ai-hero__scatter-line--accent" aria-hidden="true">{scatterText('kỷ nguyên số', 2)}</span>
        </h1>
        <div className="ai-hero__supporting">
          <p className="ai-hero__description">
            iGen biến AI, phần mềm và dữ liệu thành sức bật cho doanh nghiệp — từ ý tưởng đến tăng trưởng thực tế.
          </p>
          <div className="ai-hero__actions">
            <Link to="/contact" className="ai-hero__primary">
              Bắt đầu chuyển đổi <ArrowUpRight size={21} strokeWidth={2} aria-hidden="true" />
            </Link>
            <Link to="/solutions" className="ai-hero__secondary">Khám phá giải pháp</Link>
          </div>
        </div>
      </div>

      <nav className="ai-hero__service-nav" aria-label="Dịch vụ nổi bật">
        {featuredServices.map(({ label, to }) => (
          <Link key={label} to={to}>{label}</Link>
        ))}
      </nav>
    </div>
    </div>
  </section>
  );
};
