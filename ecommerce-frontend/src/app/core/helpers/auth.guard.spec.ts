import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CustomerService } from '../services/customer.service';
import { Customer, CustomerLogin, CustomerSave } from '@core/models/customer.model';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@env';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let service: CustomerService;
  let httpMock: HttpTestingController;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };

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
    authGuard = TestBed.inject(AuthGuard);
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should allow route', () => {
    service.customer.next(customer);
    expect(authGuard.canActivate(null, null)).toBeTruthy();
  });

  it('should not allow route', () => {
    expect(authGuard.canActivate(null, null)).not.toEqual(true);
  });
});
