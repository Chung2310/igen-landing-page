import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ChevronUp, PhoneCall } from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useHeroMotion } from './hooks/useHeroMotion';
import './styles/hero-motion.css';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { IndustryComingSoon } from './pages/IndustryComingSoon';
import { IgenERP } from './pages/IgenERP';
import { SoftwareService } from './pages/SoftwareService';
import { TechnologyService } from './pages/TechnologyService';
import { ServiceComingSoon } from './pages/ServiceComingSoon';
import { Solutions } from './pages/Solutions';
import { ServiceDetail } from './pages/ServiceDetail';
import { About } from './pages/About';
import { News } from './pages/News';
import { ArticleDetail } from './pages/ArticleDetail';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';

const AppContent: React.FC<{ scrollToTop: () => void }> = ({ scrollToTop }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const [showBackToTop, setShowBackToTop] = useState(false);
  useHeroMotion(location.pathname);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > Math.max(400, window.innerHeight * .6));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Navigation */}
      {!isAdminPage && <Navbar />}

      {/* Page Content Routes */}
      <div className="min-h-screen flex flex-col justify-between">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/industries/:slug" element={<IndustryComingSoon />} />
          <Route path="/products/igen-erp" element={<IgenERP />} />
          <Route path="/solutions/erp" element={<IgenERP />} />
          <Route path="/solutions/sap-ra-mat/:slug" element={<ServiceComingSoon />} />
          <Route path="/solutions/crm" element={<TechnologyService slug="crm" />} />
          <Route path="/solutions/marketing-tu-dong" element={<TechnologyService slug="marketing-tu-dong" />} />
          <Route path="/solutions/generative-ai" element={<TechnologyService slug="generative-ai" />} />
          <Route path="/solutions/computer-vision" element={<TechnologyService slug="computer-vision" />} />
          <Route path="/solutions/chatbot-ai" element={<TechnologyService slug="chatbot-ai" />} />
          <Route path="/solutions/phat-trien-ung-dung-di-dong" element={<SoftwareService slug="phat-trien-ung-dung-di-dong" />} />
          <Route path="/solutions/phat-trien-ung-dung-web" element={<SoftwareService slug="phat-trien-ung-dung-web" />} />
          <Route path="/solutions/kiem-thu-phan-mem-tu-dong" element={<SoftwareService slug="kiem-thu-phan-mem-tu-dong" />} />
          <Route path="/solutions/thiet-ke-ui-ux" element={<SoftwareService slug="thiet-ke-ui-ux" />} />
          <Route path="/solutions/trung-tam-phat-trien-phan-mem-tu-xa" element={<SoftwareService slug="trung-tam-phat-trien-phan-mem-tu-xa" />} />
          <Route path="/solutions/doi-ngu-chuyen-trach" element={<SoftwareService slug="doi-ngu-chuyen-trach" />} />
          <Route path="/solutions/dich-vu-quan-ly-he-thong-it" element={<SoftwareService slug="dich-vu-quan-ly-he-thong-it" />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:slug" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<ArticleDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        {!isAdminPage && location.pathname !== '/login' && (
          <div className="fixed bottom-6 right-5 z-40 flex flex-col items-center gap-3">
            {showBackToTop && (
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Cuộn về đầu trang"
                title="Về đầu trang"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/70 bg-slate-200/65 text-slate-500 shadow-lg shadow-slate-900/10 backdrop-blur-sm transition-all hover:scale-110 hover:border-[#00adfc] hover:bg-[#00adfc] hover:text-white hover:shadow-sky-500/25 active:scale-95 active:bg-[#008fc9] focus-visible:bg-[#00adfc] focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0077b3]"
              >
                <ChevronUp size={23} strokeWidth={2.2} aria-hidden="true" />
              </button>
            )}
            <a
              href="tel:0353710189"
              aria-label="Gọi ngay 0353.710.189"
              title="Gọi ngay: 0353.710.189"
              className="floating-call flex h-12 w-12 items-center justify-center rounded-full bg-[#00adfc] text-white shadow-lg shadow-sky-500/20 transition-transform hover:scale-110 hover:bg-[#0095d9] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0077b3]"
            >
              <PhoneCall size={25} strokeWidth={2.1} aria-hidden="true" />
            </a>
            <a
              href="https://zalo.me/0353710189"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nhắn Zalo qua số 0353.710.189"
              title="Zalo: 0353.710.189"
              className="block h-12 w-12 rounded-xl shadow-lg shadow-blue-500/20 transition-transform hover:scale-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0077b3]"
            >
              <img src="/zalo-logo.svg" alt="" width={48} height={48} className="h-12 w-12" />
            </a>
          </div>
        )}

        {/* Footer */}
        {!isAdminPage && <Footer />}
      </div>
    </>
  );
};

export const App: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.1, force: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Initialize Lenis smooth scroll globally (gentle, Stripe-like calm)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let animationFrame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <AppContent scrollToTop={scrollToTop} />
    </BrowserRouter>
  );
};

export default App;
