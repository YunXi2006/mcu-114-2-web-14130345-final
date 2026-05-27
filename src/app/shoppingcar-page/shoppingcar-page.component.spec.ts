import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingcarPageComponent } from './shoppingcar-page.component';

describe('ShoppingcarPageComponent', () => {
  let component: ShoppingcarPageComponent;
  let fixture: ComponentFixture<ShoppingcarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingcarPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingcarPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
