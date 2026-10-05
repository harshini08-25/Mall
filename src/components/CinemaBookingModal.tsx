import React, { useState } from 'react';
import { X, Film, Clock, Check, Sparkles, Ticket, ShieldCheck } from 'lucide-react';
import { MovieScreening } from '../types/mall';

interface CinemaBookingModalProps {
  movie: MovieScreening | null;
  onClose: () => void;
}

export const CinemaBookingModal: React.FC<CinemaBookingModalProps> = ({ movie, onClose }) => {
  if (!movie) return null;

  const [selectedTime, setSelectedTime] = useState<string>(movie.times[0]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['D4', 'D5']);
  const [includeSnackCombo, setIncludeSnackCombo] = useState<boolean>(true);
  const [ticketIssued, setTicketIssued] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  const seatRows = ['A', 'B', 'C', 'D'];
  const seatCols = [1, 2, 3, 4, 5, 6, 7, 8];

  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      if (selectedSeats.length >= 4) return;
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSeats.length === 0) return;
    setBookingRef(`CINELUXE-${Math.floor(100000 + Math.random() * 900000)}`);
    setTicketIssued(true);
  };

  const ticketPrice = 38; // VIP IMAX recliner
  const snackPrice = includeSnackCombo ? 26 : 0;
  const totalPrice = selectedSeats.length * ticketPrice + snackPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#12141c] border border-white/15 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#171a26] to-[#12141c] p-6 border-b border-white/10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium uppercase tracking-wider">
              <span>CineLuxe VIP Cinema Experience</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Level 5 Pavilion</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
              {movie.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
              <span>{movie.auditorium}</span>
              <span>·</span>
              <span>{movie.duration}</span>
              <span>·</span>
              <span className="px-1.5 py-0.2 rounded border border-white/10 font-mono text-[10px] text-neutral-300">
                {movie.rating}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {ticketIssued ? (
            /* Digital Cinema Ticket */
            <div className="space-y-6 text-center py-2 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif text-2xl text-white">Tickets Reserved</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Present this digital pass at the CineLuxe VIP Box Office on Level 5.
                </p>
              </div>

              {/* Digital Pass Presentation */}
              <div className="p-6 rounded-xl bg-[#191c28] border border-[#d4af37]/40 text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Feature Film</span>
                    <span className="font-serif text-xl text-white font-normal block">{movie.title}</span>
                  </div>
                  <span className="font-mono text-xs text-[#d4af37] font-bold">{bookingRef}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-neutral-500 block">Hall & Screen</span>
                    <span className="text-white font-medium block mt-0.5">{movie.hallNumber}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Session Time</span>
                    <span className="text-white font-medium block mt-0.5">{selectedTime}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Reserved Seats</span>
                    <span className="text-[#d4af37] font-mono font-bold block mt-0.5">
                      {selectedSeats.join(', ')}
                    </span>
                  </div>
                </div>

                {includeSnackCombo && (
                  <div className="p-2.5 rounded bg-white/5 border border-white/10 text-[11px] text-neutral-300">
                    Includes: CineLuxe Truffle Popcorn Duo & San Pellegrino Sparkler
                  </div>
                )}

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                  <span>Total Paid: ${totalPrice}.00</span>
                  <span className="text-emerald-400">Pass Activated</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e4be42] rounded-md transition-colors cursor-pointer"
              >
                Done & Return to CineLuxe
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-6">
              
              {/* Showtime Selector */}
              <div className="space-y-2">
                <label className="text-neutral-300 font-medium block">
                  Select Showtime Session
                </label>
                <div className="flex flex-wrap gap-2">
                  {movie.times.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-2 rounded-md font-mono text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#d4af37] text-black font-bold shadow-sm'
                            : 'bg-white/5 text-neutral-300 hover:text-white border border-white/10'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Auditorium Seating Grid */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-neutral-300 font-medium block">
                    Choose Reclining Leather Seats ({selectedSeats.length}/4 selected)
                  </label>
                  <span className="text-neutral-400 text-[11px]">
                    Row D: Royal Reclining Beds
                  </span>
                </div>

                {/* Curved Screen Curve Graphic */}
                <div className="pt-2 text-center">
                  <div className="w-3/4 mx-auto h-2 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent rounded-full shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1 block">
                    IMAX Laser Curved Screen
                  </span>
                </div>

                {/* Seat Matrix */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 max-w-sm mx-auto">
                  {seatRows.map((row) => (
                    <div key={row} className="flex items-center justify-center gap-1.5">
                      <span className="w-4 text-[10px] font-mono text-neutral-500 text-center">
                        {row}
                      </span>
                      {seatCols.map((col) => {
                        const seatId = `${row}${col}`;
                        const isSelected = selectedSeats.includes(seatId);
                        const isVIPRow = row === 'D';

                        return (
                          <button
                            type="button"
                            key={seatId}
                            onClick={() => toggleSeat(seatId)}
                            className={`w-7 h-7 rounded text-[10px] font-mono flex items-center justify-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#d4af37] text-black font-bold scale-110 shadow-sm'
                                : isVIPRow
                                ? 'bg-[#252a3b] text-neutral-300 hover:bg-[#32394e] border border-[#d4af37]/30'
                                : 'bg-white/10 text-neutral-400 hover:bg-white/20'
                            }`}
                            title={`Seat ${seatId}`}
                          >
                            {seatId}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6 text-[10px] text-neutral-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-white/10" /> Available
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#252a3b] border border-[#d4af37]/30" /> VIP Row D
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#d4af37]" /> Selected
                  </span>
                </div>
              </div>

              {/* Gourmet Concessions Add-on */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <span className="text-white font-medium text-xs">
                      CineLuxe Artisanal Concessions Bundle (+$26)
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Fresh warm black truffle popcorn & sparkling Italian water delivered directly to your reclining seat.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={includeSnackCombo}
                  onChange={(e) => setIncludeSnackCombo(e.target.checked)}
                  className="w-4 h-4 rounded text-[#d4af37] focus:ring-[#d4af37] cursor-pointer mt-1"
                />
              </div>

              {/* Price Calculation & Submit */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Total Due</span>
                  <span className="text-xl font-serif text-white tabular-nums font-bold">
                    ${totalPrice}.00
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={selectedSeats.length === 0}
                  className="px-6 py-3 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e4be42] disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors cursor-pointer"
                >
                  Reserve {selectedSeats.length} Seats
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
