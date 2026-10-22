import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, GraduationCap, Megaphone, Settings, TrendingUp } from 'lucide-react';
import { AIProcessorHero } from '../components/AIProcessorHero';
import { ServiceExplorer } from '../components/ServiceExplorer';
import { IndustriesMarquee } from '../components/IndustriesMarquee';
import { useRevealAnimations } from '../hooks/useRevealAnimations';
import './HomePillars.css';

const pillars = [
  {
    icon: TrendingUp,
    title: 'Tư vấn & Chuyển đổi Số',
    desc: 'Đánh giá cách vận hành và lập lộ trình số hóa phù hợp.',
    slug: 'tu-van-chuyen-doi-so',
  },
  {
    icon: Megaphone,
    title: 'AI Marketing & Vận Hành',
    desc: 'Dùng AI để làm nội dung, chăm sóc khách hàng và giảm việc lặp lại.',
    slug: 'ai-marketing-van-hanh',
  },
  {
    icon: Settings,
    title: 'Nền Tảng AI Theo Yêu Cầu',
    desc: 'Xây dựng công cụ AI theo quy trình và dữ liệu riêng của doanh nghiệp.',
    slug: 'nen-tang-ai-theo-yeu-cau',
  },
  {
    icon: GraduationCap,
    title: 'Học viện doanh nghiệp 1 người',
    desc: 'Học cách dùng AI cho marketing, bán hàng và công việc hằng ngày.',
    slug: 'hoc-vien-doanh-nghiep-1-nguoi',
  },
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
  const location = useLocation();

  useEffect(() => {
    if (location.hash !== '#home-pillars') return;
    const frame = requestAnimationFrame(() => document.getElementById('home-pillars')?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, [location.hash]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  useRevealAnimations();

  return (
    <main className="flex flex-col w-full relative">
      <AIProcessorHero />



      {/* Industries Strip */}
      <IndustriesMarquee />

      <ServiceExplorer />

      {/* Vision Section */}
      <section className="section">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="reveal-text">
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">Tầm nhìn chiến lược</h2>
              <div className="space-y-4 text-body leading-relaxed">
                <p>
                  iGen xây dựng hệ sinh thái AI giúp doanh nghiệp ứng dụng công nghệ vào vận hành, quản trị, marketing và chăm sóc khách hàng.
                </p>
                <p>
                  Qua giải pháp thực tiễn, đào tạo và chuyển giao, chúng tôi hướng tới nâng cao năng suất, tối ưu chi phí và đồng hành cùng 1.000.000 doanh nghiệp Việt Nam trên hành trình chuyển đổi số.
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
            <div className="lg:col-span-5 xl:col-span-4 reveal-text order-2 lg:order-1 group">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-card border border-line">
                <img
                  src="/1783918018405_7758341297950364477_7758341297950364477_227cf57779e2d731342416ffd416fafc.jpg"
                  alt="Không gian làm việc công nghệ iGen"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-all duration-[1000ms] ease-out group-hover:scale-105 group-hover:rotate-[0.5deg]"
                />
              </div>
            </div>

            {/* Text Column */}
            <div className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2">
              <div className="reveal-text">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink mb-6 xl:whitespace-nowrap">
                  Vì sao nên chọn <span className="text-primary">iGen Technology?</span>
                </h2>
                <p className="text-body text-base leading-relaxed mb-8">
                  Giải pháp AI phù hợp với công việc thực tế, có hướng dẫn triển khai và hỗ trợ lâu dài.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 reveal-items-container">
                <div className="igen-rainbow-border reveal-item flex gap-4 p-4 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-card transition-all duration-300 hover:-translate-y-1 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary mt-1 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <span className="material-symbols-outlined text-xl">verified</span>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-ink mb-1.5">Hiệu quả rõ ràng</h4>
                    <p className="text-body text-sm leading-relaxed">
                      Tích hợp AI vào quy trình hiện có và theo dõi kết quả bằng số liệu.
                    </p>
                  </div>
                </div>

                <div className="igen-rainbow-border reveal-item flex gap-4 p-4 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-card transition-all duration-300 hover:-translate-y-1 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary mt-1 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <span className="material-symbols-outlined text-xl">group_work</span>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-ink mb-1.5">Đào tạo trực tiếp</h4>
                    <p className="text-body text-sm leading-relaxed">
                      Hướng dẫn đội ngũ sử dụng và vận hành công cụ trong công việc hằng ngày.
                    </p>
                  </div>
                </div>

                <div className="igen-rainbow-border reveal-item flex gap-4 p-4 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-card transition-all duration-300 hover:-translate-y-1 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary mt-1 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <span className="material-symbols-outlined text-xl">trending_down</span>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-ink mb-1.5">Tiết kiệm chi phí</h4>
                    <p className="text-body text-sm leading-relaxed">
                      Tự động hóa việc lặp lại để giảm thời gian và chi phí vận hành.
                    </p>
                  </div>
                </div>

                <div className="igen-rainbow-border reveal-item flex gap-4 p-4 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-card transition-all duration-300 hover:-translate-y-1 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary mt-1 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <span className="material-symbols-outlined text-xl">security</span>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-ink mb-1.5">Bảo vệ dữ liệu</h4>
                    <p className="text-body text-sm leading-relaxed">
                      Chọn cách lưu trữ và phân quyền phù hợp với nhu cầu của doanh nghiệp.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Showcase */}
      <section className="home-pillars" id="home-pillars" aria-labelledby="home-pillars-title">
        <div className="home-pillars__inner">
          <div className="home-pillars__heading reveal-text">
            <h2 id="home-pillars-title">Hệ sinh thái <span>Giải pháp AI</span></h2>
            <p>Giải pháp AI cho từng nhu cầu của doanh nghiệp.</p>
          </div>
          <div className="home-pillars__grid reveal-items-container">
            {pillars.map(({ icon: Icon, title, desc, slug }) => (
              <article className="home-pillars__card reveal-item" key={slug}>
                <span className="home-pillars__icon"><Icon size={32} strokeWidth={2} aria-hidden="true" /></span>
                <Icon className="home-pillars__watermark" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link to={`/solutions/${slug}`} aria-label={`Tìm hiểu thêm về ${title}`}>
                  Tìm hiểu thêm
                  <span className="home-pillars__arrow"><ArrowRight size={18} aria-hidden="true" /></span>
                </Link>
              </article>
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
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">
                Quy trình <span className="text-primary">triển khai AI</span>
              </h2>
              <p className="text-body text-base leading-relaxed mb-10">
                Bốn bước từ tìm hiểu nhu cầu đến đưa AI vào công việc hằng ngày.
              </p>

              {/* Vertical Timeline Steps */}
              <div className="space-y-8 relative before:absolute before:top-4 before:bottom-4 before:left-[22px] before:w-[2px] before:bg-line reveal-steps-container">
                {/* Step 1 */}
                <div className="igen-rainbow-border relative flex gap-6 pl-1.5 reveal-step group hover:bg-white hover:shadow-md hover:border-primary/20 border border-transparent p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md shadow-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-dark">
                    01
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-ink mb-1.5">Khảo sát nhu cầu</h4>
                    <p className="text-body text-sm leading-relaxed">
                      Tìm hiểu quy trình hiện tại và xác định việc AI có thể hỗ trợ.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="igen-rainbow-border relative flex gap-6 pl-1.5 reveal-step group hover:bg-white hover:shadow-md hover:border-primary/20 border border-transparent p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md shadow-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-dark">
                    02
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-ink mb-1.5">Thiết kế giải pháp</h4>
                    <p className="text-body text-sm leading-relaxed">
                      Chọn công cụ, cách kết nối dữ liệu và kế hoạch triển khai phù hợp.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="igen-rainbow-border relative flex gap-6 pl-1.5 reveal-step group hover:bg-white hover:shadow-md hover:border-primary/20 border border-transparent p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md shadow-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-dark">
                    03
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-ink mb-1.5">Triển khai và đào tạo</h4>
                    <p className="text-body text-sm leading-relaxed">
                      Tích hợp AI vào hệ thống và hướng dẫn đội ngũ sử dụng.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="igen-rainbow-border relative flex gap-6 pl-1.5 reveal-step group hover:bg-white hover:shadow-md hover:border-primary/20 border border-transparent p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md shadow-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-dark">
                    04
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-ink mb-1.5">Theo dõi và cải tiến</h4>
                    <p className="text-body text-sm leading-relaxed">
                      Theo dõi kết quả, xử lý vướng mắc và điều chỉnh khi cần.
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
                <div key={index} className={`igen-rainbow-border border border-line rounded-2xl bg-white overflow-hidden transition-all duration-300 reveal-item shadow-sm${isOpen ? ' is-active' : ''}`}>
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
