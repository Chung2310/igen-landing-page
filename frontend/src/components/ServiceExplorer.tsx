import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Fragment, useEffect, useRef } from 'react';
import {
  Grid2X2,
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { ServiceExplorerIcon, type ServiceExplorerIconName } from './ServiceExplorerIcon';
import './ServiceExplorer.css';

type ServiceItem = {
  title: string;
  slug: string;
  icon: ServiceExplorerIconName;
  description: string;
  details: string[];
};

const serviceGroups: Record<'services' | 'expertise', ServiceItem[]> = {
  services: [
    {
      title: 'Phát triển phần mềm', slug: 'phat-trien-phan-mem', icon: 'software',
      description: 'Thiết kế và xây dựng phần mềm theo mục tiêu, người dùng và quy trình thực tế của doanh nghiệp.',
      details: ['Phát triển ứng dụng di động và ứng dụng web', 'Kiểm thử phần mềm tự động', 'Thiết kế UI/UX'],
    },
    {
      title: 'Giải pháp doanh nghiệp & tự động hóa', slug: 'giai-phap-doanh-nghiep-tu-dong-hoa', icon: 'enterprise',
      description: 'Kết nối dữ liệu và các bước làm việc để đội ngũ vận hành rõ ràng, thuận tiện hơn.',
      details: ['Hệ thống ERP', 'Quản lý khách hàng CRM', 'Marketing tự động'],
    },
    {
      title: 'Thuê ngoài đội ngũ CNTT (IT outsourcing)', slug: 'it-outsourcing', icon: 'outsourcing',
      description: 'Bổ sung năng lực công nghệ theo phạm vi công việc và cách phối hợp phù hợp với từng dự án.',
      details: ['Trung tâm phát triển phần mềm từ xa', 'Đội ngũ chuyên trách', 'Dịch vụ quản lý hệ thống IT'],
    },
    {
      title: 'Thiết kế website', slug: 'thiet-ke-website', icon: 'website',
      description: 'Xây dựng website thể hiện đúng thương hiệu và giúp khách hàng tìm được thông tin họ cần.',
      details: ['Cấu trúc nội dung rõ ràng', 'Giao diện phù hợp thiết bị', 'Dễ cập nhật và mở rộng'],
    },
    {
      title: 'Phát triển ứng dụng di động', slug: 'phat-trien-ung-dung-di-dong', icon: 'mobile',
      description: 'Phát triển ứng dụng di động theo hành trình người dùng và nhu cầu vận hành của doanh nghiệp.',
      details: ['Luồng thao tác dễ sử dụng', 'Kết nối dữ liệu với hệ thống hiện có', 'Kiểm thử và cải tiến theo phản hồi'],
    },
    {
      title: 'Giải pháp AI & tự động hóa', slug: 'giai-phap-ai-automation', icon: 'automation',
      description: 'Ứng dụng AI vào những tác vụ có thể hỗ trợ đội ngũ làm việc và xử lý thông tin hiệu quả hơn.',
      details: ['Tự động hóa quy trình lặp lại', 'Trợ lý và chatbot AI', 'Phân tích dữ liệu theo bài toán cụ thể'],
    },
  ],
  expertise: [
    {
      title: 'Blockchain', slug: 'blockchain', icon: 'blockchain',
      description: 'Nghiên cứu ứng dụng blockchain cho các nhu cầu ghi nhận, đối chiếu và xác thực dữ liệu.',
      details: ['Làm rõ trường hợp sử dụng', 'Thiết kế kiến trúc phù hợp', 'Tích hợp với hệ thống liên quan'],
    },
    {
      title: 'Dữ liệu & phân tích chuyên sâu', slug: 'du-lieu-phan-tich-chuyen-sau', icon: 'data',
      description: 'Tập hợp và trình bày dữ liệu để doanh nghiệp theo dõi hoạt động và đưa ra quyết định.',
      details: ['Kết nối nguồn dữ liệu', 'Làm sạch và tổ chức thông tin', 'Dashboard và báo cáo'],
    },
    {
      title: 'Tư vấn & chuyển đổi số', slug: 'tu-van-chuyen-doi-so', icon: 'transformation',
      description: 'Xác định điểm cần cải thiện và lộ trình ứng dụng công nghệ phù hợp với doanh nghiệp.',
      details: ['Đánh giá hiện trạng', 'Ưu tiên bài toán cần giải quyết', 'Lộ trình triển khai theo giai đoạn'],
    },
    {
      title: 'AI Marketing & vận hành', slug: 'ai-marketing-van-hanh', icon: 'marketing',
      description: 'Sử dụng AI để hỗ trợ nội dung, chăm sóc khách hàng và các công việc vận hành thường xuyên.',
      details: ['Hỗ trợ tạo và quản lý nội dung', 'Tự động hóa tương tác phù hợp', 'Theo dõi và tối ưu quy trình'],
    },
    {
      title: 'Nền tảng AI theo yêu cầu', slug: 'nen-tang-ai-theo-yeu-cau', icon: 'aiPlatform',
      description: 'Thiết kế giải pháp AI theo dữ liệu, quy trình và mục tiêu riêng của từng tổ chức.',
      details: ['Làm rõ nhu cầu và dữ liệu', 'Xây dựng tính năng theo phạm vi', 'Kết nối với hệ thống đang dùng'],
    },
    {
      title: 'Chuyển đổi AI doanh nghiệp', slug: 'chuyen-doi-ai-doanh-nghiep', icon: 'aiEnterprise',
      description: 'Đưa AI vào công việc theo lộ trình thực tế, từ đào tạo đội ngũ đến triển khai sử dụng.',
      details: ['Xác định cơ hội ứng dụng', 'Hướng dẫn đội ngũ sử dụng', 'Đo kết quả và tiếp tục cải tiến'],
    },
  ],
};

type Group = keyof typeof serviceGroups;

export const ServiceExplorer = () => {
  const [activeGroup, setActiveGroup] = useState<Group>('services');
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 900px)');
    if (motion.matches) return;
    let animations: Animation[] = [];
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible && !motion.matches) {
        animations.forEach(animation => animation.cancel());
        animations = Array.from(heading.querySelectorAll('.service-explorer__title-word')).map((word, index) =>
          word.animate([
            { transform: 'translateY(115%) skewX(-12deg) rotateX(-55deg)', clipPath: 'inset(0 100% 0 0)' },
            { transform: 'translateY(-3%) skewX(2deg) rotateX(0deg)', clipPath: 'inset(0 0% 0 0)', offset: .8 },
            { transform: 'translateY(0) skewX(0deg) rotateX(0deg)', clipPath: 'inset(0 0% 0 0)' },
          ], { duration: 1000, delay: index * 65, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' })
        );
      }
      visible = entry.isIntersecting;
    }, { rootMargin: '-90px 0px -35px 0px', threshold: 0 });
    observer.observe(heading);
    const stopMotion = () => { if (motion.matches) animations.forEach(animation => animation.cancel()); };
    motion.addEventListener('change', stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      motion.removeEventListener('change', stopMotion);
    };
  }, []);

  const selectGroup = (group: Group) => {
    setActiveGroup(group);
  };

  return (
    <section id="services-overview" className="service-explorer" aria-labelledby="service-explorer-title">
      <div className="service-explorer__inner">
        <div className="service-explorer__intro">
          <h2 id="service-explorer-title" ref={headingRef} aria-label="Giải pháp công nghệ giúp doanh nghiệp tiến xa hơn.">
            {'Giải pháp công nghệ giúp doanh nghiệp tiến xa hơn.'.split(' ').map((word, index) => (
              <Fragment key={index}>
                {index > 0 && ' '}
                <span className={`service-explorer__title-mask${index >= 7 ? ' is-accent' : ''}`} aria-hidden="true">
                  <span className="service-explorer__title-word">{word}</span>
                </span>
              </Fragment>
            ))}
          </h2>
          <p>
            Từ website, ứng dụng di động đến AI và tự động hóa, iGen xây dựng
            giải pháp phù hợp với mục tiêu và cách vận hành của doanh nghiệp.
          </p>
        </div>

        <div className="service-explorer__body">
          <div className="service-explorer__tabs" role="group" aria-label="Danh mục giải pháp">
            <button type="button" aria-pressed={activeGroup === 'services'} aria-controls="service-explorer-panel"
              className={activeGroup === 'services' ? 'is-active' : ''} onClick={() => selectGroup('services')}>
              <Grid2X2 size={22} strokeWidth={1.8} aria-hidden="true" />
              <span>Dịch vụ cốt lõi</span>
              <ArrowRight className="service-explorer__tab-arrow" size={19} aria-hidden="true" />
            </button>
            <button type="button" aria-pressed={activeGroup === 'expertise'} aria-controls="service-explorer-panel"
              className={activeGroup === 'expertise' ? 'is-active' : ''} onClick={() => selectGroup('expertise')}>
              <TrendingUp size={22} strokeWidth={1.8} aria-hidden="true" />
              <span>Năng lực công nghệ</span>
              <ArrowRight className="service-explorer__tab-arrow" size={19} aria-hidden="true" />
            </button>
          </div>

          <div className="service-explorer__results">
            <div id="service-explorer-panel" className="service-explorer__list" key={activeGroup}>
              {serviceGroups[activeGroup].map(({ title, slug, icon, description }) => (
                <article className="service-explorer__entry" key={slug}>
                  <Link className="service-explorer__item" to={`/solutions/${slug}`} aria-label={`Tìm hiểu ${title}`}>
                    <span className="service-explorer__item-heading">
                      <span className="service-explorer__icon-box"><ServiceExplorerIcon name={icon} /></span>
                      <strong>{title}</strong>
                      <ArrowUpRight className="service-explorer__item-arrow" size={32} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="service-explorer__item-description">{description}</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
