import React, { useState } from 'react';
import { Search, Crown, Menu, X, Clock, MapPin } from 'lucide-react';
import { MALL_INFO } from '../data/mallData';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenVipClub: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenVipClub,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'directory', label: 'Directory' },
    { id: 'floormap', label: 'Floor Map' },
    { id: 'dining', label: 'Dining' },
    { id: 'cinema', label: 'CineLuxe' },
    { id: 'events', label: 'Exhibitions' },
    { id: 'plan-visit', label: 'Plan Visit' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0d10]/95 backdrop-blur-md border-b border-white/10 transition-colors">
      {/* Discreet utility announcement bar */}
      <div className="hidden sm:flex items-center justify-between px-6 py-1.5 bg-[#12141c] border-b border-white/5 text-xs text-neutral-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open Today: {MALL_INFO.todayHours}</span>
          </span>
          <span className="text-neutral-600">·</span>
          <span className="flex items-center gap-1 text-neutral-400">
            <MapPin className="w-3 h-3 text-[#d4af37]" />
            <span>{MALL_INFO.address}</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-neutral-400">Valet Service Active</span>
          <span className="text-neutral-600">·</span>
          <span className="text-neutral-400">Concierge Desk: {MALL_INFO.phone}</span>
        </div>
      </div>

      {/* Main Navigation Bar — strict 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single element wordmark */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); handleNavClick('top'); }}
          className="group flex flex-col items-start focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-2xl tracking-[0.18em] text-white uppercase font-light transition-colors group-hover:text-[#d4af37]">
            Aurelia Galleria
          </span>
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4af37] font-medium -mt-0.5">
            Metropolitan Destination
          </span>
        </a>

        {/* Zone 2: 4–6 text navigation links with subtle hover underlines */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors py-1 relative whitespace-nowrap cursor-pointer ${
                  isActive ? 'text-[#d4af37]' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#d4af37]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-md border border-white/10 transition-colors cursor-pointer"
            title="Search stores, dining, and facilities (Press / or click)"
          >
            <Search className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden sm:inline">Search Directory</span>
            <kbd className="hidden md:inline-block ml-1 px-1.5 py-0.5 text-[10px] bg-black/40 text-neutral-400 rounded border border-white/10">
              /
            </kbd>
          </button>

          <button
            onClick={onOpenVipClub}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-black bg-[#d4af37] hover:bg-[#e4be42] rounded-md transition-all shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] whitespace-nowrap cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5" />
            <span>VIP Privilège</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#10121a] border-b border-white/10 px-6 py-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{MALL_INFO.todayHours}</span>
            </span>
            <span className="text-emerald-400">Open Now</span>
          </div>

          <div className="flex flex-col space-y-3 pt-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-base font-serif tracking-wide py-1.5 transition-colors cursor-pointer ${
                  activeSection === link.id ? 'text-[#d4af37]' : 'text-neutral-200 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSearch(); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-neutral-200 bg-white/5 border border-white/10 rounded-md"
            >
              <Search className="w-4 h-4 text-[#d4af37]" />
              <span>Search All Boutiques & Facilities</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenVipClub(); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-black bg-[#d4af37] rounded-md"
            >
              <Crown className="w-4 h-4" />
              <span>Join Aurelia VIP Privilège</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
