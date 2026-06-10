import { Product } from './product';

export interface OrderDetail {
  productId: string;
  quantity: number;
}

export class Order {
  constructor(initData?: Partial<Order>) {
    if (!initData) return;
    Object.assign(this, initData);
  }

  id!: string;
  studentId!: string;
  customerName!: string;
  phone!: string;
  address!: string;
  orderDetails!: OrderDetail[];
}

export interface CreateOrderRequest {
  studentId: string;
  customerName: string;
  phone: string;
  address: string;
  orderDetails: OrderDetail[];
}

export interface UpdateOrderRequest {
  id: string;
  studentId: string;
  customerName: string;
  phone: string;
  address: string;
  orderDetails: OrderDetail[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
