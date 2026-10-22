import { useState } from 'react';
import {
  Bot,
  BrainCircuit,
  Blocks,
  ChevronDown,
  CodeXml,
  Database,
  Globe2,
  Grid2X2,
  ArrowRight,
  Settings2,
  Smartphone,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import './ServiceExplorer.css';

type ServiceItem = {
  title: string;
  slug: string;
  icon: LucideIcon;
  description: string;
  details: string[];
};

const serviceGroups: Record<'services' | 'expertise', ServiceItem[]> = {
  services: [
    {
      title: 'Phát triển phần mềm', slug: 'phat-trien-phan-mem', icon: CodeXml,
      description: 'Thiết kế và xây dựng phần mềm theo mục tiêu, người dùng và quy trình thực tế của doanh nghiệp.',
      details: ['Phát triển ứng dụng di động và ứng dụng web', 'Kiểm thử phần mềm tự động', 'Thiết kế UI/UX'],
    },
    {
      title: 'Giải pháp doanh nghiệp & tự động hóa', slug: 'giai-phap-doanh-nghiep-tu-dong-hoa', icon: Workflow,
      description: 'Kết nối dữ liệu và các bước làm việc để đội ngũ vận hành rõ ràng, thuận tiện hơn.',
      details: ['Hệ thống ERP', 'Quản lý khách hàng CRM', 'Marketing tự động'],
    },
    {
      title: 'Thuê ngoài đội ngũ CNTT (IT outsourcing)', slug: 'it-outsourcing', icon: Users,
      description: 'Bổ sung năng lực công nghệ theo phạm vi công việc và cách phối hợp phù hợp với từng dự án.',
      details: ['Trung tâm phát triển phần mềm từ xa', 'Đội ngũ chuyên trách', 'Dịch vụ quản lý hệ thống IT'],
    },
    {
      title: 'Thiết kế website', slug: 'thiet-ke-website', icon: Globe2,
      description: 'Xây dựng website thể hiện đúng thương hiệu và giúp khách hàng tìm được thông tin họ cần.',
      details: ['Cấu trúc nội dung rõ ràng', 'Giao diện phù hợp thiết bị', 'Dễ cập nhật và mở rộng'],
    },
    {
      title: 'Phát triển ứng dụng di động', slug: 'phat-trien-ung-dung-di-dong', icon: Smartphone,
      description: 'Phát triển ứng dụng di động theo hành trình người dùng và nhu cầu vận hành của doanh nghiệp.',
      details: ['Luồng thao tác dễ sử dụng', 'Kết nối dữ liệu với hệ thống hiện có', 'Kiểm thử và cải tiến theo phản hồi'],
    },
    {
      title: 'Giải pháp AI & tự động hóa', slug: 'giai-phap-ai-automation', icon: Bot,
      description: 'Ứng dụng AI vào những tác vụ có thể hỗ trợ đội ngũ làm việc và xử lý thông tin hiệu quả hơn.',
      details: ['Tự động hóa quy trình lặp lại', 'Trợ lý và chatbot AI', 'Phân tích dữ liệu theo bài toán cụ thể'],
    },
  ],
  expertise: [
    {
      title: 'Blockchain', slug: 'blockchain', icon: Blocks,
      description: 'Nghiên cứu ứng dụng blockchain cho các nhu cầu ghi nhận, đối chiếu và xác thực dữ liệu.',
      details: ['Làm rõ trường hợp sử dụng', 'Thiết kế kiến trúc phù hợp', 'Tích hợp với hệ thống liên quan'],
    },
    {
      title: 'Dữ liệu & phân tích chuyên sâu', slug: 'du-lieu-phan-tich-chuyen-sau', icon: Database,
      description: 'Tập hợp và trình bày dữ liệu để doanh nghiệp theo dõi hoạt động và đưa ra quyết định.',
      details: ['Kết nối nguồn dữ liệu', 'Làm sạch và tổ chức thông tin', 'Dashboard và báo cáo'],
    },
    {
      title: 'Tư vấn & chuyển đổi số', slug: 'tu-van-chuyen-doi-so', icon: TrendingUp,
      description: 'Xác định điểm cần cải thiện và lộ trình ứng dụng công nghệ phù hợp với doanh nghiệp.',
      details: ['Đánh giá hiện trạng', 'Ưu tiên bài toán cần giải quyết', 'Lộ trình triển khai theo giai đoạn'],
    },
    {
      title: 'AI Marketing & vận hành', slug: 'ai-marketing-van-hanh', icon: BrainCircuit,
      description: 'Sử dụng AI để hỗ trợ nội dung, chăm sóc khách hàng và các công việc vận hành thường xuyên.',
      details: ['Hỗ trợ tạo và quản lý nội dung', 'Tự động hóa tương tác phù hợp', 'Theo dõi và tối ưu quy trình'],
    },
    {
      title: 'Nền tảng AI theo yêu cầu', slug: 'nen-tang-ai-theo-yeu-cau', icon: CodeXml,
      description: 'Thiết kế giải pháp AI theo dữ liệu, quy trình và mục tiêu riêng của từng tổ chức.',
      details: ['Làm rõ nhu cầu và dữ liệu', 'Xây dựng tính năng theo phạm vi', 'Kết nối với hệ thống đang dùng'],
    },
    {
      title: 'Chuyển đổi AI doanh nghiệp', slug: 'chuyen-doi-ai-doanh-nghiep', icon: Settings2,
      description: 'Đưa AI vào công việc theo lộ trình thực tế, từ đào tạo đội ngũ đến triển khai sử dụng.',
      details: ['Xác định cơ hội ứng dụng', 'Hướng dẫn đội ngũ sử dụng', 'Đo kết quả và tiếp tục cải tiến'],
    },
  ],
};

type Group = keyof typeof serviceGroups;

export const ServiceExplorer = () => {
  const [activeGroup, setActiveGroup] = useState<Group>('services');
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const selectGroup = (group: Group) => {
    setActiveGroup(group);
    setOpenSlug(null);
  };

  return (
    <section id="services-overview" className="service-explorer" aria-labelledby="service-explorer-title">
      <div className="service-explorer__inner">
        <div className="service-explorer__intro">
          <h2 id="service-explorer-title">
            Giải pháp công nghệ giúp doanh nghiệp <span>tiến xa hơn.</span>
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
              {serviceGroups[activeGroup].map(({ title, slug, icon: Icon, description, details }, index) => {
                const expanded = openSlug === slug;
                const panelId = `service-explorer-detail-${slug}`;
                return (
                  <article className={`service-explorer__entry tone-${index % 6}${expanded ? ' is-open' : ''}`} key={slug}>
                    <button type="button" className="service-explorer__item" aria-expanded={expanded}
                      aria-controls={panelId} onClick={() => setOpenSlug(expanded ? null : slug)}>
                      <span className="service-explorer__icon-box"><Icon size={30} strokeWidth={1.9} aria-hidden="true" /></span>
                      <span className="service-explorer__item-copy"><strong>{title}</strong><small>{description}</small></span>
                      <span className="service-explorer__chevron"><ChevronDown size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                    </button>
                    <div id={panelId} className="service-explorer__detail" hidden={!expanded}>
                      <ul>{details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <img className="service-explorer__illustration" src="/service-illustrations/explorer-dashboard.png" alt="" aria-hidden="true" loading="lazy" />
    </section>
  );
};
