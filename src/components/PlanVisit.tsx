import React, { useState } from 'react';
import { 
  Car, 
  MapPin, 
  Clock, 
  Zap, 
  ShoppingBag, 
  Sparkles, 
  CreditCard, 
  Compass, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  Train,
  Plane
} from 'lucide-react';
import { PARKING_DATA, MALL_INFO } from '../data/mallData';

export const PlanVisit: React.FC = () => {
  const [carZoneInput, setCarZoneInput] = useState('');
  const [savedCarZone, setSavedCarZone] = useState<string | null>(null);

  const handleSaveCarZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carZoneInput.trim()) return;
    setSavedCarZone(carZoneInput);
    setCarZoneInput('');
  };

  const amenities = [
    {
      icon: <Car className="w-5 h-5 text-[#d4af37]" />,
      title: 'White-Glove Valet Parking',
      description: 'Curbside valet check-in at North & South Rotundas. Vehicles stored in climate-monitored executive bays with optional hand-wash detailing.',
    },
    {
      icon: <ShoppingBag className="w-5 h-5 text-[#d4af37]" />,
      title: 'Hands-Free Shopping Delivery',
      description: 'Leave boutique packages with store associates. The Aurelia Porter team gathers them and delivers directly to your vehicle boot or hotel room.',
    },
    {
      icon: <CreditCard className="w-5 h-5 text-[#d4af37]" />,
      title: 'Global Blue VIP Tax Refund Lounge',
      description: 'Non-resident international travelers can claim instant cash or credit card VAT refunds in our plush private Level 1 salon.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#d4af37]" />,
      title: 'Private Styling Suites',
      description: 'Dedicated dressing salons on Level 2 with curated champagne service, bespoke tailoring alterations, and personal stylists.',
    },
  ];

  return (
    <section id="plan-visit" className="py-16 sm:py-24 bg-[#0c0d10] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="pb-10 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4af37] font-medium">
            <span>Visitor Services & Transport</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Plan Your Journey</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mt-1">
            Visitor Concierge & Parking
          </h2>
          <p className="text-neutral-400 text-sm mt-2 max-w-2xl leading-relaxed">
            Everything you need for an effortless visit: live smart parking monitors, direct transit connections, luggage cloakrooms, and white-glove porter services.
          </p>
        </div>

        {/* Live Parking Availability Grid */}
        <div className="mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-serif text-2xl text-white font-normal">
                Live Smart Parking Availability
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Real-time ultrasonic bay sensors across Levels P1, P2 & P3 · Total 1,850 bays
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sensors Updated Live</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PARKING_DATA.map((bay) => {
              const occupied = bay.totalBays - bay.availableBays;
              const percentage = Math.round((occupied / bay.totalBays) * 100);

              return (
                <div
                  key={bay.level}
                  className="rounded-xl border border-white/10 bg-[#12141c] p-6 space-y-4 shadow-lg"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="font-mono text-sm font-bold text-white px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      Level {bay.level}
                    </span>
                    <span className={`text-xs font-semibold ${
                      bay.status === 'Nearly Full' ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {bay.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {bay.name}
                    </h4>
                    <p className="font-serif text-3xl font-normal text-white mt-2 tabular-nums">
                      {bay.availableBays}{' '}
                      <span className="text-xs font-sans text-neutral-400 font-normal">
                        bays available / {bay.totalBays}
                      </span>
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          percentage > 85 ? 'bg-amber-400' : 'bg-[#d4af37]'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                      <span>{percentage}% Occupied</span>
                      <span>Level Capacity</span>
                    </div>
                  </div>

                  {/* EV Fast Charging info */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>EV Fast Chargers</span>
                    </span>
                    <span className="text-white font-mono font-medium">
                      {bay.evAvailable} of {bay.evTotal} free
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick "Remember My Parked Car" Feature */}
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Car className="w-4 h-4 text-[#d4af37]" />
                <span>Save Your Parked Bay Location</span>
              </span>
              <p className="text-xs text-neutral-400">
                Enter your pillar or zone code (e.g. Level P2, Section B-14) so you can recall it effortlessly later.
              </p>
            </div>

            {savedCarZone ? (
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                  Saved: {savedCarZone}
                </div>
                <button
                  onClick={() => setSavedCarZone(null)}
                  className="text-xs text-neutral-400 hover:text-white underline"
                >
                  Change
                </button>
              </div>
            ) : (
              <form onSubmit={handleSaveCarZone} className="flex gap-2">
                <input
                  type="text"
                  value={carZoneInput}
                  onChange={(e) => setCarZoneInput(e.target.value)}
                  placeholder="e.g. P2 Pillar Green 12"
                  className="px-3 py-1.5 text-xs bg-black/40 border border-white/15 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold text-black bg-[#d4af37] rounded hover:bg-[#e4be42] transition-colors cursor-pointer"
                >
                  Save Bay
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Concierge Services Grid */}
        <div className="mt-16">
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-8">
            Bespoke Concierge Amenities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-white/10 bg-[#12141c] space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="font-serif text-lg text-white font-normal">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Transport & Access Section */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-[#12141c] p-8 lg:p-10">
          <h3 className="font-serif text-2xl text-white font-normal mb-6">
            Getting to Aurelia Galleria
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
            <div className="space-y-2">
              <span className="flex items-center gap-2 text-white font-semibold text-sm">
                <Train className="w-4 h-4 text-[#d4af37]" />
                <span>Metro Direct Link</span>
              </span>
              <p className="text-neutral-400 leading-relaxed">
                Direct underground pedestrian avenue connecting Central Metro Station (Lines 1 & 4) directly to Galleria Level B1. No street exposure required.
              </p>
            </div>

            <div className="space-y-2">
              <span className="flex items-center gap-2 text-white font-semibold text-sm">
                <Car className="w-4 h-4 text-[#d4af37]" />
                <span>Valet & Chauffeur Drop-off</span>
              </span>
              <p className="text-neutral-400 leading-relaxed">
                Dedicated private driveway at 88 Grand Promenade, North Rotunda. GPS coordinates: 40.7580° N, 73.9855° W.
              </p>
            </div>

            <div className="space-y-2">
              <span className="flex items-center gap-2 text-white font-semibold text-sm">
                <Plane className="w-4 h-4 text-[#d4af37]" />
                <span>Airport Express</span>
              </span>
              <p className="text-neutral-400 leading-relaxed">
                22 minutes direct transfer via Metropolitan Express Rail directly into the Concourse check-in terminal.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
