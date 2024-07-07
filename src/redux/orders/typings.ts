export interface OrderRequest {
  page: number;
  size: number;
  sort?: "DESC" | "ASC";
}

export interface OrderResponse {
  resultTotal: number;
  pageTotal: number;
  data: Order[];
}

export interface Order {
  orderId: string;
  orderCode: string;
  paymentItems: [
    {
      productId: string;
      count: number;
      productName: string;
      price: number;
    }
  ];
  status: string;
  address: {
    streetName: string;
    houseNumber: string;
    apartmentName: string;
    estate: string;
    poBox: string;
  };
}
