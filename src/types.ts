/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Suite {
  id: string;
  name: string;
  frenchName: string;
  description: string;
  price: number;
  size: string; // e.g. "180 m²"
  accommodates: number; // e.g. 2
  features: string[];
  image: string;
  gallery: string[];
  amenities: string[];
}

export interface Enhancement {
  id: string;
  name: string;
  frenchName: string;
  description: string;
  price: number;
}

export interface Booking {
  id: string;
  suiteId: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  guests: number;
  enhancements: string[]; // enhancement IDs
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestNotes?: string;
  totalAmount: number;
  nights: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}
