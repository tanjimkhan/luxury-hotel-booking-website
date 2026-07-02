/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suite, Enhancement } from './types';

export const SUITES: Suite[] = [
  {
    id: 'whispering-sea',
    name: 'The Whispering Sea Suite',
    frenchName: 'La Mer Chuchote',
    description: 'An ethereal cliffside pavilion built into the native limestone, offering an unobstructed view of the infinite blue. Designed with fluid architectural lines and open-air thresholds, this premium sanctuary blurs the line between indoor elegance and the marine breeze.',
    price: 1450,
    size: '180 m²',
    accommodates: 2,
    features: [
      'Heated saltwater infinity pool perched over the coastal cliffs',
      'Handmade outdoor solid brass bathing tub under the sky',
      'Private glass-enclosed viewing temple with fireplace',
      'Dedicated host & personalized private estate butler services'
    ],
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800'
    ],
    amenities: [
      'Fine Italian linen & silken pillow menu',
      'Artisanal private cellar & vintage bar',
      'Bang & Olufsen sound sculpture integration',
      'Acqua di Parma toiletries & spa robes'
    ]
  },
  {
    id: 'canopy-loft',
    name: 'The Sun-Drenched Canopy Loft',
    frenchName: "Le Dôme d'Or",
    description: 'Tucked into the crest of our ancient olive grove estate, this magnificent glass-dome penthouse presents a modern escape under the sun and stars. Bask in organic textures, terracotta tiles, brushed gold fixtures, and an ambient warmth that celebrates slow luxury.',
    price: 1250,
    size: '140 m²',
    accommodates: 2,
    features: [
      'Fully retracting glass-dome ceiling for stargazing',
      'Double sunbed terrace with integrated lounge hammock',
      'Private cedar wood barrel sauna and cold plunging well',
      'In-suite stone fireplace and curated library of classic literature'
    ],
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800'
    ],
    amenities: [
      'Aero-designed weighted silk bedding',
      'Organic citrus welcome infusions & tea parlor',
      'Custom organic aromatherapy oil diffuser',
      'Dual-zone automated climate & wind control'
    ]
  },
  {
    id: 'velvet-horizon',
    name: 'The Velvet Horizon Sanctuary',
    frenchName: "L'Horizon de Velours",
    description: 'A structural masterpiece of raw basalt stone and rich oak wood, designed to stand in quiet majesty at the highest peak of the coast. Here, shadows dance on elegant minimalist curves, revealing a sanctuary of extreme quiet and unparalleled luxury.',
    price: 1750,
    size: '220 m²',
    accommodates: 2,
    features: [
      'Carved thermal hot spring bath with healing mineral water',
      'Subterranean private wine vault with select vintages',
      'Double-height grand living hall with architectural fire pit',
      'Private terrace with views of both the sunrise cliff and sunset cove'
    ],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1473116763269-255ea7b21dbf?q=80&w=800',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800'
    ],
    amenities: [
      'Cashmere bed draping & goose-down toppers',
      'Private espresso salon with vintage machinery',
      'Personal iPad master automation controller',
      'Organic botanical perfumes & signature bath oils'
    ]
  }
];

export const ENHANCEMENTS: Enhancement[] = [
  {
    id: 'sunset-toast',
    name: 'The Ephemeral Sunset Toast',
    frenchName: 'Le Toast Crépusculaire',
    description: 'Chilled Krug Vintage Champagne & premium wild caviar served in-suite on your cliffside deck by an artisanal dining specialist right at the golden hour.',
    price: 350
  },
  {
    id: 'petal-bath',
    name: 'Clad in Petals Ritual',
    frenchName: 'Le Bain de Roses',
    description: 'A magical sensory bath prepared with warm volcanic spring water, Damascus rose petals, sensory candles, and customized bath massage oils.',
    price: 280
  },
  {
    id: 'michelin-chef',
    name: 'The Private Gastronomique',
    frenchName: 'Le Grand Dîner Privé',
    description: 'A customized, bespoke 6-course degustation menu prepared live in your pavilion by a private Michelin-starred chef, with exquisite vintage wine pairing.',
    price: 600
  },
  {
    id: 'couples-massage',
    name: 'Symphony of Touch Ceremony',
    frenchName: 'L\'Harmonie des Sens',
    description: 'A deep restorative 90-minute couples holistic massage on your private terrace under the stars, utilizing warm amber and jasmine organic oils.',
    price: 450
  }
];
