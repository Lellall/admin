interface TemplateItem {
  productId: string
  quantity: number
  unitPrice?: number
  measurement?: string
}

export interface Template {
  name: string
  templateItemsDto: TemplateItem[]
}
