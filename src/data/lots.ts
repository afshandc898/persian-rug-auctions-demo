export interface Lot {
  id: number;
  lotNumber: string;
  title: string;
  shortTitle: string;
  origin: string;
  size: string;
  sizeCm: string;
  era: string;
  material: string;
  type: string;
  knotDensity: string;
  condition: string;
  description: string;
  currentBid: number;
  startingBid: number;
  rrp: number;
  numberOfBids: number;
  endTime: string;
  image: string;
  images: string[];
  featured: boolean;
  category: string;
}

export interface Bid {
  bidder: string;
  amount: number;
  time: string;
}

export const lots: Lot[] = [
  {
    id: 1,
    lotNumber: "01",
    title: "Superb Quality Hand-Knotted Kork-Kashan Carpet",
    shortTitle: "Kork-Kashan Carpet",
    origin: "Persia (Iran)",
    size: "407 × 296 cm",
    sizeCm: "407×296",
    era: "Vintage (c. 1960s)",
    material: "Wool & Silk on Cotton",
    type: "Carpet",
    knotDensity: "350 KPSI",
    condition: "Excellent — minor age-related wear consistent with vintage status",
    description: "An exceptional Kork-Kashan carpet of superb quality featuring an elaborate central medallion design with intricate floral arabesques. The rich colour palette of deep reds, navy blues, and ivory creates a stunning visual impact. Hand-knotted using premium kork wool and silk highlights on a cotton foundation. This carpet exemplifies the finest traditions of Kashan weaving.",
    currentBid: 4200,
    startingBid: 500,
    rrp: 16000,
    numberOfBids: 18,
    endTime: "2026-02-15T16:00:00+11:00",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=1200&q=90",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=90",
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=1200&q=90",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=90"
    ],
    featured: true,
    category: "VIC"
  },
  {
    id: 2,
    lotNumber: "02",
    title: "Fine Antique Tabriz Carpet with Hunting Scene",
    shortTitle: "Tabriz Hunting Scene",
    origin: "Persia (Iran)",
    size: "350 × 250 cm",
    sizeCm: "350×250",
    era: "Antique (c. 1920s)",
    material: "Wool on Cotton",
    type: "Carpet",
    knotDensity: "400 KPSI",
    condition: "Very Good — expertly restored minor areas",
    description: "A magnificent antique Tabriz carpet featuring an elaborate hunting scene with horsemen, deer, and birds set amongst a dense floral field. The exceptional detail and artistry in this piece represent the golden age of Tabriz carpet weaving. Rich tones of ruby red, sapphire blue, and antique gold.",
    currentBid: 6500,
    startingBid: 1000,
    rrp: 35000,
    numberOfBids: 24,
    endTime: "2026-02-15T16:00:00+11:00",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=90",
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=1200&q=90",
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=1200&q=90"
    ],
    featured: true,
    category: "VIC"
  },
  {
    id: 3,
    lotNumber: "03",
    title: "Handmade Afghan Kazak Runner in Vibrant Colours",
    shortTitle: "Afghan Kazak Runner",
    origin: "Afghanistan",
    size: "290 × 80 cm",
    sizeCm: "290×80",
    era: "Contemporary",
    material: "Wool on Wool",
    type: "Runner",
    knotDensity: "180 KPSI",
    condition: "New — unused",
    description: "A vibrant handmade Afghan Kazak runner featuring bold geometric medallions in rich red, deep navy, and warm amber tones. Made with hand-spun wool and natural dyes, this runner showcases the traditional craftsmanship of Afghan Kazak weavers. Perfect for hallways and entryways.",
    currentBid: 320,
    startingBid: 90,
    rrp: 1800,
    numberOfBids: 8,
    endTime: "2026-02-15T16:00:00+11:00",
    image: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=1200&q=90",
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=1200&q=90"
    ],
    featured: true,
    category: "NSW"
  },
  {
    id: 4,
    lotNumber: "04",
    title: "Exceptional Silk Isfahan Carpet — Museum Quality",
    shortTitle: "Silk Isfahan Carpet",
    origin: "Persia (Iran)",
    size: "230 × 160 cm",
    sizeCm: "230×160",
    era: "Vintage (c. 1970s)",
    material: "Pure Silk on Silk",
    type: "Carpet",
    knotDensity: "600 KPSI",
    condition: "Excellent",
    description: "A truly exceptional pure silk Isfahan carpet of museum quality. Features an incredibly detailed central medallion with delicate floral tendrils and arabesque borders. The extraordinary knot density of 600 KPSI creates an almost fabric-like texture with a luminous sheen. Colours include ivory, soft rose, sage green, and sky blue.",
    currentBid: 5800,
    startingBid: 2000,
    rrp: 28000,
    numberOfBids: 15,
    endTime: "2026-02-15T16:00:00+11:00",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=90",
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=1200&q=90"
    ],
    featured: true,
    category: "VIC"
  },
  {
    id: 5,
    lotNumber: "05",
    title: "Antique Heriz Serapi Carpet — Bold Geometric Design",
    shortTitle: "Heriz Serapi Carpet",
    origin: "Persia (Iran)",
    size: "320 × 240 cm",
    sizeCm: "320×240",
    era: "Antique (c. 1930s)",
    material: "Wool on Cotton",
    type: "Carpet",
    knotDensity: "200 KPSI",
    condition: "Good — some age-related wear adds character",
    description: "A striking antique Heriz Serapi carpet with a bold geometric central medallion in traditional rust red, navy blue, and cream. Known for their durability and distinctive designs, Heriz carpets from this era are highly sought after by collectors. The angular medallion and corner spandrels are characteristic of the finest Serapi production.",
    currentBid: 3100,
    startingBid: 800,
    rrp: 14000,
    numberOfBids: 12,
    endTime: "2026-02-15T16:00:00+11:00",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=1200&q=90"
    ],
    featured: true,
    category: "QLD"
  },
  {
    id: 6,
    lotNumber: "06",
    title: "Traditional Turkmen Bokhara Carpet — Deep Red",
    shortTitle: "Turkmen Bokhara",
    origin: "Afghanistan",
    size: "200 × 150 cm",
    sizeCm: "200×150",
    era: "Contemporary",
    material: "Wool on Wool",
    type: "Carpet",
    knotDensity: "250 KPSI",
    condition: "New — unused",
    description: "A classic Turkmen Bokhara carpet in the traditional deep red ground with rows of gul (elephant foot) motifs in navy and ivory. Tightly woven with high-quality wool, this carpet represents excellent value and will last for generations.",
    currentBid: 450,
    startingBid: 150,
    rrp: 2400,
    numberOfBids: 6,
    endTime: "2026-02-15T16:00:00+11:00",
    image: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=1200&q=90"
    ],
    featured: true,
    category: "SA"
  },
  {
    id: 7,
    lotNumber: "07",
    title: "Hand-Woven Kilim Rug — Vegetable Dyed",
    shortTitle: "Kilim Rug",
    origin: "Afghanistan",
    size: "180 × 120 cm",
    sizeCm: "180×120",
    era: "Contemporary",
    material: "Wool (Vegetable Dyed)",
    type: "Kilim",
    knotDensity: "Flatweave",
    condition: "New — unused",
    description: "A beautifully hand-woven kilim rug using traditional vegetable dyes to create warm, earthy tones. Features geometric tribal patterns in terracotta, indigo, saffron, and natural cream. Reversible and lightweight, perfect as a feature rug or wall hanging.",
    currentBid: 180,
    startingBid: 90,
    rrp: 950,
    numberOfBids: 4,
    endTime: "2026-02-15T16:00:00+11:00",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=90"
    ],
    featured: false,
    category: "VIC"
  },
  {
    id: 8,
    lotNumber: "08",
    title: "Fine Nain Carpet with Silk Highlights — Ivory Ground",
    shortTitle: "Nain Carpet",
    origin: "Persia (Iran)",
    size: "300 × 200 cm",
    sizeCm: "300×200",
    era: "Vintage (c. 1980s)",
    material: "Wool & Silk on Cotton",
    type: "Carpet",
    knotDensity: "450 KPSI",
    condition: "Very Good",
    description: "An elegant Nain carpet on an ivory ground with intricate floral patterns outlined in silk. The delicate palette of cream, soft blue, and touches of blush creates a refined and sophisticated appearance. Nain carpets are among the most desirable Persian rugs.",
    currentBid: 2800,
    startingBid: 600,
    rrp: 12000,
    numberOfBids: 11,
    endTime: "2026-02-15T16:00:00+11:00",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=1200&q=90"
    ],
    featured: true,
    category: "WA"
  },
  {
    id: 9,
    lotNumber: "09",
    title: "Vintage Bakhtiari Garden Design Carpet",
    shortTitle: "Bakhtiari Garden",
    origin: "Persia (Iran)",
    size: "280 × 190 cm",
    sizeCm: "280×190",
    era: "Vintage (c. 1950s)",
    material: "Wool on Cotton",
    type: "Carpet",
    knotDensity: "180 KPSI",
    condition: "Good — beautiful patina",
    description: "A charming vintage Bakhtiari carpet featuring the iconic garden panel design (Kheshti). Each panel contains a different floral motif — trees of life, vases of flowers, and botanical patterns. Rich warm colours with beautiful age-related patina.",
    currentBid: 1600,
    startingBid: 400,
    rrp: 7500,
    numberOfBids: 9,
    endTime: "2026-02-15T16:00:00+11:00",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=90"
    ],
    featured: false,
    category: "VIC"
  },
  {
    id: 10,
    lotNumber: "10",
    title: "Antique Tribal Saddlebag — Collector's Piece",
    shortTitle: "Tribal Saddlebag",
    origin: "Persia (Iran)",
    size: "110 × 60 cm",
    sizeCm: "110×60",
    era: "Antique (c. 1910s)",
    material: "Wool on Wool",
    type: "Saddlebag",
    knotDensity: "150 KPSI",
    condition: "Good — age-appropriate wear, structurally sound",
    description: "A rare antique tribal saddlebag from the Qashqai nomads of southern Iran. Features bold geometric motifs and rich natural dyes. These functional textile pieces are increasingly sought after by collectors for their artistic merit and historical significance.",
    currentBid: 280,
    startingBid: 100,
    rrp: 1500,
    numberOfBids: 5,
    endTime: "2026-02-15T16:00:00+11:00",
    image: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=1200&q=90"
    ],
    featured: false,
    category: "TAS"
  },
  {
    id: 11,
    lotNumber: "11",
    title: "Large Mashad Carpet — Palace Size",
    shortTitle: "Mashad Palace Carpet",
    origin: "Persia (Iran)",
    size: "450 × 350 cm",
    sizeCm: "450×350",
    era: "Vintage (c. 1960s)",
    material: "Wool on Cotton",
    type: "Carpet",
    knotDensity: "280 KPSI",
    condition: "Very Good",
    description: "An impressive palace-size Mashad carpet featuring a grand central medallion on a burgundy field with navy blue borders. The scale and quality of this piece make it suitable for large living areas and formal reception rooms.",
    currentBid: 3800,
    startingBid: 800,
    rrp: 18000,
    numberOfBids: 14,
    endTime: "2026-02-15T16:00:00+11:00",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=1200&q=90"
    ],
    featured: false,
    category: "VIC"
  },
  {
    id: 12,
    lotNumber: "12",
    title: "Contemporary Chobi Peshawar Carpet — Muted Tones",
    shortTitle: "Chobi Peshawar",
    origin: "Afghanistan",
    size: "250 × 170 cm",
    sizeCm: "250×170",
    era: "Contemporary",
    material: "Wool on Cotton",
    type: "Carpet",
    knotDensity: "200 KPSI",
    condition: "New — unused",
    description: "A beautifully understated Chobi Peshawar carpet with muted, sun-washed tones of soft gold, pale terracotta, and cream. Hand-knotted using vegetable dyes and fine Afghan wool. The subtle Ziegler-inspired design makes this rug perfect for contemporary interiors.",
    currentBid: 750,
    startingBid: 200,
    rrp: 4200,
    numberOfBids: 7,
    endTime: "2026-02-15T16:00:00+11:00",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=90"
    ],
    featured: false,
    category: "ACT"
  }
];

