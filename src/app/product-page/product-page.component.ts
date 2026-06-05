import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { Product } from '../model/product';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-product-page',
  imports: [PaginationComponent, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  private readonly router = inject(Router);

  private readonly productService = inject(ProductService);

  protected readonly pageIndex = signal(1);

  protected readonly pageSize = signal(5);

  protected readonly totalCount = signal(0);

  protected readonly products = signal<Product[]>([]);
  protected readonly searchName = signal<string | undefined>(undefined);
  constructor() {
    effect(() => {
      const pageIndex = this.pageIndex();
      const pageSize = this.pageSize();
      const name = this.searchName();
      this.getProducts(name, pageIndex, pageSize);
    });
  }

  onSearch(name: string): void {
    this.searchName.set(name || undefined);
    this.pageIndex.set(1); // 搜尋後回第一頁
  }

  onEdit(product: Product): void {
    this.router.navigate(['product', 'form', product.id]);
  }

  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }

  private getProducts(name: string | undefined, pageIndex: number, pageSize: number): void {
    this.productService.getList(name, pageIndex, pageSize).subscribe(({ data, count }) => {
      this.products.set(data);
      this.totalCount.set(count);
    });
  }
}
