import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthResponseData, CustomerService, GetResponseData } from './customer.service';
import { Customer, CustomerLogin, CustomerSave } from '@core/models/customer.model';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@env';
import { Address } from '@core/models/address.model';
import { Payment } from '@core/models/payment.model';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;
  const dummyAddress = new Address("123","country", "state", "city", "street", "complement");
  const dummyPayment = new Payment("method", "name", 0, "expiration date", "security code", "country", "postal code");
  const dummyAuthenticationResponse: AuthResponseData = {
    id: 0, 
    email: 'email@email.com', 
    name : 'name', 
    token : 'fakeToken', 
    expiresIn : 10000
  };
  const dummyResponseData: GetResponseData = {
    address: dummyAddress, 
    payment: dummyPayment,
    password: "password",
    token: "token",
    expiresIn: 0
  };
  const customer = new Customer(0, "name", "email", "token", new Date(new Date().getTime() + 1000));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {

    service.login(new CustomerLogin('email@email.com', 'password')).subscribe((response) => {
      expect(response).toEqual(dummyAuthenticationResponse);
    });

    const req = httpMock.expectOne({
      url: `${environment.ecommerceUrl}/${environment.customer}/login`,
      method : "POST"
    });

    req.flush(dummyAuthenticationResponse);
  });

  it('should register', () => {
    service.register(new CustomerSave(0, 'name', 'email', 'password', dummyAddress, dummyPayment)).subscribe(response => {
        expect(response).toEqual(dummyAuthenticationResponse);
      });

    const req = httpMock.expectOne({
      url: `${environment.ecommerceUrl}/${environment.customer}/register`,
      method: "POST"
    });

    req.flush(dummyAuthenticationResponse);
  });

  it('should return a profile', () => {
    service.customer.next(customer);
    service.getProfile().subscribe(response => {
      expect(response).toEqual(dummyResponseData);
    });

    const req = httpMock.expectOne({
      url: `${environment.ecommerceUrl}/${environment.customer}/get`,
      method: "POST"
    });

    req.flush(dummyResponseData);
  });

  it('should save the profile', () => {
    service.save(new CustomerSave(0, 'name', 'email', 'password', dummyAddress, dummyPayment)).subscribe(response => {
      expect(response).toEqual(Object);
    });

    const req = httpMock.expectOne({
      url: `${environment.ecommerceUrl}/${environment.customer}`,
      method: "POST"
    });
  });

  it("should logout", () => {
    service.customer.next(customer);
    service.logout();
    expect(service.customer.value).toEqual(null);
  })

  describe('Local Storage', () => {

    beforeEach(()=>{
      var store = {};
      
      spyOn(localStorage, 'getItem').and.callFake((key:string):string => {
        return store[key] || null;
      });

      spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
        delete store[key];
      });

      spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
        return store[key] = <string>value;
      });

      spyOn(localStorage, 'clear').and.callFake(() =>  {
          store = {};
      });

      localStorage.setItem("customerData", JSON.stringify(customer));
    })

    it("should auto login", () => {
      service.autoLogin();
      expect(service.customer.value).toEqual(customer)
    });
  });
});
