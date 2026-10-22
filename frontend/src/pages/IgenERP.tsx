import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './IgenERP.css';

const services = [
  { icon: 'travel_explore', title: 'Tư vấn lộ trình', description: 'Xác định vấn đề cần giải quyết, phân hệ ưu tiên và kế hoạch triển khai.' },
  { icon: 'deployed_code', title: 'Thiết kế & phát triển', description: 'Xây dựng luồng nghiệp vụ phù hợp với cách doanh nghiệp vận hành.' },
  { icon: 'hub', title: 'Tích hợp dữ liệu', description: 'Kết nối hệ thống đang dùng và chuẩn bị dữ liệu cho quy trình mới.' },
  { icon: 'monitoring', title: 'Đồng hành tối ưu', description: 'Hướng dẫn sử dụng, cải tiến và mở rộng khi nhu cầu thay đổi.' },
];

const modules = [
  { icon: 'school', title: 'Quản lý học viên', description: 'Hồ sơ, lớp học, lịch học và quá trình đào tạo.' },
  { icon: 'engineering', title: 'Quản lý lao động', description: 'Hồ sơ, hợp đồng, chấm công và phân công.' },
  { icon: 'contacts', title: 'CRM', description: 'Thông tin, tương tác và chăm sóc khách hàng.' },
  { icon: 'point_of_sale', title: 'Bán hàng POS', description: 'Giao dịch, đơn hàng, thanh toán và báo cáo.' },
];

const industries = [
  { icon: 'school', title: 'Giáo dục', description: 'Học viên và hoạt động đào tạo.' },
  { icon: 'engineering', title: 'Nhân lực', description: 'Người lao động và điều phối.' },
  { icon: 'storefront', title: 'Bán lẻ', description: 'Điểm bán và khách hàng.' },
  { icon: 'factory', title: 'Sản xuất', description: 'Nguồn lực và tiến độ.' },
  { icon: 'local_shipping', title: 'Logistics', description: 'Đơn hàng và vận hành.' },
  { icon: 'business_center', title: 'Dịch vụ', description: 'Khách hàng và công việc.' },
];

const benefits = [
  { title: 'Thông tin liền mạch', description: 'Các nhóm cùng làm việc trên dữ liệu được tổ chức rõ ràng.' },
  { title: 'Dễ theo dõi', description: 'Người quản lý nắm trạng thái công việc theo từng nghiệp vụ.' },
  { title: 'Sẵn sàng mở rộng', description: 'Bổ sung phân hệ khi quy mô và nhu cầu của doanh nghiệp thay đổi.' },
];

const process = [
  { number: '01', title: 'Khảo sát', description: 'Hiểu quy trình và mục tiêu.' },
  { number: '02', title: 'Thiết kế', description: 'Thống nhất phạm vi triển khai.' },
  { number: '03', title: 'Triển khai', description: 'Xây dựng, kết nối và kiểm thử.' },
  { number: '04', title: 'Đồng hành', description: 'Hướng dẫn và tiếp tục cải tiến.' },
];

