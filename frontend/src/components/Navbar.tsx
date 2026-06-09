import React, { useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const location = useLocation();

  // On page change, scroll to top using Lenis / standard scroll
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Helper to check if route is active
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm uppercase tracking-widest font-medium transition-colors interactable relative group whitespace-nowrap ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'
    }`;

  const borderSpan = (isActive: boolean) => (
    <span
      className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
    />
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group interactable">
            <div className="size-10 text-primary transition-transform duration-700 group-hover:rotate-180 flex items-center justify-center">
              <img src="https://res.cloudinary.com/dgaofuhmv/image/upload/v1775301001/unnamed_tcmlmp.png" alt="iGen Tech Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-white text-2xl font-display font-bold tracking-tight">
              iGen <span className="text-primary font-light">Tech</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={linkClass}>
              {({ isActive }) => (
                <>
                  Trang chủ
                  {borderSpan(isActive)}
                </>
              )}
            </NavLink>
            <NavLink to="/solutions" className={linkClass}>
              {({ isActive }) => (
                <>
                  Giải pháp
                  {borderSpan(isActive)}
                </>
              )}
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              {({ isActive }) => (
                <>
                  Về chúng tôi
                  {borderSpan(isActive)}
                </>
              )}
            </NavLink>
            <NavLink to="/news" className={linkClass}>
              {({ isActive }) => (
                <>
                  Tin tức
                  {borderSpan(isActive)}
                </>
              )}
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              {({ isActive }) => (
                <>
                  Liên hệ
                  {borderSpan(isActive)}
                </>
              )}
            </NavLink>
          </div>

          {/* Action and Toggles */}
          <div className="flex items-center gap-6">
            <Link
              to="/contact"
              className="btn-liquid interactable group relative px-8 py-3 bg-white/5 overflow-hidden rounded-full border border-white/10 backdrop-blur-xl text-white shadow-lg transition-all hover:border-primary/50 hover:bg-white/10 hidden lg:inline-block whitespace-nowrap"
            >
              <span className="relative font-bold text-xs uppercase tracking-widest z-10 flex items-center gap-2 pointer-events-none whitespace-nowrap">
                Connect AI <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
