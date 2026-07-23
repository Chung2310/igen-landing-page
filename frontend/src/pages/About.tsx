import React from 'react';
import { SilkBackground } from '../components/SilkBackground';
import { useRevealAnimations } from '../hooks/useRevealAnimations';

const PARTNERS = [
  {
    name: 'Công ty TNHH viện Quốc tế Luxdefa',
    logo: '/luxdefa.png',
    desc: 'Viện thẩm mỹ công nghệ cao đạt chuẩn quốc tế, nâng tầm trải nghiệm chăm sóc sắc đẹp.',
  },
  {
    name: 'Công ty TNHH sản xuất nhôm đúc',
    logo: '/sản xuất nhôm đúc.png',
    desc: 'Doanh nghiệp sản xuất và gia công cơ khí nhôm đúc mỹ thuật công nghệ cao, uy tín và chất lượng.',
  },
  {
    name: 'Công ty Cổ phần Sâm Ngọc Linh',
    logo: '/sâm ngọc linh.png',
    desc: 'Thương hiệu quốc gia phát triển và chế biến các sản phẩm từ sâm quý Ngọc Linh thượng hạng.',
  },
  {
    name: 'Công ty xe điện Kaishi Việt Nhật',
    logo: '/xe điện.png',
    desc: 'Nhà phân phối và lắp ráp phương tiện giao thông chạy điện thông minh Kaishi tiêu chuẩn Nhật Bản.',
  },
];

export const About: React.FC = () => {
  useRevealAnimations();

  return (
    <main className="flex flex-col w-full relative">

      {/* Hero section */}
      <section className="relative pt-40 pb-40 overflow-hidden">
        <SilkBackground />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="hero-reveal text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Về chúng tôi
          </h1>
          <p className="hero-reveal text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Kiến tạo hệ sinh thái AI thông minh, đồng hành cùng doanh nghiệp trong kỷ nguyên số.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="order-2 md:order-1 reveal-text">
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">Câu chuyện của chúng tôi</h2>
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
            <div className="order-1 md:order-2 reveal-text">
              <div className="relative w-full aspect-video rounded-card overflow-hidden shadow-card">
                <img
                  src="/1784790636892_7758341297950364477_7758341297950364477_c57e0eedbac222f2a8030ee453edc516.jpg"
                  alt="iGen Technology Office"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section section-alt">
        <div className="container-page">
          <div className="mb-14 text-center reveal-text">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
              Đối tác <span className="text-primary">chiến lược</span>
            </h2>
            <p className="text-body text-lg">Đồng hành cùng sự phát triển bền vững của các doanh nghiệp hàng đầu.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 reveal-items-container">
            {PARTNERS.map((partner) => (
              <div key={partner.name} className="card card-hover overflow-hidden flex flex-col group reveal-item">
                <div className="relative w-full aspect-[4/3] overflow-hidden flex-shrink-0 bg-surface-alt">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex flex-col flex-1 p-5 text-left">
                  <h4 className="text-sm md:text-base font-semibold text-ink mb-2 leading-snug group-hover:text-primary transition-colors">
                    {partner.name}
                  </h4>
                  <p className="text-muted text-xs leading-relaxed">{partner.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};
