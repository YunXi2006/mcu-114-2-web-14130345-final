import { TestBed } from '@angular/core/testing';

import { ProductAzure } from './product-azure.service';

describe('ProductAzure', () => {
  let service: ProductAzure;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAzure);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