export const bidHistory: Record<number, Bid[]> = {
  1: [
    { bidder: "Bidder A", amount: 4200, time: "2026-02-13T14:30:00+11:00" },
    { bidder: "Bidder C", amount: 4000, time: "2026-02-13T12:15:00+11:00" },
    { bidder: "Bidder A", amount: 3800, time: "2026-02-13T10:00:00+11:00" },
    { bidder: "Bidder B", amount: 3500, time: "2026-02-12T22:45:00+11:00" },
    { bidder: "Bidder D", amount: 3200, time: "2026-02-12T18:30:00+11:00" },
    { bidder: "Bidder A", amount: 3000, time: "2026-02-12T15:00:00+11:00" },
    { bidder: "Bidder C", amount: 2500, time: "2026-02-12T09:30:00+11:00" },
    { bidder: "Bidder B", amount: 2000, time: "2026-02-11T20:00:00+11:00" },
    { bidder: "Bidder A", amount: 1500, time: "2026-02-11T16:00:00+11:00" },
    { bidder: "Bidder E", amount: 1000, time: "2026-02-11T10:00:00+11:00" },
    { bidder: "Bidder B", amount: 800, time: "2026-02-10T14:00:00+11:00" },
    { bidder: "Bidder A", amount: 500, time: "2026-02-10T09:00:00+11:00" },
  ],
  2: [
    { bidder: "Bidder F", amount: 6500, time: "2026-02-14T09:00:00+11:00" },
    { bidder: "Bidder G", amount: 6000, time: "2026-02-13T22:00:00+11:00" },
    { bidder: "Bidder F", amount: 5500, time: "2026-02-13T18:00:00+11:00" },
    { bidder: "Bidder H", amount: 5000, time: "2026-02-13T12:00:00+11:00" },
    { bidder: "Bidder G", amount: 4500, time: "2026-02-12T20:00:00+11:00" },
    { bidder: "Bidder F", amount: 4000, time: "2026-02-12T15:00:00+11:00" },
  ]
};

