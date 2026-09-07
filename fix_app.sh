cat << 'INNER_EOF' > src/App.tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import NeuralTunnel from './components/ui/neural-tunnel';
import Hero from './components/Hero';
import Projects from './components/Projects';
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
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-black antialiased selection:bg-[#003BFF] selection:text-black relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralTunnel className="w-full h-full opacity-70" glowColor="#003BFF" />
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
INNER_EOF
