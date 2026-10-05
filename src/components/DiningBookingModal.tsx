import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Sparkles, Check, Utensils, MapPin, ShieldCheck } from 'lucide-react';
import { DINING_DATA } from '../data/mallData';
import { DiningItem } from '../types/mall';

interface DiningBookingModalProps {
  initialRestaurantId?: string | null;
  onClose: () => void;
}

export const DiningBookingModal: React.FC<DiningBookingModalProps> = ({
  initialRestaurantId,
  onClose,
}) => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>(
    initialRestaurantId || DINING_DATA[0].id
  );
  const [partySize, setPartySize] = useState<number>(2);
  const [bookingDate, setBookingDate] = useState<string>('2026-10-06');
  const [bookingTime, setBookingTime] = useState<string>('07:30 PM');
  const [seatingArea, setSeatingArea] = useState<string>('Skyline Terrace Banquette');
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  const restaurant = DINING_DATA.find((r) => r.id === selectedRestaurantId) || DINING_DATA[0];

  const timeSlots = [
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM'
  ];

  const seatingOptions = [
    'Skyline Terrace Banquette',
    'Main Dining Salon',
    'Chef\'s Counter (Private Viewing)',
    'Intimate Corner Booth',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `AUR-DINE-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationCode(code);
    setBookingConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#12141c] border border-white/15 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#171a25] to-[#12141c] p-6 border-b border-white/10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium uppercase tracking-wider">
              <span>Gastronomy Concierge</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Instant VIP Confirmation</span>
            </div>
            <h2 className="font-serif text-3xl font-normal text-white mt-1">
              Table Reservation
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Reserve your table at Aurelia Galleria’s premier culinary sanctuaries.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {bookingConfirmed ? (
            /* Confirmed Pass */
            <div className="space-y-6 text-center py-4 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl text-white">
                  Reservation Confirmed
                </h3>
                <p className="text-xs text-neutral-400">
                  Your table is guaranteed. A confirmation SMS has been dispatched.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="p-6 rounded-xl bg-[#181b26] border border-[#d4af37]/40 text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="font-serif text-xl font-normal text-white">
                    {restaurant.name}
                  </span>
                  <span className="font-mono text-xs text-[#d4af37] font-bold">
                    {confirmationCode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-400 block">Date & Time</span>
                    <span className="text-white font-medium block mt-0.5">{bookingDate} · {bookingTime}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Party Size</span>
                    <span className="text-white font-medium block mt-0.5">{partySize} Guests</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Seating Area</span>
                    <span className="text-white font-medium block mt-0.5">{seatingArea}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Guest Name</span>
                    <span className="text-white font-medium block mt-0.5">{guestName || 'VIP Guest'}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Dress Code: {restaurant.dressCode || 'Smart Elegant'}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Complimentary Valet Included</span>
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e4be42] rounded-md transition-colors cursor-pointer"
              >
                Close Pass & Return to Galleria
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              
              {/* Restaurant Selector */}
              <div className="space-y-1.5">
                <label className="text-neutral-300 font-medium block">
                  Select Culinary Destination
                </label>
                <select
                  value={selectedRestaurantId}
                  onChange={(e) => setSelectedRestaurantId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#171a24] border border-white/10 rounded-md text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                >
                  {DINING_DATA.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.cuisine} · {d.floor})
                    </option>
                  ))}
                </select>
                {restaurant.michelinGuide && (
                  <p className="text-[11px] text-[#e8c875] flex items-center gap-1 mt-1">
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    <span>{restaurant.michelinGuide}</span>
                  </p>
                )}
              </div>

              {/* Party Size & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-medium flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Number of Guests</span>
                  </label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-[#171a24] border border-white/10 rounded-md text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Reservation Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#171a24] border border-white/10 rounded-md text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                  />
                </div>
              </div>

              {/* Seating Preference & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-medium block">
                    Seating Preference
                  </label>
                  <select
                    value={seatingArea}
                    onChange={(e) => setSeatingArea(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#171a24] border border-white/10 rounded-md text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                  >
                    {seatingOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Preferred Time Slot</span>
                  </label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#171a24] border border-white/10 rounded-md text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                  >
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-medium block">
                    Full Guest Name
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Victoria Sterling"
                    className="w-full px-3 py-2 bg-[#171a24] border border-white/10 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-medium block">
                    Contact Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 bg-[#171a24] border border-white/10 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Special dietary or celebration */}
              <div className="space-y-1.5">
                <label className="text-neutral-300 font-medium block">
                  Dietary Requirements & Special Occasion Notes
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Anniversary, champagne pairing, gluten-free, allergy notes..."
                  className="w-full px-3 py-2 bg-[#171a24] border border-white/10 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="w-full py-3 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e4be42] rounded-md transition-colors cursor-pointer shadow-md"
                >
                  Confirm Table Reservation
                </button>
                <p className="text-[10px] text-neutral-500 text-center mt-2">
                  Complimentary reservation service · Cancellations accepted up to 2 hours prior
                </p>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
