export interface TransactionRequest {
  page: number;
  size: number;
  userId: string;
  status: 'PENDING' | 'FAILED' | 'COMPLETED';
  startingAt?: Date;
}

export interface TransactionResponse {
  resultTotal: number;
  pageTotal: number;
  data: Order[];
}

export interface Order {
  reference: string;
  id: string;
  status: 'PENDING' | 'FAILED' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
  items: [];
  amount: number;
  orderId: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
}
