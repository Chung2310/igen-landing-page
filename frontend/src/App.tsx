import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ParticleCanvas } from './components/ParticleCanvas';
import { AIRobotCore } from './components/AIRobotCore';

// Pages
import { Home } from './pages/Home';
import { Solutions } from './pages/Solutions';
import { ServiceDetail } from './pages/ServiceDetail';
import { About } from './pages/About';
import { News } from './pages/News';
import { ArticleDetail } from './pages/ArticleDetail';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';

const AppContent: React.FC<{
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ soundEnabled, setSoundEnabled }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Navigation */}
      {!isAdminPage && <Navbar soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />}

      {/* Page Content Routes */}
      <div className="min-h-screen flex flex-col justify-between">
        <Routes>
          <Route path="/" element={<Home />} />
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
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Initialize Lenis smooth scroll globally
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
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
      {/* Global Interactive Visual FX Elements */}
      <CustomCursor />
      <ParticleCanvas />
      <AIRobotCore soundEnabled={soundEnabled} />

      {/* Global Ink Wipe Page Transition Elements */}
      <div className="page-transition-overlay">
        <div className="ink-wipe"></div>
      </div>

      <AppContent soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
    </BrowserRouter>
  );
};

export default App;
