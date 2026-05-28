import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import EMICalculator from './pages/EMICalculator';
import Apply from './pages/Apply';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Blog from './pages/Blog';

// Pages that have their own full-page layout (no Navbar/Footer)
const STANDALONE_PATHS = ['/apply', '/dashboard'];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  const isStandalone = STANDALONE_PATHS.some(p => pathname.startsWith(p));

  return (
    <>
      <ScrollToTop />
      {!isStandalone && <Navbar />}
      <main className={isStandalone ? '' : 'flex-1'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/emi-calculator" element={<EMICalculator />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </main>
      {!isStandalone && <Footer />}
      {!isStandalone && <WhatsAppButton />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: { fontFamily: 'Inter, sans-serif', fontSize: '14px', borderRadius: '12px' },
          success: { iconTheme: { primary: '#608D4B', secondary: '#fff' } },
        }}
      />
      <div className="min-h-screen flex flex-col">
        <Layout />
      </div>
    </BrowserRouter>
  );
}
