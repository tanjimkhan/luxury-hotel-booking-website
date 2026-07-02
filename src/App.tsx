/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Calendar,
  Users,
  Compass,
  ArrowRight,
  Plus,
  Check,
  ChevronRight,
  MapPin,
  X,
  Phone,
  Mail,
  Home,
  Layers,
  ChevronLeft,
  DollarSign,
  Clock
} from 'lucide-react';
import { SUITES, ENHANCEMENTS } from './data';
import { Booking, Suite } from './types';

// Custom components
import MoodPlanner from './components/MoodPlanner';
import ReviewList from './components/ReviewList';
import AboutTales from './components/AboutTales';
import BookingsHistory from './components/BookingsHistory';

// Helper to get formatted date string tomorrow etc.
const getTomorrowDateString = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

const getLaterDateString = (daysLater = 3) => {
  const d = new Date();
  d.setDate(d.getDate() + 1 + daysLater);
  return d.toISOString().split('T')[0];
};

export default function App() {
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>(SUITES[0].id);
  const [checkIn, setCheckIn] = useState<string>(getTomorrowDateString());
  const [checkOut, setCheckOut] = useState<string>(getLaterDateString(3));
  const [guests, setGuests] = useState<number>(2);
  const [selectedEnhancements, setSelectedEnhancements] = useState<string[]>([]);
  
  // Guest contact info
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestNotes, setGuestNotes] = useState<string>('');

  // Booking system flags
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  // Gallery viewer
  const [activeGallerySuite, setActiveGallerySuite] = useState<Suite | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);

  // On page load, pull existing completed bookings from local storage
  useEffect(() => {
    const saved = localStorage.getItem('deborah_seb_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading previous reservations', e);
      }
    }
  }, []);

  const handleSelectSuite = (id: string) => {
    setSelectedSuiteId(id);
  };

  const handleOpenBookingWithSuite = (suiteId: string) => {
    setSelectedSuiteId(suiteId);
    setSelectedEnhancements([]);
    setActiveStep(1);
    setIsBookingOpen(true);
  };

  const handleToggleEnhancement = (id: string) => {
    if (selectedEnhancements.includes(id)) {
      setSelectedEnhancements(selectedEnhancements.filter((item) => item !== id));
    } else {
      setSelectedEnhancements([...selectedEnhancements, id]);
    }
  };

  // Date parsing to retrieve nights amount
  const calculateNightsCount = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    if (isNaN(diff) || diff <= 0) return 1;
    return Math.max(1, Math.ceil(diff / (1000 * 3600 * 24)));
  };

  const getSelectedSuite = () => {
    return SUITES.find((s) => s.id === selectedSuiteId) || SUITES[0];
  };

  const calculateTotalCost = () => {
    const suite = getSelectedSuite();
    const nights = calculateNightsCount();
    const suiteTotal = suite.price * nights;
    
    const enhancementsTotal = selectedEnhancements.reduce((acc, id) => {
      const item = ENHANCEMENTS.find((e) => e.id === id);
      return acc + (item ? item.price : 0);
    }, 0);

    return suiteTotal + enhancementsTotal;
  };

  const executeInstantBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      alert('Please fully specify your details to complete your secure reservation.');
      return;
    }

    const nights = calculateNightsCount();
    const totalAmount = calculateTotalCost();

    const finalizedBooking: Booking = {
      id: `tcf-${Math.random().toString(36).substr(2, 6)}`,
      suiteId: selectedSuiteId,
      checkIn,
      checkOut,
      guests,
      enhancements: selectedEnhancements,
      guestName,
      guestEmail,
      guestPhone,
      guestNotes,
      totalAmount,
      nights,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    const nextBookings = [finalizedBooking, ...bookings];
    setBookings(nextBookings);
    localStorage.setItem('deborah_seb_bookings', JSON.stringify(nextBookings));

    // Clear and set confirmed
    setSuccessBooking(finalizedBooking);
    setActiveStep(4); // Confirmation state
  };

  const handleCancelBooking = (id: string) => {
    const nextBookings = bookings.filter((b) => b.id !== id);
    setBookings(nextBookings);
    localStorage.setItem('deborah_seb_bookings', JSON.stringify(nextBookings));
  };

  const resetBookingFormState = () => {
    setIsBookingOpen(false);
    setActiveStep(1);
    setSuccessBooking(null);
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setGuestNotes('');
    setSelectedEnhancements([]);
  };

  return (
    <div className="min-h-screen bg-cream-light text-luxury-charcoal selection:bg-gold-light/40 relative font-sans antialiased overflow-x-hidden">
      
      {/* Decorative Golden Ambient Gradients in Background */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-gold/5 v-to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[1200px] left-0 w-[500px] h-[500px] bg-gradient-to-tr from-gold/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* LUXURY TOP ANNOUNCEMENT BAR */}
      <div className="bg-cream-dark text-[10px] sm:text-xs uppercase tracking-widest text-gold-dark font-semibold py-2 px-4 border-b border-gold/15 text-center flex items-center justify-center gap-1.5 font-sans">
        <Sparkles className="w-3 h-3 text-gold animate-pulse" />
        An Exclusive Sanctuary of Quiet Luxury • Only Three Private Pavilions Available
      </div>

      {/* BRAND & HEADER NAV BAR */}
      <header className="py-6 sm:py-8 px-4 sm:px-12 border-b border-gold/10 bg-cream-light/95 backdrop-blur-md sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          
          {/* Left Navigation (hidden or stacked on mobile) */}
          <div className="hidden md:flex gap-8 text-[11px] font-sans uppercase tracking-[0.2em] text-luxury-charcoal/70">
            <a href="#suites-collection" className="hover:text-gold transition-colors">Residences</a>
            <a href="#mood-planner" className="hover:text-gold transition-colors">Bespoke Curation</a>
          </div>

          {/* Center Brand Logo (Clean Minimalism Signature) */}
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl tracking-[0.15em] font-medium font-serif text-luxury-charcoal">
              DEBORAH & SEBASTIAN'S
            </h1>
            <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold mt-1 font-semibold">
              Romantic Tales
            </p>
          </div>

          {/* Right Navigation & CTA */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-[11px] font-sans uppercase tracking-[0.2em] text-luxury-charcoal/70">
            <a href="#editorial-story" className="hover:text-gold transition-colors text-[10px] sm:text-[11px]">Our Lore</a>
            <a href="#romantic-tales-reviews" className="hover:text-gold transition-colors text-[10px] sm:text-[11px]">Letters</a>
            <button
              id="header-cta"
              onClick={() => handleOpenBookingWithSuite(SUITES[0].id)}
              className="px-5 py-2 bg-gold hover:bg-gold-dark text-white text-[10px] font-sans font-medium uppercase tracking-[0.2em] rounded-sm transition-all duration-300 shadow-sm animate-pulse"
            >
              Inscribe Suite
            </button>
          </div>

          {/* Mobile inline links */}
          <div className="flex md:hidden gap-5 text-[10px] font-sans uppercase tracking-[0.15em] opacity-80 pt-2 border-t border-gold/5 w-full justify-center">
            <a href="#suites-collection" className="hover:text-gold">Residences</a>
            <a href="#mood-planner" className="hover:text-gold">Curation</a>
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative px-4 sm:px-8 py-10 sm:py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Hero Left: Engaging narrative */}
          <div className="md:col-span-5 space-y-6 text-center md:text-left z-10">
            <span className="px-3 py-1 bg-gold/10 text-gold-dark text-[10px] uppercase font-bold tracking-widest rounded-full inline-block">
              Exclusive Sanctuary
            </span>
            <h2 className="text-4xl sm:text-[52px] font-serif leading-[1.1] tracking-tight text-luxury-charcoal">
              Where <span className="italic font-normal">quiet luxury</span> writes your <span className="italic text-gold">finest story</span>.
            </h2>
            <p className="text-xs sm:text-sm text-luxury-charcoal/80 leading-relaxed font-serif italic max-w-md mx-auto md:mx-0">
              Nestled on secluded Mediterranean cliffs, our estate provides three private sculptural pavilions dedicated solely to peace, refined sensory experiences, and connection.
            </p>
            <p className="text-[11px] sm:text-xs text-luxury-charcoal/70 leading-relaxed max-w-md mx-auto md:mx-0">
              Enjoy custom in-room micro-environments, personal hosts, outdoor bathing under stars, and custom-tailored gastronomic menus.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 pt-2">
              <a
                href="#suites-collection"
                className="w-full sm:w-auto text-center px-6 py-3.5 bg-gold hover:bg-gold-dark text-white rounded text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transform active:scale-95 transition-all shadow-md"
              >
                Inscribe Stay Now <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#mood-planner"
                className="w-full sm:w-auto text-center px-6 py-3.5 border border-gold/40 text-gold-dark hover:border-gold hover:bg-white text-xs uppercase tracking-widest font-medium rounded transition-colors"
              >
                Curate My Tale
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gold/15 max-w-xs sm:max-w-md mx-auto md:mx-0 text-left">
              <div>
                <span className="text-xl font-serif text-gold-dark font-semibold">100%</span>
                <span className="text-[10px] text-luxury-charcoal/50 block uppercase tracking-wider">Discretion</span>
              </div>
              <div>
                <span className="text-xl font-serif text-gold-dark font-semibold">3 Only</span>
                <span className="text-[10px] text-luxury-charcoal/50 block uppercase tracking-wider">Residences</span>
              </div>
              <div>
                <span className="text-xl font-serif text-gold-dark font-semibold">4.9 ★</span>
                <span className="text-[10px] text-luxury-charcoal/50 block uppercase tracking-wider">Guest Score</span>
              </div>
            </div>
          </div>

          {/* Hero Right: High-quality visuals showcase */}
          <div className="md:col-span-7 relative">
            <div className="aspect-[16:10] rounded-2xl overflow-hidden shadow-2xl border border-gold/10 relative group">
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200"
                alt="Deborah and Sebastians Luxury Pool view"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gold text-white bg-gold/20 backdrop-blur-md px-2 py-0.5 rounded">Featured View</span>
                  <h4 className="text-base sm:text-lg font-serif">La Mer Chuchote Terrace</h4>
                  <p className="text-[10px] text-white/80">Private coastal escape overlooking sunset cove</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-full border border-white/20">
                  <span className="text-[10px] font-mono p-1">180m² Estate</span>
                </div>
              </div>
            </div>

            {/* Micro Floating luxury badge */}
            <div className="absolute -bottom-4 -left-4 bg-white border border-gold/20 rounded-xl p-3 sm:p-4 shadow-xl flex items-center gap-3 max-w-[220px]">
              <div className="p-2 bg-cream-dark rounded-full text-gold">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-serif text-[11px] sm:text-xs font-semibold text-luxury-charcoal">Frictionless Flow</h5>
                <p className="text-[9px] text-luxury-charcoal/60 leading-normal">Book in under 60 seconds with instant confirmations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOTEL RESIDENCES SECTION */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto" id="suites-collection">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-widest text-gold font-bold">Unveiling the Shelters</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-luxury-charcoal italic">
            The Three Chapters of Tales
          </h2>
          <p className="text-xs sm:text-sm text-luxury-charcoal/60 max-w-lg mx-auto leading-relaxed">
            Choose your architectural backdrop. Each suite has separate aesthetics, distinct therapeutic elements, and a private staff dedicated entirely to your tale.
          </p>
        </div>

        {/* Suite list */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SUITES.map((suite) => (
            <div
              key={suite.id}
              id={`suite-card-${suite.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-gold/15 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              {/* Suite image with hover effects */}
              <div className="relative aspect-[4:3] overflow-hidden">
                <img
                  src={suite.image}
                  alt={suite.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded text-[10px] uppercase font-mono tracking-widest font-semibold text-gold-dark border border-gold/10">
                  From ${suite.price} / Night
                </div>
                {/* French name tag */}
                <div className="absolute bottom-4 left-4 bg-luxury-charcoal/80 backdrop-blur-sm px-2.5 py-1 rounded">
                  <span className="text-[10px] text-cream-light font-serif italic tracking-wide">
                    {suite.frenchName}
                  </span>
                </div>
              </div>

              {/* Suite Information */}
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-gold-dark font-medium font-mono">
                    <span>{suite.size}</span>
                    <span>•</span>
                    <span>Accommodates {suite.accommodates}</span>
                  </div>
                  
                  <h3 className="text-xl font-serif text-luxury-charcoal font-semibold">
                    {suite.name}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-luxury-charcoal/70 leading-relaxed font-sans">
                    {suite.description}
                  </p>
                </div>

                {/* Key features checklist */}
                <div className="space-y-1.5 py-3 border-t border-b border-gold/10">
                  <span className="text-[9px] uppercase tracking-widest text-gold font-bold block mb-1">
                    Signature Elements
                  </span>
                  {suite.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-luxury-charcoal/80 leading-snug">
                      <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Showroom CTA buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    id={`btn-gallery-${suite.id}`}
                    onClick={() => {
                      setActiveGallerySuite(suite);
                      setActiveGalleryIndex(0);
                    }}
                    className="px-3 py-2 border border-gold/20 text-luxury-charcoal hover:border-gold hover:bg-cream-dark/30 text-[10px] uppercase tracking-widest font-semibold text-center rounded transition-all"
                  >
                    View Gallery
                  </button>
                  <button
                    id={`btn-reserve-${suite.id}`}
                    onClick={() => handleOpenBookingWithSuite(suite.id)}
                    className="px-3 py-2 bg-luxury-charcoal text-white hover:bg-gold text-[10px] uppercase tracking-widest font-semibold text-center rounded transition-all shadow-sm flex items-center justify-center gap-1"
                  >
                    Reserve Now <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT THE FOUNDERS STORY */}
      <AboutTales />

      {/* BESPOKE ROMANTIC MOOD PLANNER INTEGRATION */}
      <section className="px-4 py-8">
        <MoodPlanner
          onSelectSuite={handleSelectSuite}
          onOpenBooking={() => handleOpenBookingWithSuite(selectedSuiteId)}
        />
      </section>

      {/* TESTIMONIAL LETTERS */}
      <ReviewList />

      {/* RESERVED STORIES HISTORY SECTION */}
      <BookingsHistory bookings={bookings} onCancelBooking={handleCancelBooking} />

      {/* FOOTER */}
      <footer className="bg-luxury-charcoal text-cream-dark/80 pt-16 pb-12 px-4 sm:px-8 border-t border-gold/20 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-widest text-gold font-bold block">Sanctuary Estate</span>
            <h4 className="text-xl font-serif tracking-tight text-white">
              Deborah & Sebastian’s <span className="italic text-gold font-normal">Romantic Tales</span>
            </h4>
            <p className="text-xs text-cream-light/60 leading-relaxed max-w-sm">
              The original sanctuary designed for absolute silence, restoring touch, sensory discovery, and high editorial comfort.
            </p>
            <p className="text-[10px] font-mono text-gold-light/80">
              Inquiries: contact@deborahandsebastian.com
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-gold font-semibold block">Estate Coordinates</span>
            <p className="text-xs flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <span>Route des Falaises d'Or, Pavilion 1-3, Cala di Volpe, Sardinia</span>
            </p>
            <p className="text-xs flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <span>+39 (0) 789 902 4410</span>
            </p>
            <p className="text-xs flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <span>concierge@deborahandsebastian.com</span>
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-gold font-semibold block">Inscribed Guest Notice</span>
            <p className="text-xs text-cream-light/60 leading-relaxed">
              Due to physical space and privacy metrics, arrivals must be booked at least 24 hours in advance. Personal transfers are pre-coordinated.
            </p>
            <div className="pt-2">
              <span className="text-[10px] bg-white/10 px-2 py-1 text-gold-light tracking-wider rounded font-mono">
                Port 3000 Ingress Certified
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/15 pt-8 text-center flex flex-col sm:flex-row justify-between items-center text-[10px] text-cream-light/40 gap-4">
          <p>© 2026 Deborah & Sebastian's Romantic Tales. All stories preserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gold transition-colors">Privacy Charter</a>
            <span>•</span>
            <a href="#" className="hover:text-gold transition-colors">Bespoke Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-gold transition-colors font-mono">Tailwind v4</a>
          </div>
        </div>
      </footer>

      {/* ==================================== */}
      {/* --- LIGHTBOX GALLERY OVERLAY --- */}
      {/* ==================================== */}
      <AnimatePresence>
        {activeGallerySuite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Header control */}
            <div className="flex justify-between items-center w-full max-w-5xl mx-auto">
              <div>
                <span className="text-xs text-gold uppercase tracking-widest">Active Showroom</span>
                <h4 className="text-white text-lg font-serif">{activeGallerySuite.name}</h4>
              </div>
              <button
                id="btn-close-gallery"
                onClick={() => setActiveGallerySuite(null)}
                className="p-2 text-white/75 bg-white/10 rounded-full hover:bg-white/20 transition-all focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Picture Area */}
            <div className="flex items-center justify-between w-full max-w-5xl mx-auto my-auto relative gap-4">
              <button
                id="btn-gallery-prev"
                onClick={() => {
                  setActiveGalleryIndex(
                    activeGalleryIndex === 0 ? activeGallerySuite.gallery.length - 1 : activeGalleryIndex - 1
                  );
                }}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 text-white transition-all focus:outline-none shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="aspect-[16:10] max-w-3xl w-full rounded-xl overflow-hidden border border-white/10 relative">
                <img
                  src={activeGallerySuite.gallery[activeGalleryIndex]}
                  alt={`${activeGallerySuite.name} gallery image`}
                  className="w-full h-full object-cover animate-fade-in"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 right-4 bg-black/60 px-2.5 py-1 text-white text-[10px] font-mono rounded">
                  {activeGalleryIndex + 1} / {activeGallerySuite.gallery.length}
                </div>
              </div>

              <button
                id="btn-gallery-next"
                onClick={() => {
                  setActiveGalleryIndex(
                    activeGalleryIndex === activeGallerySuite.gallery.length - 1 ? 0 : activeGalleryIndex + 1
                  );
                }}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 text-white transition-all focus:outline-none shrink-0"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Footer Specifications pane */}
            <div className="w-full max-w-xl mx-auto text-center space-y-2">
              <p className="text-white text-xs font-serif italic max-w-md mx-auto">
                "Our photography encapsulates real, unmodified lighting. Your shelter will look precisely as depicted on this glass."
              </p>
              <div className="flex justify-center gap-3">
                <button
                  id="btn-gallery-book"
                  onClick={() => {
                    handleOpenBookingWithSuite(activeGallerySuite.id);
                    setActiveGallerySuite(null);
                  }}
                  className="px-5 py-2.5 bg-gold hover:bg-gold-dark text-white font-semibold text-xs uppercase tracking-widest rounded transition-all"
                >
                  Reserve This Suite
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* --- FRICTIONLESS SLIDE-OVER BOOKING DRAWER (MOBILE OPTIMIZED) --- */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop click dismisses */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetBookingFormState}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                className="w-screen max-w-md sm:max-w-xl"
              >
                <div className="h-full flex flex-col bg-cream-light shadow-2xl relative border-l border-gold/25">
                  
                  {/* DRAWER HEADER */}
                  <div className="p-5 border-b border-gold/15 bg-cream-dark flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                        Bespoke Engine
                      </span>
                      <h3 className="text-lg font-serif font-semibold text-luxury-charcoal">
                        Inscribe Your Reservation
                      </h3>
                    </div>
                    <button
                      id="btn-close-booking-drawer"
                      onClick={resetBookingFormState}
                      className="p-1.5 hover:bg-gold/15 text-luxury-charcoal rounded-md transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* STEPPER PROGRESS Indicator */}
                  {activeStep < 4 && (
                    <div className="bg-cream-dark/50 border-b border-gold/10 py-3 px-5 grid grid-cols-3 gap-2 text-center text-[10px] font-semibold uppercase tracking-widest text-luxury-charcoal/50">
                      <div className={`py-1.5 border-b-2 transition-all ${activeStep >= 1 ? 'border-gold text-gold-dark font-bold' : 'border-gold/10'}`}>
                        1. Suite & Dates
                      </div>
                      <div className={`py-1.5 border-b-2 transition-all ${activeStep >= 2 ? 'border-gold text-gold-dark font-bold' : 'border-gold/10'}`}>
                        2. Experiences
                      </div>
                      <div className={`py-1.5 border-b-2 transition-all ${activeStep >= 3 ? 'border-gold text-gold-dark font-bold' : 'border-gold/10'}`}>
                        3. Contact
                      </div>
                    </div>
                  )}

                  {/* MAIN STEPPED FORMS */}
                  <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
                    
                    {/* STEP 1: RESIDENCE SELECTOR & DATES */}
                    {activeStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-5"
                      >
                        {/* Selector of Suite */}
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-2">
                            Select Your Pavilion
                          </label>
                          <div className="space-y-2.5">
                            {SUITES.map((suite) => (
                              <button
                                key={suite.id}
                                id={`book-select-suite-${suite.id}`}
                                type="button"
                                onClick={() => setSelectedSuiteId(suite.id)}
                                className={`w-full p-4 rounded-xl text-left border flex items-center justify-between gap-4 transition-all ${
                                  selectedSuiteId === suite.id
                                    ? 'border-gold bg-white shadow-sm'
                                    : 'border-gold/10 hover:border-gold/20 bg-white/50'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <img
                                    src={suite.image}
                                    alt={suite.name}
                                    referrerPolicy="no-referrer"
                                    className="w-12 h-12 rounded object-cover border border-gold/15"
                                  />
                                  <div>
                                    <h4 className="font-serif font-semibold text-xs sm:text-sm text-luxury-charcoal">
                                      {suite.name}
                                    </h4>
                                    <span className="text-[10px] text-luxury-charcoal/50 block">
                                      {suite.size} • Max {suite.accommodates} Guests
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="block text-xs sm:text-sm text-gold-dark font-serif font-bold">
                                    ${suite.price}
                                  </span>
                                  <span className="text-[9px] text-luxury-charcoal/40 uppercase">per night</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Check-In / Check-Out Inputs */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1.5">
                              Check-In Date
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gold" />
                              <input
                                id="book-checkin-input"
                                type="date"
                                required
                                value={checkIn}
                                min={getTomorrowDateString()}
                                onChange={(e) => {
                                  setCheckIn(e.target.value);
                                  // Auto advance checkout if needed to stay in sync
                                  if (new Date(e.target.value) >= new Date(checkOut)) {
                                    const nextOut = new Date(e.target.value);
                                    nextOut.setDate(nextOut.getDate() + 2);
                                    setCheckOut(nextOut.toISOString().split('T')[0]);
                                  }
                                }}
                                className="w-full pl-9 pr-2 py-2.5 text-xs bg-white border border-gold/15 rounded-md gold-glow text-luxury-charcoal"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1.5">
                              Check-Out Date
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gold" />
                              <input
                                id="book-checkout-input"
                                type="date"
                                required
                                value={checkOut}
                                min={checkIn}
                                onChange={(e) => setCheckOut(e.target.value)}
                                className="w-full pl-9 pr-2 py-2.5 text-xs bg-white border border-gold/15 rounded-md gold-glow text-luxury-charcoal"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Guest Count */}
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1.5">
                            Number of Guests
                          </label>
                          <div className="flex gap-2">
                            {[1, 2].map((num) => (
                              <button
                                key={num}
                                id={`book-guests-${num}`}
                                type="button"
                                onClick={() => setGuests(num)}
                                className={`flex-1 py-2 rounded-md border text-xs tracking-wider transition-all ${
                                  guests === num
                                    ? 'bg-gold text-white border-gold'
                                    : 'bg-white border-gold/15 hover:border-gold-light text-luxury-charcoal/80'
                                }`}
                              >
                                {num} {num === 1 ? 'Adult Traveler' : 'Couples / 2 Adult Travelers'}
                              </button>
                            ))}
                          </div>
                          <span className="text-[9px] text-luxury-charcoal/40 block mt-1.5 italic">
                            Deborah & Sebastian estates are thoughtfully tailored solely for couples restoration and private travelers (maximum 2 occupants).
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: TAILORED EXPERIENCES */}
                    {activeStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="text-center pb-2">
                          <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">TALES OF EXPERIENCE</span>
                          <h4 className="text-sm font-serif italic text-luxury-charcoal mt-1">
                            Would you care to accompany your stay with signature memories?
                          </h4>
                        </div>

                        <div className="space-y-3">
                          {ENHANCEMENTS.map((enh) => {
                            const isAdded = selectedEnhancements.includes(enh.id);
                            return (
                              <button
                                key={enh.id}
                                id={`book-add-enhancement-${enh.id}`}
                                type="button"
                                onClick={() => handleToggleEnhancement(enh.id)}
                                className={`w-full p-4 rounded-xl text-left border flex items-start gap-4 transition-all ${
                                  isAdded
                                    ? 'border-gold bg-white'
                                    : 'border-gold/10 hover:border-gold/25 bg-white/50'
                                }`}
                              >
                                <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                                  isAdded ? 'bg-gold border-gold text-white' : 'border-gold/30 bg-white'
                                }`}>
                                  {isAdded && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                                </div>
                                <div className="space-y-1 flex-grow">
                                  <div className="flex justify-between items-center">
                                    <h5 className="text-xs sm:text-sm font-serif font-bold text-luxury-charcoal">
                                      {enh.name}
                                    </h5>
                                    <span className="text-xs text-gold-dark font-serif font-bold shrink-0">
                                      +${enh.price}
                                    </span>
                                  </div>
                                  <span className="text-[9px] uppercase tracking-wider text-gold-dark block italic leading-none">
                                    {enh.frenchName}
                                  </span>
                                  <p className="text-[11px] text-luxury-charcoal/60 leading-relaxed font-sans pt-1">
                                    {enh.description}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: CONTACT INFORMATION & SECURE CONFIRM */}
                    {activeStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-5"
                      >
                        <div className="text-center pb-2">
                          <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">GUEST SCROLL REGISTRATION</span>
                          <h4 className="text-sm font-serif italic text-luxury-charcoal mt-1">
                            Inscribe details to complete your secure confirmation.
                          </h4>
                        </div>

                        <form id="drawer-guest-form" onSubmit={executeInstantBooking} className="space-y-4">
                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1">
                              Guest Names
                            </label>
                            <input
                              id="guest-name-input"
                              type="text"
                              required
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              placeholder="e.g. Rachel & Arthur Pendelton"
                              className="w-full px-4 py-2.5 text-xs bg-white border border-gold/15 rounded-md gold-glow text-luxury-charcoal"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1">
                                Email Address
                              </label>
                              <input
                                id="guest-email-input"
                                type="email"
                                required
                                value={guestEmail}
                                onChange={(e) => setGuestEmail(e.target.value)}
                                placeholder="e.g. rachel@pendelton.com"
                                className="w-full px-4 py-2.5 text-xs bg-white border border-gold/15 rounded-md gold-glow text-luxury-charcoal"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1">
                                Mobile Contact
                              </label>
                              <input
                                id="guest-phone-input"
                                type="tel"
                                required
                                value={guestPhone}
                                onChange={(e) => setGuestPhone(e.target.value)}
                                placeholder="e.g. +1 (310) 902-8810"
                                className="w-full px-4 py-2.5 text-xs bg-white border border-gold/15 rounded-md gold-glow text-luxury-charcoal"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1">
                              Special Preferences or Dietary Notes
                            </label>
                            <textarea
                              id="guest-notes-input"
                              rows={3}
                              value={guestNotes}
                              onChange={(e) => setGuestNotes(e.target.value)}
                              placeholder="Any custom scent desires, champagne preferences, dietary limits, or landing coordinates?"
                              className="w-full px-3 py-2 text-xs bg-white border border-gold/15 rounded-md gold-glow text-luxury-charcoal font-sans"
                            />
                          </div>

                          <div className="bg-cream-dark p-4 rounded-xl space-y-2 border border-gold/10">
                            <span className="text-[9px] uppercase tracking-widest text-gold font-bold block">Secure Ingress Notice</span>
                            <p className="text-[10px] text-luxury-charcoal/60 leading-normal">
                              We operate on complete end-to-end data safety. Your data is stored locally in deep cookies/isolated containers according to port 3000 safety specifications. A secure butler will call to finalize landing coordinates.
                            </p>
                          </div>

                          {/* Hidden submit so form submit works cleanly */}
                          <input type="submit" className="hidden" id="hidden-booking-submit" />
                        </form>
                      </motion.div>
                    )}

                    {/* STEP 4: SUCCESS CEREMONY CERTIFICATE */}
                    {activeStep === 4 && successBooking && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6 text-center py-6"
                      >
                        {/* Elegant vintage paper layout */}
                        <div className="border-[3px] border-double border-gold p-6 sm:p-10 bg-[#FAF7F0] rounded-xl shadow-lg space-y-6 max-w-lg mx-auto relative">
                          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold-dark/40" />
                          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold-dark/40" />
                          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold-dark/40" />
                          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold-dark/40" />

                          <div className="flex justify-center text-gold">
                            <Sparkles className="w-8 h-8 text-gold-dark animate-spin-slow" />
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] uppercase tracking-widest text-gold font-bold block">Confirmed Scroll Inscribed</span>
                            <h4 className="text-xl sm:text-2xl font-serif text-luxury-charcoal italic font-semibold">
                              Deborah & Sebastian
                            </h4>
                            <span className="text-xs text-luxury-charcoal/50 uppercase font-mono block">
                              Reservation Code: {successBooking.id.toUpperCase()}
                            </span>
                          </div>

                          <div className="h-[1px] bg-gold/20 my-4" />

                          <p className="font-serif text-xs sm:text-sm text-luxury-charcoal/80 leading-relaxed italic">
                            “Salutations, {successBooking.guestName}.
                            We have safely sealed your impending private chapter inside our ledger. The {getSelectedSuite().name} is being prepared with fine Italian linens and organic amber essences for your check-in on {successBooking.checkIn}.”
                          </p>

                          <div className="text-left bg-white/70 p-4 rounded border border-gold/10 text-xs space-y-1.5 font-sans">
                            <div className="flex justify-between">
                              <span className="text-luxury-charcoal/60">Residence Allocated:</span>
                              <span className="font-serif font-bold text-luxury-charcoal">{getSelectedSuite().name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-luxury-charcoal/60">Duration of stay:</span>
                              <span className="font-semibold text-luxury-charcoal">{successBooking.nights} Nights ({successBooking.checkIn} - {successBooking.checkOut})</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-luxury-charcoal/60">Registered Companions:</span>
                              <span className="font-semibold text-luxury-charcoal">{successBooking.guests} Adults</span>
                            </div>
                            {selectedEnhancements.length > 0 && (
                              <div className="pt-1.5 border-t border-gold/10 mt-1">
                                <span className="text-[9px] uppercase tracking-wider text-gold font-bold block mb-1">Experiences Inscribed</span>
                                <div className="flex flex-wrap gap-1">
                                  {ENHANCEMENTS.filter(e => selectedEnhancements.includes(e.id)).map(e => (
                                    <span key={e.id} className="bg-cream-dark px-1.5 py-0.5 rounded text-[9px] text-luxury-charcoal/70">
                                      {e.name}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="pt-3">
                            <span className="text-[10px] text-luxury-charcoal/40 uppercase tracking-widest block">Total Settled on Secure Landing</span>
                            <span className="text-2xl font-serif font-bold text-gold-dark">
                              ${successBooking.totalAmount.toLocaleString()}
                            </span>
                          </div>

                          <div className="pt-4 flex justify-center items-center gap-2">
                            <div className="h-[1px] w-6 bg-gold"></div>
                            <span className="font-serif italic text-xs text-luxury-charcoal/60">
                              Seal of the Founders
                            </span>
                            <div className="h-[1px] w-6 bg-gold"></div>
                          </div>
                        </div>

                        <button
                          id="btn-completion-close"
                          onClick={resetBookingFormState}
                          className="w-full py-3 bg-luxury-charcoal text-white hover:bg-gold rounded text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
                        >
                          Complete Ceremony & Return
                        </button>
                      </motion.div>
                    )}

                  </div>

                  {/* DRAWER FOOTER: LIVE AMOUNT CALCULATION & STEPPER CONTROLS */}
                  {activeStep < 4 && (
                    <div className="p-5 border-t border-gold/15 bg-cream-dark space-y-4">
                      
                      {/* Price summary row */}
                      <div className="flex justify-between items-center text-xs">
                        <div>
                          <span className="text-[11px] font-semibold text-luxury-charcoal">
                            Estimated Reservation Value:
                          </span>
                          <span className="text-[9px] text-luxury-charcoal/40 block">
                            {calculateNightsCount()} nights at {getSelectedSuite().name}
                            {selectedEnhancements.length > 0 && ` + ${selectedEnhancements.length} experiences`}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-serif font-bold text-gold-dark">
                            ${calculateTotalCost().toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Controls Row */}
                      <div className="flex gap-3">
                        {activeStep > 1 && (
                          <button
                            id="btn-booking-back"
                            type="button"
                            onClick={() => setActiveStep(activeStep - 1)}
                            className="px-4 py-2.5 border border-gold/30 text-luxury-charcoal hover:border-gold hover:bg-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            Back
                          </button>
                        )}
                        
                        {activeStep < 3 ? (
                          <button
                            id="btn-booking-next"
                            type="button"
                            onClick={() => setActiveStep(activeStep + 1)}
                            className="flex-1 py-2.5 bg-luxury-charcoal hover:bg-gold text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5"
                          >
                            Continue Securely
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            id="btn-booking-confirm"
                            type="button"
                            onClick={() => {
                              // Trigger state/submit check
                              const form = document.getElementById('drawer-guest-form') as HTMLFormElement;
                              if (form) {
                                if (form.reportValidity()) {
                                  // Submit manually
                                  const mockEvent = { preventDefault: () => {} } as FormEvent;
                                  executeInstantBooking(mockEvent);
                                }
                              }
                            }}
                            className="flex-1 py-3 bg-gold hover:bg-gold-dark text-white text-xs font-bold uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-1.5 shadow-md"
                          >
                            Seal My Reserved Story • ${calculateTotalCost().toLocaleString()}
                          </button>
                        )}
                      </div>

                      <div className="text-center">
                        <span className="text-[9px] text-luxury-charcoal/40 font-mono">
                          Secure PCI SSL Inscription Process
                        </span>
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
