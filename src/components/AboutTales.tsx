/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heart, ShieldCheck, Sun, Compass } from 'lucide-react';

export default function AboutTales() {
  const VALUES = [
    {
      title: 'Cinematic Solitude',
      desc: 'Each suite is a self-contained estate secluded from the rest of the world. No lobbies, no crowds — just you, the ocean wind, and absolute silence.',
      icon: Compass,
    },
    {
      title: 'Bespoke Hostsmanship',
      desc: 'Our staff operates purely from discretion and deep customization. Your preferences are mapped weeks before landing, from room aromas to pillow loft.',
      icon: Heart,
    },
    {
      title: 'Architectural Poetry',
      desc: 'Form follows romance. Sculptural plaster, solid brass accents, local basalt, and large glazed panels capture the changing sunlight beautifully.',
      icon: Sun,
    },
    {
      title: 'The Platinum Standard',
      desc: 'Secure airport transfers, integrated VIP luggage routing, in-room biometric access, and complete luxury sanitization standards are strictly verified.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-b border-gold/10" id="editorial-story">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Column: Intimate Narrative */}
        <div className="md:col-span-5 space-y-6">
          <span className="text-xs uppercase tracking-widest text-gold font-bold">The Proprietors’ Lore</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-luxury-charcoal italic leading-tight">
            “True romance is written in quiet, golden hours.”
          </h2>
          <p className="text-xs sm:text-sm text-luxury-charcoal/75 leading-relaxed font-serif italic">
            Deborah & Sebastian spent a decade scouting the high cliffs of the Mediterranean to capture a dream: an estate designed solely for the restoration of connection and quiet luxury.
          </p>
          <p className="text-xs sm:text-sm text-luxury-charcoal/70 leading-relaxed font-sans">
            "We built these pavilions not as hotel rooms, but as sensory chapters. Places where the phone stays sealed, where watch dials fade, and where the rhythmic whisper of ancient olive leaves and coastal waters writes a tale unique to every traveler who enters our thresholds."
          </p>
          <div className="pt-4 flex items-center gap-3">
            <div className="h-[1px] w-12 bg-gold"></div>
            <span className="font-serif italic text-sm text-luxury-charcoal/80 font-medium font-semibold">
              Deborah & Sebastian, Founders
            </span>
          </div>
        </div>

        {/* Right Column: Key pillars / highlights */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="space-y-2 group">
                <div className="w-10 h-10 rounded-full bg-cream-dark flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <h4 className="font-serif text-sm em:text-base font-semibold text-luxury-charcoal">
                  {val.title}
                </h4>
                <p className="text-xs text-luxury-charcoal/70 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
