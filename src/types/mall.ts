export type FloorLevel = 'B1' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5';

export type StoreCategory = 
  | 'all'
  | 'fashion'
  | 'jewellery'
  | 'beauty'
  | 'dining'
  | 'cafe'
  | 'tech'
  | 'entertainment';

export interface Store {
  id: string;
  name: string;
  tagline: string;
  category: StoreCategory;
  categoryLabel: string;
  floor: FloorLevel;
  floorName: string;
  suiteNumber: string;
  hours: string;
  phone: string;
  description: string;
  featured?: boolean;
  services: string[];
  promotion?: {
    title: string;
    description: string;
    validUntil: string;
  };
  priceRange?: '$$' | '$$$' | '$$$$';
  rating: number;
  mapLotId: string;
  tags: string[];
}

export interface DiningItem extends Store {
  cuisine: string;
  dressCode?: string;
  acceptsReservations: boolean;
  michelinGuide?: string;
}

export interface MapLot {
  id: string;
  storeId?: string;
  name: string;
  category: StoreCategory;
  floor: FloorLevel;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'store' | 'dining' | 'facility' | 'anchor' | 'atrium' | 'garden';
  isAnchor?: boolean;
}

export interface Facility {
  id: string;
  name: string;
  type: 'elevator' | 'restroom' | 'valet' | 'concierge' | 'metro' | 'ev' | 'atm';
  floor: FloorLevel;
  x: number;
  y: number;
  description: string;
}

export interface MovieScreening {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  posterBg: string;
  synopsis: string;
  auditorium: 'IMAX Laser' | 'Dolby Atmos Suite' | 'CineLuxe Bed Lounge';
  times: string[];
  hallNumber: string;
}

export interface MallEvent {
  id: string;
  title: string;
  subtitle: string;
  dates: string;
  location: string;
  floor: FloorLevel;
  time: string;
  admission: 'Complimentary' | 'VIP Members Only' | 'Ticketed';
  description: string;
  tag: string;
}

export interface ParkingBay {
  level: string;
  name: string;
  totalBays: number;
  availableBays: number;
  evTotal: number;
  evAvailable: number;
  status: 'Ample' | 'Moderate' | 'Nearly Full';
}
