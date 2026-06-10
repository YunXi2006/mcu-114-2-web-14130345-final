import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CartItem } from '../model/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-shoppingcar-page',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './shoppingcar-page.component.html',
  styleUrl: './shoppingcar-page.component.scss',
})
export class ShoppingCarPageComponent {
  private orderService = inject(OrderService);

  protected cartItems = this.orderService.cartItems;

  protected total = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );

  protected readonly form = new FormGroup({
    name: new FormControl<string | null>(null, { validators: [Validators.required] }),
    address: new FormControl<string | null>(null, { validators: [Validators.required] }),
    phone: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });

  get name() {
    return this.form.get('name') as FormControl<string | null>;
  }
  get address() {
    return this.form.get('address') as FormControl<string | null>;
  }
  get phone() {
    return this.form.get('phone') as FormControl<string | null>;
  }

  onRemove(cartItem: CartItem): void {
    this.orderService.removeFromCart(cartItem.product.id);
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const { name, phone, address } = this.form.value;
    this.orderService.submitOrder(name!, phone!, address!).subscribe({
      next: () => this.form.reset(),
      error: (err: unknown) => console.error('送出訂單失敗', err),
    });
  }
}
