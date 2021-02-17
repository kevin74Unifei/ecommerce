import { TestBed } from '@angular/core/testing';
import { Meal } from '@core/models/meal.model';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  const meal = new Meal(1, 1, 'test', 10, 10, 10, 'test', []);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    service.addProduct(meal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add meal to cart', () => {
    expect(service.products.value.length).toBeGreaterThanOrEqual(1)
  });

  it('should update meal amount', () => {
    const amount = 10;
    service.updateProductAmount(meal, amount);
    expect(service.products.value[0].amount).toBeGreaterThanOrEqual(amount)
  });

  it('should remove meal from cart', () => {
    service.removeProduct(meal);
    expect(service.products.value.length).toBeGreaterThanOrEqual(0)
  });

  it('should clear the cart', async () => {
    service.clearCart();
    expect(service.products.value.length).toBeGreaterThanOrEqual(0)
  });
});
