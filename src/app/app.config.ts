import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { ProductAzureService } from './services/product-azure.service';
import { ProductService } from './services/product.service';
import { OrderService } from './services/order.service';
import { OrderAzurService } from './services/order-azur.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    { provide: ProductService, useClass: ProductAzureService },
    { provide: OrderService, useClass: OrderAzurService },
  ],
};
