import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { type ServiceData, MOCK_SERVICES } from '../utils/servicesData';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [services, setServices] = useState<ServiceData[]>([]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setMobileOpen(false);
    setMobileSolutionsOpen(false);
  }, [location.pathname]);

  // Add hairline / subtle shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fetch services from DB
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_URL}/services`, { params: { limit: 20, status: 'active' } });
        if (res.data?.success && res.data.data.docs.length > 0) {
          const sorted = res.data.data.docs.sort((a: ServiceData, b: ServiceData) => (a.order || 0) - (b.order || 0));
          setServices(sorted);
        } else {
          setServices(MOCK_SERVICES);
        }
      } catch {
        setServices(MOCK_SERVICES);
      }
    };
    fetchServices();
  }, []);

  const links = [
    { to: '/', label: 'Trang chủ' },
    { to: '/solutions', label: 'Giải pháp' },
    { to: '/about', label: 'Về chúng tôi' },
    { to: '/news', label: 'Tin tức' },
    { to: '/contact', label: 'Liên hệ' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-medium transition-colors whitespace-nowrap py-1 after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-primary after:transition-all after:duration-300 ${
      isActive
        ? 'text-ink after:w-full'
        : 'text-body hover:text-ink after:w-0 hover:after:w-full'
    }`;

  // Categorize services for the 2-column dropdown
  const aiServices = services.filter((s) => s.category === 'AI');
  const techServices = services.filter((s) => s.category !== 'AI');

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
          <div className="hidden md:flex items-center gap-8 h-full">
            {links.map((l) => {
              if (l.to === '/solutions') {
                return (
                  <div key={l.to} className="group relative h-full flex items-center">
                    <NavLink to={l.to} end className={linkClass}>
                      <span className="flex items-center gap-1">
                        {l.label}
                        <span className="material-symbols-outlined text-xs transition-transform duration-300 group-hover:rotate-180">
                          keyboard_arrow_down
                        </span>
                      </span>
                    </NavLink>

                    {/* Hover Dropdown Panel */}
                    <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 mt-1 w-[680px] bg-white/95 backdrop-blur-md rounded-2xl border border-line shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 z-50 p-6 grid grid-cols-2 gap-6">
                      
                      {/* Column 1: AI Solutions */}
                      <div className="flex flex-col gap-3">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-primary border-b border-line pb-2 mb-1">
                          Giải pháp AI & Tự động hóa
                        </span>
                        <div className="flex flex-col gap-1">
                          {aiServices.map((svc) => (
                            <Link
                              key={svc.slug}
                              to={`/solutions/${svc.slug}`}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-surface-alt transition-colors group/item"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors flex-shrink-0 mt-0.5">
                                <span className="material-symbols-outlined text-base">{svc.icon}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-ink group-hover/item:text-primary transition-colors">
                                  {svc.title}
                                </span>
                                <span className="text-xs text-muted line-clamp-1 mt-0.5">
                                  {svc.shortDesc}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Tech Platforms */}
                      <div className="flex flex-col gap-3">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-primary border-b border-line pb-2 mb-1">
                          Nền tảng Công nghệ & Số hóa
                        </span>
                        <div className="flex flex-col gap-1">
                          {techServices.map((svc) => (
                            <Link
                              key={svc.slug}
                              to={`/solutions/${svc.slug}`}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-surface-alt transition-colors group/item"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors flex-shrink-0 mt-0.5">
                                <span className="material-symbols-outlined text-base">{svc.icon}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-ink group-hover/item:text-primary transition-colors">
                                  {svc.title}
                                </span>
                                <span className="text-xs text-muted line-clamp-1 mt-0.5">
                                  {svc.shortDesc}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              }

              return (
                <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
                  {l.label}
                </NavLink>
              );
            })}
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
            aria-expanded={mobileOpen}
          >
            <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden grid bg-white transition-all duration-300 ease-in-out ${
          mobileOpen ? 'grid-rows-[1fr] opacity-100 border-t border-line' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((l) => {
              if (l.to === '/solutions') {
                return (
                  <div key={l.to} className="flex flex-col">
                    <button
                      onClick={() => setMobileSolutionsOpen((prev) => !prev)}
                      className="px-3 py-3 rounded-lg text-base font-medium text-body hover:bg-surface-alt transition-colors flex justify-between items-center w-full"
                    >
                      <span>{l.label}</span>
                      <span className={`material-symbols-outlined text-xl transition-transform duration-300 ${mobileSolutionsOpen ? 'rotate-180' : ''}`}>
                        keyboard_arrow_down
                      </span>
                    </button>

                    {/* Collapsible list of services */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out pl-6 ${
                        mobileSolutionsOpen ? 'grid-rows-[1fr] opacity-100 my-1' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="overflow-hidden flex flex-col gap-1">
                        {services.map((svc) => (
                          <Link
                            key={svc.slug}
                            to={`/solutions/${svc.slug}`}
                            className="px-3 py-2 rounded-lg text-sm text-body hover:text-primary hover:bg-primary-light transition-colors flex items-center gap-2"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span className="material-symbols-outlined text-base">{svc.icon}</span>
                            <span>{svc.title}</span>
                          </Link>
                        ))}
                        <Link
                          to="/solutions"
                          className="px-3 py-2 rounded-lg text-sm text-primary font-semibold hover:bg-primary-light transition-colors flex items-center gap-2"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="material-symbols-outlined text-base">arrow_forward</span>
                          <span>Xem tất cả giải pháp</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive ? 'text-ink bg-surface-alt' : 'text-body hover:bg-surface-alt'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              );
            })}
            <Link to="/contact" className="btn-primary mt-2 w-full" onClick={() => setMobileOpen(false)}>
              Liên hệ ngay
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

