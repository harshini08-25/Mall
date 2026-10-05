import React from 'react';
import { Compass, Sparkles, Utensils, Car, ArrowRight, ShieldCheck } from 'lucide-react';
import { MALL_INFO, PARKING_DATA } from '../data/mallData';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onSelectFloor: (floor: 'B1' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5') => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onSelectFloor }) => {
  const totalAvailableParking = PARKING_DATA.reduce((acc, curr) => acc + curr.availableBays, 0);

  const floorQuickJump = [
    { level: 'B1', name: 'Metro & Market' },
    { level: 'L1', name: 'Haute Horlogerie' },
    { level: 'L2', name: 'Designer Fashion' },
    { level: 'L3', name: 'Tech & Sound' },
    { level: 'L4', name: 'Sky Dining' },
    { level: 'L5', name: 'CineLuxe IMAX' },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#0c0d10] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-white/10">
      {/* Architectural Background Ambient Lighting & Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#d4af37]/15 via-[#b89326]/5 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#1a2238]/40 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#2a1b14]/30 blur-[100px] rounded-full" />
        
        {/* Subtle architectural geometric grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Brand Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed metadata with bullet separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#d4af37] font-medium">
              <span>Metropolitan Flagship Destination</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>240+ Luxury Maisons</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Michelin Sky Dining</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[68px] font-normal leading-[1.08] tracking-tight text-white max-w-2xl text-balance">
              Where Haute Living Meets Architectural Grace.
            </h1>

            <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed max-w-xl">
              An epicurean and couture haven across six light-filled terraced levels.
              Immerse yourself in heritage luxury maisons, artisan roasteries, CineLuxe IMAX, and tranquil botanical conservatory dining.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('directory')}
                className="px-6 py-3.5 text-sm font-medium text-black bg-[#d4af37] hover:bg-[#e4be42] rounded-md transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.4)] flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Directory</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('floormap')}
                className="px-6 py-3.5 text-sm font-medium text-neutral-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#d4af37]" />
                <span>Interactive Floor Map</span>
              </button>

              <button
                onClick={() => onNavigate('dining')}
                className="px-5 py-3.5 text-sm font-medium text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Utensils className="w-4 h-4 text-[#d4af37]" />
                <span>Reserve Dining</span>
              </button>
            </div>

            {/* Trust and Key Operational Attributes */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="font-serif text-2xl font-light text-white tabular-nums">248</p>
                <p className="text-xs text-neutral-400 mt-0.5">Curated Boutiques</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-light text-white tabular-nums">42</p>
                <p className="text-xs text-neutral-400 mt-0.5">Dining Salons</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-light text-[#d4af37] tabular-nums">
                  {totalAvailableParking}
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">Bays Available Now</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-light text-white tabular-nums">6 Levels</p>
                <p className="text-xs text-neutral-400 mt-0.5">Metro Connected</p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Visual Feature Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl border border-white/15 bg-gradient-to-b from-[#161822] to-[#0e1017] p-6 shadow-2xl overflow-hidden group">
              
              {/* Header inside showcase card */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-neutral-200">Galleria Live Concierge</span>
                </div>
                <span className="text-[11px] text-neutral-400 font-mono tabular-nums">
                  Today · {MALL_INFO.todayHours}
                </span>
              </div>

              {/* Architectural Grand Atrium Visual Canvas (SVG) */}
              <div className="my-5 relative rounded-lg overflow-hidden border border-white/10 bg-[#090b10] h-64 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="skylightGlow" x1="250" y1="0" x2="250" y2="180" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#d4af37" stopOpacity="0.4" />
                      <stop offset="0.6" stopColor="#c59b27" stopOpacity="0.1" />
                      <stop offset="1" stopColor="#090b10" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="glassRoof" x1="0" y1="0" x2="500" y2="120" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ffffff" stopOpacity="0.15" />
                      <stop offset="0.5" stopColor="#d4af37" stopOpacity="0.25" />
                      <stop offset="1" stopColor="#ffffff" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Vaulted Glass Ceiling Structure */}
                  <path d="M50 80 Q250 10 450 80" stroke="#d4af37" strokeWidth="2" opacity="0.6" fill="url(#skylightGlow)" />
                  <path d="M100 85 Q250 25 400 85" stroke="#ffffff" strokeWidth="1" opacity="0.2" />
                  <path d="M150 90 Q250 40 350 90" stroke="#ffffff" strokeWidth="1" opacity="0.15" />
                  
                  {/* Glass diamond lattice struts */}
                  <line x1="250" y1="18" x2="250" y2="140" stroke="#d4af37" strokeWidth="1.5" opacity="0.4" />
                  <line x1="180" y1="35" x2="210" y2="140" stroke="#ffffff" strokeWidth="0.8" opacity="0.2" />
                  <line x1="320" y1="35" x2="290" y2="140" stroke="#ffffff" strokeWidth="0.8" opacity="0.2" />
                  <line x1="120" y1="60" x2="160" y2="140" stroke="#ffffff" strokeWidth="0.8" opacity="0.15" />
                  <line x1="380" y1="60" x2="340" y2="140" stroke="#ffffff" strokeWidth="0.8" opacity="0.15" />

                  {/* Level 5 Terrace Balcony */}
                  <path d="M40 130 Q250 160 460 130" stroke="#d4af37" strokeWidth="2.5" opacity="0.8" />
                  <line x1="50" y1="130" x2="50" y2="150" stroke="#d4af37" strokeWidth="1" opacity="0.4" />
                  <line x1="450" y1="130" x2="450" y2="150" stroke="#d4af37" strokeWidth="1" opacity="0.4" />

                  {/* Level 4 Promenade */}
                  <path d="M30 165 Q250 195 470 165" stroke="#ffffff" strokeWidth="2" opacity="0.5" />

                  {/* Level 2 & 1 Grand Curved Concourse */}
                  <path d="M20 205 Q250 235 480 205" stroke="#d4af37" strokeWidth="3" opacity="0.9" />
                  <path d="M10 250 Q250 280 490 250" stroke="#ffffff" strokeWidth="2" opacity="0.6" />

                  {/* Central Oculus & Water Fountain Feature */}
                  <ellipse cx="250" cy="270" rx="90" ry="18" fill="#132338" stroke="#38bdf8" strokeWidth="1" opacity="0.7" />
                  <ellipse cx="250" cy="270" rx="55" ry="10" fill="#0f172a" stroke="#d4af37" strokeWidth="1" opacity="0.8" />
                  
                  {/* Subtle water fountain jets */}
                  <line x1="250" y1="270" x2="250" y2="235" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                  <line x1="240" y1="270" x2="235" y2="242" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                  <line x1="260" y1="270" x2="265" y2="242" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />

                  {/* Warm light ambient reflections */}
                  <circle cx="250" cy="18" r="8" fill="#d4af37" opacity="0.9" filter="blur(2px)" />
                  <circle cx="100" cy="215" r="3" fill="#e4be42" opacity="0.8" />
                  <circle cx="400" cy="215" r="3" fill="#e4be42" opacity="0.8" />
                  <circle cx="160" cy="175" r="3" fill="#ffffff" opacity="0.8" />
                  <circle cx="340" cy="175" r="3" fill="#ffffff" opacity="0.8" />
                </svg>

                {/* Floating badge inside canvas */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded border border-white/15 text-[11px] text-neutral-300 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#d4af37]" />
                  <span>Central Grand Oculus · 40m Lightwell</span>
                </div>
              </div>

              {/* Direct Floor Jump Tabs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Explore by Level</span>
                  <span className="text-[11px] text-[#d4af37]">Interactive Navigator</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {floorQuickJump.map((f) => (
                    <button
                      key={f.level}
                      onClick={() => {
                        onSelectFloor(f.level);
                        onNavigate('floormap');
                      }}
                      className="px-2 py-1.5 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-left transition-colors cursor-pointer group/btn"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-white group-hover/btn:text-[#d4af37]">
                          {f.level}
                        </span>
                        <ArrowRight className="w-3 h-3 text-neutral-500 group-hover/btn:text-white transition-transform group-hover/btn:translate-x-0.5" />
                      </div>
                      <span className="text-[10px] text-neutral-400 block truncate">
                        {f.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Curbside & Concierge Quick Access */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#d4af37]" />
                  <span>Valet & Taxi Bays: North Rotunda</span>
                </div>
                <button
                  onClick={() => onNavigate('plan-visit')}
                  className="text-xs text-[#d4af37] hover:text-[#e4be42] underline underline-offset-4 cursor-pointer"
                >
                  View Parking Details
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
