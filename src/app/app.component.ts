import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ProductPageComponent } from './product-page/product-page.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ProductPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {}
