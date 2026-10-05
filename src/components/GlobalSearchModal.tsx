import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, MapPin, Compass, ArrowRight, Utensils, Film, Sparkles, ShoppingBag } from 'lucide-react';
import { STORES_DATA, DINING_DATA, CINEMA_DATA, EVENTS_DATA } from '../data/mallData';
import { Store, MovieScreening, MallEvent } from '../types/mall';

interface GlobalSearchModalProps {
  onClose: () => void;
  onSelectStore: (store: Store) => void;
  onLocateOnMap: (floor: string, lotId: string) => void;
  onSelectMovie: (movie: MovieScreening) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  onClose,
  onSelectStore,
  onLocateOnMap,
  onSelectMovie,
}) => {
  const [query, setQuery] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const allStores = useMemo(() => [...STORES_DATA, ...DINING_DATA], []);

  const results = useMemo(() => {
    if (!query.trim()) {
      return {
        stores: allStores.slice(0, 5),
        movies: CINEMA_DATA.slice(0, 2),
        events: EVENTS_DATA.slice(0, 2),
      };
    }
    const q = query.toLowerCase();

    const matchedStores = allStores.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.categoryLabel.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.suiteNumber.toLowerCase().includes(q)
    );

    const matchedMovies = CINEMA_DATA.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.genre.toLowerCase().includes(q) ||
        m.auditorium.toLowerCase().includes(q)
    );

    const matchedEvents = EVENTS_DATA.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
    );

    return {
      stores: matchedStores,
      movies: matchedMovies,
      events: matchedEvents,
    };
  }, [query, allStores]);

  const totalResults = results.stores.length + results.movies.length + results.events.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-[#12141c] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="relative p-4 border-b border-white/10 flex items-center gap-3 bg-[#171a25]">
          <Search className="w-5 h-5 text-[#d4af37] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stores, fine dining, IMAX movies, concierge, suites..."
            className="w-full bg-transparent text-white placeholder-neutral-500 text-sm sm:text-base focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-white px-2 py-1"
            >
              Clear
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] bg-black/40 text-neutral-400 rounded border border-white/10 font-mono">
              ESC
            </kbd>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-6 text-xs">
          {totalResults === 0 ? (
            <div className="py-12 text-center text-neutral-400 space-y-1">
              <p className="font-serif text-lg text-white">No Matches Found</p>
              <p>Try searching for brand names like "Cartier", "Chanel", "Rolex", or "Sushi".</p>
            </div>
          ) : (
            <>
              {/* Boutiques & Dining Results */}
              {results.stores.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-neutral-400 font-semibold px-2">
                    <span>Maisons & Dining ({results.stores.length})</span>
                    <span className="text-[#d4af37]">Boutiques</span>
                  </div>
                  <div className="space-y-1">
                    {results.stores.map((store) => (
                      <div
                        key={store.id}
                        onClick={() => {
                          onClose();
                          onSelectStore(store);
                        }}
                        className="p-3 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-between gap-4 transition-colors cursor-pointer group"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-base font-medium text-white group-hover:text-[#d4af37] transition-colors">
                              {store.name}
                            </span>
                            <span className="text-[10px] text-neutral-400">
                              · {store.categoryLabel}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 line-clamp-1">
                            {store.tagline}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-mono text-[11px] text-neutral-400">
                            {store.floor} · {store.suiteNumber}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onClose();
                              onLocateOnMap(store.floor, store.mapLotId);
                            }}
                            className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white"
                            title="Show on map"
                          >
                            <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CineLuxe Screenings Results */}
              {results.movies.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-neutral-400 font-semibold px-2">
                    <span>CineLuxe IMAX Screenings ({results.movies.length})</span>
                    <span className="text-[#d4af37]">Level 5</span>
                  </div>
                  <div className="space-y-1">
                    {results.movies.map((movie) => (
                      <div
                        key={movie.id}
                        onClick={() => {
                          onClose();
                          onSelectMovie(movie);
                        }}
                        className="p-3 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-between gap-4 transition-colors cursor-pointer group"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Film className="w-3.5 h-3.5 text-[#d4af37]" />
                            <span className="font-serif text-base font-medium text-white group-hover:text-[#d4af37] transition-colors">
                              {movie.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400">
                            {movie.auditorium} · {movie.duration}
                          </p>
                        </div>
                        <span className="text-[11px] text-[#d4af37] font-semibold">
                          Reserve
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events & Happenings */}
              {results.events.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-neutral-400 font-semibold px-2">
                    <span>Exhibitions & Culture ({results.events.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.events.map((ev) => (
                      <div
                        key={ev.id}
                        onClick={() => {
                          onClose();
                          onLocateOnMap(ev.floor, `lot-${ev.floor.toLowerCase()}-01`);
                        }}
                        className="p-3 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-between gap-4 transition-colors cursor-pointer group"
                      >
                        <div>
                          <p className="font-serif text-base text-white group-hover:text-[#d4af37]">
                            {ev.title}
                          </p>
                          <p className="text-[11px] text-neutral-400">
                            {ev.dates} · {ev.location}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#0e1017] border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-500 px-4">
          <span>Search 248 boutiques, 42 dining salons & IMAX</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
