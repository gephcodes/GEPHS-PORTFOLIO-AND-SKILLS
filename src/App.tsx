/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Philosophy from './components/Philosophy';
import Skills from './components/Skills';
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
    <div className="min-h-screen bg-black font-sans text-white antialiased selection:bg-white selection:text-black">
      {/* Dynamic Header & Navigation */}
      <Navbar 
        onContactClick={handleScrollToContact} 
        onWorkClick={() => setIsWorkModalOpen(true)} 
        onLogoClick={handleLogoAction}
      />

      {/* Structured Content Panels */}
      <main>
        {/* 00 - Hero Display */}
        <Hero onWorkClick={() => setIsWorkModalOpen(true)} />

        {/* 01 - Products / Assets Grid */}
        <Projects />

        {/* 03 - System Philosophy */}
        <Philosophy />

        {/* 04 - Core Capabilities Matrix */}
        <Skills />
      </main>

      {/* 05 - Contact Form & Social Connects */}
      <Footer />

      {/* Dynamic Intake Portal Modal */}
      <WorkWithMeModal 
        isOpen={isWorkModalOpen} 
        onClose={() => setIsWorkModalOpen(false)} 
      />

      {/* Admin Panel Gateway */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
}
