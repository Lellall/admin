interface Category {
  id: string
  name: string
  imageUrl: string
  description: string
  type: "SHOP" // Enum value based on the provided example
}

interface Time {
  hour: number | null
  minute: number | null
  second: number | null
  nano: number | null
}

interface Metadata {
  [key: string]: string
}

interface Market {
  id: string
  name: string
  state: string
}

interface Coordinate {
  latitude: number | string
  longitude: number | string
}
export interface Shop {
  id?: string
  name: string
  address: string
  status: "OPEN" | "CLOSE"
  active: boolean
  description: string
  logoUrl: string
  timeZone: string
  inventory: number
  categoryId?: string
  openingTime?: Time
  closingTime?: Time
  marketId?: string
  coordinate: {
    latitude: number
    longitude: number
  }
  category?: Category
  paystackAccountId?: string
  vatCharge: number
  market: Market
  subAccountId: string
  metadata?: Metadata
}
// export interface Shop {
//   id: string;
//   description: string;
//   logoUrl: string;
//   name: string;
//   address: string;
//   status: 'OPEN';
//   inventory: number;
//   active: boolean;
//   createdAt: string;
//   updatedAt: string;
//   timeZone: string;
//   category: Category;
//   openingTime?: Time;
//   closingTime?: Time;
//   metadata?: Metadata;
//   subAccountId: string;
//   vatCharge: number;
//   market: Market;
//   coordinate?: Coordinate;
// }

export interface UpdateShopsRequest {
  id: string
  name: string
  address: string
  status: "OPEN"
  active: boolean
  description: string
  logoUrl: string
  timeZone: string
  inventory: number
  categoryId: string
  openingTime: Time
  closingTime: Time
  marketId: string
  coordinate: Coordinate
  paystackAccountId: string
  vatCharge: number
}

export interface ShopRequest {
  id: string
}
export interface ShopsResponse {
  resultTotal: number
  pageTotal: number
  data: Shop[]
}
export interface ShopsRequest {
  page: number
  size: number
  categoryId?: string
  filter?: string
}

export interface ShopsProductResponse {
  resultTotal: number
  pageTotal: number
  data: {
    name: string
    id: string
    description: string
    shop: {
      name: string
      id: string
    }
    imageUrl: string
    price: number
  }[]
}
export interface ShopsProductsRequest extends ShopsRequest {
  id: string
}

export interface SingleShopProductRequest {
  productId: string
  shopId: string
}
