import React, { useState, useMemo } from 'react';
import { Search, Filter, Compass, Sparkles, LayoutGrid, List, ArrowUpRight, Phone, Clock } from 'lucide-react';
import { STORES_DATA, DINING_DATA } from '../data/mallData';
import { Store, StoreCategory, FloorLevel } from '../types/mall';

interface DirectoryProps {
  onSelectStore: (store: Store) => void;
  onLocateOnMap: (floor: string, lotId: string) => void;
}

export const Directory: React.FC<DirectoryProps> = ({ onSelectStore, onLocateOnMap }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<StoreCategory>('all');
  const [selectedFloor, setSelectedFloor] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Combine stores and dining
  const allDirectoryItems = useMemo(() => {
    return [...STORES_DATA, ...DINING_DATA];
  }, []);

  const categories: { id: StoreCategory; label: string }[] = [
    { id: 'all', label: 'All Maisons' },
    { id: 'fashion', label: 'Haute Couture' },
    { id: 'jewellery', label: 'Fine Jewellery & Watches' },
    { id: 'beauty', label: 'Beauty & Fragrance' },
    { id: 'dining', label: 'Fine Dining' },
    { id: 'cafe', label: 'Cafés & Pâtisseries' },
    { id: 'tech', label: 'Tech & Lifestyle' },
  ];

  const floors: { id: string; label: string }[] = [
    { id: 'all', label: 'All Levels' },
    { id: 'B1', label: 'Level B1 (Metro)' },
    { id: 'L1', label: 'Level 1 (Grand Promenade)' },
    { id: 'L2', label: 'Level 2 (Designer)' },
    { id: 'L3', label: 'Level 3 (Tech & Living)' },
    { id: 'L4', label: 'Level 4 (Sky Dining)' },
    { id: 'L5', label: 'Level 5 (CineLuxe)' },
  ];

  const filteredItems = useMemo(() => {
    return allDirectoryItems.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Floor match
      if (selectedFloor !== 'all' && item.floor !== selectedFloor) {
        return false;
      }
      // Search term
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesTagline = item.tagline.toLowerCase().includes(query);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(query));
        const matchesServices = item.services.some((s) => s.toLowerCase().includes(query));
        const matchesSuite = item.suiteNumber.toLowerCase().includes(query);
        return matchesName || matchesTagline || matchesTags || matchesServices || matchesSuite;
      }
      return true;
    });
  }, [allDirectoryItems, selectedCategory, selectedFloor, searchTerm]);

  return (
    <section id="directory" className="py-16 sm:py-20 bg-[#0c0d10] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4af37] font-medium">
              <span>Directory of Excellence</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>240+ Boutiques & Salons</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mt-1">
              Curated Directory
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              Filter by luxury category or floor level to locate flagship boutiques, private salons, and dining destinations.
            </p>
          </div>

          {/* View Mode & Count */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-neutral-400 font-mono">
              Showing {filteredItems.length} of {allDirectoryItems.length} destinations
            </span>
            <div className="flex items-center bg-white/5 p-1 rounded-md border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#d4af37] text-black shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
                aria-label="Grid view"
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-[#d4af37] text-black shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
                aria-label="List view"
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="py-6 space-y-4">
          {/* Search bar and Floor selector */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search boutiques, timepieces, fragrances, cuisines..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-md text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Floor Dropdown filter */}
            <div className="sm:w-64">
              <select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#141722] border border-white/10 rounded-md text-sm text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
              >
                {floors.map((floor) => (
                  <option key={floor.id} value={floor.id}>
                    {floor.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Interactive Category Filter Tabs (Functional segmented controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Directory Content: Grid or List */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center rounded-xl bg-white/5 border border-white/10 p-8 space-y-3">
            <p className="font-serif text-2xl text-white">No Maisons Found</p>
            <p className="text-sm text-neutral-400 max-w-md mx-auto">
              We couldn't find any boutiques matching "{searchTerm}". Try clearing your filters or exploring another level.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedFloor('all');
              }}
              className="mt-2 px-4 py-2 text-xs font-semibold text-black bg-[#d4af37] rounded-md cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredItems.map((store) => (
              <div
                key={store.id}
                onClick={() => onSelectStore(store)}
                className="group relative rounded-xl border border-white/10 bg-[#12141d] hover:border-[#d4af37]/50 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer"
              >
                <div>
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <span>{store.categoryLabel}</span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="text-[#d4af37] font-medium">{store.floor}</span>
                    </div>
                    <span className="font-mono text-neutral-400 text-[11px]">{store.suiteNumber}</span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="pt-4 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl font-normal text-white group-hover:text-[#d4af37] transition-colors">
                        {store.name}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-[#d4af37] transition-colors" />
                    </div>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {store.tagline}
                    </p>
                  </div>

                  {/* Promotion kicker banner if present */}
                  {store.promotion && (
                    <div className="mt-4 p-2.5 rounded bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <p className="text-[11px] text-[#e8c875] line-clamp-1">
                        {store.promotion.title}
                      </p>
                    </div>
                  )}

                  {/* Services preview */}
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block">
                      Featured Services
                    </span>
                    <p className="text-xs text-neutral-300 truncate">
                      {store.services.slice(0, 2).join(' · ')}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions Row */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-mono flex items-center gap-1.5 text-[11px]">
                    <Clock className="w-3 h-3 text-[#d4af37]" />
                    <span>{store.hours.split('·')[0]}</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLocateOnMap(store.floor, store.mapLotId);
                    }}
                    className="flex items-center gap-1 text-[#d4af37] hover:text-[#e4be42] font-medium py-1 px-2 rounded hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Floor Map</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="rounded-xl border border-white/10 bg-[#12141d] overflow-hidden divide-y divide-white/5">
            {filteredItems.map((store) => (
              <div
                key={store.id}
                onClick={() => onSelectStore(store)}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors cursor-pointer group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-xl font-normal text-white group-hover:text-[#d4af37] transition-colors">
                      {store.name}
                    </h3>
                    <span className="text-xs text-neutral-400 font-medium">
                      {store.categoryLabel}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-1 max-w-xl">
                    {store.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-6 text-xs text-neutral-400 shrink-0">
                  <div className="text-right hidden md:block">
                    <p className="text-white font-medium">{store.floorName}</p>
                    <p className="font-mono text-neutral-400 text-[11px]">{store.suiteNumber}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLocateOnMap(store.floor, store.mapLotId);
                      }}
                      className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Locate</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStore(store);
                      }}
                      className="px-3 py-1.5 rounded bg-[#d4af37] hover:bg-[#e4be42] text-black font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
