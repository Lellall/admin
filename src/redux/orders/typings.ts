import { UserRoleType } from "@/utils/constant"
import { User } from "../auth/typings"
import { Shop } from "../shops/typings"

export interface IncompleteOrderRequest {
  page: number
  size: number
  sort?: "DESC" | "ASC"
}
export interface OrderRequest {
  pageNo: number
  pageSize: number
  role?: UserRoleType
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
type Item = {
  productId: string
  count: number
  productName: string
  price: number
}
export interface Order {
  id: string
  address: Address
  status: string
  consumerPhoneNumber: string
  distance: number
  userId: string
  code: string
  bundleId: string
  items: Item[]
  paymentItems?: Item[]
  orderCode?: string
  deliveryPoint: DeliveryPoint
  riderId: string
  createdAt: string
  user?: User
  amount?: string
  reference?: string
  shop?: Shop
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
  pageTotal: number
  data: Invoice[]
  resultTotal: number
}
