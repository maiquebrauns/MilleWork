import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroEditorial from './components/HeroEditorial';
import AboutMe from './components/AboutMe';
import SeriesShelf from './components/SeriesShelf';
import CuratedGallery from './components/CuratedGallery';
import VisionBoard from './components/VisionBoard';
import ServicesSection from './components/ServicesSection';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import InteractiveDotGrid from './components/InteractiveDotGrid';
import { photographerData } from './data/portfolioData';

export default function App() {
  const [isMuted, setIsMuted] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans relative bg-[#121110] text-[#E8E2D9] selection:bg-[#D4A373] selection:text-[#121110]">
      {/* Grade de Pontinhos Interativa (Acendem conforme o mouse passa) */}
      <InteractiveDotGrid />

      {/* Top Navbar */}
      <Navbar
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onOpenBooking={() => setIsBookingOpen(true)}
        onScrollTo={scrollToSection}
        photographer={photographerData}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-24 py-8">
        {/* 1. Hero Editorial & Mood Reel */}
        <HeroEditorial
          photographer={photographerData}
          isMuted={isMuted}
          onOpenBooking={() => setIsBookingOpen(true)}
          onScrollTo={scrollToSection}
        />

        {/* 2. Sobre Mim (Fotos da pasta Me) */}
        <AboutMe
          about={photographerData.about}
          photographer={photographerData}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* 3. Interactive Bookshelf / Coleções em Destaque (Queen & UrbanPack) */}
        <SeriesShelf
          series={photographerData.series}
          isMuted={isMuted}
        />

        {/* 4. Curated Gallery with Category Filtering */}
        <CuratedGallery
          items={photographerData.galleryItems}
          isMuted={isMuted}
        />

        {/* 5. Vision Board & Client Testimonials */}
        <VisionBoard
          items={photographerData.visionBoard}
          isMuted={isMuted}
        />

        {/* 6. Services & How the Session Works */}
        <ServicesSection
          services={photographerData.services}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      </main>

      {/* Booking / Inquiry Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        photographer={photographerData}
        isMuted={isMuted}
      />

      {/* Footer */}
      <Footer
        photographer={photographerData}
        isMuted={isMuted}
        onOpenBooking={() => setIsBookingOpen(true)}
      />
    </div>
  );
}
