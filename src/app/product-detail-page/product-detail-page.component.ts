import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../model/product';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-product-detail-page',
  imports: [CurrencyPipe],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent {
  readonly product = input.required<Product>();

  private readonly router = inject(Router);
  private orderService = inject(OrderService);

  onAddToCart(product: Product): void {
    this.orderService.addToCart(product);
  }

  onBack(): void {
    this.router.navigate(['products']);
  }
}
