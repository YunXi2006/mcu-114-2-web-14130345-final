import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, HostBinding, input, model, numberAttribute, output, inject } from '@angular/core';
import { Router } from '@angular/router';

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
  readonly price = input<number, string | number>(0, { transform: numberAttribute });

  onSetDisplay(isShow: boolean): void {
    this.isShow.set(isShow);
  }

  onAddToCart(): void {
    this.router.navigate(['shoppingcar-page']);
  }

  readonly edit = output<void>();
  readonly remove = output<void>();
  readonly view = output<void>();
}
