import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CustomerService } from '../services/customer.service';
import { Customer, CustomerLogin, CustomerSave } from '@core/models/customer.model';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@env';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';

describe('AuthInterceptor', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  const customer = new Customer(0, "name", "email", "token", new Date(new Date().getTime() + 1000));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers:[{
          provide: HTTP_INTERCEPTORS, 
          useClass: AuthInterceptorService, 
          multi: true
      }]
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not have the authentication header', () => {
    service.login(new CustomerLogin('email@email.com', 'password')).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne({
      url: `${environment.apiUrl}${environment.user}/login`,
      method : "POST"
    });

    expect(req.request.headers.has("Authorization")).toBeFalsy();
  });

  it('should have the authentication header', () => {
    service.customer.next(customer);
    service.getProfile().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne({
      url: `${environment.apiUrl}${environment.user}/get`,
      method: "POST"
    });

    expect(req.request.headers.has("Authorization")).toBeTruthy();
  });
});
