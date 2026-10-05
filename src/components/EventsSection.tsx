import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Check, Compass, Ticket, ArrowRight } from 'lucide-react';
import { EVENTS_DATA } from '../data/mallData';
import { MallEvent } from '../types/mall';

interface EventsSectionProps {
  onLocateOnMap: (floor: string, lotId: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onLocateOnMap }) => {
  const [rsvpSuccessId, setRsvpSuccessId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'complimentary' | 'vip' | 'ticketed'>('all');

  const handleRsvp = (eventId: string) => {
    setRsvpSuccessId(eventId);
    setTimeout(() => {
      setRsvpSuccessId(null);
    }, 3500);
  };

  const filteredEvents = EVENTS_DATA.filter((event) => {
    if (activeFilter === 'complimentary') return event.admission === 'Complimentary';
    if (activeFilter === 'vip') return event.admission === 'VIP Members Only';
    if (activeFilter === 'ticketed') return event.admission === 'Ticketed';
    return true;
  });

  return (
    <section id="events" className="py-16 sm:py-24 bg-[#0c0d10] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4af37] font-medium">
              <span>Culture & Exhibitions</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Curated Experiences</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mt-1">
              Events & Seasonal Happenings
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              Immerse yourself in monumental art installations, rare horology salons, and rooftop live jazz.
            </p>
          </div>

          {/* Admission filter buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(['all', 'complimentary', 'vip', 'ticketed'] as const).map((key) => {
              const labels = {
                all: 'All Exhibitions',
                complimentary: 'Complimentary',
                vip: 'VIP Only',
                ticketed: 'Masterclasses',
              };
              return (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeFilter === key
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'bg-white/5 text-neutral-300 hover:text-white border border-white/5'
                  }`}
                >
                  {labels[key]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {filteredEvents.map((event) => {
            const isRsvpd = rsvpSuccessId === event.id;

            return (
              <div
                key={event.id}
                className="rounded-2xl border border-white/10 bg-[#12141c] hover:border-[#d4af37]/40 p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-xl"
              >
                <div className="space-y-4">
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 pb-3 border-b border-white/10">
                    <span className="text-[#d4af37] font-medium">{event.tag}</span>
                    <span className="font-mono text-neutral-300">{event.admission}</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 italic">
                      {event.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs text-neutral-400 p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{event.dates}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{event.location} (Level {event.floor})</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  <button
                    onClick={() => onLocateOnMap(event.floor, `lot-${event.floor.toLowerCase()}-01`)}
                    className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>View Venue Map</span>
                  </button>

                  {isRsvpd ? (
                    <div className="flex items-center gap-1.5 px-4 py-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs rounded-md font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>RSVP Confirmed · Added to Calendar</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRsvp(event.id)}
                      className="px-4 py-2 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e4be42] rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>RSVP / Add to Calendar</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
