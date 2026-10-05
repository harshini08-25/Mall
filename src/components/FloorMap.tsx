import React, { useState, useId } from 'react';
import { 
  Compass, 
  MapPin, 
  Navigation, 
  Layers, 
  Info, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  Clock, 
  Maximize2, 
  RotateCcw,
  Footprints
} from 'lucide-react';
import { FLOOR_PLANS, STORES_DATA, DINING_DATA } from '../data/mallData';
import { FloorLevel, MapLot, Facility, Store } from '../types/mall';

interface FloorMapProps {
  currentFloor: FloorLevel;
  onFloorChange: (floor: FloorLevel) => void;
  highlightedLotId: string | null;
  onSelectStore: (store: Store) => void;
}

export const FloorMap: React.FC<FloorMapProps> = ({
  currentFloor,
  onFloorChange,
  highlightedLotId,
  onSelectStore,
}) => {
  const [selectedLot, setSelectedLot] = useState<MapLot | null>(null);
  const [hoveredLot, setHoveredLot] = useState<MapLot | null>(null);
  const [showFacilities, setShowFacilities] = useState(true);
  const [wayfindingActive, setWayfindingActive] = useState(false);
  const [startPoint, setStartPoint] = useState<'entrance' | 'elevator' | 'metro'>('entrance');
  const [selectedDestinationLotId, setSelectedDestinationLotId] = useState<string>('');

  const floorPlan = FLOOR_PLANS[currentFloor];
  const allStores = [...STORES_DATA, ...DINING_DATA];

  // If a lot was targeted from directory
  React.useEffect(() => {
    if (highlightedLotId) {
      const match = floorPlan.lots.find((l) => l.id === highlightedLotId);
      if (match) {
        setSelectedLot(match);
        setSelectedDestinationLotId(match.id);
      }
    }
  }, [highlightedLotId, floorPlan]);

  const activeLot = selectedLot || hoveredLot;
  const activeStore = activeLot?.storeId
    ? allStores.find((s) => s.id === activeLot.storeId)
    : null;

  // Wayfinding start point coordinates
  const getStartCoordinates = () => {
    switch (startPoint) {
      case 'entrance':
        return { x: 330, y: 350, label: 'Grand Promenade Main Entrance' };
      case 'elevator':
        return { x: 440, y: 60, label: 'Central Scenic Glass Elevators' };
      case 'metro':
        return { x: 80, y: 240, label: 'Underground Metro Link Gate' };
      default:
        return { x: 330, y: 350, label: 'Grand Entrance' };
    }
  };

  const destinationLot = floorPlan.lots.find(
    (l) => l.id === (selectedDestinationLotId || selectedLot?.id)
  );

  const startCoords = getStartCoordinates();
  const destCoords = destinationLot
    ? { x: destinationLot.x + destinationLot.width / 2, y: destinationLot.y + destinationLot.height / 2 }
    : null;

  const floorTabs: { id: FloorLevel; label: string; name: string }[] = [
    { id: 'B1', label: 'B1', name: 'Metro Concourse' },
    { id: 'L1', label: 'L1', name: 'Grand Promenade' },
    { id: 'L2', label: 'L2', name: 'Designer Boulevard' },
    { id: 'L3', label: 'L3', name: 'Tech & Lifestyle' },
    { id: 'L4', label: 'L4', name: 'Sky Dining Terraces' },
    { id: 'L5', label: 'L5', name: 'CineLuxe & Spa' },
  ];

  return (
    <section id="floormap" className="py-16 sm:py-20 bg-[#0e1017] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4af37] font-medium">
              <span>Architectural Wayfinding</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Interactive 6-Level Navigator</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mt-1">
              Interactive Floor Map
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              Navigate boutiques, dining pavilions, elevators, and valet pick-up points with interactive turn-by-turn routing.
            </p>
          </div>

          {/* Quick Wayfinding Mode Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setWayfindingActive(!wayfindingActive)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                wayfindingActive
                  ? 'bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/15'
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>{wayfindingActive ? 'Exit Walking Route' : 'Plan Walking Route'}</span>
            </button>

            <button
              onClick={() => setShowFacilities(!showFacilities)}
              className={`px-3 py-2.5 rounded-md text-xs transition-colors border cursor-pointer ${
                showFacilities
                  ? 'bg-white/10 text-[#d4af37] border-[#d4af37]/40'
                  : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
              }`}
              title="Toggle Facilities"
            >
              Amenities {showFacilities ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        {/* Floor Level Selector Tabs */}
        <div className="py-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {floorTabs.map((tab) => {
              const isActive = currentFloor === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onFloorChange(tab.id);
                    setSelectedLot(null);
                  }}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-left transition-all cursor-pointer shrink-0 border ${
                    isActive
                      ? 'bg-[#1b1e2a] border-[#d4af37] text-white shadow-lg'
                      : 'bg-[#12141c] border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className={`font-mono text-sm font-bold px-2 py-0.5 rounded ${
                    isActive ? 'bg-[#d4af37] text-black' : 'bg-white/5 text-neutral-300'
                  }`}>
                    {tab.label}
                  </span>
                  <div>
                    <span className="text-xs font-semibold block text-white leading-tight">
                      {tab.name}
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">
                      Level {tab.id}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Wayfinding Route Configuration Panel (When Active) */}
        {wayfindingActive && (
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#171a26] to-[#12141d] border border-[#d4af37]/30 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Footprints className="w-4 h-4 text-[#d4af37]" />
                <span className="text-neutral-300 font-medium">Start From:</span>
                <select
                  value={startPoint}
                  onChange={(e) => setStartPoint(e.target.value as any)}
                  className="px-2.5 py-1.5 bg-[#0e1017] border border-white/15 rounded text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                >
                  <option value="entrance">Main Promenade Entrance / Valet</option>
                  <option value="elevator">Central Scenic Glass Elevators</option>
                  <option value="metro">Subway Concourse Link</option>
                </select>
              </div>

              <span className="text-neutral-500">→</span>

              <div className="flex items-center gap-2">
                <span className="text-neutral-300 font-medium">Destination:</span>
                <select
                  value={selectedDestinationLotId || ''}
                  onChange={(e) => {
                    setSelectedDestinationLotId(e.target.value);
                    const match = floorPlan.lots.find((l) => l.id === e.target.value);
                    if (match) setSelectedLot(match);
                  }}
                  className="px-2.5 py-1.5 bg-[#0e1017] border border-white/15 rounded text-white focus:outline-none focus:border-[#d4af37] cursor-pointer max-w-xs"
                >
                  <option value="">Select Boutique or Lounge...</option>
                  {floorPlan.lots
                    .filter((l) => l.type === 'store' || l.type === 'dining' || l.type === 'anchor')
                    .map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {destinationLot && (
              <div className="text-xs text-[#d4af37] font-medium flex items-center gap-1.5 shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Estimated Walk: 1 min · 35 meters</span>
              </div>
            )}
          </div>
        )}

        {/* Architectural SVG Map Canvas */}
        <div className="relative rounded-2xl border border-white/15 bg-[#08090d] p-4 sm:p-8 shadow-2xl overflow-hidden">
          
          {/* Subtle Map Grid lines */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Floor Info Top Left Over Map */}
          <div className="absolute top-6 left-6 z-10 pointer-events-none">
            <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
              {floorPlan.title}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5 max-w-md">
              {floorPlan.subtitle}
            </p>
          </div>

          {/* Interactive SVG Render */}
          <div className="w-full overflow-x-auto">
            <svg 
              className="w-full min-w-[700px] h-[400px] sm:h-[480px]" 
              viewBox="0 0 1000 420" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="anchorGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#1e2230" />
                  <stop offset="100%" stopColor="#12151f" />
                </linearGradient>
                <linearGradient id="atriumGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#102538" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#08111a" stopOpacity="0.8" />
                </linearGradient>
                <filter id="lotGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#d4af37" floodOpacity="0.6" />
                </filter>
              </defs>

              {/* Perimeter Architectural Wall Outline */}
              <rect
                x="20"
                y="30"
                width="960"
                height="360"
                rx="18"
                fill="#0c0e14"
                stroke="#252a3a"
                strokeWidth="2"
              />

              {/* Central Promenade Walkway Corridor */}
              <rect
                x="40"
                y="190"
                width="920"
                height="30"
                fill="#121622"
                stroke="#1d2230"
                strokeWidth="1"
                opacity="0.8"
              />
              <line x1="40" y1="205" x2="960" y2="205" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="6 6" opacity="0.15" />

              {/* Central Lightwell / Void Opening */}
              <rect
                x="440"
                y="70"
                width="160"
                height="220"
                rx="12"
                fill="url(#atriumGradient)"
                stroke="#38bdf8"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.6"
              />
              <text x="520" y="180" fill="#38bdf8" textAnchor="middle" fontSize="11" fontFamily="sans-serif" letterSpacing="2" opacity="0.8">
                ATRIUM LIGHTWELL
              </text>

              {/* Draw All Floor Lots */}
              {floorPlan.lots.map((lot) => {
                const isSelected = selectedLot?.id === lot.id;
                const isHovered = hoveredLot?.id === lot.id;
                const isDestination = destinationLot?.id === lot.id;

                let strokeColor = '#2b3145';
                let fillColor = '#141722';

                if (lot.isAnchor) {
                  strokeColor = '#d4af37';
                  fillColor = '#181b26';
                }
                if (lot.type === 'garden') {
                  fillColor = '#0f241a';
                  strokeColor = '#10b981';
                }
                if (lot.type === 'atrium') {
                  fillColor = '#102538';
                  strokeColor = '#38bdf8';
                }
                if (isSelected || isDestination) {
                  strokeColor = '#d4af37';
                  fillColor = '#282d3e';
                } else if (isHovered) {
                  strokeColor = '#ffffff';
                  fillColor = '#1c202d';
                }

                return (
                  <g
                    key={lot.id}
                    onClick={() => {
                      setSelectedLot(lot);
                      setSelectedDestinationLotId(lot.id);
                    }}
                    onMouseEnter={() => setHoveredLot(lot)}
                    onMouseLeave={() => setHoveredLot(null)}
                    className="cursor-pointer transition-all duration-150"
                    filter={isSelected || isDestination ? 'url(#lotGlow)' : undefined}
                  >
                    <rect
                      x={lot.x}
                      y={lot.y}
                      width={lot.width}
                      height={lot.height}
                      rx="6"
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isSelected || isDestination ? '2.5' : lot.isAnchor ? '1.5' : '1'}
                    />

                    {/* Lot Name & Identifier */}
                    <text
                      x={lot.x + lot.width / 2}
                      y={lot.y + lot.height / 2 - 2}
                      fill={isSelected || isDestination ? '#d4af37' : '#ffffff'}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={lot.isAnchor ? '12' : '10'}
                      fontWeight={lot.isAnchor ? '600' : '400'}
                      fontFamily="sans-serif"
                    >
                      {lot.name}
                    </text>

                    {/* Tag / Category beneath text if space allows */}
                    {lot.height >= 80 && (
                      <text
                        x={lot.x + lot.width / 2}
                        y={lot.y + lot.height / 2 + 14}
                        fill="#8e95aa"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="8"
                        fontFamily="sans-serif"
                        letterSpacing="1"
                      >
                        {(lot.type === 'anchor' ? 'Flagship Maison' : lot.category).toUpperCase()}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Wayfinding Glowing Path from Start to Destination */}
              {wayfindingActive && destCoords && (
                <g className="animate-in fade-in duration-300">
                  {/* Start Point Marker */}
                  <circle cx={startCoords.x} cy={startCoords.y} r="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                  <circle cx={startCoords.x} cy={startCoords.y} r="16" fill="#38bdf8" opacity="0.25" className="animate-ping" />
                  <text x={startCoords.x} y={startCoords.y - 12} fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                    START
                  </text>

                  {/* Animated Path via central corridor */}
                  <path
                    d={`M ${startCoords.x} ${startCoords.y} L ${startCoords.x} 205 L ${destCoords.x} 205 L ${destCoords.x} ${destCoords.y}`}
                    stroke="#d4af37"
                    strokeWidth="3.5"
                    strokeDasharray="8 6"
                    fill="none"
                    strokeLinecap="round"
                  >
                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                  </path>

                  {/* Destination Pin Marker */}
                  <circle cx={destCoords.x} cy={destCoords.y} r="8" fill="#d4af37" stroke="#ffffff" strokeWidth="2" />
                  <circle cx={destCoords.x} cy={destCoords.y} r="18" fill="#d4af37" opacity="0.3" className="animate-ping" />
                  <text x={destCoords.x} y={destCoords.y - 14} fill="#d4af37" fontSize="11" fontWeight="bold" textAnchor="middle">
                    DESTINATION
                  </text>
                </g>
              )}

              {/* Facilities Layer Icons */}
              {showFacilities &&
                floorPlan.facilities.map((fac) => (
                  <g key={fac.id} className="cursor-help">
                    <circle cx={fac.x} cy={fac.y} r="10" fill="#1b2030" stroke="#d4af37" strokeWidth="1" />
                    <text
                      x={fac.x}
                      y={fac.y}
                      fill="#e6c875"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {fac.type === 'elevator' ? 'ELV' : fac.type === 'restroom' ? 'WC' : fac.type === 'valet' ? 'VAL' : fac.type === 'metro' ? 'MTR' : 'INFO'}
                    </text>
                  </g>
                ))}
            </svg>
          </div>

          {/* Map Legend */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#181b26] border border-[#d4af37]" />
                <span>Flagship Maison</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#141722] border border-[#2b3145]" />
                <span>Boutique / Lounge</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#102538] border border-[#38bdf8]" />
                <span>Atrium / Lightwell</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#1b2030] border border-[#d4af37] text-[8px] flex items-center justify-center text-[#d4af37] font-bold">
                  ELV
                </span>
                <span>Elevator Core</span>
              </span>
            </div>

            <div className="text-[11px] text-neutral-500">
              Click any store block to inspect boutique details or initiate route
            </div>
          </div>
        </div>

        {/* Selected Lot Detail Card (Immediate feedback right beneath the map) */}
        {activeLot && (
          <div className="mt-6 p-6 rounded-xl bg-[#141722] border border-[#d4af37]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium uppercase tracking-wider">
                <span>Selected Destination</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>Level {activeLot.floor}</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="text-neutral-300 font-mono">{activeLot.id}</span>
              </div>
              <h4 className="font-serif text-2xl font-normal text-white">
                {activeLot.name}
              </h4>
              <p className="text-xs text-neutral-400">
                {activeStore ? activeStore.tagline : 'Specialty Destination & Architectural Zone'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {activeStore && (
                <button
                  onClick={() => onSelectStore(activeStore)}
                  className="px-4 py-2.5 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e4be42] rounded-md transition-colors cursor-pointer"
                >
                  View Boutique Dossier
                </button>
              )}

              <button
                onClick={() => {
                  setWayfindingActive(true);
                  setSelectedDestinationLotId(activeLot.id);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-md transition-colors cursor-pointer"
              >
                <Footprints className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Navigate Route Here</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
