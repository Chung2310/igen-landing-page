import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SilkBackground } from '../components/SilkBackground';
import { useRevealAnimations } from '../hooks/useRevealAnimations';

const pillars = [
  { icon: 'school', title: 'Học viện doanh nghiệp 1 người', desc: 'Biến AI thành đội ngũ nhân sự số của riêng bạn. Học cách tự động hóa marketing, bán hàng, chăm sóc khách hàng và vận hành để một người vẫn có thể quản lý và phát triển doanh nghiệp hiệu quả.' },
  { icon: 'business', title: 'Chuyển Đổi AI Doanh Nghiệp', desc: 'Không chỉ đào tạo, chúng tôi trực tiếp chuyển giao quy trình và giải pháp AI phù hợp với từng doanh nghiệp. Giúp tăng năng suất làm việc, giảm phụ thuộc vào nhân sự và tối ưu chi phí vận hành.' },
  { icon: 'settings', title: 'Nền Tảng AI Theo Yêu Cầu', desc: 'Mỗi doanh nghiệp có một bài toán riêng. Chúng tôi thiết kế và phát triển các ứng dụng AI chuyên biệt giúp tự động hóa công việc, quản lý dữ liệu và nâng cao hiệu quả vận hành theo đúng nhu cầu thực tế.' },
  { icon: 'campaign', title: 'AI Marketing & Vận Hành', desc: 'Ứng dụng AI vào marketing, truyền thông và quản trị doanh nghiệp nhằm tự động hóa quy trình, nâng cao hiệu quả làm việc và tạo lợi thế cạnh tranh bền vững trong kỷ nguyên số.' },
];

const heroStats = [
  { value: 5, prefix: '3–', suffix: 'x', label: 'Tăng năng suất nhân sự' },
  { value: 90, prefix: '', suffix: '%', label: 'Tiết kiệm chi phí vận hành' },
  { value: 1000000, prefix: '', suffix: '+', label: 'Doanh nghiệp mục tiêu đồng hành' },
];

const industries = [
  'Bán lẻ & TMĐT',
  'Sản xuất',
  'Giáo dục & Đào tạo',
  'F&B & Dịch vụ',
  'Bất động sản',
  'Logistics & Vận tải',
  'Tài chính & Kế toán',
  'Y tế & Sức khỏe',
];

const faqItems = [
  {
    q: 'Tích hợp AI có cần lập trình phức tạp không?',
    a: 'Không cần. iGen cung cấp các giải pháp đóng gói sẵn và hỗ trợ tích hợp API trực tiếp vào các hệ thống hiện có (như CRM, Website, Chat) nên việc triển khai rất nhanh chóng.'
  },
  {
    q: 'AI có thay thế hoàn toàn nhân sự của tôi không?',
    a: 'AI không thay thế con người, nhưng nhân sự biết sử dụng AI sẽ thay thế nhân sự không biết dùng AI. Mục tiêu của iGen là giúp nhân sự tăng năng suất từ 3 - 5 lần.'
  },
  {
    q: 'Chi phí triển khai giải pháp AI tại iGen như thế nào?',
    a: 'Chi phí được tối ưu theo quy mô và nhu cầu thực tế của từng doanh nghiệp. Chúng tôi có các gói giải pháp linh hoạt từ SMB đến Doanh nghiệp lớn để đảm bảo lợi nhuận đầu tư (ROI) tốt nhất.'
  },
  {
    q: 'Dữ liệu của doanh nghiệp tôi có được bảo mật không?',
    a: 'Có. iGen cam kết bảo mật thông tin tuyệt đối bằng hợp đồng pháp lý (NDA) và triển khai các giải pháp lưu trữ dữ liệu an toàn trên cloud hoặc server riêng biệt của khách hàng.'
  }
];

