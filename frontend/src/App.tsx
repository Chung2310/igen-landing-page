import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

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

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

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

        {/* Footer */}
        {!isAdminPage && <Footer />}
      </div>
    </>
  );
};

export const App: React.FC = () => {
  // Initialize Lenis smooth scroll globally (gentle, Stripe-like calm)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
