interface TemplateItem {
  productId: string;
  quantity: number;
}

export interface Template {
  name: string;
  existingTemplateItemsDto: TemplateItem[];
  nonExistingTemplateItems: TemplateItem[];
}
