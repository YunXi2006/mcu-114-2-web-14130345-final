import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { Product } from '../model/product';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-page',
  imports: [ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  private readonly router = inject(Router);

  private readonly productService = inject(ProductService);

  protected readonly products = signal<Product[]>([]);

  ngOnInit(): void {
    this.products.set(this.productService.getList());
  }
}
