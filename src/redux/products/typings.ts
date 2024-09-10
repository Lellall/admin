import * as yup from "yup"
import { Shop } from "../shops/typings"

export interface ProductRequest {
  page: number
  size: number
  categoryId?: string
  filter?: string
}
export interface UpdateProductRequest {
  isAvailable: boolean
  price: number
  description: string
  id: string
}

export interface ProductResponse {
  resultTotal: number
  pageTotal: number
  data: Product[]
}

export interface Product {
  id: string
  name: string
  price: number
  minPurchasePrice: number
  description: string
  quantity: number
  inventory: number
  imageUrl: string
  discount: number
  currency: string
  featured: boolean
  available: boolean
  manufacturer: string
  weight: number
  height: number
  width: number
  depth: number
  createdAt?: string
  updatedAt?: string
  tags: string[]
  shop?: Shop
  category?: Category
  pricingDetails?: {
    measurement: string
    price: number
  }[]
}
export interface Category {
  id: string
  name: string
  imageUrl: string
  description: string
  type: "SHOP" | "PRODUCT"
}

export const productSchema = yup.object().shape({
  id: yup.string().nullable(),
  name: yup.string().required("Name is required"),
  price: yup.number().required("Price is required").positive("Price must be a positive number"),
  minPurchasePrice: yup
    .number()
    .required("Minimum purchase price is required")
    .positive("Minimum purchase price must be a positive number"),
  description: yup.string().required("Description is required"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .integer("Quantity must be an integer")
    .min(0, "Quantity cannot be negative"),
  inventory: yup
    .number()
    .required("Inventory is required")
    .integer("Inventory must be an integer")
    .min(0, "Inventory cannot be negative"),
  imageUrl: yup.string().url("Image URL must be a valid URL").required("Image URL is required"),
  discount: yup.number().min(0, "Discount cannot be negative").max(100, "Discount cannot exceed 100"),
  currency: yup.string().nullable(),
  featured: yup.boolean().required("Featured status is required"),
  available: yup.boolean().required("Availability status is required"),
  manufacturer: yup.string().required("Manufacturer is required"),
  weight: yup.number().nullable().positive("Weight must be a positive number"),
  height: yup.number().nullable(),
  width: yup.number().nullable().optional().positive("Width must be a positive number"),
  depth: yup.number().nullable().optional().positive("Depth must be a positive number"),
  createdAt: yup.string().optional().nullable(),
  updatedAt: yup.string().optional().nullable(),
  tags: yup.array().of(yup.string()).min(1, "At least one tag is required"),
  shop: yup
    .object()
    .shape({
      // Define the schema for Shop if needed
    })
    .nullable(),
  category: yup
    .object()
    .shape({
      // Define the schema for Category if needed
    })
    .nullable(),
  pricingDetails: yup
    .array()
    .of(
      yup.object().shape({
        measurement: yup.string().required("Measurement is required"),
        price: yup.number().required("Price is required").positive("Price must be a positive number"),
      })
    )
    .nullable()
    .required(),
})
