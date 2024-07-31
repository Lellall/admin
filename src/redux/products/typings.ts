export interface ProductRequest {
  page: number;
  size: number;
  categoryId?: string;
  filter?: string;
}
export interface UpdateProductRequest {
  isAvailable: boolean;
  price: number;
  description: string;
  id: string;
}

export interface ProductResponse {
  resultTotal: number;
  pageTotal: number;
  data: Product[];
}
export interface Shop {
  name: string;
  address: string;
  status: string;
  active: boolean;
  description: string;
  logoUrl: string;
  timeZone: string;
  inventory: number;
  categoryId: string;
  openingTime: string;
  closingTime: string;
  marketId: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  paystackAccountId: string;
  vatCharge: number;
}
export interface Product {
  id: string;
  name: string;
  price: number;
  minPurchasePrice: number;
  description: string;
  quantity: number;
  inventory: number;
  imageUrl: string;
  discount: number;
  currency: string;
  featured: boolean;
  available: boolean;
  manufacturer: string;
  weight: number;
  height: number;
  width: number;
  depth: number;
  createdAt?: string;
  updatedAt?: string;
  tags: string[];
  shop?: Shop;
  category?: Category;
  pricingDetails?: {
    measurement: string;
    price: number;
  }[];
}
export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  type: 'SHOP' | 'PRODUCT';
}
