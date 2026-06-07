import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject, input, numberAttribute, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { ProductRemoteService } from '../services/product-remote.service';

@Component({
  selector: 'app-product-detail-page',
  imports: [CurrencyPipe],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent {
  readonly product = input.required<Product>();

  private readonly router = inject(Router);

  private productService = inject(ProductRemoteService);

  onAddToCart(product: Product) {
    console.log('onAddToCart 被呼叫', product);
    this.productService.addToCart(product).subscribe({
      next: (res) => console.log('已加入購物車', res),
      error: (err: unknown) => console.error('加入失敗', err),
    });
  }

  onBack(): void {
    this.router.navigate(['products']);
  }
}
