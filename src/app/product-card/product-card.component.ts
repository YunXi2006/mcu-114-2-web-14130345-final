import { CurrencyPipe } from '@angular/common';
import { Component, input, model, numberAttribute, output, inject } from '@angular/core';
import { Product } from '../model/product';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  host: { class: 'app-product-card' },
})
export class ProductCardComponent {
  private orderService = inject(OrderService);

  readonly id = input.required<string>();
  readonly productName = input<string>();
  readonly authors = input<string[]>();
  readonly company = input<string>();
  readonly isShow = model.required<boolean>();
  readonly photoUrl = input<string>();
  readonly createDate = input<Date>();
  readonly product = input.required<Product>();
  readonly price = input<number, string | number>(0, { transform: numberAttribute });

  onSetDisplay(isShow: boolean): void {
    this.isShow.set(isShow);
  }

  onAddToCart(product: Product): void {
    this.orderService.addToCart(product);
  }

  readonly edit = output<void>();
  readonly remove = output<void>();
  readonly view = output<void>();
}
