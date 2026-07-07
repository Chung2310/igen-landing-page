import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-surface-alt border-t border-line pt-16 pb-10">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Column 1: Intro */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/logo.png"
                alt="iGen Tech Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="text-ink font-bold text-xl tracking-tight">iGen Technology</span>
            </div>
            <p className="text-body text-sm leading-relaxed max-w-md">
              Tiên phong kiến tạo hệ sinh thái AI tại Việt Nam, mang đến giải pháp đột phá cho doanh nghiệp.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="font-semibold text-ink mb-5 text-sm">Khám phá</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Trang chủ' },
                { to: '/solutions', label: 'Giải pháp' },
                { to: '/about', label: 'Về chúng tôi' },
                { to: '/news', label: 'Tin tức' },
                { to: '/contact', label: 'Liên hệ' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-body hover:text-primary transition-colors text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-semibold text-ink mb-5 text-sm">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">location_on</span>
                <span className="text-body text-sm">Lô LK3 - LK4, đường Lạc Long Quân, phường Kinh Bắc, tỉnh Bắc Ninh</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">call</span>
                <span className="text-body text-sm">0353.710.189</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">mail</span>
                <span className="text-body text-sm">igen.work99@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
                <span className="text-body text-sm">Thứ 2 - Thứ 7: 08:00 - 17:30</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted text-xs">© {new Date().getFullYear()} iGen Technology. All rights reserved.</p>
          <p className="text-muted text-xs">Tiên phong kỷ nguyên doanh nghiệp AI.</p>
        </div>
      </div>
    </footer>
  );
};
