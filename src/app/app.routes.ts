import { Routes } from '@angular/router';

import { ProductPageComponent } from './product-page/product-page.component';
import { ShoppingCarPageComponent as ShoppingCarPageComponent } from './shoppingcar-page/shoppingcar-page';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: ProductPageComponent },
  { path: 'product/:id', component: ProductDetailPageComponent },
  { path: 'Shopping-car', component: ShoppingCarPageComponent },
];
