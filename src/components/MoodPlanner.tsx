/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles, Heart, Compass, Moon, ArrowRight } from 'lucide-react';
import { SUITES, ENHANCEMENTS } from '../data';
import { Suite } from '../types';

interface MoodPlannerProps {
  onSelectSuite: (suiteId: string) => void;
  onOpenBooking: () => void;
}

export default function MoodPlanner({ onSelectSuite, onOpenBooking }: MoodPlannerProps) {
  const [mood, setMood] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [scent, setScent] = useState<string>('');
  const [recommendation, setRecommendation] = useState<{
    suite: Suite;
    enhancements: typeof ENHANCEMENTS;
    reason: string;
  } | null>(null);

  const handleCalculateMatch = () => {
    let selectedSuite: Suite = SUITES[0];
    let recommendedEnhancements = [ENHANCEMENTS[0]];
    let reasonText = '';

    if (mood === 'sensory') {
      selectedSuite = SUITES[2]; // Velvet Horizon
      recommendedEnhancements = [ENHANCEMENTS[1], ENHANCEMENTS[2]]; // Petal Bath + Michelin
      reasonText = 'The Velvet Horizon with its basalt stone, hot spring and candlelight mirrors your desire for dense, rich sensory comfort.';
    } else if (mood === 'mystical') {
      selectedSuite = SUITES[1]; // Sun-Drenched Canopy
      recommendedEnhancements = [ENHANCEMENTS[3]]; // Couples Massage under active starlight
      reasonText = 'The Sun-Drenched Canopy Loft offers open sky stargazing and ancient olive grove energy, fulfilling your longing for celestial wonders.';
    } else {
      // oceanic/peaceful
      selectedSuite = SUITES[0]; // Whispering Sea
      recommendedEnhancements = [ENHANCEMENTS[0], ENHANCEMENTS[2]]; // Champagne Toast + Michelin
      reasonText = 'The Whispering Sea Suite matches your yearning for endless sea horizons, crashing waves, and serene private butler pampering.';
    }

    setRecommendation({
      suite: selectedSuite,
      enhancements: recommendedEnhancements,
      reason: reasonText,
    });
  };

  const handleBookRecommendation = () => {
    onSelectSuite(recommendation!.suite.id);
    onOpenBooking();
  };

  return (
    <div className="bg-cream-dark/50 border border-gold/20 rounded-2xl p-6 sm:p-10 max-w-3xl mx-auto my-12" id="mood-planner">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-gold font-medium">Bespoke Curation</span>
        <h3 className="text-2xl sm:text-3xl font-serif text-luxury-charcoal mt-2 italic">
          Design Your Personal Romantic Tale
        </h3>
        <p className="text-xs sm:text-sm text-luxury-charcoal/70 mt-3 max-w-md mx-auto leading-relaxed">
          Answer three sensory preferences, and allow Deborah & Sebastian to curate your ideal private stay.
        </p>
      </div>

      {!recommendation ? (
        <div className="space-y-6">
          {/* Question 1: Mood */}
          <div>
            <label className="text-xs font-medium tracking-wider text-luxury-charcoal/80 block mb-3 uppercase">
              1. What describes your desired atmosphere?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'serene', label: 'Ethereal & Coastal', desc: 'Ocean breezes & soft waves', icon: Compass },
                { id: 'sensory', label: 'Rich & Mystifying', desc: 'Hot springs, stone & fireplaces', icon: Heart },
                { id: 'mystical', label: 'Celestial & Airy', desc: 'Stargazing under ancient trees', icon: Moon },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`mood-opt-${item.id}`}
                    onClick={() => setMood(item.id)}
                    className={`p-4 rounded-xl text-left border transition-all text-xs sm:text-sm ${
                      mood === item.id
                        ? 'border-gold bg-white shadow-sm'
                        : 'border-gold/10 hover:border-gold/30 hover:bg-white/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 ${mood === item.id ? 'text-gold' : 'text-gold/60'}`} />
                      <span className="font-serif font-medium text-luxury-charcoal">{item.label}</span>
                    </div>
                    <p className="text-[11px] text-luxury-charcoal/60 leading-normal">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Time of day */}
          <div>
            <label className="text-xs font-medium tracking-wider text-luxury-charcoal/80 block mb-3 uppercase">
              2. Your favorite signature hour?
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'dawn', label: 'Rosy Dawn' },
                { id: 'dusk', label: 'Golden Dusk' },
                { id: 'midnight', label: 'Silver Midnight' },
              ].map((item) => (
                <button
                  key={item.id}
                  id={`time-opt-${item.id}`}
                  onClick={() => setTime(item.id)}
                  className={`px-4 py-2 rounded-full border text-xs tracking-wider transition-all ${
                    time === item.id
                      ? 'bg-gold text-white border-gold'
                      : 'bg-white/50 border-gold/10 hover:border-gold/30 text-luxury-charcoal/85'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Aromas */}
          <div>
            <label className="text-xs font-medium tracking-wider text-luxury-charcoal/80 block mb-3 uppercase">
              3. The sensory scent that calls to you?
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'sea_salt', label: 'Salty Crushed Sage & Sea Dew' },
                { id: 'amber', label: 'Deep Amber, Sandalwood & Tobacco' },
                { id: 'jasmine', label: 'Jasmine Bloom & Soft Lemon Blossom' },
              ].map((item) => (
                <button
                  key={item.id}
                  id={`scent-opt-${item.id}`}
                  onClick={() => setScent(item.id)}
                  className={`px-4 py-2 rounded-full border text-xs tracking-wider transition-all ${
                    scent === item.id
                      ? 'bg-gold text-white border-gold'
                      : 'bg-white/50 border-gold/10 hover:border-gold/30 text-luxury-charcoal/85'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              id="calculate-match"
              onClick={handleCalculateMatch}
              disabled={!mood || !time || !scent}
              className="w-full sm:w-auto px-8 py-3 bg-luxury-charcoal text-white hover:bg-gold transition-all text-xs uppercase tracking-widest font-medium rounded-md shadow-sm disabled:opacity-40 disabled:hover:bg-luxury-charcoal"
            >
              Consult the Oracle of Tales
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 text-center animate-fade-in">
          <div className="mx-auto bg-gold/10 w-12 h-12 rounded-full flex items-center justify-center text-gold mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          
          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-gold font-semibold">Your Tailored Escape Spec</span>
            <h4 className="text-xl sm:text-2xl font-serif text-luxury-charcoal font-medium italic">
              {recommendation.suite.name} ({recommendation.suite.frenchName})
            </h4>
            <p className="text-xs sm:text-sm text-luxury-charcoal/80 leading-relaxed italic px-4">
              "{recommendation.reason}"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left py-4">
            <div className="border border-gold/10 p-4 rounded-xl bg-white/70">
              <span className="text-[10px] text-gold uppercase tracking-wider block mb-1">Recommended Residence</span>
              <p className="text-xs font-serif text-luxury-charcoal font-semibold mb-2">{recommendation.suite.name}</p>
              <img
                src={recommendation.suite.image}
                alt={recommendation.suite.name}
                referrerPolicy="no-referrer"
                className="w-full h-24 object-cover rounded-md"
              />
            </div>
            <div className="border border-gold/10 p-4 rounded-xl bg-white/70">
              <span className="text-[10px] text-gold uppercase tracking-wider block mb-1">Curated Experiences</span>
              <ul className="text-xs text-luxury-charcoal/80 space-y-1.5 list-disc pl-4 mt-2">
                {recommendation.enhancements.map((enh) => (
                  <li key={enh.id} className="leading-tight">
                    <span className="font-medium text-luxury-charcoal">{enh.name}</span>
                    <span className="text-[10px] text-gold block">+${enh.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
            <button
              id="quiz-book-rec"
              onClick={handleBookRecommendation}
              className="w-full sm:w-auto px-6 py-3 bg-gold hover:bg-gold-dark text-white rounded-md text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              Select & Enter Booking Engine <ArrowRight className="w-3 h-3" />
            </button>
            <button
              id="quiz-reset"
              onClick={() => {
                setMood('');
                setTime('');
                setScent('');
                setRecommendation(null);
              }}
              className="w-full sm:w-auto px-5 py-3 border border-gold/20 text-luxury-charcoal hover:border-gold hover:bg-white text-xs uppercase tracking-widest font-medium rounded-md transition-colors"
            >
              Begin Anew
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
