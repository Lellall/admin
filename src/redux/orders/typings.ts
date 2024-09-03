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
