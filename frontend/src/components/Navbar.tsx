import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setMobileOpen(false);
  }, [location.pathname]);

  // Add hairline / subtle shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: 'Trang chủ' },
    { to: '/solutions', label: 'Giải pháp' },
    { to: '/about', label: 'Về chúng tôi' },
    { to: '/news', label: 'Tin tức' },
    { to: '/contact', label: 'Liên hệ' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors whitespace-nowrap ${
      isActive ? 'text-ink' : 'text-body hover:text-ink'
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-line shadow-[0_1px_0_rgba(60,66,87,0.04)]'
          : 'bg-white/60 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group interactable">
            <div className="size-10 text-primary transition-transform duration-700 group-hover:rotate-180 flex items-center justify-center">
              <img src="/logo.png" alt="iGen Tech Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-ink text-xl font-bold tracking-tight">
              iGen <span className="text-primary font-semibold">Tech</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Action */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/contact" className="btn-primary text-sm px-6 py-2.5">
              Liên hệ ngay
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-ink hover:bg-surface-alt transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-line">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive ? 'text-ink bg-surface-alt' : 'text-body hover:bg-surface-alt'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary mt-2 w-full">
              Liên hệ ngay
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
