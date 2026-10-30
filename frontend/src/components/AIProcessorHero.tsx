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

const scatterText = (text: string, seed: number) => Array.from(text).map((character, index) => {
  const angle = index * 2.4 + seed * 1.15;
  const distance = 110 + (index % 5) * 25;

  return (
    <span
      key={`${seed}-${index}`}
      className="ai-hero__scatter-letter"
      data-scatter-x={Math.round(Math.cos(angle) * distance)}
      data-scatter-y={Math.round(Math.sin(angle) * distance - 25)}
      data-scatter-rotate={Math.round((index % 2 ? 1 : -1) * (14 + (index % 4) * 7))}
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
    const arrowShine = hero.querySelector<SVGRectElement>('.ai-hero__arrow-shine');
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
        .fromTo(shade, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.25, ease: 'power2.inOut' }, 0)
        .fromTo(mesh, { scale: 1.14, y: -26 }, { scale: 1, y: 0, duration: 1.55 }, .05)
        .fromTo(arrow, { x: -Math.min(window.innerWidth * .34, 580), scale: .9, rotation: -4, clipPath: 'inset(0 100% 0 0)' }, {
          x: 0, scale: 1, rotation: 0, clipPath: 'inset(0 0% 0 0)', duration: 1.25, ease: 'power2.inOut', clearProps: 'clipPath',
        }, .08)
        .fromTo(arrowLead, { x: -75, scale: .82, opacity: 0 }, { x: 0, scale: 1, opacity: .82, duration: .9, ease: 'power3.out' }, .33)
        .fromTo(arrowGhost, { x: 36, opacity: 0 }, { x: 0, opacity: .52, duration: .92 }, .7)
        .fromTo(eyebrow, { y: 34, clipPath: 'inset(0 0 100% 0)' }, { y: 0, clipPath: 'inset(0 0 0% 0)', duration: .78 }, .23)
        .fromTo(lines, { y: 72, clipPath: 'inset(0 0 100% 0)' }, {
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: .96,
          stagger: .14,
          onComplete: () => gsap.set(lines, { clearProps: 'clipPath' }),
        }, .36)
        .fromTo(supporting, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: .8 }, .79)
        .fromTo(navLinks, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .68, stagger: .07 }, .94);

      gsap.timeline({
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: .65, invalidateOnRefresh: true },
      })
        .to(letters, {
          x: (_index, element) => Number((element as HTMLElement).dataset.scatterX),
          y: (_index, element) => Number((element as HTMLElement).dataset.scatterY),
          rotation: (_index, element) => Number((element as HTMLElement).dataset.scatterRotate),
          opacity: 0,
          stagger: { amount: .01, from: 'center' },
          duration: .04,
          ease: 'none',
        }, .92)
        .to(supporting, { y: -32, autoAlpha: 0, duration: .04, ease: 'none' }, .92)
        .to(mesh, { scale: 1.12, yPercent: -4, duration: 1, ease: 'none' }, 0)
        .to(video, { scale: 1.1, yPercent: -2, duration: 1, ease: 'none' }, 0)
        .to(arrowLead, { xPercent: 18, opacity: .18, duration: .5, ease: 'none' }, 0)
        .to(arrowSvg, { xPercent: 10, yPercent: -7, scale: .9, rotation: 5, opacity: .28, duration: .5, ease: 'none' }, 0)
        .to(letters, {
          x: 0, y: 0, rotation: 0, opacity: 1,
          stagger: { amount: .01, from: 'edges' },
          duration: .04,
          ease: 'power2.inOut',
        }, .96)
        .to(content, {
          scale: () => window.innerWidth <= 640 ? .94 : window.innerWidth <= 900 ? .86 : .78,
          y: () => window.innerWidth <= 640 ? -12 : -42,
          transformOrigin: 'left center', duration: .04, ease: 'power2.inOut',
        }, .96)
        .to(supporting, { y: 0, autoAlpha: 1, duration: .04, ease: 'power2.inOut' }, .96)
        .to(arrowLead, { xPercent: 0, opacity: .65, duration: .04, ease: 'power2.inOut' }, .96)
        .to(arrowSvg, { xPercent: 0, yPercent: 0, scale: .82, rotation: 0, opacity: .7, duration: .04, ease: 'power2.inOut' }, .96);

      gsap.fromTo(arrowShine,
        { x: -160, opacity: 0 },
        { x: 900, opacity: .9, duration: .72, repeat: -1, repeatDelay: 3.5, delay: 1.45, ease: 'power2.inOut' },
      );

      gsap.timeline({ repeat: -1, repeatDelay: 2.64, delay: 2.1 })
        .fromTo(arrowEcho, { x: 0, scale: 1, opacity: 0 }, { x: 34, scale: 1.02, opacity: .36, duration: .08, ease: 'power1.out' })
        .to(arrowEcho, { x: 250, scale: 1.1, opacity: 0, duration: .28, ease: 'power4.out' });
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
            <stop offset=".5" stopColor="#fff" stopOpacity=".76" />
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
          <clipPath id="igen-arrow-clip"><path d="M110 38H220L464 360 220 682H110L354 360Z" /></clipPath>
        </defs>
        <g className="ai-hero__arrow-ghost">
          <path d="M110 38H220L464 360 220 682H110L354 360Z" transform="translate(850 0) scale(-1 1)" fill="#d5e4ec" opacity=".56" filter="url(#igen-arrow-blur)" />
          <path d="M110 38H220L464 360 220 682H110L354 360Z" transform="translate(850 0) scale(-1 1)" fill="#d5e4ec" opacity=".18" />
          <path d="M386 360L630 682" fill="none" stroke="url(#igen-arrow-shadow-edge)" strokeWidth="10" strokeLinecap="round" filter="url(#igen-arrow-edge-glow)" />
          <path d="M386 360L630 682" fill="none" stroke="url(#igen-arrow-shadow-edge)" strokeWidth="2" strokeLinecap="round" />
        </g>
        <path className="ai-hero__arrow-echo" d="M110 38H220L464 360 220 682H110L354 360Z" fill="#d5f2ff" filter="url(#igen-arrow-echo-blur)" />
        <path className="ai-hero__arrow-body" d="M110 38H220L464 360 220 682H110L354 360Z" fill="url(#igen-arrow-fill)" stroke="#e6faff" strokeWidth="11" strokeLinejoin="round" />
        <path d="M110 38H220L464 360 220 682H110L354 360Z" fill="url(#igen-arrow-glass)" />
        <path d="M131 62H209L435 360 209 658H131L381 360Z" fill="none" stroke="#e6faff" strokeOpacity=".48" strokeWidth="3" strokeLinejoin="round" />
        <path d="M110 38L354 360" fill="none" stroke="url(#igen-arrow-upper-edge)" strokeWidth="10" strokeLinecap="round" filter="url(#igen-arrow-edge-glow)" />
        <path d="M110 38L354 360" fill="none" stroke="url(#igen-arrow-upper-edge)" strokeWidth="2" strokeLinecap="round" />
        <g clipPath="url(#igen-arrow-clip)">
          <rect className="ai-hero__arrow-shine" x="-260" y="-100" width="150" height="920" fill="url(#igen-arrow-shine)" transform="skewX(-18)" />
        </g>
      </svg>
    </div>
    </div>
    <div className="ai-hero__inner">
      <div className="ai-hero__content">
        <p className="ai-hero__eyebrow" aria-label="Bứt phá cùng AI">
          <span className="ai-hero__scatter-line" aria-hidden="true">{scatterText('Bứt phá cùng AI', 0)}</span>
        </p>
        <h1 id="ai-hero-title" aria-label="Dẫn đầu kỷ nguyên số.">
          <span className="ai-hero__scatter-line" aria-hidden="true">{scatterText('Dẫn đầu', 1)}</span>
          <span className="ai-hero__scatter-line ai-hero__scatter-line--accent" aria-hidden="true">{scatterText('kỷ nguyên số.', 2)}</span>
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