export const IgenERP = () => {
  useEffect(() => {
    document.title = 'Giải pháp iGen ERP | iGen Technology';
  }, []);

  return (
    <main className="erp-page">
      <section className="erp-hero" aria-labelledby="erp-title">
        <div className="container-page erp-hero-layout">
          <div className="erp-hero-copy">
            <nav aria-label="Đường dẫn trang" className="erp-breadcrumb">
              <Link to="/">Trang chủ</Link><span>/</span><Link to="/solutions">Dịch vụ</Link><span>/</span><strong>ERP</strong>
            </nav>
            <h1 id="erp-title">ERP phát triển theo cách <span>doanh nghiệp vận hành</span></h1>
            <p>iGen ERP kết nối dữ liệu và quy trình trên một nền tảng. Bắt đầu từ nghiệp vụ cần thiết, doanh nghiệp có thể mở rộng phân hệ theo ngành nghề và từng giai đoạn phát triển.</p>
            <div className="erp-hero-actions">
              <Link className="erp-button" to="/contact?service=iGen%20ERP">Trao đổi giải pháp <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></Link>
              <a href="#erp-services" className="erp-inline-link">Khám phá dịch vụ <span className="material-symbols-outlined" aria-hidden="true">south</span></a>
            </div>
          </div>
          <figure className="erp-hero-visual">
            <img src="/hero-app-devices-stats.png" alt="Minh họa giải pháp ERP trên ba thiết bị" width="1659" height="948" />
          </figure>
        </div>
      </section>

      <section className="erp-pillars" aria-label="Định hướng iGen ERP">
        <div className="container-page erp-pillars-grid">
          <div><span>01</span><strong>Theo ngành nghề</strong></div>
          <div><span>02</span><strong>Phân hệ linh hoạt</strong></div>
          <div><span>03</span><strong>Dữ liệu kết nối</strong></div>
          <div><span>04</span><strong>Mở rộng theo nhu cầu</strong></div>
        </div>
      </section>

      <section id="erp-services" className="erp-section">
        <div className="container-page">
          <div className="erp-heading">
            <h2>Từ bài toán vận hành đến hệ thống phù hợp</h2>
            <p>Chọn đúng phạm vi, triển khai từng bước và tiếp tục cải tiến khi doanh nghiệp phát triển.</p>
          </div>
          <div className="erp-services-grid">
            {services.map((service) => (
              <Link className="erp-service-card" to={'/contact?service=' + encodeURIComponent(service.title)} key={service.title}>
                <span className="material-symbols-outlined erp-service-icon" aria-hidden="true">{service.icon}</span>
                <h3>{service.title}<span className="material-symbols-outlined" aria-hidden="true">north_east</span></h3>
                <p>{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="erp-section erp-section-soft">
        <div className="container-page">
          <div className="erp-heading">
            <h2>Bắt đầu từ nghiệp vụ bạn cần</h2>
            <p>Đây là một số phân hệ đang được giới thiệu. iGen tiếp tục phát triển chức năng và quy trình riêng theo từng dự án.</p>
          </div>
          <div className="erp-modules-grid">
            {modules.map((module) => (
              <article className="erp-module-card" key={module.title}>
                <span className="material-symbols-outlined" aria-hidden="true">{module.icon}</span>
                <h3>{module.title}</h3><p>{module.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="erp-section erp-industries-section">
        <div className="container-page erp-industries-layout">
          <div className="erp-industries-copy">
            <h2>Mỗi ngành có một cách vận hành</h2>
            <p>iGen xác định dữ liệu, vai trò và quy trình cần thiết trước khi đề xuất phân hệ. Những lĩnh vực dưới đây là ví dụ định hướng; phạm vi thực tế được thống nhất theo từng doanh nghiệp.</p>
            <Link className="erp-inline-link" to="/contact?service=iGen%20ERP">Trao đổi về ngành của bạn <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></Link>
          </div>
          <div className="erp-industries-grid">
            {industries.map((industry) => (
              <article className="erp-industry-card" key={industry.title}>
                <span className="material-symbols-outlined" aria-hidden="true">{industry.icon}</span>
                <div><h3>{industry.title}</h3><p>{industry.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="erp-section erp-benefits-section">
        <div className="container-page erp-benefits-layout">
          <div className="erp-benefits-intro">
            <h2>Rõ thông tin. Dễ phối hợp. Linh hoạt phát triển.</h2>
            <img src="/brand-icon.png" alt="" aria-hidden="true" loading="lazy" className="erp-brand-watermark" />
          </div>
          <div className="erp-benefits-timeline">
            {benefits.map((benefit) => (
              <div className="erp-benefit-item" key={benefit.title}><h3>{benefit.title}</h3><p>{benefit.description}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="erp-section erp-process-section">
        <div className="container-page">
          <div className="erp-heading">
            <h2>Một lộ trình rõ ràng, từng bước có mục tiêu</h2>
          </div>
          <div className="erp-process-grid">
            {process.map((step) => <div className="erp-process-card" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></div>)}
          </div>
        </div>
      </section>

      <section className="erp-closing">
        <div className="container-page erp-closing-layout">
          <div><h2>ERP phù hợp bắt đầu từ việc hiểu doanh nghiệp</h2><p>Chia sẻ quy trình hiện tại. iGen sẽ cùng bạn xác định bước triển khai phù hợp.</p></div>
          <Link className="erp-button" to="/contact?service=iGen%20ERP">Yêu cầu tư vấn <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></Link>
        </div>
      </section>
    </main>
  );
};
