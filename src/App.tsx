/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Grainient from './components/ui/Grainient';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import NasaCertificatePage from './components/NasaCertificatePage';

const DEFAULT_TITLE = 'Gephel Chingtham — Visionary | Technical Director | Entrepreneur | Founder';
const NASA_CERT_TITLE = 'NASA Space Apps Challenge 2026 Certificate — Gephel Chingtham';

function isNasaCertRoute() {
  if (typeof window === 'undefined') return false;
  const normalizedPath = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  const hostname = window.location.hostname.toLowerCase();
  return (
    normalizedPath === '/nasaisac26certificate' ||
    hostname.startsWith('nasaisac26certificate.')
  );
}

export default function App() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isNasaCert, setIsNasaCert] = useState<boolean>(isNasaCertRoute);

  useEffect(() => {
    const handlePopState = () => {
      setIsNasaCert(isNasaCertRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = isNasaCert ? NASA_CERT_TITLE : DEFAULT_TITLE;
  }, [isNasaCert]);

  const handleBackToPortfolio = () => {
    window.history.pushState({}, '', '/');
    setIsNasaCert(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleOpenCertificate = (path: string) => {
    window.history.pushState({}, '', path);
    setIsNasaCert(isNasaCertRoute());
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const top = contactSection.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleLogoAction = () => {
    setIsAdminModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A122C] font-sans text-[#F9F6F0] antialiased selection:bg-[#FFFFFF] selection:text-[#0A122C] relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Grainient
          color1="#8E9AAF"
          color2="#162248"
          color3="#0A122C"
          timeSpeed={0.25}
          colorBalance={0.0}
          warpStrength={1.0}
          warpFrequency={5.0}
          warpSpeed={2.0}
          warpAmplitude={50.0}
          blendAngle={0.0}
          blendSoftness={0.05}
          rotationAmount={500.0}
          noiseScale={2.0}
          grainAmount={0.1}
          grainScale={2.0}
          grainAnimated={false}
          contrast={1.5}
          gamma={1.0}
          saturation={1.0}
          centerX={0.0}
          centerY={0.0}
          zoom={0.9}
        />
      </div>
      <div className="relative z-10">
        {isNasaCert ? (
          <NasaCertificatePage onBackToPortfolio={handleBackToPortfolio} />
        ) : (
          <>
            <Navbar 
              onContactClick={handleScrollToContact}
              onLogoClick={handleLogoAction}
            />
            <main>
              <Hero />
              <Projects />
              <Certificates onOpenCertificate={handleOpenCertificate} />
            </main>
            <Footer />
            <AdminModal
              isOpen={isAdminModalOpen}
              onClose={() => setIsAdminModalOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  );
}
