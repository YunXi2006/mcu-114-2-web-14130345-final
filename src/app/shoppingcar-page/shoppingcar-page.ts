import { Component, inject, signal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../model/product';

// 購物車項目的型別，多了 quantity 和原始 ids
interface CartItem {
  product: Product;
  quantity: number;
  ids: string[]; // json-server 裡每筆資料的 id，刪除時用
}

@Component({
  selector: 'app-shoppingcar-page',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './shoppingcar-page.component.html',
  styleUrl: './shoppingcar-page.component.scss',
})
export class ShoppingCarPageComponent implements OnInit {
  private httpClient = inject(HttpClient);
  private cartUrl = 'http://localhost:3000/cart';

  protected cartItems = signal<CartItem[]>([]);
  protected total = signal<number>(0);

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

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart(): void {
    this.httpClient.get<Product[]>(this.cartUrl).subscribe({
      next: (items) => {
        // 依照 product.name 合併相同產品
        const map = new Map<string, CartItem>();
        for (const item of items) {
          const key = item.name;
          if (map.has(key)) {
            const existing = map.get(key)!;
            existing.quantity += 1;
            existing.ids.push(item.id);
          } else {
            map.set(key, { product: item, quantity: 1, ids: [item.id] });
          }
        }
        const merged = Array.from(map.values());
        this.cartItems.set(merged);
        this.recalcTotal(merged);
      },
      error: (err: unknown) => console.error('讀取購物車失敗', err),
    });
  }

  private recalcTotal(items: CartItem[]): void {
    this.total.set(items.reduce((sum, item) => sum + item.product.price * item.quantity, 0));
  }

  onRemove(cartItem: CartItem): void {
    // 刪除該產品在 json-server 裡的所有筆資料
    const deletes = cartItem.ids.map((id) => this.httpClient.delete(`${this.cartUrl}/${id}`));
    import('rxjs').then(({ forkJoin }) => {
      forkJoin(deletes).subscribe({
        next: () => {
          const updated = this.cartItems().filter((i) => i.product.name !== cartItem.product.name);
          this.cartItems.set(updated);
          this.recalcTotal(updated);
        },
        error: (err: unknown) => console.error('刪除失敗', err),
      });
    });
  }
}
