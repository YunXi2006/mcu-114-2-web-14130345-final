import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateOrderRequest, Order, UpdateOrderRequest } from '../model/order';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root',
})
export class OrderAzurService extends OrderService {
  private readonly url = 'https://mcu-shopping-api.azurewebsites.net/api/order';

  protected override get studentId(): string {
    return '14130345';
  }

  private readonly httpClient = inject(HttpClient);

  override getList(studentId: string): Observable<Order[]> {
    const params = new HttpParams({ fromObject: { studentId } });
    return this.httpClient.get<Order[]>(this.url, { params });
  }

  override getById(orderId: string): Observable<Order> {
    return this.httpClient.get<Order>(`${this.url}/${orderId}`);
  }

  override create(request: CreateOrderRequest): Observable<Order> {
    return this.httpClient.post<Order>(this.url, request);
  }

  override update(orderId: string, request: UpdateOrderRequest): Observable<Order> {
    return this.httpClient.put<Order>(`${this.url}/${orderId}`, request);
  }

  override delete(orderId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${orderId}`);
  }
}
