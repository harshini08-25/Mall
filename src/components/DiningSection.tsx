import React from 'react';
import { Utensils, Sparkles, Clock, Wine, Compass, ArrowRight, ShieldCheck } from 'lucide-react';
import { DINING_DATA } from '../data/mallData';
import { DiningItem } from '../types/mall';

interface DiningSectionProps {
  onOpenBooking: (restaurantId?: string) => void;
  onLocateOnMap: (floor: string, lotId: string) => void;
}

export const DiningSection: React.FC<DiningSectionProps> = ({
  onOpenBooking,
  onLocateOnMap,
}) => {
  return (
    <section id="dining" className="py-16 sm:py-24 bg-[#0c0d10] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4af37] font-medium">
              <span>Haute Gastronomie & Wine</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>42 Epicurean Destinations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mt-1">
              Sky Dining & Culinary Salons
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-2xl leading-relaxed">
              Ascend to Level 4 Sky Terrace: an architectural conservatory enveloped in lush botanical gardens, offering multi-Michelin starred journeys, Hinoki omakase, and Venetian Bellini terraces.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-2 px-6 py-3.5 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e4be42] rounded-md transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)] shrink-0 cursor-pointer"
          >
            <Utensils className="w-4 h-4" />
            <span>Reserve Table Online</span>
          </button>
        </div>

        {/* Featured Editorial Split Banner (L'Aura by Pierre Gagnaire) */}
        <div className="mt-8 rounded-2xl border border-white/15 bg-gradient-to-r from-[#171a25] via-[#12141c] to-[#181a24] p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#d4af37] font-semibold tracking-wider uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Culinary Flagship · Two Michelin Stars</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                L'Aura by Pierre Gagnaire
              </h3>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                A seven-course symphony celebrating seasonal terroir and artistic French gastronomy.
                Perched high on the Level 4 Glasshouse Terrace with sweeping skyline panoramas and a 1,400-label Grand Cru cellar managed by master sommeliers.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 text-xs">
                <div>
                  <span className="text-neutral-500 block">Chef & Vision</span>
                  <span className="text-white font-medium">Pierre Gagnaire</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Atmosphere</span>
                  <span className="text-white font-medium">Skyline Terrace Banquettes</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Dress Code</span>
                  <span className="text-white font-medium">Smart Elegant</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBooking('laura-pierre-gagnaire')}
                  className="px-5 py-2.5 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e4be42] rounded-md transition-colors cursor-pointer"
                >
                  Book Tasting Menu
                </button>
                <button
                  onClick={() => onLocateOnMap('L4', 'lot-l4-01')}
                  className="px-4 py-2.5 text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Locate on Level 4 Map</span>
                </button>
              </div>
            </div>

            {/* Stylized Architectural Dining Visual (SVG) */}
            <div className="lg:col-span-5 h-64 rounded-xl border border-white/10 bg-[#0a0c10] overflow-hidden flex items-center justify-center relative">
              <svg className="w-full h-full" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="chandelierGlow" cx="200" cy="50" r="140" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#d4af37" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0a0c10" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Night Skyline Silhouette Backdrop */}
                <rect x="0" y="0" width="400" height="260" fill="#080a0f" />
                <rect x="30" y="80" width="30" height="180" fill="#131722" />
                <rect x="70" y="60" width="45" height="200" fill="#181c28" />
                <rect x="130" y="100" width="35" height="160" fill="#11141e" />
                <rect x="250" y="70" width="40" height="190" fill="#151926" />
                <rect x="310" y="90" width="50" height="170" fill="#1a1e2c" />

                {/* Glass Terrace Arched Framework */}
                <path d="M20 260 L20 80 Q200 10 380 80 L380 260" stroke="#d4af37" strokeWidth="2" opacity="0.5" fill="none" />
                <line x1="200" y1="20" x2="200" y2="260" stroke="#ffffff" strokeWidth="0.8" opacity="0.2" />
                <circle cx="200" cy="50" r="60" fill="url(#chandelierGlow)" />

                {/* Crystal Chandelier Pendant */}
                <line x1="200" y1="20" x2="200" y2="60" stroke="#d4af37" strokeWidth="1.5" />
                <ellipse cx="200" cy="65" rx="35" ry="8" stroke="#d4af37" strokeWidth="1" fill="#d4af37" fillOpacity="0.2" />
                <circle cx="180" cy="72" r="2.5" fill="#ffffff" />
                <circle cx="200" cy="74" r="2.5" fill="#ffffff" />
                <circle cx="220" cy="72" r="2.5" fill="#ffffff" />

                {/* Fine Dining Table Setup with Candle and Wine Glasses */}
                <ellipse cx="200" cy="210" rx="90" ry="24" fill="#1c202d" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
                <ellipse cx="200" cy="206" rx="80" ry="20" fill="#ffffff" fillOpacity="0.1" />

                {/* Table Lamp & Glasses */}
                <line x1="200" y1="200" x2="200" y2="175" stroke="#d4af37" strokeWidth="2" />
                <ellipse cx="200" cy="173" rx="12" ry="6" fill="#d4af37" />
                <circle cx="200" cy="165" r="4" fill="#ffffff" opacity="0.9" />

                {/* Wine Glasses */}
                <path d="M160 195 L160 185 Q164 180 160 175" stroke="#ffffff" strokeWidth="1" opacity="0.7" fill="none" />
                <path d="M240 195 L240 185 Q236 180 240 175" stroke="#ffffff" strokeWidth="1" opacity="0.7" fill="none" />
              </svg>

              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] text-neutral-300 border border-white/10">
                Level 4 Sky Terrace View
              </div>
            </div>
          </div>
        </div>

        {/* Catalog of Culinary Salons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {DINING_DATA.slice(1).map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-white/10 bg-[#12141c] hover:border-[#d4af37]/40 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-400 pb-3 border-b border-white/10">
                  <span className="text-[#d4af37] font-medium">{item.cuisine}</span>
                  <span className="font-mono text-neutral-400">{item.floor}</span>
                </div>

                <div>
                  <h4 className="font-serif text-2xl font-normal text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {item.tagline}
                  </p>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                <div className="pt-2 text-xs space-y-1 text-neutral-400">
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{item.hours}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Wine className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Dress Code: {item.dressCode}</span>
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => onLocateOnMap(item.floor, item.mapLotId)}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Map</span>
                </button>

                <button
                  onClick={() => onOpenBooking(item.id)}
                  className="px-4 py-2 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e4be42] rounded-md transition-colors cursor-pointer"
                >
                  Book Table
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
