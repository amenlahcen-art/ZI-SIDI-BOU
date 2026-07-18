export enum LotStatus {
  AVAILABLE = "available",
  OCCUPIED = "occupied",
  RESERVED = "reserved",
  UNDER_CONSTRUCTION = "under_construction",
  EQUIPMENT = "equipment"
}

export interface Lot {
  id: number; // Lot number
  number: string; // Formatting as string for display
  status: LotStatus;
  tranche: "TR I" | "TR II" | "TR III";
  sector: string;
  surface: number; // in m²
  road: string; // e.g., "Voie 20 m"
  situation: "Angle" | "Standard" | "Double Façade";
  price: string; // e.g. "Sur demande"
  companyName?: string;
  activity?: string;
  description?: string;
  services?: string[];
  logoText?: string;
  contact?: {
    phone: string;
    email: string;
    website: string;
  };
  gallery?: string[];
  // SVG relative coordinate representation (0 to 100)
  x: number; // top-left X percentage on map
  y: number; // top-left Y percentage on map
  width: number; // width percentage
  height: number; // height percentage
  lat: number; // georeferenced Latitude
  lng: number; // georeferenced Longitude
}

export type Language = "FR" | "AR" | "EN";

export interface DashboardStats {
  total: number;
  available: number;
  occupied: number;
  reserved: number;
  underConstruction: number;
  equipment: number;
}
