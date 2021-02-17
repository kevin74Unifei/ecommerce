import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Address } from '@core/models/address.model';
import { Customer, CustomerSave } from '@core/models/customer.model';
import { Payment } from '@core/models/payment.model';
import { CustomerService, GetResponseData } from '@core/services/customer.service';
import { NotificationService } from '@core/services/notification.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ToastrModule } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let notificationService: NotificationService;
  let customerService: CustomerService;  

  const dummyProfile = {
    id: 1,
    name: 'Harry',
    password: 'Password',
    email: 'harry@email.com',
    address: new Address('123456', 'Brazil', 'SP', 'São Paulo', 'Paulista', 'Center'),
    payment: new Payment('1', 'Harry Bale', 124135312, '03/27', '456', 'Brazil', '123456')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule, 
        RouterTestingModule, 
        ToastrModule.forRoot(),
        NoopAnimationsModule,
        MDBBootstrapModule.forRoot(),
        ReactiveFormsModule
      ],
      declarations: [ ProfileComponent ]
    })
    .compileComponents();    

    notificationService = TestBed.inject(NotificationService);  
    customerService = TestBed.inject(CustomerService);
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

    customerService.customer.next(new Customer(dummyProfile.id, null, dummyProfile.email, 'token', new Date()));
    
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    const nameInput = compiled.querySelector('input[id="name"]');
    const passwordInput = compiled.querySelector('input[id="password"]');
    
    const addressPostalCodeInput = compiled.querySelector('input[id="postalCode"]');
    const addressCountryInput = compiled.querySelector('input[id="country"]');
    const addressCityInput = compiled.querySelector('input[id="city"]');
    const addressStateInput = compiled.querySelector('input[id="state"]');
    const addressStreetInput = compiled.querySelector('input[id="street"]');
    const addressComplementInput = compiled.querySelector('input[id="complement"]');
    
    const paymentPostalCodeInput = compiled.querySelector('input[id="paymentPostalCode"]');
    const paymentCountryInput = compiled.querySelector('input[id="paymentCountry"]');
    const paymentNameInput = compiled.querySelector('input[id="paymentName"]');
    const paymentNumberInput = compiled.querySelector('input[id="number"]');
    const paymentExpirationDateInput = compiled.querySelector('input[id="expirationDate"]');
    const paymentSecurityCodeInput = compiled.querySelector('input[id="securityCode"]');
    
    expect(nameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
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

  it('should test form validity', () => {
    const form = component.form;
    const nameInput = form.controls.name;
    const passwordInput = form.controls.password;
    const addressPostalCodeInput = form.get('address.postalCode');
    const addressCountryInput = form.get('address.country');
    const addressStateInput = form.get('address.state');
    const addressCityInput = form.get('address.city');
    const addressStreetInput = form.get('address.street');
    const addressComplementInput = form.get('address.complement');
    const paymentPostalCodeInput = form.get('payment.postalCode');
    const paymentCountryInput = form.get('payment.country');
    const paymentNameInput = form.get('payment.name');
    const paymentNumberInput = form.get('payment.number');
    const paymentExpirationDateInput = form.get('payment.expirationDate');
    const paymentSecurityCodeInput = form.get('payment.securityCode');

    expect(form.valid).toBeFalsy();
    nameInput.setValue(dummyProfile.name);
    
    expect(form.valid).toBeFalsy();
    passwordInput.setValue(dummyProfile.password);

    expect(form.valid).toBeFalsy();
    addressPostalCodeInput.setValue(dummyProfile.address.postalCode);

    expect(form.valid).toBeFalsy();
    addressCountryInput.setValue(dummyProfile.address.country);

    expect(form.valid).toBeFalsy();
    addressStateInput.setValue(dummyProfile.address.state);

    expect(form.valid).toBeFalsy();
    addressCityInput.setValue(dummyProfile.address.city);

    expect(form.valid).toBeFalsy();
    addressStreetInput.setValue(dummyProfile.address.street);

    expect(form.valid).toBeFalsy();
    addressComplementInput.setValue(dummyProfile.address.complement);  

    expect(form.valid).toBeFalsy(); 
    paymentPostalCodeInput.setValue(dummyProfile.payment.postalCode);

    expect(form.valid).toBeFalsy();
    paymentCountryInput.setValue(dummyProfile.payment.country);

    expect(form.valid).toBeFalsy();
    paymentNameInput.setValue(dummyProfile.payment.name);

    expect(form.valid).toBeFalsy();
    paymentNumberInput.setValue(dummyProfile.payment.number);

    expect(form.valid).toBeFalsy();
    paymentExpirationDateInput.setValue(dummyProfile.payment.expirationDate);
    
    expect(form.valid).toBeFalsy();
    paymentSecurityCodeInput.setValue(dummyProfile.payment.securityCode);

    expect(form.valid).toBeTruthy();
  });

  it('should test input validity', () => {
    const nameInput = component.form.controls.name;
    const passwordInput = component.form.controls.password;
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

    expect(nameInput.valid).toBeFalsy();
    expect(passwordInput.valid).toBeFalsy();
    expect(addressPostalCodeInput.valid).toBeFalsy();
    expect(addressCountryInput.valid).toBeFalsy();
    expect(addressStateInput.valid).toBeFalsy();
    expect(addressCityInput.valid).toBeFalsy();
    expect(addressStreetInput.valid).toBeFalsy();
    expect(addressComplementInput.valid).toBeTruthy();
    expect(paymentPostalCodeInput.valid).toBeFalsy();
    expect(paymentCountryInput.valid).toBeFalsy();
    expect(paymentNameInput.valid).toBeFalsy();
    expect(paymentNumberInput.valid).toBeFalsy();
    expect(paymentExpirationDateInput.valid).toBeFalsy();
    expect(paymentSecurityCodeInput.valid).toBeFalsy();

    nameInput.setValue(dummyProfile.name);
    passwordInput.setValue(dummyProfile.password);
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

    expect(nameInput.valid).toBeTruthy();
    expect(passwordInput.valid).toBeTruthy();
    expect(addressPostalCodeInput.valid).toBeTruthy();
    expect(addressCountryInput.valid).toBeTruthy();
    expect(addressStateInput.valid).toBeTruthy();
    expect(addressCityInput.valid).toBeTruthy();
    expect(addressStreetInput.valid).toBeTruthy();
    expect(addressComplementInput.valid).toBeTruthy();
    expect(paymentPostalCodeInput.valid).toBeTruthy();   
    expect(paymentCountryInput.valid).toBeTruthy();
    expect(paymentNameInput.valid).toBeTruthy();
    expect(paymentNumberInput.valid).toBeTruthy();
    expect(paymentExpirationDateInput.valid).toBeTruthy();
    expect(paymentSecurityCodeInput.valid).toBeTruthy();
  });

  it('should save', () => {
    const nameInput = component.form.controls.name;
    const passwordInput = component.form.controls.password;
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

    nameInput.setValue(dummyProfile.name);
    passwordInput.setValue(dummyProfile.password);
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

    spyOn(customerService, 'save').and.callFake(() => new Observable);
    const button = fixture.debugElement.nativeElement.querySelector('#profile-btn');
    button.click();
    
    fixture.detectChanges();
    expect(customerService.save).toHaveBeenCalledWith(new CustomerSave(dummyProfile.id, dummyProfile.name, 
      dummyProfile.email, dummyProfile.password, component.form.value["address"], component.form.value["payment"] ));
  });
});
