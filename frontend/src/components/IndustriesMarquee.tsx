import './IndustriesMarquee.css';
import { IndustryLineIcon } from './IndustryLineIcon';

const industries = [
  { name: 'Bán lẻ & TMĐT', icon: 'retail' },
  { name: 'Sản xuất', icon: 'manufacturing' },
  { name: 'Giáo dục & Đào tạo', icon: 'education' },
  { name: 'F&B & Dịch vụ', icon: 'hospitality' },
  { name: 'Bất động sản', icon: 'property' },
  { name: 'Logistics & Vận tải', icon: 'logistics' },
  { name: 'Tài chính & Kế toán', icon: 'finance' },
  { name: 'Y tế & Sức khỏe', icon: 'healthcare' },
] as const;

export function IndustriesMarquee() {
  return (
    <section className="industries-marquee" aria-label="Các lĩnh vực iGen đồng hành">
      <p className="industries-marquee__heading">
        Đồng hành cùng doanh nghiệp trong nhiều lĩnh vực
      </p>
      <div className="industries-marquee__viewport">
        <div className="industries-marquee__track">
          {[0, 1].map((copy) => (
            <div className="industries-marquee__group" key={copy} aria-hidden={copy === 1}>
              {industries.map(({ name, icon }) => (
                <span className="industries-marquee__card" key={name}>
                  <IndustryLineIcon type={icon} />
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
