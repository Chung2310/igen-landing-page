import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './AIProcessorHero.css';

const stats = [
  { value: '3–5×', label: 'Năng suất đội ngũ' },
  { value: '90%', label: 'Tối ưu vận hành' },
  { value: '24/7', label: 'Hệ thống thông minh' },
];

const pins = Array.from({ length: 10 });
const particles = [
  [11, 22, 0], [82, 14, 1.2], [91, 48, 2.4], [76, 82, 3.1],
  [18, 78, 1.8], [48, 8, 3.8], [7, 53, 2.8], [92, 70, 0.8],
];

export const AIProcessorHero: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const scene = sceneRef.current;
    if (!stage || !scene) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.065;
      currentY += (targetY - currentY) * 0.065;
      scene.style.setProperty('--processor-rotate-y', `${currentX * 20}deg`);
      scene.style.setProperty('--processor-rotate-x', `${currentY * -12}deg`);
      scene.style.setProperty('--processor-shift-x', `${currentX * 12}px`);
      scene.style.setProperty('--processor-shift-y', `${currentY * 8}px`);

      const isMoving = Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001;
      if (isMoving) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const updateTarget = (event: PointerEvent) => {
      const bounds = stage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      targetX = Math.max(-0.5, Math.min(0.5, x));
      targetY = Math.max(-0.5, Math.min(0.5, y));
      stage.dataset.interacting = 'true';
      requestRender();
    };

    const resetTarget = () => {
      targetX = 0;
      targetY = 0;
      delete stage.dataset.interacting;
      requestRender();
    };

    if (!reducedMotion) {
      stage.addEventListener('pointermove', updateTarget);
      stage.addEventListener('pointerleave', resetTarget);
      stage.addEventListener('pointercancel', resetTarget);
    }

    return () => {
      stage.removeEventListener('pointermove', updateTarget);
      stage.removeEventListener('pointerleave', resetTarget);
      stage.removeEventListener('pointercancel', resetTarget);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="ai-hero" aria-labelledby="ai-hero-title">
      <div className="ai-hero__grid-pattern" aria-hidden="true" />
      <div className="ai-hero__ambient" aria-hidden="true" />

      <div className="ai-hero__inner">
        <div className="ai-hero__content">
          <div className="hero-reveal ai-hero__eyebrow">
            <span className="ai-hero__eyebrow-dot" />
            AI infrastructure · Vietnam
          </div>
          <h1 id="ai-hero-title" className="hero-reveal ai-hero__title">
            Biến dữ liệu thành<span> trí tuệ vận hành.</span>
          </h1>
          <p className="hero-reveal ai-hero__description">
            iGen kiến tạo hệ sinh thái AI chính xác, bảo mật và có thể mở rộng — giúp doanh nghiệp Việt tự động hóa quy trình và tăng tốc tăng trưởng.
          </p>
          <div className="hero-reveal ai-hero__actions">
            <Link to="/solutions" className="btn-primary ai-hero__primary-action">
              Khám phá giải pháp
              <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </Link>
            <Link to="/contact" className="ai-hero__text-action">
              Trao đổi cùng chuyên gia
              <span className="material-symbols-outlined" aria-hidden="true">north_east</span>
            </Link>
          </div>
          <div className="hero-reveal ai-hero__stats" aria-label="Năng lực giải pháp">
            {stats.map((stat) => (
              <div className="ai-hero__stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={stageRef} className="hero-reveal ai-processor-stage" aria-label="Mô hình bộ xử lý AI tương tác. Di chuyển con trỏ hoặc kéo để quan sát.">
          <div className="ai-processor-stage__halo" aria-hidden="true" />
          <div className="ai-processor-stage__orbit ai-processor-stage__orbit--one" aria-hidden="true" />
          <div className="ai-processor-stage__orbit ai-processor-stage__orbit--two" aria-hidden="true" />
          {particles.map(([left, top, delay], index) => (
            <span key={index} className="ai-processor-particle" style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }} aria-hidden="true" />
          ))}

          <div ref={sceneRef} className="ai-processor-scene">
            <div className="ai-processor-assembly">
              <div className="ai-processor-shadow" />
              <div className="ai-processor-layer ai-processor-layer--back" />
              <div className="ai-processor-layer ai-processor-layer--glass" />
              <div className="ai-processor-board">
                <div className="ai-processor-board__texture" />
                <svg className="ai-circuits" viewBox="0 0 440 440" role="presentation">
                  <defs>
                    <linearGradient id="circuit-stroke" x1="0" x2="1">
                      <stop offset="0" stopColor="#88dbe6" stopOpacity="0.28" />
                      <stop offset="0.5" stopColor="#0097b2" stopOpacity="0.95" />
                      <stop offset="1" stopColor="#88dbe6" stopOpacity="0.28" />
                    </linearGradient>
                    <filter id="signal-glow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  <g className="ai-circuits__paths" fill="none" stroke="url(#circuit-stroke)" strokeWidth="1.25">
                    <path id="path-top" d="M220 153V108H160V70H102V31" />
                    <path d="M190 153V124H118V102H61V66" />
                    <path id="path-right" d="M287 220H332V166H373V108H414" />
                    <path d="M287 190H312V125H347V51" />
                    <path id="path-bottom" d="M220 287V326H280V363H337V412" />
                    <path d="M250 287V314H323V337H392V373" />
                    <path id="path-left" d="M153 220H108V274H67V332H27" />
                    <path d="M153 250H126V316H91V389" />
                    <path d="M169 169L135 135H93V151H44" />
                    <path d="M271 169L305 135H335V88H382" />
                    <path d="M271 271L304 304H350V290H411" />
                    <path d="M169 271L134 306H102V352H56" />
                  </g>
                  <g className="ai-circuits__nodes">
                    {[31, 70, 102, 108, 125, 135, 151, 166, 190, 220, 250, 274, 287, 304, 326, 337, 352, 363, 389, 412].map((n, index) => (
                      <circle key={index} cx={index % 2 ? n : 440 - n} cy={index % 3 ? n : 440 - n} r="2.6" />
                    ))}
                  </g>
                  <g className="ai-circuits__signals" filter="url(#signal-glow)">
                    <circle r="3.5"><animateMotion dur="3.8s" repeatCount="indefinite"><mpath href="#path-top" /></animateMotion></circle>
                    <circle r="3.5"><animateMotion dur="4.6s" begin="1.1s" repeatCount="indefinite"><mpath href="#path-right" /></animateMotion></circle>
                    <circle r="3.5"><animateMotion dur="4.2s" begin="2.4s" repeatCount="indefinite"><mpath href="#path-bottom" /></animateMotion></circle>
                    <circle r="3.5"><animateMotion dur="5.1s" begin=".6s" repeatCount="indefinite"><mpath href="#path-left" /></animateMotion></circle>
                  </g>
                </svg>
                <div className="ai-processor-pins ai-processor-pins--top">{pins.map((_, index) => <i key={index} />)}</div>
                <div className="ai-processor-pins ai-processor-pins--right">{pins.map((_, index) => <i key={index} />)}</div>
                <div className="ai-processor-pins ai-processor-pins--bottom">{pins.map((_, index) => <i key={index} />)}</div>
                <div className="ai-processor-pins ai-processor-pins--left">{pins.map((_, index) => <i key={index} />)}</div>
                <div className="ai-core-frame">
                  <div className="ai-core-frame__edge" />
                  <div className="ai-core">
                    <div className="ai-core__grid" />
                    <div className="ai-core__mark"><span>AI</span><small>NEURAL CORE</small></div>
                    <div className="ai-core__pulse" />
                    {[0, 1, 2, 3, 4, 5].map((node) => <i key={node} className={`ai-core__node ai-core__node--${node + 1}`} />)}
                  </div>
                </div>
              </div>
              <div className="ai-processor-layer ai-processor-layer--front" />
            </div>
          </div>
          <div className="ai-processor-label ai-processor-label--input" aria-hidden="true"><span /> DATA INPUT</div>
          <div className="ai-processor-label ai-processor-label--output" aria-hidden="true">INTELLIGENCE <span /></div>
          <div className="ai-processor-status" aria-hidden="true"><span /> SYSTEM ONLINE</div>
        </div>
      </div>
    </section>
  );
};
