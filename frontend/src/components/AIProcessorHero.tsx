import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, RotateCw, Pause, Play, Plus, Minus, RotateCcw } from 'lucide-react';
import './AIProcessorHero.css';

export const AIProcessorHero = () => {
  const mount = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const host = mount.current;
    const stopAuto = () => setAuto(false);
    host?.addEventListener('processor-auto-stop', stopAuto);
    const observer = new MutationObserver(() => setReady(host?.dataset.webgl === 'ready'));
    if (host) observer.observe(host, { attributes: true, attributeFilter: ['data-webgl'] });
    import('./processorScene').then(({ createProcessor }) => {
      if (!disposed && host) cleanup = createProcessor(host);
    }).catch(() => { /* Keep the CSS fallback if WebGL is unavailable. */ });
    return () => { disposed = true; observer.disconnect(); host?.removeEventListener('processor-auto-stop', stopAuto); cleanup?.(); };
  }, []);
  const action = (action: string, enabled?: boolean) => mount.current?.dispatchEvent(new CustomEvent('processor-action', { detail: { action, enabled } }));

  return <section className="ai-hero" aria-labelledby="ai-hero-title">
    <div className="ai-hero__inner">
      <div className="ai-hero__content">
        <p className="ai-hero__eyebrow"><i /> CÔNG NGHỆ AI CHO DOANH NGHIỆP</p>
        <h1 id="ai-hero-title">Kiến tạo doanh nghiệp.<br /><span>Vận hành bằng AI.</span></h1>
        <p className="ai-hero__description">Từ trợ lý AI đến hệ thống tự động hóa — iGen kết nối dữ liệu, con người và quy trình để doanh nghiệp vận hành hiệu quả hơn.</p>
        <div className="ai-hero__actions">
          <Link to="/solutions" className="btn-primary">Khám phá giải pháp <span aria-hidden="true">↗</span></Link>
          <Link to="/contact" className="ai-hero__secondary">Trao đổi cùng chuyên gia <span aria-hidden="true">→</span></Link>
        </div>
        <div className="ai-hero__capabilities"><span>Đào tạo & chuyển giao</span><span>Tự động hóa quy trình</span><span>AI theo yêu cầu</span></div>
      </div>
      <figure className="ai-processor">
        <div ref={mount} className="ai-processor__viewport" tabIndex={0} role="group" aria-label="Mô hình chip AI tương tác" data-lenis-prevent>
          <div className="ai-processor__fallback" aria-hidden="true"><div /><div /><strong>AI<small>NEURAL ENGINE</small></strong></div>
        </div>
        <div className="ai-processor__controls" role="group" aria-label="Điều khiển mô hình">
          <button disabled={!ready} aria-label="Tách lớp" title="Tách lớp" aria-pressed={exploded} onClick={() => { setExploded(!exploded); action('explode', !exploded); }}><Layers size={18} aria-hidden="true" /></button>
          <button disabled={!ready} aria-label="Tự xoay qua lại 180 độ" title="Tự xoay 180°" aria-pressed={auto} onClick={() => { setAuto(!auto); action('auto', !auto); }}><RotateCw size={18} aria-hidden="true" /></button>
          <button disabled={!ready} aria-label={paused ? 'Chạy dữ liệu' : 'Dừng dữ liệu'} title={paused ? 'Chạy dữ liệu' : 'Dừng dữ liệu'} aria-pressed={paused} onClick={() => { setPaused(!paused); action('pause', !paused); }}>{paused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}</button>
          <button disabled={!ready} aria-label="Phóng to mô hình" title="Phóng to" onClick={() => action('zoom-in')}><Plus size={18} aria-hidden="true" /></button>
          <button disabled={!ready} aria-label="Thu nhỏ mô hình" title="Thu nhỏ" onClick={() => action('zoom-out')}><Minus size={18} aria-hidden="true" /></button>
          <button disabled={!ready} aria-label="Đặt lại góc nhìn" title="Đặt lại góc nhìn" onClick={() => { setExploded(false); setAuto(false); action('reset'); }}><RotateCcw size={18} aria-hidden="true" /></button>
        </div>
      </figure>
    </div>
  </section>;
};
