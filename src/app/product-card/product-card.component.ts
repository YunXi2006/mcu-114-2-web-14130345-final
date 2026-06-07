import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, HostBinding, input, model, numberAttribute, output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductRemoteService } from '../services/product-remote.service';

@Component({
  selector: 'app-product-card',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  host: { class: 'app-product-card' },
})
export class ProductCardComponent {
  private readonly router = inject(Router);

  readonly id = input.required<string>();
  readonly productName = input<string>();
  readonly authors = input<string[]>();
  readonly company = input<string>();
  readonly isShow = model.required<boolean>();
  readonly photoUrl = input<string>();
  readonly createDate = input<Date>();
  readonly product = input.required<Product>();
  readonly price = input<number, string | number>(0, { transform: numberAttribute });
  private productService = inject(ProductRemoteService);
  onSetDisplay(isShow: boolean): void {
    this.isShow.set(isShow);
  }

  onAddToCart(product: Product) {
    console.log('onAddToCart 被呼叫', product);
    this.productService.addToCart(product).subscribe({
      next: (res) => console.log('已加入購物車', res),
      error: (err: unknown) => console.error('加入失敗', err),
    });
  }
  readonly edit = output<void>();
  readonly remove = output<void>();
  readonly view = output<void>();
}
