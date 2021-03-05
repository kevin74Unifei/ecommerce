import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Address } from '@core/models/address.model';
import { SelectedMeal } from '@core/models/cart.model';
import { Customer } from '@core/models/customer.model';
import { Meal } from '@core/models/meal.model';
import { Payment } from '@core/models/payment.model';
import { CartService } from '@core/services/cart.service';
import { CustomerService } from '@core/services/customer.service';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;
  let customerService: CustomerService;
  let router: Router;

  const dummyProfile = {
    id: 1,
    name: 'Harry',
    password: 'Password',
    email: 'harry@email.com',
    address: new Address('123456', 'Brazil', 'SP', 'São Paulo', 'Paulista', 'Center'),
    payment: new Payment('1', 'Harry Bale', 124135312, '03/27', '456', 'Brazil', '123456')
  };
  const dummyCustomer = new Customer(dummyProfile.id, null, dummyProfile.email, 'token', new Date());
  const dummySelectedMeals = [
    new SelectedMeal(new Meal(1, 1, "meal 1", 1, 1, 1, "description 1", null), 1),
    new SelectedMeal(new Meal(2, 2, "meal 2", 2, 2, 2, "description 2", null), 2)
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ CartComponent ]
    })
    .compileComponents();

    cartService = TestBed.inject(CartService);
    customerService = TestBed.inject(CustomerService);
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    cartService.products.next(dummySelectedMeals);

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the selected meals', () => {
    const meals = fixture.debugElement.nativeElement.querySelector(".selected-meals");
    console.log(meals);
    expect(meals.hasChildNodes()).toBeTruthy();
  });

  it('should get total', () => {
    let total: number = 0;
    dummySelectedMeals.map(SelectedMeal => total += SelectedMeal.meal.price *  SelectedMeal.amount);
    expect(total).toEqual(component.getTotal());
  });

  it('should redirect to login', () => {
    spyOn(router, 'navigate').and.callFake(() => new Promise((resolve, rejects)=> resolve(true)));
    component.redirect();
    
    expect(router.navigate).toHaveBeenCalledWith(['/customer', 'login', 'cart+checkOut']);
  });

  it('should redirect to checkout', () => {
    customerService.customer.next(dummyCustomer);
    spyOn(router, 'navigate').and.callFake(() => new Promise((resolve, rejects)=> resolve(true)));
    component.redirect();
    
    expect(router.navigate).toHaveBeenCalledWith(['/cart', 'checkOut']);

  });
});
