/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { Heart, Quote, Star } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  suiteName: string;
  text: string;
  date: string;
  rating: number;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Eleanor & Alistair V.',
    suiteName: 'La Mer Chuchote',
    text: 'A sacred escape. Watching the sunrise from our brass tub on the cliffs while the ocean sang below us was a memory we will hold for a lifetime. The attention of our butler Sebastian was simply unmatched.',
    date: 'May 2026',
    rating: 5,
  },
  {
    id: 'rev-2',
    author: 'Maximilian & Chloe R.',
    suiteName: "L'Horizon de Velours",
    text: 'The architecture speaks directly to the soul. Raw stone walls juxtaposed against luxurious linens and warm glowing fireplaces. The Michelin-star tasting was an emotional journey. Pure, cinematic magic.',
    date: 'April 2026',
    rating: 5,
  },
  {
    id: 'rev-3',
    author: 'Julian & Sophia M.',
    suiteName: "Le Dôme d'Or",
    text: 'We slept beneath the stars in absolute warmth. Retracting the glass dome at midnight while listening to private ambient vinyl was a transcendent experience. There is no other spot on Earth quite like this.',
    date: 'June 2026',
    rating: 5,
  }
];

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [author, setAuthor] = useState('');
  const [suiteName, setSuiteName] = useState('La Mer Chuchote');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('deborah_seb_reviews');
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      setReviews(DEFAULT_REVIEWS);
    }
  }, []);

  const saveReviews = (newList: Review[]) => {
    setReviews(newList);
    localStorage.setItem('deborah_seb_reviews', JSON.stringify(newList));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;

    const newRev: Review = {
      id: `rev-custom-${Date.now()}`,
      author,
      suiteName,
      text,
      date: 'Just now',
      rating,
    };

    const updated = [newRev, ...reviews];
    saveReviews(updated);
    setAuthor('');
    setSuiteName('La Mer Chuchote');
    setText('');
    setRating(5);
    setIsFormOpen(false);
    setSuccessMsg('Your lovely story has been inscribed on our gallery wall.');
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto" id="romantic-tales-reviews">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-gold/15 pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold font-semibold">Inscribed Memories</span>
          <h3 className="text-2xl sm:text-4xl font-serif text-luxury-charcoal mt-1 italic">
            Tales Written by Our Guests
          </h3>
        </div>
        <button
          id="btn-open-review-form"
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="mt-4 md:mt-0 px-4 py-2 border border-gold/40 hover:border-gold hover:bg-gold-light/5 text-xs text-gold-dark font-semibold uppercase tracking-widest transition-all rounded-md"
        >
          {isFormOpen ? 'Cancel Writing' : 'Inscribe Your Story'}
        </button>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-gold/10 border border-gold/20 rounded-md text-xs sm:text-sm text-gold-dark text-center italic animate-fade-in font-serif">
          {successMsg}
        </div>
      )}

      {/* Form Overlay/In-line container */}
      {isFormOpen && (
        <form
          id="guest-review-form"
          onSubmit={handleSubmit}
          className="mb-8 p-6 bg-cream-dark/40 border border-gold/20 rounded-2xl space-y-4 max-w-xl mx-auto"
        >
          <h4 className="font-serif text-sm sm:text-base italic text-luxury-charcoal font-medium border-b border-gold/10 pb-2">
            Write on the Parchment of Memories
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-luxury-charcoal/70 uppercase font-medium tracking-wider block mb-1">Your Names</label>
              <input
                id="reviewer-names"
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Juliet & Romeo"
                className="w-full px-3 py-2 text-xs bg-white border border-gold/15 rounded-md gold-glow font-serif italic text-luxury-charcoal"
              />
            </div>
            <div>
              <label className="text-[10px] text-luxury-charcoal/70 uppercase font-medium tracking-wider block mb-1">Inhabited Suite</label>
              <select
                id="reviewer-suite"
                value={suiteName}
                onChange={(e) => setSuiteName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-gold/15 rounded-md gold-glow font-serif text-luxury-charcoal"
              >
                <option value="La Mer Chuchote">La Mer Chuchote</option>
                <option value="Le Dôme d'Or">Le Dôme d'Or</option>
                <option value="L'Horizon de Velours">L'Horizon de Velours</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-luxury-charcoal/70 uppercase font-medium tracking-wider block mb-1">Atmosphere Rating</label>
              <div className="flex gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-gold focus:outline-none"
                  >
                    <Star className={`w-4 h-4 ${star <= rating ? 'fill-gold text-gold' : 'text-gold/20'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-luxury-charcoal/70 uppercase font-medium tracking-wider block mb-1">Your Story</label>
            <textarea
              id="reviewer-text"
              required
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Inscribe your romantic experience here..."
              className="w-full px-3 py-2 text-xs bg-white border border-gold/15 rounded-md gold-glow font-serif text-luxury-charcoal leading-relaxed"
            />
          </div>

          <button
            id="btn-submit-review"
            type="submit"
            className="w-full py-2.5 bg-luxury-charcoal text-white hover:bg-gold text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
          >
            Seal and Inscribe Story
          </button>
        </form>
      )}

      {/* Grid of Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            id={`review-${rev.id}`}
            className="border border-gold/10 bg-white p-6 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <Quote className="absolute top-4 right-4 w-10 h-10 text-gold-light/10 pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-1 text-gold mb-3">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>
              
              <p className="font-serif italic text-xs sm:text-sm text-luxury-charcoal/90 leading-relaxed mb-4">
                "{rev.text}"
              </p>
            </div>

            <div className="border-t border-gold/10 pt-3 mt-2 flex items-center justify-between">
              <div>
                <h5 className="font-serif font-medium text-xs text-luxury-charcoal block">{rev.author}</h5>
                <span className="text-[9px] uppercase tracking-wider text-gold-dark font-medium">{rev.suiteName}</span>
              </div>
              <div className="text-[10px] text-luxury-charcoal/40 font-mono">
                {rev.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
