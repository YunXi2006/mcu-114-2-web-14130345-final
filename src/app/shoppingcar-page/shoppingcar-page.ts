import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-shoppingcar-page',
  imports: [ReactiveFormsModule],
  templateUrl: './shoppingcar-page.component.html',
  styleUrl: './shoppingcar-page.component.scss',
})
export class ShoppingCarPageComponent {
  protected readonly form = new FormGroup({
    name: new FormControl<string | null>(null),
    address: new FormControl<string | null>(null),
    phone: new FormControl<string | null>(null),
  });
}
