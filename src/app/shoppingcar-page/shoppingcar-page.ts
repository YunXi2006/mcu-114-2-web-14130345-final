import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-shoppingcar-page',
  imports: [ReactiveFormsModule],
  templateUrl: './shoppingcar-page.component.html',
  styleUrl: './shoppingcar-page.component.scss',
})
export class ShoppingCarPageComponent {
  protected readonly form = new FormGroup({
    name: new FormControl<string | null>(null, { validators: [Validators.required] }),
    address: new FormControl<string | null>(null, { validators: [Validators.required] }),
    phone: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });
  get name(): FormControl<string | null> {
    return this.form.get('name') as FormControl<string | null>;
  }
  get address(): FormControl<string | null> {
    return this.form.get('address') as FormControl<string | null>;
  }
  get phone(): FormControl<string | null> {
    return this.form.get('phone') as FormControl<string | null>;
  }
}
