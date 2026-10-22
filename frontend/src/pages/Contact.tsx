import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Building2, Clock3, Facebook, FileText, Instagram, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck, UserRound, Zap } from 'lucide-react';
import './Contact.css';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

const CONTACT_INFO = [
  { icon: MapPin, title: 'Văn phòng chính', value: 'Lô LK3 - LK4, đường Lạc Long Quân, phường Kinh Bắc, tỉnh Bắc Ninh', action: 'Xem bản đồ', href: 'https://www.google.com/maps/search/?api=1&query=L%C3%B4%20LK3%20-%20LK4%2C%20%C4%91%C6%B0%E1%BB%9Dng%20L%E1%BA%A1c%20Long%20Qu%C3%A2n%2C%20ph%C6%B0%E1%BB%9Dng%20Kinh%20B%E1%BA%AFc%2C%20t%E1%BB%89nh%20B%E1%BA%AFc%20Ninh' },
  { icon: Phone, title: 'Hotline điện thoại', value: '0353.710.189', action: 'Gọi ngay', href: 'tel:0353710189' },
  { icon: Mail, title: 'Hòm thư hỗ trợ', value: 'igen.work99@gmail.com', action: 'Gửi email', href: 'mailto:igen.work99@gmail.com' },
  { icon: Clock3, title: 'Giờ làm việc', value: 'Thứ 2 - Thứ 6: 08:00 - 17:30', action: '', href: '' },
];

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get('service');
  const requestedIndustry = searchParams.get('industry');
  const interestMessage = requestedIndustry
    ? `Tôi muốn tìm hiểu thêm về giải pháp cho ngành ${requestedIndustry}.`
    : requestedService ? `Tôi quan tâm đến dịch vụ: ${requestedService}.` : '';

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    message: interestMessage,
  });
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (interestMessage) {
      setFormData((current) => ({ ...current, message: interestMessage }));
    }
  }, [interestMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const message = company.trim()
        ? `Doanh nghiệp / Ngành nghề: ${company.trim()}\n\n${formData.message}`
        : formData.message;
      const response = await axios.post(`${API_URL}/contacts`, { ...formData, message });
      if (response.data?.success) {
        setAlert({
          type: 'success',
          message: response.data.message || 'Gửi liên hệ thành công. Chúng tôi sẽ phản hồi sớm nhất!',
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
        setCompany('');
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string; errors?: string[] } } };
      const errMsg =
        err.response?.data?.errors?.[0] ||
        err.response?.data?.message ||
        'Không thể gửi liên hệ. Vui lòng kiểm tra kết nối API.';
      setAlert({ type: 'error', message: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      {alert?.type === 'success' && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={() => setAlert(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-2xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <span className="material-symbols-outlined mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
              check_circle
            </span>
            <h2 id="contact-success-title" className="text-xl font-bold text-ink">
              Gửi yêu cầu thành công
            </h2>
            <p className="mt-3 text-sm leading-6 text-body">{alert.message}</p>
            <button
              type="button"
              className="btn-primary mt-6 w-full py-3"
              onClick={() => setAlert(null)}
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}

      <section className="contact-hero">
        <div className="container-page contact-hero__layout">
          <div className="contact-hero__copy">
            <h1>Kết nối với <span>chúng tôi</span></h1>
            <p>Hãy để lại thông tin, đội ngũ chuyên gia AI của chúng tôi sẽ liên hệ tư vấn giải pháp phù hợp nhất.</p>
            <div className="contact-hero__highlights" aria-label="Lợi ích khi liên hệ">
              <div><span><MessageCircle aria-hidden="true" /></span><p><strong>Tư vấn giải pháp</strong><small>Phù hợp với nhu cầu</small></p></div>
              <div><span><Zap aria-hidden="true" /></span><p><strong>Phản hồi nhanh</strong><small>Liên hệ trực tiếp</small></p></div>
              <div><span><ShieldCheck aria-hidden="true" /></span><p><strong>Bảo mật thông tin</strong><small>Chỉ dùng để tư vấn</small></p></div>
            </div>
          </div>
          <div className="contact-hero__visual">
            <img src="/contact-consultant-2d.png" alt="Minh họa 2D nhân viên iGen hỗ trợ khách hàng" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="contact-content">
        <div className="container-page contact-content__grid">
          <aside className="contact-info-card">
            <h2>Thông tin liên hệ</h2>
            <p className="contact-info-card__intro">iGen Technology cam kết mang đến những sản phẩm công nghệ chất lượng hàng đầu. Bạn có thể ghé thăm văn phòng hoặc liên hệ trực tiếp qua hotline.</p>
            <ul className="contact-info-card__list">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                return <li key={item.title} className="contact-info-card__item">
                  <span className="contact-info-card__icon"><Icon size={21} strokeWidth={1.8} aria-hidden="true" /></span>
                  <div><strong>{item.title}</strong><p>{item.value}</p></div>
                  {item.href && <a href={item.href} target={item.href.startsWith('https:') ? '_blank' : undefined} rel={item.href.startsWith('https:') ? 'noopener noreferrer' : undefined}>{item.action} <ArrowRight size={14} aria-hidden="true" /></a>}
                </li>;
              })}
            </ul>
            <div className="contact-info-card__social">
              <h3>Kết nối với chúng tôi</h3>
              <div>
                <a href="https://www.facebook.com/share/1AP8araLS4/" target="_blank" rel="noopener noreferrer" aria-label="Facebook iGen"><Facebook size={19} aria-hidden="true" /></a>
                <a href="https://www.instagram.com/igen.technology1/" target="_blank" rel="noopener noreferrer" aria-label="Instagram iGen"><Instagram size={19} aria-hidden="true" /></a>
              </div>
            </div>
          </aside>

          <div className="contact-form-card">
            <div className="contact-form-card__heading">
              <div><h2>Gửi thông tin liên hệ</h2><p>Điền thông tin để chúng tôi chủ động liên hệ và tư vấn giải pháp phù hợp.</p></div>
              <Send size={39} strokeWidth={1.3} aria-hidden="true" />
            </div>
            <div className="contact-form-card__body">
              {alert?.type === 'error' && <div className="contact-form-card__error" role="alert">{alert.message}</div>}
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form__field"><label htmlFor="contact-name">Họ và Tên <span>*</span></label><div className="contact-form__input"><UserRound aria-hidden="true" /><input id="contact-name" type="text" name="name" autoComplete="name" required value={formData.name} onChange={handleChange} placeholder="Nhập họ và tên của bạn..." /></div></div>
                <div className="contact-form__field"><label htmlFor="contact-phone">Số điện thoại <span>*</span></label><div className="contact-form__input"><Phone aria-hidden="true" /><input id="contact-phone" type="tel" name="phone" autoComplete="tel" required value={formData.phone} onChange={handleChange} placeholder="09xx xxx xxx" /></div></div>
                <div className="contact-form__field"><label htmlFor="contact-email">Địa chỉ Email <span>*</span></label><div className="contact-form__input"><Mail aria-hidden="true" /><input id="contact-email" type="email" name="email" autoComplete="email" required value={formData.email} onChange={handleChange} placeholder="email@vidu.com" /></div></div>
                <div className="contact-form__field"><label htmlFor="contact-company">Doanh nghiệp / Ngành nghề</label><div className="contact-form__input"><Building2 aria-hidden="true" /><input id="contact-company" type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Nhập tên công ty hoặc ngành nghề..." /></div></div>
                <div className="contact-form__field contact-form__field--full"><label htmlFor="contact-message">Lời nhắn / Yêu cầu tư vấn <span>*</span></label><div className="contact-form__input contact-form__input--message"><FileText aria-hidden="true" /><textarea id="contact-message" name="message" rows={4} maxLength={500} required value={formData.message} onChange={handleChange} placeholder="Mô tả nhu cầu của bạn..." /></div><small className="contact-form__count">{formData.message.length}/500</small></div>
                <button type="submit" disabled={loading} className="contact-form__submit">{loading ? 'Đang gửi...' : <><Send size={17} aria-hidden="true" /> Gửi tin nhắn <ArrowRight size={17} aria-hidden="true" /></>}</button>
              </form>
              <p className="contact-form-card__privacy"><ShieldCheck size={15} aria-hidden="true" /> Thông tin của bạn chỉ được sử dụng để liên hệ tư vấn.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};
