import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Address } from '@core/models/address.model';
import { SelectedMeal } from '@core/models/cart.model';
import { Customer } from '@core/models/customer.model';
import { Meal } from '@core/models/meal.model';
import { Payment } from '@core/models/payment.model';
import { CartService } from '@core/services/cart.service';
import { CustomerService, GetResponseData } from '@core/services/customer.service';
import { NotificationService } from '@core/services/notification.service';
import { OrderService } from '@core/services/order.service';
import { SharedModule } from '@shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

import { CheckOutComponent } from './check-out.component';

describe('CheckOutComponent', () => {
  let component: CheckOutComponent;
  let fixture: ComponentFixture<CheckOutComponent>;
  let notificationService: NotificationService;
  let customerService: CustomerService;
  let orderService: OrderService;
  let cartService: CartService;

  const dummyProfile = {
    id: 1,
    name: 'Harry',
    password: 'Password',
    email: 'harry@email.com',
    address: new Address('12345', 'Brazil', 'SP', 'São Paulo', 'Paulista', 'Center'),
    payment: new Payment('1', 'Harry Bale', 123456789012, '0327', '456', 'Brazil', '12345')
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
        RouterTestingModule, 
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        SharedModule
      ],
      declarations: [ CheckOutComponent ]
    })
    .compileComponents();

    notificationService = TestBed.inject(NotificationService);  
    customerService = TestBed.inject(CustomerService);
    orderService = TestBed.inject(OrderService);
    cartService = TestBed.inject(CartService);
  }));

  beforeEach(() => {
    spyOn(customerService, 'getProfile').and.callFake(() => {
      var authResponseData: GetResponseData = {
        address: null,
        payment: null,
        expiresIn: 100,
        password:  'password',
        token: 'token'
      }; 
  
      return of(authResponseData);
    });

    customerService.customer.next(dummyCustomer);
    cartService.products.next(dummySelectedMeals);

    fixture = TestBed.createComponent(CheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    
    const addressPostalCodeInput = compiled.querySelector('input[id="postalCode"]');
    const addressCountryInput = compiled.querySelector('input[id="country"]');
    const addressCityInput = compiled.querySelector('input[id="city"]');
    const addressStateInput = compiled.querySelector('input[id="state"]');
    const addressStreetInput = compiled.querySelector('input[id="street"]');
    const addressComplementInput = compiled.querySelector('input[id="complement"]');
    
    const paymentPostalCodeInput = compiled.querySelector('input[id="paymentPostalCode"]');
    const paymentCountryInput = compiled.querySelector('input[id="paymentCountry"]');
    const paymentNameInput = compiled.querySelector('input[id="name"]');
    const paymentNumberInput = compiled.querySelector('input[id="number"]');
    const paymentExpirationDateInput = compiled.querySelector('input[id="expirationDate"]');
    const paymentSecurityCodeInput = compiled.querySelector('input[id="securityCode"]');
    
    expect(addressPostalCodeInput).toBeTruthy();
    expect(addressCountryInput).toBeTruthy();
    expect(addressCityInput).toBeTruthy();
    expect(addressStateInput).toBeTruthy();
    expect(addressStreetInput).toBeTruthy();
    expect(addressComplementInput).toBeTruthy();
    expect(paymentPostalCodeInput).toBeTruthy();
    expect(paymentCountryInput).toBeTruthy();
    expect(paymentNameInput).toBeTruthy();
    expect(paymentNumberInput).toBeTruthy();
    expect(paymentExpirationDateInput).toBeTruthy();
    expect(paymentSecurityCodeInput).toBeTruthy();
  });

  it('should order', () => {
    const addressPostalCodeInput = component.form.get('address.postalCode');
    const addressCountryInput = component.form.get('address.country');
    const addressStateInput = component.form.get('address.state');
    const addressCityInput = component.form.get('address.city');
    const addressStreetInput = component.form.get('address.street');
    const addressComplementInput = component.form.get('address.complement');
    const paymentPostalCodeInput = component.form.get('payment.postalCode');
    const paymentCountryInput = component.form.get('payment.country');
    const paymentNameInput = component.form.get('payment.name');
    const paymentNumberInput = component.form.get('payment.number');
    const paymentExpirationDateInput = component.form.get('payment.expirationDate');
    const paymentSecurityCodeInput = component.form.get('payment.securityCode');

    addressPostalCodeInput.setValue(dummyProfile.address.postalCode);
    addressCountryInput.setValue(dummyProfile.address.country);
    addressStateInput.setValue(dummyProfile.address.state);
    addressCityInput.setValue(dummyProfile.address.city);
    addressStreetInput.setValue(dummyProfile.address.street);
    addressComplementInput.setValue(dummyProfile.address.complement);    
    paymentPostalCodeInput.setValue(dummyProfile.payment.postalCode);
    paymentCountryInput.setValue(dummyProfile.payment.country);
    paymentNameInput.setValue(dummyProfile.payment.name);
    paymentNumberInput.setValue(dummyProfile.payment.number);
    paymentExpirationDateInput.setValue(dummyProfile.payment.expirationDate);
    paymentSecurityCodeInput.setValue(dummyProfile.payment.securityCode);

    spyOn(orderService, 'addOrder').and.callFake(() => new Observable);
    console.log(component.form);
    component.finishOrder();
    
    fixture.detectChanges();
    expect(orderService.addOrder).toHaveBeenCalledWith(component.form.value["address"], component.form.value["payment"], dummySelectedMeals, dummyCustomer);
  });
});
