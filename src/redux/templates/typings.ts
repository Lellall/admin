interface TemplateItem {
  productId: string
  quantity: number
}

export interface Template {
  name: string
  templateItemsDto: TemplateItem[]
  measurement: string
}
