import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Directory } from './components/Directory';
import { FloorMap } from './components/FloorMap';
import { DiningSection } from './components/DiningSection';
import { CinemaSection } from './components/CinemaSection';
import { EventsSection } from './components/EventsSection';
import { PlanVisit } from './components/PlanVisit';
import { Footer } from './components/Footer';
import { StoreModal } from './components/StoreModal';
import { DiningBookingModal } from './components/DiningBookingModal';
import { CinemaBookingModal } from './components/CinemaBookingModal';
import { VipClubModal } from './components/VipClubModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { FloorLevel, Store, DiningItem, MovieScreening } from './types/mall';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('top');
  const [currentFloor, setCurrentFloor] = useState<FloorLevel>('L1');
  const [highlightedLotId, setHighlightedLotId] = useState<string | null>(null);

  // Modals state
  const [selectedStore, setSelectedStore] = useState<Store | DiningItem | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [vipModalOpen, setVipModalOpen] = useState<boolean>(false);
  const [diningBookingOpen, setDiningBookingOpen] = useState<boolean>(false);
  const [selectedDiningId, setSelectedDiningId] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MovieScreening | null>(null);

  // Global keyboard shortcut '/' to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLocateOnMap = (floor: string, lotId: string) => {
    const validFloor = floor as FloorLevel;
    setCurrentFloor(validFloor);
    setHighlightedLotId(lotId);
    handleNavigate('floormap');
  };

  const handleOpenDiningBooking = (restaurantId?: string) => {
    if (restaurantId) {
      setSelectedDiningId(restaurantId);
    }
    setDiningBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#e4e5eb] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenVipClub={() => setVipModalOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onNavigate={handleNavigate}
          onSelectFloor={(floor) => {
            setCurrentFloor(floor);
            setHighlightedLotId(null);
          }}
        />

        {/* Directory Section */}
        <Directory
          onSelectStore={(store) => setSelectedStore(store)}
          onLocateOnMap={handleLocateOnMap}
        />

        {/* Interactive Floor Map Navigator */}
        <FloorMap
          currentFloor={currentFloor}
          onFloorChange={(floor) => {
            setCurrentFloor(floor);
            setHighlightedLotId(null);
          }}
          highlightedLotId={highlightedLotId}
          onSelectStore={(store) => setSelectedStore(store)}
        />

        {/* Dining & Sky Terraces */}
        <DiningSection
          onOpenBooking={handleOpenDiningBooking}
          onLocateOnMap={handleLocateOnMap}
        />

        {/* CineLuxe IMAX & Cultural Theatre */}
        <CinemaSection
          onSelectMovie={(movie) => setSelectedMovie(movie)}
          onLocateOnMap={handleLocateOnMap}
        />

        {/* Events & Seasonal Exhibitions */}
        <EventsSection onLocateOnMap={handleLocateOnMap} />

        {/* Plan Your Visit & Parking Sensors */}
        <PlanVisit />
      </main>

      {/* Editorial Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenVipClub={() => setVipModalOpen(true)}
      />

      {/* Modal Layers */}
      {selectedStore && (
        <StoreModal
          store={selectedStore}
          onClose={() => setSelectedStore(null)}
          onLocateOnMap={handleLocateOnMap}
          onOpenDiningBooking={handleOpenDiningBooking}
        />
      )}

      {diningBookingOpen && (
        <DiningBookingModal
          initialRestaurantId={selectedDiningId}
          onClose={() => {
            setDiningBookingOpen(false);
            setSelectedDiningId(null);
          }}
        />
      )}

      {selectedMovie && (
        <CinemaBookingModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {vipModalOpen && (
        <VipClubModal onClose={() => setVipModalOpen(false)} />
      )}

      {searchModalOpen && (
        <GlobalSearchModal
          onClose={() => setSearchModalOpen(false)}
          onSelectStore={(store) => setSelectedStore(store)}
          onLocateOnMap={handleLocateOnMap}
          onSelectMovie={(movie) => setSelectedMovie(movie)}
        />
      )}
    </div>
  );
}
