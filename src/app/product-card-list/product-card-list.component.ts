import { Component, input, output, signal, computed, OnInit, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../model/product';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-product-card-list',
  imports: [FormsModule, PaginationComponent, ProductCardComponent],
  templateUrl: './product-card-list.component.html',
  styleUrl: './product-card-list.component.scss',
})
export class ProductCardListComponent implements OnInit {
  readonly products = input<Product[]>([]);

  readonly edit = output<Product>();
  readonly remove = output<Product>();
  readonly view = output<Product>();

  searchKeyword = '';
  filteredProducts = signal<Product[]>([]);

  ngOnInit() {
    this.filteredProducts.set(this.products());
  }

  constructor() {
    effect(() => {
      // products() 每次更新都會自動執行
      this.filteredProducts.set(this.products());
    });
  }

  onSearch() {
    const keyword = this.searchKeyword.trim();
    this.filteredProducts.set(this.products().filter((p) => p.name.includes(keyword)));
  }
}