export const Home: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  useRevealAnimations();

  return (
    <main className="flex flex-col w-full relative">

      {/* Hero Section */}
      <section className="relative pt-40 pb-48 md:pt-48 md:pb-56 overflow-hidden">
        <SilkBackground />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
          <span className="hero-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            Igen Technology
          </span>
          <h1 className="hero-reveal text-4xl md:text-6xl font-extrabold tracking-tight text-ink leading-[1.1] mb-6">
            Tiên phong kỷ nguyên<br className="hidden md:block" /> doanh nghiệp AI
          </h1>
          <p className="hero-reveal text-lg md:text-xl text-body font-normal leading-relaxed max-w-2xl">
            Tiên phong kiến tạo hệ sinh thái AI và giải pháp chuyển đổi số cho doanh nghiệp Việt.
          </p>
          <div className="hero-reveal mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/solutions" className="btn-primary shadow-lg px-7 py-3.5">
              Xem giải pháp <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
            <Link to="/contact" className="btn-secondary px-7 py-3.5">
              Liên hệ tư vấn
            </Link>
          </div>

          {/* Hero stats */}
          <div className="hero-reveal mt-16 grid grid-cols-3 gap-4 md:gap-12 w-full max-w-2xl">
            {heroStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-4xl font-extrabold text-ink mb-1">
                  <span
                    className="stat-number"
                    data-value={s.value}
                    data-prefix={s.prefix}
                    data-suffix={s.suffix}
                  >
                    {s.prefix + s.value.toLocaleString('vi-VN') + s.suffix}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-body leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Strip */}
      <section className="py-12 bg-white border-b border-line">
        <div className="container-page">
          <p className="text-center text-muted text-xs font-semibold uppercase tracking-widest mb-7 reveal-text">
            Đồng hành cùng doanh nghiệp trong nhiều lĩnh vực
          </p>
          <div className="flex flex-wrap justify-center gap-3 reveal-items-container">
            {industries.map((name) => (
              <span
                key={name}
                className="reveal-item px-4 py-2 rounded-full border border-line bg-surface-alt text-body text-sm font-medium hover:border-primary/30 hover:text-primary transition-colors duration-300"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="reveal-text">
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">Tầm nhìn chiến lược</h2>
              <div className="space-y-4 text-body leading-relaxed">
                <p>
                  iGen Technology được thành lập với sứ mệnh xây dựng Hệ sinh thái AI toàn diện dành cho doanh nghiệp hiện đại. Chúng tôi giúp cá nhân và doanh nghiệp ứng dụng AI vào mọi hoạt động cốt lõi, từ vận hành, quản trị, marketing, bán hàng đến chăm sóc khách hàng và phát triển sản phẩm.
                </p>
                <p>
                  Không chỉ cung cấp công nghệ, iGen Technology tập trung đào tạo, chuyển giao và triển khai các giải pháp AI thực tiễn, giúp doanh nghiệp nâng cao năng suất, tối ưu chi phí và xây dựng mô hình vận hành thông minh.
                </p>
                <p>
                  Với khát vọng lan tỏa giá trị của AI đến cộng đồng doanh nghiệp Việt Nam, iGen Technology đặt mục tiêu đồng hành cùng 1.000.000 doanh nghiệp trên toàn quốc trong hành trình hiểu đúng, ứng dụng hiệu quả và từng bước xây dựng doanh nghiệp vận hành bằng AI.
                </p>
              </div>
            </div>
            <div className="reveal-text">
              <div className="relative w-full aspect-video rounded-card overflow-hidden shadow-card">
                <img
                  src="/ceo.jpeg"
                  alt="iGen Technology Strategic Vision"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section bg-white border-y border-line">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image Column */}
            <div className="lg:col-span-5 reveal-text order-2 lg:order-1 group">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-card border border-line">
                <img
                  src="/workspace.jpg"
                  alt="Không gian làm việc công nghệ iGen"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-all duration-[1000ms] ease-out group-hover:scale-105 group-hover:rotate-[0.5deg]"
                />
              </div>
            </div>

            {/* Text Column */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="reveal-text">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                  Sự khác biệt vượt trội
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">
                  Tại sao doanh nghiệp lựa chọn <span className="text-primary">iGen Technology?</span>
                </h2>
                <p className="text-body text-base leading-relaxed mb-8">
                  Chúng tôi không chỉ cung cấp công nghệ AI tiên tiến, mà mang lại sự đột phá về hiệu suất vận hành thực tế và sự đồng hành dài hạn giúp đối tác tự tin làm chủ công nghệ.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 reveal-items-container">
                <div className="reveal-item flex gap-4 p-4 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-card transition-all duration-300 hover:-translate-y-1 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary mt-1 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <span className="material-symbols-outlined text-xl">verified</span>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-ink mb-1.5">Giải pháp Thực tiễn &amp; Đo lường được</h4>
                    <p className="text-body text-sm leading-relaxed">
                      Công nghệ AI được tinh chỉnh và tích hợp trực tiếp vào luồng công việc hàng ngày của từng phòng ban, đảm bảo mang lại hiệu quả năng suất rõ rệt có thể đo lường ngay qua báo cáo số liệu.
                    </p>
                  </div>
                </div>

                <div className="reveal-item flex gap-4 p-4 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-card transition-all duration-300 hover:-translate-y-1 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary mt-1 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <span className="material-symbols-outlined text-xl">group_work</span>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-ink mb-1.5">Đồng hành &amp; Chuyển giao Trực tiếp</h4>
                    <p className="text-body text-sm leading-relaxed">
                      iGen sát cánh đào tạo trực tiếp cho đội ngũ nhân viên của bạn từ tư duy đến kỹ năng vận hành công cụ, cam kết đồng hành cho tới khi nhân sự của doanh nghiệp làm chủ hoàn toàn hệ thống.
                    </p>
                  </div>
                </div>

                <div className="reveal-item flex gap-4 p-4 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-card transition-all duration-300 hover:-translate-y-1 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary mt-1 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <span className="material-symbols-outlined text-xl">trending_down</span>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-ink mb-1.5">Tối ưu Chi phí Vận hành</h4>
                    <p className="text-body text-sm leading-relaxed">
                      Giúp tự động hóa các khâu sản xuất nội dung marketing, thiết kế hình ảnh và phản hồi CSKH, từ đó tiết kiệm tới 70-90% chi phí vận hành và tối giản bộ máy nhân sự.
                    </p>
                  </div>
                </div>

                <div className="reveal-item flex gap-4 p-4 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-card transition-all duration-300 hover:-translate-y-1 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary mt-1 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <span className="material-symbols-outlined text-xl">security</span>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-ink mb-1.5">Bảo mật An toàn Tuyệt đối</h4>
                    <p className="text-body text-sm leading-relaxed">
                      Toàn bộ dữ liệu tri thức của doanh nghiệp được lưu trữ bảo mật trên hạ tầng đám mây an toàn hoặc máy chủ nội bộ theo chuẩn bảo mật nghiêm ngặt cùng các điều khoản NDA pháp lý.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Showcase */}
      <section className="section section-alt">
        <div className="container-page">
          <div className="text-center mb-14 reveal-text">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
              Hệ sinh thái <span className="text-primary">Giải pháp AI</span>
            </h2>
            <p className="text-body max-w-xl mx-auto">
              Trải nghiệm dịch vụ tối ưu hiệu suất vận hành doanh nghiệp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-items-container">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="card card-hover p-8 flex flex-col reveal-item group hover:border-primary/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                  <span className="material-symbols-outlined text-2xl text-primary group-hover:text-white transition-colors duration-300">{pillar.icon}</span>
                </div>
                <h4 className="text-lg font-semibold text-ink mb-2">{pillar.title}</h4>
                <p className="text-body text-sm leading-relaxed flex-1">{pillar.desc}</p>
                <Link to="/solutions" className="link-arrow mt-5">
                  Tìm hiểu thêm <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="section bg-surface-alt border-b border-line">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text Column */}
            <div className="lg:col-span-7 reveal-text">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                Lộ trình chuyển đổi
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">
                Quy trình triển khai <span className="text-primary">Chuyển đổi AI</span>
              </h2>
              <p className="text-body text-base leading-relaxed mb-10">
                Các bước thiết kế bài bản, chuyên nghiệp giúp doanh nghiệp chuyển mình bằng công nghệ AI một cách an toàn, nhanh chóng và đạt tỷ lệ ROI tốt nhất.
              </p>

              {/* Vertical Timeline Steps */}
              <div className="space-y-8 relative before:absolute before:top-4 before:bottom-4 before:left-[22px] before:w-[2px] before:bg-line reveal-steps-container">
                {/* Step 1 */}
                <div className="relative flex gap-6 pl-1.5 reveal-step group hover:bg-white hover:shadow-md hover:border-primary/20 border border-transparent p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md shadow-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-dark">
                    01
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-ink mb-1.5">Khảo sát hiện trạng &amp; Phân tích cơ hội</h4>
                    <p className="text-body text-sm leading-relaxed">
                      Đội ngũ chuyên gia công nghệ của iGen trực tiếp làm việc, khảo sát quy trình vận hành và nhân sự của doanh nghiệp để xác định chính xác các điểm nghẽn có thể giải quyết hiệu quả bằng trí tuệ nhân tạo.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex gap-6 pl-1.5 reveal-step group hover:bg-white hover:shadow-md hover:border-primary/20 border border-transparent p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md shadow-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-dark">
                    02
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-ink mb-1.5">Thiết kế Giải pháp &amp; Kiến trúc hệ thống</h4>
                    <p className="text-body text-sm leading-relaxed">
                      Chúng tôi lên bản vẽ thiết kế luồng tự động hóa, lựa chọn mô hình AI tối ưu nhất (như ChatGPT, các mô hình ngôn ngữ lớn LLMs nội bộ hoặc thị giác máy tính) và tích hợp vào quy trình vận hành SOP hiện tại.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex gap-6 pl-1.5 reveal-step group hover:bg-white hover:shadow-md hover:border-primary/20 border border-transparent p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md shadow-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-dark">
                    03
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-ink mb-1.5">Tích hợp thực tế &amp; Đào tạo chuyển giao</h4>
                    <p className="text-body text-sm leading-relaxed">
                      Triển khai kết nối API, tích hợp các công cụ AI vào hệ thống làm việc của doanh nghiệp, đồng thời trực tiếp đứng lớp hướng dẫn, cầm tay chỉ việc giúp nhân viên thực hành và sử dụng công cụ thành thạo.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex gap-6 pl-1.5 reveal-step group hover:bg-white hover:shadow-md hover:border-primary/20 border border-transparent p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md shadow-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-dark">
                    04
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-ink mb-1.5">Đồng hành vận hành &amp; Liên tục cải tiến</h4>
                    <p className="text-body text-sm leading-relaxed">
                      iGen cam kết sát cánh cùng doanh nghiệp kiểm soát và duy trì tính ổn định của hệ thống trong suốt thời gian đầu, liên tục tinh chỉnh các phản hồi của AI và nâng cấp tính năng mới nhằm tối đa hóa hiệu quả hoạt động.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-5 reveal-text group">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-card border border-line">
                <img
                  src="/ai-process.jpg"
                  alt="Quy trình chuyển đổi AI"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-all duration-[1000ms] ease-out group-hover:scale-105 group-hover:rotate-[0.5deg]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container-page">
          <div className="text-center mb-14 reveal-text">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
              Câu hỏi <span className="text-primary">thường gặp</span>
            </h2>
            <p className="text-body max-w-xl mx-auto">
              Giải đáp các thắc mắc phổ biến về việc ứng dụng Trí tuệ Nhân tạo vào vận hành doanh nghiệp.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 reveal-items-container">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="border border-line rounded-2xl bg-white overflow-hidden transition-all duration-300 reveal-item shadow-sm">
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-ink hover:text-primary transition-colors focus:outline-none"
                  >
                    <span>{item.q}</span>
                    <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-muted'}`}>
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-6 text-body text-sm leading-relaxed bg-surface-alt border-t border-line">
                        {item.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-page">
          <div className="reveal-text relative bg-gradient-to-br from-white via-[rgba(0,255,255,0.12)] to-white border border-line rounded-3xl px-8 py-16 md:py-20 text-center overflow-hidden shadow-card">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">Sẵn sàng chuyển đổi cùng AI?</h2>
              <p className="text-body mb-8">
                Để iGen Technology đồng hành cùng doanh nghiệp của bạn trên hành trình ứng dụng AI hiệu quả.
              </p>
              <Link to="/contact" className="btn-primary px-7 py-3.5">
                Bắt đầu ngay <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};
