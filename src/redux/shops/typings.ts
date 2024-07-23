interface Category {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  type: 'SHOP'; // Enum value based on the provided example
}

interface Time {
  hour: number | null;
  minute: number | null;
  second: number | null;
  nano: number | null;
}

interface Metadata {
  [key: string]: string;
}

interface Market {
  id: string;
  name: string;
  state: string;
}

interface Coordinate {
  latitude: number | string;
  longitude: number | string;
}

export interface Shop {
  id: string;
  description: string;
  logoUrl: string;
  name: string;
  address: string;
  status: 'OPEN'; // Enum value based on the provided example
  inventory: number;
  active: boolean;
  createdAt: string; // ISO 8601 date format
  updatedAt: string; // ISO 8601 date format
  timeZone: string;
  category: Category;
  openingTime?: Time;
  closingTime?: Time;
  metadata?: Metadata;
  subAccountId: string;
  vatCharge: number;
  market: Market;
  coordinate?: Coordinate;
}

export interface ShopRequest {
  id: string;
}
export interface ShopsResponse {
  resultTotal: number;
  pageTotal: number;
  data: Shop[];
}
export interface ShopsRequest {
  page: number;
  size: number;
  categoryId?: string;
  filter?: string;
}
