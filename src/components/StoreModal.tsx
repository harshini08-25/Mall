import React, { useState } from 'react';
import { X, MapPin, Clock, Phone, Sparkles, Check, Compass, Calendar, ArrowRight } from 'lucide-react';
import { Store, DiningItem } from '../types/mall';

interface StoreModalProps {
  store: Store | DiningItem | null;
  onClose: () => void;
  onLocateOnMap: (floor: string, lotId: string) => void;
  onOpenDiningBooking?: (storeId: string) => void;
}

export const StoreModal: React.FC<StoreModalProps> = ({
  store,
  onClose,
  onLocateOnMap,
  onOpenDiningBooking,
}) => {
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryNotes, setInquiryNotes] = useState('');

  if (!store) return null;

  const isDining = 'cuisine' in store;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryNotes('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#12141c] border border-white/15 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner with Brand Monogram Accent */}
        <div className="relative bg-gradient-to-r from-[#1a1d28] via-[#151824] to-[#1a1d28] p-6 border-b border-white/10 flex items-start justify-between">
          <div className="space-y-1 pr-8">
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium tracking-wider uppercase">
              <span>{store.categoryLabel}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>{store.floorName}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="font-mono text-neutral-300">{store.suiteNumber}</span>
            </div>
            <h2 className="font-serif text-3xl font-normal text-white tracking-tight">
              {store.name}
            </h2>
            <p className="text-sm text-neutral-400 italic">
              {store.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Active Privilege/Promotion Highlight if available */}
          {store.promotion && (
            <div className="p-4 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">
                  {store.promotion.title}
                </h4>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  {store.promotion.description}
                </p>
                <p className="text-[11px] text-[#d4af37] mt-1.5 font-mono">
                  Valid until {store.promotion.validUntil}
                </p>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
              About the Maison
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              {store.description}
            </p>
          </div>

          {/* Practical Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-white/5 border border-white/10 text-xs">
            <div className="space-y-1">
              <span className="text-neutral-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Operating Hours</span>
              </span>
              <p className="text-white font-medium pl-5">{store.hours}</p>
            </div>

            <div className="space-y-1">
              <span className="text-neutral-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Direct Boutique Phone</span>
              </span>
              <p className="text-white font-mono pl-5">{store.phone}</p>
            </div>

            <div className="space-y-1">
              <span className="text-neutral-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Exact Location</span>
              </span>
              <p className="text-white font-medium pl-5">{store.floorName} ({store.suiteNumber})</p>
            </div>

            {isDining && (
              <div className="space-y-1">
                <span className="text-neutral-400">Dress Code</span>
                <p className="text-white font-medium">{(store as DiningItem).dressCode || 'Smart Casual'}</p>
              </div>
            )}
          </div>

          {/* Exclusive Services */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
              Complimentary Boutique Amenities & Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {store.services.map((service, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-neutral-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Private Appointment / Concierge Inquiry Request Form */}
          <div className="pt-4 border-t border-white/10">
            {inquirySent ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-center space-y-1 text-xs text-emerald-300">
                <p className="font-semibold text-sm">Appointment Request Transmitted</p>
                <p>The Aurelia Concierge and {store.name} team will contact you shortly to confirm your booking.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                    Reserve Private Consultation or Fitting
                  </h4>
                  <span className="text-[11px] text-neutral-500">Aurelia Concierge Service</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={inquiryNotes}
                    onChange={(e) => setInquiryNotes(e.target.value)}
                    placeholder="Enter your phone or email & preferred date..."
                    className="flex-1 px-3 py-2 text-xs bg-black/40 border border-white/15 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e4be42] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Request Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#0e1017] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onLocateOnMap(store.floor, store.mapLotId);
            }}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-md transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span>Show Exact Spot on Floor Map</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {isDining && onOpenDiningBooking && (
            <button
              onClick={() => {
                onClose();
                onOpenDiningBooking(store.id);
              }}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e4be42] rounded-md transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table Reservation</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
