/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Grainient from './components/ui/Grainient';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Footer from './components/Footer';
import WorkWithMeModal from './components/WorkWithMeModal';
import AdminModal from './components/AdminModal';

export default function App() {
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

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
        <Navbar 
          onContactClick={handleScrollToContact}
          onWorkClick={() => setIsWorkModalOpen(true)}
          onLogoClick={handleLogoAction}
        />
        <main>
          <Hero onWorkClick={() => setIsWorkModalOpen(true)} />
          <Projects />
          <Certificates />
        </main>
        <Footer />
        <WorkWithMeModal 
          isOpen={isWorkModalOpen}
          onClose={() => setIsWorkModalOpen(false)} 
        />
        <AdminModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
        />
      </div>
    </div>
  );
}
