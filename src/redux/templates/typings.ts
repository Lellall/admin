interface TemplateItem {
  productId: number;
  quantity: number;
}

export interface Template {
  name: string;
  existingTemplateItemsDto: TemplateItem[];
}
