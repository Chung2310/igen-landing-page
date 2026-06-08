import React, { useEffect, useState } from 'react';
import axios from 'axios';
import gsap from 'gsap';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    gsap.to('.reveal-hero-text', {
      y: 0,
      duration: 1.4,
      ease: 'power4.out',
      delay: 0.2,
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        setFormData({ name: '', email: '', phone: '', message: '' }); // reset form
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string; errors?: string[] } } };
      const errMsg =
        err.response?.data?.errors?.[0] ||
        err.response?.data?.message ||
        'Không thể gửi liên hệ. Vui lòng kiểm tra kết nối API.';
      setAlert({
        type: 'error',
        message: errMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col w-full relative z-10">
      
      {/* Hero section */}
      <section className="relative flex flex-col items-center justify-center min-h-[50vh] overflow-hidden pt-32 dof-target-section">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-transparent to-transparent z-0"></div>
        <div className="absolute inset-0 grid-bg-dark opacity-20 z-0"></div>
        
        <div className="relative z-20 max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
            <div className="overflow-hidden">
              <span className="block translate-y-full reveal-hero-text bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
                Kết Nối Với Chúng Tôi
              </span>
            </div>
          </h1>
          <p className="text-lg text-gray-400 font-light max-w-2xl">
            Hãy để lại thông tin, đội ngũ chuyên gia AI của chúng tôi sẽ liên hệ tư vấn giải pháp phù hợp nhất.
          </p>
        </div>
      </section>

      {/* Form and info split section */}
      <section className="py-20 relative z-20 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Info grid (Left: 5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-display font-bold text-white mb-8">Thông tin liên hệ</h2>
                <p className="text-gray-400 mb-10 leading-relaxed">
                  iGen Technology cam kết mang đến những sản phẩm công nghệ chất lượng hàng đầu. Bạn có thể ghé thăm văn phòng hoặc liên hệ trực tiếp qua hotline.
                </p>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary text-2xl mt-1">location_on</span>
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Văn phòng chính</h4>
                      <p className="text-gray-400 text-sm">Lô LK3 - LK4, đường Lạc Long Quân, phường Kinh Bắc, tỉnh Bắc Ninh</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary text-2xl mt-1">call</span>
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Hotline điện thoại</h4>
                      <p className="text-gray-400 text-sm">0353720189</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary text-2xl mt-1">mail</span>
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Hòm thư hỗ trợ</h4>
                      <p className="text-gray-400 text-sm">igen.work99@gmail.com</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary text-2xl mt-1">schedule</span>
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Giờ làm việc</h4>
                      <p className="text-gray-400 text-sm">Thứ 2 - Thứ 6: 08:00 - 17:30</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Form sheet (Right: 7 cols) */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-card">
              <h3 className="text-2xl font-display font-bold text-white mb-6">Gửi thông điệp</h3>
              
              {alert && (
                <div
                  className={`p-4 rounded-xl border mb-6 text-sm flex items-center gap-3 animate-fade-in ${
                    alert.type === 'success'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}
                >
                  <span className="material-symbols-outlined">
                    {alert.type === 'success' ? 'check_circle' : 'error'}
                  </span>
                  <span>{alert.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên..."
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600 text-sm interactable"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">
                      Địa chỉ Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@vidu.com"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600 text-sm interactable"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="09xx xxx xxx"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600 text-sm interactable"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">
                    Lời nhắn / Yêu cầu tư vấn
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mô tả nhu cầu của bạn..."
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600 text-sm interactable"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-liquid w-full interactable py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold uppercase tracking-wider shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    <>
                      Gửi tin nhắn <span className="material-symbols-outlined text-sm">send</span>
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
