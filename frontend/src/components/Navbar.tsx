import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { OutlineServiceIcon } from './OutlineServiceIcon';
import { INDUSTRIES } from '../data/industries';
import './Navbar.css';

const MENU_ICONS: Record<string, Parameters<typeof OutlineServiceIcon>[0]['name']> = {
  'Phát triển ứng dụng di động': 'mobile',
  'Phát triển ứng dụng web': 'web',
  'Kiểm thử phần mềm tự động': 'testing',
  'Thiết kế UI/UX': 'design',
  'Trung tâm phát triển phần mềm từ xa': 'office',
  'Đội ngũ chuyên trách': 'team',
  'Dịch vụ quản lý hệ thống IT': 'server',
  ERP: 'erp',
  CRM: 'crm',
  'Marketing tự động': 'marketing',
  'Generative AI': 'ai',
  'Computer Vision (AI nhận diện hình ảnh)': 'vision',
  'Chatbot AI': 'chat',
  'Machine Learning & Data Analytics': 'analytics',
};

const SERVICE_MENU = [
  {
    label: 'Chuyên môn',
    columns: [
      [
        {
          title: 'Phát triển phần mềm',
          items: [
            'Phát triển ứng dụng di động',
            'Phát triển ứng dụng web',
            'Kiểm thử phần mềm tự động',
            'Thiết kế UI/UX',
          ],
        },
        {
          title: 'Thuê ngoài CNTT',
          items: ['Trung tâm phát triển phần mềm từ xa', 'Đội ngũ chuyên trách', 'Dịch vụ quản lý hệ thống IT'],
        },
      ],
      [
        {
          title: 'Hệ thống doanh nghiệp và tự động hóa',
          items: ['ERP', 'CRM', 'Marketing tự động'],
        },
      ],
    ],
  },
  {
    label: 'Công nghệ',
    columns: [
      [
        {
          title: 'AI & Machine Learning',
          items: ['Generative AI', 'Computer Vision (AI nhận diện hình ảnh)', 'Chatbot AI', 'Machine Learning & Data Analytics'],
        },
      ],
      [
        { title: 'Blockchain', items: [] },
        { title: 'Data & Analytics', items: [] },
      ],
    ],
  },
];

const servicePages: Record<string, string> = {
  'Phát triển ứng dụng di động': '/solutions/phat-trien-ung-dung-di-dong',
  'Phát triển ứng dụng web': '/solutions/phat-trien-ung-dung-web',
  'Kiểm thử phần mềm tự động': '/solutions/kiem-thu-phan-mem-tu-dong',
  'Thiết kế UI/UX': '/solutions/thiet-ke-ui-ux',
  'Trung tâm phát triển phần mềm từ xa': '/solutions/trung-tam-phat-trien-phan-mem-tu-xa',
  'Đội ngũ chuyên trách': '/solutions/doi-ngu-chuyen-trach',
  'Dịch vụ quản lý hệ thống IT': '/solutions/dich-vu-quan-ly-he-thong-it',
  ERP: '/solutions/erp',
  CRM: '/solutions/crm',
  'Marketing tự động': '/solutions/marketing-tu-dong',
  'Generative AI': '/solutions/generative-ai',
  'Computer Vision (AI nhận diện hình ảnh)': '/solutions/computer-vision',
  'Chatbot AI': '/solutions/chatbot-ai',
  'Machine Learning & Data Analytics': '/solutions/sap-ra-mat/machine-learning-data-analytics',
  Blockchain: '/solutions/sap-ra-mat/blockchain',
  'Data & Analytics': '/solutions/sap-ra-mat/data-analytics',
};