export const testimonials = [
  {
    name: "Sarah M.",
    location: "Sydney, NSW",
    rating: 5,
    text: "Absolutely stunning rug and exceptional service. The online auction process was exciting and seamless. My Tabriz carpet is even more beautiful in person than in the photos. Highly recommend!",
    date: "January 2026"
  },
  {
    name: "David & Helen K.",
    location: "Melbourne, VIC",
    rating: 5,
    text: "We've purchased three rugs from Persian Rug Auctions now. Each one has been of outstanding quality and far below retail prices. Majid's knowledge of Persian carpets is second to none.",
    date: "December 2025"
  },
  {
    name: "James T.",
    location: "Brisbane, QLD",
    rating: 5,
    text: "As a first-time rug buyer, I was nervous about bidding online. The team was incredibly helpful, answering all my questions about the rugs and the auction process. My Heriz carpet is now the centrepiece of our living room.",
    date: "November 2025"
  },
  {
    name: "Patricia W.",
    location: "Adelaide, SA",
    rating: 5,
    text: "The certificate of authenticity and valuation gave me great confidence in my purchase. The rug was carefully packed and arrived in perfect condition. Will definitely bid again!",
    date: "October 2025"
  },
  {
    name: "Michael R.",
    location: "Perth, WA",
    rating: 5,
    text: "Incredible value. I picked up a genuine handmade Isfahan carpet for a fraction of the retail price. The quality is exceptional — you can feel the craftsmanship in every knot.",
    date: "September 2025"
  },
  {
    name: "Linda & Robert S.",
    location: "Hobart, TAS",
    rating: 5,
    text: "We collect Persian rugs and have found some of our best pieces through Persian Rug Auctions. The descriptions are accurate, the photos are detailed, and the service is always professional.",
    date: "August 2025"
  }
];
