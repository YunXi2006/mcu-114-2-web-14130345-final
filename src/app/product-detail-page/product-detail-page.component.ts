import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject, input, numberAttribute, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail-page',
  imports: [CurrencyPipe],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent {
  readonly product = input.required<Product>();

  private readonly router = inject(Router);

  private readonly productService = inject(ProductService);

  onAddToCart(): void {
    this.router.navigate(['shoppingcar-page']);
  }

  onBack(): void {
    this.router.navigate(['products']);
  }
}
