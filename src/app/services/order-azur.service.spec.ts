import { TestBed } from '@angular/core/testing';

import { OrderAzurService } from './order-azur.service';

describe('OrderAzurService', () => {
  let service: OrderAzurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderAzurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
