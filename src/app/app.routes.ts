import { Routes } from '@angular/router';

import { ProductPageComponent } from './product-page/product-page.component';
import { ShoppingCarPageComponent as ShoppingCarPageComponent } from './shoppingcar-page/shoppingcar-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: ProductPageComponent },
  { path: 'Shopping-car', component: ShoppingCarPageComponent },
];
