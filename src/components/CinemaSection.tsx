import React from 'react';
import { Film, Sparkles, Clock, Ticket, Compass, Play } from 'lucide-react';
import { CINEMA_DATA } from '../data/mallData';
import { MovieScreening } from '../types/mall';

interface CinemaSectionProps {
  onSelectMovie: (movie: MovieScreening) => void;
  onLocateOnMap: (floor: string, lotId: string) => void;
}

export const CinemaSection: React.FC<CinemaSectionProps> = ({
  onSelectMovie,
  onLocateOnMap,
}) => {
  return (
    <section id="cinema" className="py-16 sm:py-24 bg-[#0e1017] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4af37] font-medium">
              <span>Grand Entertainment & Arts</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Level 5 Cultural Pavilion</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mt-1">
              CineLuxe IMAX & Theatres
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-2xl leading-relaxed">
              Experience the pinnacle of cinema projection with Dual 4K Laser IMAX, Dolby Atmos 64-speaker sound fields, and private twin-reclining velvet bed auditoriums with in-theatre butler service.
            </p>
          </div>

          <button
            onClick={() => onLocateOnMap('L5', 'lot-l5-01')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-md transition-colors cursor-pointer shrink-0"
          >
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span>Locate CineLuxe on Level 5</span>
          </button>
        </div>

        {/* Feature Film Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {CINEMA_DATA.map((movie) => (
            <div
              key={movie.id}
              className="rounded-2xl border border-white/10 bg-[#12141d] hover:border-[#d4af37]/40 p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-xl relative overflow-hidden group"
            >
              {/* Subtle Atmospheric Gradient Backdrop */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${movie.posterBg} opacity-20 pointer-events-none transition-opacity group-hover:opacity-30`}
              />

              <div className="relative space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-neutral-400 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-[#d4af37] font-medium">{movie.auditorium}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span>{movie.duration}</span>
                  </div>
                  <span className="font-mono text-neutral-300 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">
                    {movie.rating}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal group-hover:text-[#d4af37] transition-colors">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {movie.genre} · {movie.hallNumber}
                  </p>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {movie.synopsis}
                </p>

                {/* Available showtimes buttons */}
                <div className="pt-2 space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                    Today's Sessions
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {movie.times.map((time) => (
                      <button
                        key={time}
                        onClick={() => onSelectMovie(movie)}
                        className="px-3 py-1.5 bg-white/5 hover:bg-[#d4af37] hover:text-black border border-white/10 rounded font-mono text-xs text-neutral-200 transition-colors cursor-pointer"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="relative mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Complimentary Valet with Ticket</span>
                </span>

                <button
                  onClick={() => onSelectMovie(movie)}
                  className="px-4 py-2 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e4be42] rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Reserve Seats</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
