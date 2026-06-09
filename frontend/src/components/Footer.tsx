import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden z-10">
      <footer className="relative bg-black/80 backdrop-blur-xl border-t border-white/10 pt-20 pb-10 overflow-hidden dof-target-section">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* Column 1: Intro */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src="https://res.cloudinary.com/dgaofuhmv/image/upload/v1775301001/unnamed_tcmlmp.png" alt="iGen Tech Logo" className="h-8 w-auto object-contain" />
                <span className="text-white font-display font-bold text-2xl tracking-tight">iGen Technology</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-8">
                Tiên phong kiến tạo hệ sinh thái AI tại Việt Nam, mang đến giải pháp đột phá cho doanh nghiệp.
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h3 className="font-bold text-white mb-6">Khám phá</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm interactable">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link to="/solutions" className="text-gray-400 hover:text-white transition-colors text-sm interactable">
                    Giải pháp
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm interactable">
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link to="/news" className="text-gray-400 hover:text-white transition-colors text-sm interactable">
                    Tin tức
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm interactable">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h3 className="font-bold text-white mb-6">Liên hệ</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">location_on</span>
                  <span className="text-gray-400 text-sm">Lô LK3 - LK4, đường Lạc Long Quân, phường Kinh Bắc, tỉnh Bắc Ninh</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">call</span>
                  <span className="text-gray-400 text-sm">0353.710.189</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">mail</span>
                  <span className="text-gray-400 text-sm">igen.work99@gmail.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
                  <span className="text-gray-400 text-sm">Thứ 2 - Thứ 7: 08:00 - 17:30</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
};
