import { TestBed } from '@angular/core/testing';

import { ProductRemote } from './product-remote.service';

describe('ProductRemote', () => {
  let service: ProductRemote;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRemote);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
