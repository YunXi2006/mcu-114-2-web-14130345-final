import { computed, Injectable, signal } from '@angular/core';
import { filter, mergeMap, Observable, of, tap } from 'rxjs';

import { CartItem, CreateOrderRequest, Order, UpdateOrderRequest } from '../model/order';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _orders: Order[] = [];

  private readonly _cartItems = signal<CartItem[]>([]);
  readonly cartItems = this._cartItems.asReadonly();
  readonly cartCount = computed(() => this._cartItems().reduce((sum, item) => sum + item.quantity, 0));

  protected get studentId(): string {
    return '';
  }

  addToCart(product: Product): void {
    this._cartItems.update((items) => {
      const index = items.findIndex((item) => item.product.id === product.id);
      if (index >= 0) {
        return items.map((item, i) => (i === index ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: string): void {
    this._cartItems.update((items) => items.filter((item) => item.product.id !== productId));
  }

  submitOrder(customerName: string, phone: string, address: string): Observable<Order> {
    const request: CreateOrderRequest = {
      studentId: this.studentId,
      customerName,
      phone,
      address,
      orderDetails: this._cartItems().map((item) => ({ productId: item.product.id, quantity: item.quantity })),
    };
    return this.create(request).pipe(tap(() => this._cartItems.set([])));
  }

  getList(studentId: string): Observable<Order[]> {
    return of(this._orders.filter((o) => o.studentId === studentId));
  }

  getById(orderId: string): Observable<Order> {
    return of(this._orders).pipe(
      mergeMap((data) => data),
      filter(({ id }) => id === orderId)
    );
  }

  create(request: CreateOrderRequest): Observable<Order> {
    const order = new Order({ ...request, id: crypto.randomUUID() });
    this._orders.push(order);
    return of(order);
  }

  update(orderId: string, request: UpdateOrderRequest): Observable<Order> {
    const updated = new Order({ ...request, id: orderId });
    const index = this._orders.findIndex((o) => o.id === orderId);
    if (index >= 0) this._orders[index] = updated;
    return of(updated);
  }

  delete(orderId: string): Observable<void> {
    this._orders = this._orders.filter((o) => o.id !== orderId);
    return of(undefined);
  }
}
