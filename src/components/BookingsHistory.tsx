/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Trash2, Calendar, Users, DollarSign, Tag, CheckCircle } from 'lucide-react';
import { Booking } from '../types';
import { SUITES, ENHANCEMENTS } from '../data';

interface BookingsHistoryProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}

export default function BookingsHistory({ bookings, onCancelBooking }: BookingsHistoryProps) {
  if (bookings.length === 0) return null;

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto border-t border-gold/10" id="reserved-stories-history">
      <div className="text-center mb-8">
        <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Your Golden Scroll</span>
        <h3 className="text-2xl sm:text-3xl font-serif text-luxury-charcoal mt-1 italic">
          Your Inscribed Bookings
        </h3>
        <p className="text-xs text-luxury-charcoal/60 mt-2 max-w-md mx-auto">
          These romantic chapters have been safely inscribed on your device. Our dedicated hosts are preparing your estate.
        </p>
      </div>

      <div className="space-y-6">
        {bookings.map((booking) => {
          const suite = SUITES.find((s) => s.id === booking.suiteId);
          const activeEnhancements = ENHANCEMENTS.filter((enh) =>
            booking.enhancements.includes(enh.id)
          );

          if (!suite) return null;

          return (
            <div
              key={booking.id}
              id={`booking-card-${booking.id}`}
              className="bg-white border border-gold/20 rounded-2xl p-5 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Gold vertical bar for aesthetic touch */}
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gold"></div>

              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 text-[9px] uppercase tracking-widest bg-gold/10 text-gold-dark font-semibold rounded-md flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-gold" />
                      Inscribed Confirmed
                    </span>
                    <span className="text-[10px] text-luxury-charcoal/40 font-mono">
                      Ref: {booking.id.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-serif text-luxury-charcoal font-semibold">
                      {suite.name}
                    </h4>
                    <span className="text-xs text-gold-dark font-serif italic block mb-1">
                      {suite.frenchName}
                    </span>
                  </div>

                  {/* Booking details badges */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-luxury-charcoal/70">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                      <span>
                        {booking.checkIn} — {booking.checkOut}
                      </span>
                      <span className="text-[10px] bg-cream-dark px-1.5 py-0.5 rounded-sm">
                        {booking.nights} {booking.nights === 1 ? 'Night' : 'Nights'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gold-dark" />
                      <span>{booking.guests} Guests</span>
                    </div>
                  </div>

                  {/* Selected experiences */}
                  {activeEnhancements.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] uppercase tracking-wider text-gold-dark font-medium block mb-1">
                        Accompanied Experiences:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeEnhancements.map((enh) => (
                          <span
                            key={enh.id}
                            className="bg-cream-light border border-gold/10 px-2 py-0.5 rounded text-[10px] text-luxury-charcoal/80 italic font-serif"
                          >
                            {enh.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-1">
                    <span className="text-[11px] block text-luxury-charcoal/70 font-serif">
                      Registered Traveler: <strong className="text-luxury-charcoal">{booking.guestName}</strong> ({booking.guestEmail})
                    </span>
                  </div>
                </div>

                {/* Right col: amount & CTA */}
                <div className="sm:text-right flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-end w-full sm:w-auto border-t sm:border-t-0 border-gold/10 pt-3 sm:pt-0 gap-3">
                  <div>
                    <span className="text-[10px] text-luxury-charcoal/50 uppercase tracking-wider block">Total Reservation Value</span>
                    <span className="text-xl sm:text-2xl font-serif text-gold-dark font-semibold">
                      ${booking.totalAmount.toLocaleString()}
                    </span>
                    <span className="text-[9px] block text-luxury-charcoal/40 font-mono">inclusive of taxes / luxury fees</span>
                  </div>

                  <button
                    id={`btn-cancel-${booking.id}`}
                    onClick={() => {
                      if (window.confirm('Are you traveling elsewhere? Cancellation removes your story entry.')) {
                        onCancelBooking(booking.id);
                      }
                    }}
                    className="p-2 text-luxury-charcoal/40 hover:text-red-500 hover:bg-red-50/50 rounded-md transition-all self-end flex items-center gap-1.5 text-xs font-semibold"
                    title="Cancel Luxury Stay"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sm:hidden text-[10px] uppercase tracking-wider">Cancel Stay</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
