import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Address } from '@core/models/address.model';
import { SelectedMeal } from '@core/models/cart.model';
import { Customer } from '@core/models/customer.model';
import { Meal } from '@core/models/meal.model';
import { OrderStored } from '@core/models/order.model';
import { Payment } from '@core/models/payment.model';
import { environment } from '@env';

import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;  
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an order', () => {
    const dummyMeal1 = new Meal(1, 1, "meal 1", 1, 1, 1, "description", []);
    const dummyMeal2 = new Meal(2, 2, "meal 2", 2, 2, 2, "description", []);
    const dummyAddress = new Address("123","country", "state", "city", "street", "complement");
    const dummyPayment = new Payment("method", "name", 0, "expiration date", "security code", "country", "postal code");
    const dummySelectedMeals = [new SelectedMeal(dummyMeal1, 1), new SelectedMeal(dummyMeal2, 2)];
    const dummyCustomer = new Customer(0, "name", "email", "token", new Date(new Date().getTime() + 1000));

    var obj: Object = new Object();
    service.addOrder(dummyAddress, dummyPayment, dummySelectedMeals, dummyCustomer ).subscribe(response => {
      expect(response).toEqual(Object);
    });

    const req = httpMock.expectOne({
      url: `${environment.ecommerceUrl}/${environment.order}`,
      method: "POST"
    });
  });

  it('should return the customer orders', () => {  
    const dummyOrders = [ new OrderStored(1, new Date(), "Created", [])]

    service.getOrders(1).subscribe(response => {
      expect(response).toEqual(dummyOrders);
    });

    const req = httpMock.expectOne({
      url: `${environment.ecommerceUrl}/${environment.order}/getOrders`,
      method: "POST"
    });

    req.flush(dummyOrders);
  });
});