const serviceLink = (service: string) =>
  servicePages[service] || `/contact?service=${encodeURIComponent(service)}`;

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [desktopIndustriesOpen, setDesktopIndustriesOpen] = useState(false);
  const isHomeTop = location.pathname === '/' && !scrolled;

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setDesktopServicesOpen(false);
    setMobileIndustriesOpen(false);
    setDesktopIndustriesOpen(false);
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
    { to: '/products', label: 'Ngành nghề' },
    { to: '/solutions', label: 'Dịch vụ' },
    { to: '/about', label: 'Về chúng tôi' },
    { to: '/news', label: 'Tin tức' },
    { to: '/contact', label: 'Liên hệ' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-medium transition-colors whitespace-nowrap py-1 after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-primary after:transition-all after:duration-300 ${isHomeTop ? 'home-hero-nav-link' : ''} ${
      isActive
        ? 'text-ink after:w-full'
        : 'text-body hover:text-ink after:w-0 hover:after:w-full'
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isHomeTop ? 'home-hero-nav' : ''} ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-line shadow-[0_1px_0_rgba(60,66,87,0.04)]'
          : 'bg-white/60 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="home-hero-brand relative flex-shrink-0 flex items-center cursor-pointer group interactable origin-left scale-[.94]">
            <img src="/icon-favicon.png" alt="" aria-hidden="true" width="40" height="40" className="home-hero-brand-icon h-8 w-8 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-9 sm:w-9" />
            <div className="relative w-24 h-12 sm:w-28 sm:h-14 overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <img src="/brand-icon.png" alt="iGen Technology" width="1024" height="1024" className="home-hero-brand-wordmark absolute left-1/2 top-[58%] h-[122px] w-[122px] max-w-none -translate-x-1/2 -translate-y-1/2 sm:h-[140px] sm:w-[140px]" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-8 h-full">
            {links.map((l) => {
              if (l.to === '/products') {
                return (
                  <div
                    key={l.to}
                    className="group h-full flex items-center"
                    onMouseEnter={() => { setDesktopIndustriesOpen(true); setDesktopServicesOpen(false); }}
                    onMouseLeave={() => setDesktopIndustriesOpen(false)}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDesktopIndustriesOpen(false);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') setDesktopIndustriesOpen(false);
                    }}
                  >
                    <button
                      type="button"
                      className={linkClass({ isActive: desktopIndustriesOpen })}
                      aria-expanded={desktopIndustriesOpen}
                      aria-controls="desktop-industries-panel"
                      onClick={() => { setDesktopIndustriesOpen((open) => !open); setDesktopServicesOpen(false); }}
                    >
                      <span className="flex items-center gap-1">
                        {l.label}
                        <span className={`material-symbols-outlined text-xs transition-transform duration-300 ${desktopIndustriesOpen ? 'rotate-180' : ''}`}>
                          keyboard_arrow_down
                        </span>
                      </span>
                    </button>
                    <div
                      id="desktop-industries-panel"
                      className={`nav-dropdown-panel industry-menu-panel fixed top-[80px] left-1/2 z-50 w-[90vw] max-w-[1120px] -translate-x-1/2 rounded-2xl border border-line bg-white p-6 shadow-2xl transition-all duration-200 ${desktopIndustriesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 pointer-events-none'}`}
                    >
                      <div className="industry-menu-grid">
                        {INDUSTRIES.map((industry) => (
                          <Link key={industry.slug} to={`/industries/${industry.slug}`} className="industry-menu-card">
                            <img src={industry.image} alt={`Minh họa ngành ${industry.name.toLowerCase()}`} loading="lazy" />
                            <span className="industry-menu-label"><span aria-hidden="true">↗</span>{industry.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              if (l.to === '/solutions') {
                return (
                  <div
                    key={l.to}
                    className="group h-full flex items-center"
                    onMouseEnter={() => { setDesktopServicesOpen(true); setDesktopIndustriesOpen(false); }}
                    onMouseLeave={() => setDesktopServicesOpen(false)}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDesktopServicesOpen(false);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') setDesktopServicesOpen(false);
                    }}
                  >
                    <button
                      type="button"
                      className={linkClass({ isActive: desktopServicesOpen })}
                      aria-expanded={desktopServicesOpen}
                      aria-controls="desktop-services-panel"
                      onClick={() => setDesktopServicesOpen(true)}
                    >
                      <span className="flex items-center gap-1">
                        {l.label}
                        <span className={`material-symbols-outlined text-xs transition-transform duration-300 ${desktopServicesOpen ? 'rotate-180' : ''}`}>
                          keyboard_arrow_down
                        </span>
                      </span>
                    </button>

                    <div
                      id="desktop-services-panel"
                      className={`nav-dropdown-panel fixed top-[80px] left-1/2 z-50 w-[90vw] max-w-[1315px] xl:w-[75vw] -translate-x-1/2 rounded-2xl border border-line bg-white p-6 xl:p-[30px] shadow-2xl transition-all duration-200 ${desktopServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 pointer-events-none'}`}
                    >
                      <div className="grid grid-cols-4 gap-x-6 xl:gap-x-8">
                        <span className="col-span-2 mb-5 text-sm text-muted">Chuyên môn</span>
                        <span className="col-span-2 mb-5 text-sm text-muted">Công nghệ</span>
                        {SERVICE_MENU.flatMap((area) => area.columns).map((column, index) => (
                          <div key={index} className="flex flex-col gap-4">
                            {column.map((section) => (
                              <div key={section.title} className="flex flex-col gap-2">
                                {section.items.length > 0 ? (
                                  <h3 className="text-base font-bold uppercase leading-snug text-ink">{section.title}</h3>
                                ) : (
                                  <Link to={serviceLink(section.title)} className="text-base font-bold uppercase leading-snug text-ink transition-colors hover:text-primary">
                                    {section.title}
                                  </Link>
                                )}
                                {section.items.map((item) => (
                                  <Link key={item} to={serviceLink(item)} className="flex min-h-[36px] items-center gap-2.5 rounded-lg text-sm leading-snug text-body transition-colors hover:text-primary focus-visible:text-primary">
                                    <OutlineServiceIcon name={MENU_ICONS[item]} />
                                    <span>{item}</span>
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        ))}
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
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/contact" className="btn-primary home-hero-contact text-sm px-6 py-2.5">
              Liên hệ ngay
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="home-mobile-menu-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} strokeWidth={2.3} aria-hidden="true" /> : <Menu size={24} strokeWidth={2.3} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        className={`lg:hidden grid overflow-hidden bg-white transition-all duration-300 ease-in-out ${
          mobileOpen ? 'grid-rows-[1fr] opacity-100 border-t border-line' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div data-lenis-prevent className="min-h-0 max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-y-contain touch-pan-y">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((l) => {
              if (l.to === '/products') {
                return (
                  <div key={l.to} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => { setMobileIndustriesOpen((open) => !open); setMobileServicesOpen(false); }}
                      aria-expanded={mobileIndustriesOpen}
                      aria-controls="mobile-industries-panel"
                      className="px-3 py-3 rounded-lg text-base font-medium text-body hover:bg-surface-alt transition-colors flex justify-between items-center w-full"
                    >
                      <span>{l.label}</span>
                      <span className={`material-symbols-outlined text-xl transition-transform duration-300 ${mobileIndustriesOpen ? 'rotate-180' : ''}`}>
                        keyboard_arrow_down
                      </span>
                    </button>
                    {mobileIndustriesOpen && (
                      <div id="mobile-industries-panel" className="industry-menu-grid industry-menu-grid--mobile px-3 pb-3">
                        {INDUSTRIES.map((industry) => (
                          <Link key={industry.slug} to={`/industries/${industry.slug}`} className="industry-menu-card" onClick={() => setMobileOpen(false)}>
                            <img src={industry.image} alt={`Minh họa ngành ${industry.name.toLowerCase()}`} loading="lazy" />
                            <span className="industry-menu-label"><span aria-hidden="true">↗</span>{industry.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (l.to === '/solutions') {
                return (
                  <div key={l.to} className="flex flex-col">
                    <button
                      onClick={() => { setMobileServicesOpen((prev) => !prev); setMobileIndustriesOpen(false); }}
                      aria-expanded={mobileServicesOpen}
                      aria-controls="mobile-services-panel"
                      className="px-3 py-3 rounded-lg text-base font-medium text-body hover:bg-surface-alt transition-colors flex justify-between items-center w-full"
                    >
                      <span>{l.label}</span>
                      <span className={`material-symbols-outlined text-xl transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`}>
                        keyboard_arrow_down
                      </span>
                    </button>

                    {/* Collapsible list of services */}
                    <div
                      id="mobile-services-panel"
                      className={`grid transition-all duration-300 ease-in-out pl-6 ${
                        mobileServicesOpen ? 'grid-rows-[1fr] opacity-100 my-1' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="overflow-hidden flex flex-col gap-1">
                        {SERVICE_MENU.map((area) => (
                          <div key={area.label} className="flex flex-col gap-2 py-2">
                            <span className="px-3 text-xs font-semibold text-muted">{area.label}</span>
                            {area.columns.flatMap((column) => column).map((section) => (
                              <div key={section.title} className="flex flex-col gap-1">
                                {section.items.length > 0 ? (
                                  <span className="px-3 pt-2 text-xs font-bold uppercase text-ink">{section.title}</span>
                                ) : (
                                  <Link to={serviceLink(section.title)} className="px-3 py-2 text-xs font-bold uppercase text-ink" onClick={() => setMobileOpen(false)}>
                                    {section.title}
                                  </Link>
                                )}
                                {section.items.map((item) => (
                                  <Link key={item} to={serviceLink(item)} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-body hover:bg-primary-light hover:text-primary" onClick={() => setMobileOpen(false)}>
                                    <OutlineServiceIcon name={MENU_ICONS[item]} compact />
                                    <span>{item}</span>
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        ))}
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
            <Link to="/contact" className="btn-primary home-hero-contact mt-2 w-full" onClick={() => setMobileOpen(false)}>
              Liên hệ ngay
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

