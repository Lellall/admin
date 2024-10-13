import { User } from "../auth/typings"

export interface OrderRequest {
  page: number
  size: number
  sort?: "DESC" | "ASC"
}

export interface ConsumerHistoryRequest {
  page: number
  size: number
  status: "PENDING" | "ACCEPTED" | "ON_GOING" | "COMPLETED" | "CANCELED"
}

export interface OrderResponse {
  resultTotal: number
  pageTotal: number
  data: Order[]
}

export interface Order {
  id: string
  reference: string
  status: string
  amount: number
  userId?: string
  orderId?: string
  items: {
    productId: string
    count: number
    productName: string
    price: number
  }[]
  user: User
  createdAt: string
  updatedAt: string
  address: Address
  phoneNumber: string
  customerName: string
}

export interface CompleteOrderRequest {
  id: string
}
interface PaymentItem {
  productId: string
  count: number
  productName: string
  price: number
}

interface Address {
  streetName: string
  houseNumber: string
  apartmentName: string
  estate: string
  poBox: string
}

interface DeliveryPoint {
  latitude: number
  longitude: number
}

export interface ConsumerOrderHistory {
  orderId: string
  orderCode: string
  paymentItems: PaymentItem[]
  status: "PENDING" | "ACCEPTED" | "ON_GOING" | "COMPLETED" | "CANCELED" // Adjust status values as needed
  address: Address
  deliveryPoint: DeliveryPoint
  distance: number
  consumerPhoneNumber: string
  bundleId: string
}

export interface ConsumerHistoryResponse {
  resultTotal: number
  pageTotal: number
  data: ConsumerOrderHistory[]
}

//any below is related invoices only
export interface InvoiceRequest {
  restaurantId: string
  page?: number
  size?: number
  sort?: string
  direction?: string
}

interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

interface Pageable {
  offset: number
  sort: Sort
  pageNumber: number
  pageSize: number
  paged: boolean
  unpaged: boolean
}

interface Invoice {
  invoiceId: string
  orderDate: string // could also use Date if needed
  consumerPhoneNumber: string
}

export interface InvoicesResponse {
  totalPages: number
  totalElements: number
  size: number
  content: Invoice[]
  number: number
  sort: Sort
  numberOfElements: number
  pageable: Pageable
  first: boolean
  last: boolean
  empty: boolean
}
