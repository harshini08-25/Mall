import React, { useState } from 'react';
import { X, Crown, Sparkles, Check, Gift, ShieldCheck, Star, QrCode } from 'lucide-react';

interface VipClubModalProps {
  onClose: () => void;
}

export const VipClubModal: React.FC<VipClubModalProps> = ({ onClose }) => {
  const [activeTier, setActiveTier] = useState<'silver' | 'gold' | 'black'>('gold');
  const [spendSimulator, setSpendSimulator] = useState<number>(24000);
  const [memberName, setMemberName] = useState<string>('');
  const [memberEmail, setMemberEmail] = useState<string>('');
  const [cardGenerated, setCardGenerated] = useState<boolean>(false);
  const [membershipId, setMembershipId] = useState<string>('');

  const tiers = {
    silver: {
      name: 'Silver Member',
      minSpend: '$0',
      multiplier: '1x Points per Dollar',
      badge: 'bg-neutral-600',
      perks: [
        '2 Hours Complimentary Parking per visit',
        'Seasonal private sale previews (24h early access)',
        'Earn points redeemable at 240+ boutiques and restaurants',
        'Digital membership pass in Apple & Google Wallet',
      ],
    },
    gold: {
      name: 'Gold Privilège',
      minSpend: '$15,000 / year',
      multiplier: '2x Points per Dollar',
      badge: 'bg-[#d4af37]',
      perks: [
        'Unlimited Complimentary White-Glove Valet Parking',
        'Birthday vintage champagne service at Cipriani Terrace',
        'Exclusive invitations to Haute Horlogerie & Fashion trunk shows',
        'Bespoke gift packaging atelier services',
        'Priority restaurant table bookings',
      ],
    },
    black: {
      name: 'Black Diamond Elite',
      minSpend: '$50,000 / year',
      multiplier: '3x Points per Dollar',
      badge: 'bg-black border border-[#d4af37]',
      perks: [
        'Private Personal Styling Suite with dedicated stylist',
        'Guaranteed reservations at L\'Aura by Pierre Gagnaire & Sakura',
        'Hands-free luxury shopping delivery to home or hotel',
        'Dedicated 24/7 Aurelia Private Concierge hotline',
        'VIP CineLuxe Bed Lounge complimentary upgrades',
      ],
    },
  };

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim()) return;
    setMembershipId(`AUR-VIP-${Math.floor(100000 + Math.random() * 900000)}`);
    setCardGenerated(true);
  };

  // Calculate tier from slider
  const simulatedPoints = Math.round(
    spendSimulator * (spendSimulator >= 50000 ? 3 : spendSimulator >= 15000 ? 2 : 1)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#12141c] border border-white/15 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#171a26] via-[#1b1f2e] to-[#12141c] p-6 border-b border-white/10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium uppercase tracking-wider">
              <Crown className="w-4 h-4" />
              <span>Aurelia Privilège Club</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Loyalty & Private Privileges</span>
            </div>
            <h2 className="font-serif text-3xl font-normal text-white mt-1">
              Elevate Every Visit
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Curated recognition, private styling salons, and unlimited valet across three bespoke tiers.
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          
          {cardGenerated ? (
            /* Digital Membership Pass Issued */
            <div className="space-y-6 text-center py-2 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center mx-auto">
                <Crown className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif text-2xl text-white">Membership Activated</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Welcome to Aurelia Privilège. Your digital credential is ready.
                </p>
              </div>

              {/* Luxury Digital Card */}
              <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1c202d] via-[#141722] to-[#0e1017] border border-[#d4af37]/60 text-left shadow-2xl max-w-md mx-auto overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex flex-col">
                    <span className="font-serif text-xl font-normal text-white tracking-wider uppercase">
                      Aurelia Privilège
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#d4af37]">
                      {tiers[activeTier].name}
                    </span>
                  </div>
                  <Crown className="w-6 h-6 text-[#d4af37]" />
                </div>

                <div className="pt-6 space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">
                        Cardholder
                      </span>
                      <span className="font-serif text-lg text-white font-medium block">
                        {memberName || 'Elegance Member'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">
                        Member ID
                      </span>
                      <span className="font-mono text-xs text-[#d4af37] font-bold block">
                        {membershipId}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[10px] text-neutral-400 border-t border-white/5">
                    <span>Valid at 240+ Boutiques & Sky Salons</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Active Status</span>
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e4be42] rounded-md transition-colors cursor-pointer"
              >
                Close & Return to Galleria
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Tier Switcher Buttons */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
                {(['silver', 'gold', 'black'] as const).map((tierKey) => (
                  <button
                    key={tierKey}
                    type="button"
                    onClick={() => setActiveTier(tierKey)}
                    className={`py-2 px-3 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      activeTier === tierKey
                        ? 'bg-[#d4af37] text-black font-semibold shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {tierKey === 'silver' ? 'Silver' : tierKey === 'gold' ? 'Gold Privilège' : 'Black Diamond'}
                  </button>
                ))}
              </div>

              {/* Active Tier Highlights Card */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h3 className="font-serif text-xl text-white font-normal">
                      {tiers[activeTier].name}
                    </h3>
                    <p className="text-[11px] text-[#d4af37]">
                      {tiers[activeTier].minSpend} · {tiers[activeTier].multiplier}
                    </p>
                  </div>
                  <Crown className="w-5 h-5 text-[#d4af37]" />
                </div>

                <div className="space-y-2 pt-1">
                  {tiers[activeTier].perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Points Simulator */}
              <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Estimated Annual Spend Simulator</span>
                  <span className="font-mono text-[#d4af37] font-semibold text-sm">
                    ${spendSimulator.toLocaleString()} / year
                  </span>
                </div>

                <input
                  type="range"
                  min="2000"
                  max="100000"
                  step="2000"
                  value={spendSimulator}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSpendSimulator(val);
                    if (val >= 50000) setActiveTier('black');
                    else if (val >= 15000) setActiveTier('gold');
                    else setActiveTier('silver');
                  }}
                  className="w-full accent-[#d4af37] cursor-pointer"
                />

                <div className="flex justify-between items-center text-[11px] text-neutral-400 pt-1">
                  <span>Earns ~{simulatedPoints.toLocaleString()} Galleria Reward Points</span>
                  <span className="text-[#d4af37] font-medium">
                    Unlocks {tiers[activeTier].name}
                  </span>
                </div>
              </div>

              {/* Instant Enrollment Form */}
              <form onSubmit={handleEnroll} className="space-y-4 pt-2">
                <div className="space-y-1">
                  <h4 className="text-white font-semibold text-xs">
                    Issue Instant Digital Membership Pass
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    Complimentary initial tier enrollment. No fees or credit card required.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="Your Full Name"
                    className="px-3 py-2 bg-[#171a24] border border-white/10 rounded text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                  <input
                    type="email"
                    required
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    placeholder="Your Email Address"
                    className="px-3 py-2 bg-[#171a24] border border-white/10 rounded text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e4be42] rounded-md transition-colors cursor-pointer shadow-md"
                >
                  Activate Aurelia Privilège Pass
                </button>
              </form>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
