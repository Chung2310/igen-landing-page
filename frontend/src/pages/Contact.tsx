import React, { useState } from 'react';
import axios from 'axios';
import { SilkBackground } from '../components/SilkBackground';
import { useRevealAnimations } from '../hooks/useRevealAnimations';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

const CONTACT_INFO = [
  { icon: 'location_on', title: 'Văn phòng chính', value: 'Lô LK3 - LK4, đường Lạc Long Quân, phường Kinh Bắc, tỉnh Bắc Ninh' },
  { icon: 'call', title: 'Hotline điện thoại', value: '0353.710.189' },
  { icon: 'mail', title: 'Hòm thư hỗ trợ', value: 'igen.work99@gmail.com' },
  { icon: 'schedule', title: 'Giờ làm việc', value: 'Thứ 2 - Thứ 6: 08:00 - 17:30' },
];

export const Contact: React.FC = () => {
  useRevealAnimations();

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const response = await axios.post(`${API_URL}/contacts`, formData);
      if (response.data?.success) {
        setAlert({
          type: 'success',
          message: response.data.message || 'Gửi liên hệ thành công. Chúng tôi sẽ phản hồi sớm nhất!',
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
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

  const inputClass =
    'w-full bg-surface-alt border border-line text-ink rounded-lg py-3 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted text-sm';

  return (
    <main className="flex flex-col w-full relative">

      {/* Hero section */}
      <section className="relative pt-40 pb-40 overflow-hidden">
        <SilkBackground />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="hero-reveal text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
            Kết nối với chúng tôi
          </h1>
          <p className="hero-reveal text-lg text-slate-600 max-w-2xl mx-auto">
            Hãy để lại thông tin, đội ngũ chuyên gia AI của chúng tôi sẽ liên hệ tư vấn giải pháp phù hợp nhất.
          </p>
        </div>
      </section>

      {/* Form and info split section */}
      <section className="section">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Info (Left: 5 cols) */}
            <div className="lg:col-span-5">
              <div className="reveal-text">
                <h2 className="text-3xl font-bold text-ink mb-6">Thông tin liên hệ</h2>
                <p className="text-body mb-10 leading-relaxed">
                  iGen Technology cam kết mang đến những sản phẩm công nghệ chất lượng hàng đầu. Bạn có thể ghé thăm văn phòng hoặc liên hệ trực tiếp qua hotline.
                </p>
              </div>

              <ul className="space-y-6 reveal-items-container">
                {CONTACT_INFO.map((item) => (
                  <li key={item.title} className="reveal-item flex items-start gap-4">
                    <span className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
                    </span>
                    <div>
                      <h4 className="text-ink font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-body text-sm">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form (Right: 7 cols) */}
            <div className="lg:col-span-7 card p-8 sm:p-10 reveal-text">
              <h3 className="text-2xl font-bold text-ink mb-6">Gửi thông điệp</h3>

              {alert && (
                <div
                  className={`p-4 rounded-xl border mb-6 text-sm flex items-center gap-3 ${
                    alert.type === 'success'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}
                >
                  <span className="material-symbols-outlined">
                    {alert.type === 'success' ? 'check_circle' : 'error'}
                  </span>
                  <span>{alert.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Họ và Tên</label>
                  <input
                    type="text" name="name" required value={formData.name} onChange={handleChange}
                    placeholder="Nhập họ và tên..." className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Địa chỉ Email</label>
                    <input
                      type="email" name="email" required value={formData.email} onChange={handleChange}
                      placeholder="email@vidu.com" className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Số điện thoại</label>
                    <input
                      type="text" name="phone" required value={formData.phone} onChange={handleChange}
                      placeholder="09xx xxx xxx" className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Lời nhắn / Yêu cầu tư vấn</label>
                  <textarea
                    name="message" rows={5} required value={formData.message} onChange={handleChange}
                    placeholder="Mô tả nhu cầu của bạn..." className={inputClass}
                  />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    <>
                      Gửi tin nhắn <span className="material-symbols-outlined text-base">send</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};
