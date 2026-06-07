import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  private httpClient = inject(HttpClient);
  protected cartCount = signal<number>(0);

  ngOnInit(): void {
    this.httpClient.get<unknown[]>('http://localhost:3000/cart').subscribe({
      next: (items) => this.cartCount.set(items.length),
      error: (err: unknown) => console.error('讀取購物車數量失敗', err),
    });
  }
}
