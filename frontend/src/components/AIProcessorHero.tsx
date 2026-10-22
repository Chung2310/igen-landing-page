import { Link } from 'react-router-dom';
import './AIProcessorHero.css';

const flowPaths = [
  'M -140 18 C 110 275 350 420 655 260 S 1110 -10 1335 150 S 1610 280 1760 80',
  'M -150 385 C 175 35 385 105 690 315 S 1140 465 1400 230 S 1640 25 1770 110',
  'M -160 95 C 240 20 430 155 730 340 S 1200 515 1760 145',
  'M -120 460 C 240 300 455 255 725 365 S 1210 330 1760 5',
];

export const AIProcessorHero = () => {
  return <section className="ai-hero ai-hero--devices" aria-labelledby="ai-hero-title">
    <div className="ai-hero__flow" aria-hidden="true">
      <svg viewBox="0 0 1600 500" preserveAspectRatio="xMidYMid slice">
        {flowPaths.map((path, index) => (
          <g key={path} className={`ai-hero__flow-strand ai-hero__flow-strand--${index + 1}`}>
            <path className="ai-hero__flow-line" d={path} />
          </g>
        ))}
      </svg>
    </div>
    <div className="ai-hero__inner">
      <div className="ai-hero__content">
        <h1 id="ai-hero-title">Thiết kế App, Website và phần mềm.<br />{' '}<span>Tiếp cận nhiều khách hàng, tăng trưởng cùng AI.</span></h1>
        <p className="ai-hero__description">Từ trợ lý AI đến hệ thống tự động hóa — iGen kết nối dữ liệu, con người và quy trình để doanh nghiệp vận hành hiệu quả hơn.</p>
        <div className="ai-hero__actions">
          <Link to="/solutions" className="btn-primary">Khám phá giải pháp <span aria-hidden="true">↗</span></Link>
          <Link to="/contact" className="ai-hero__secondary">Trao đổi cùng chuyên gia <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <figure className="ai-hero__devices">
        <Link to="/solutions/erp" className="block" aria-label="Xem chi tiết iGen ERP">
          <img src="/hero-app-devices-stats.png" alt="Ba màn hình minh họa ý tưởng quản trị iGen ERP trên các thiết bị" width="1659" height="948" fetchPriority="high" />
        </Link>
      </figure>
    </div>
  </section>;
};
