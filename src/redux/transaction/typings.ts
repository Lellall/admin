import { Order } from "../orders/typings"

export interface TransactionRequest {
    page: number
    size: number
    userId: string
    status: "PENDING" | "FAILED" | "COMPLETED"
    startingAt?: Date
}

export interface TransactionResponse {
    resultTotal: number
    pageTotal: number
    data: Order[]
}
