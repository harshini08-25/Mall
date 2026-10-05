import React, { useState } from 'react';
import { ArrowUp, MapPin, Phone, Mail, Clock, Crown, Check } from 'lucide-react';
import { MALL_INFO } from '../data/mallData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenVipClub: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenVipClub }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090d] border-t border-white/10 text-neutral-400 text-xs">
      {/* Upper Newsletter & Brand Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand Dossier */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <span className="font-serif text-2xl tracking-[0.16em] text-white uppercase font-light block">
                Aurelia Galleria
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block">
                Metropolitan Flagship Destination
              </span>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              An architectural milestone in luxury retail, contemporary art exhibitions, and Michelin-acclaimed conservatory dining across six sculpted light-filled terraces.
            </p>

            <div className="pt-2 space-y-1.5 text-neutral-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{MALL_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Daily: {MALL_INFO.todayHours} · Valet: {MALL_INFO.valetHours}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Concierge & Reservations: {MALL_INFO.phone}</span>
              </p>
            </div>
          </div>

          {/* Quick Nav Col 1 */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
              Destinations
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('directory')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Haute Couture & Maisons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dining')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sky Dining Terraces
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cinema')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  CineLuxe IMAX Laser
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sculpture Biennial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('floormap')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Interactive Floor Plans
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Nav Col 2 */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
              Guest Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('plan-visit')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Live Parking Sensors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('plan-visit')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Curbside Valet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('plan-visit')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hands-Free Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('plan-visit')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Global Blue Tax Refund
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenVipClub}
                  className="text-[#d4af37] hover:text-[#e4be42] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Crown className="w-3 h-3" />
                  <span>VIP Privilège Club</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
              Private Salon Inquiries & Journal
            </h4>
            <p className="text-neutral-400 leading-relaxed text-xs">
              Receive confidential invitations to seasonal runway trunk shows, private collector horology vernissages, and chef's tasting debuts.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>You have been registered for private invitations.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#d4af37] hover:bg-[#e4be42] text-black font-semibold rounded text-xs transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-[10px] text-neutral-500">
                  Strictly confidential. No spam, ever.
                </p>
              </form>
            )}
          </div>

        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Aurelia Galleria Metropolitan Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-neutral-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-300 cursor-pointer">Accessibility Compliance</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#d4af37] hover:text-[#e4be42] cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
