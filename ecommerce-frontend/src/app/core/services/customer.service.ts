import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '@core/models/address.model';
import { CustomerSave, CustomerLogin, Customer, CustomerGetProfile } from '@core/models/customer.model';
import { Payment } from '@core/models/payment.model';
import { environment } from '@env';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface AuthResponseData{
  id: number,
  email: string,
  name: string,
  token: string,
  expiresIn: number
}

export interface GetResponseData{
  address: Address, 
  payment: Payment,
  password: string,
  token: string,
  expiresIn: number
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _tokenExpirationTimer: any;
  customer = new BehaviorSubject<Customer>(null);

  constructor(
    private _http: HttpClient, 
    private _router: Router) {}

  private handleError(error: HttpErrorResponse){
    if(!error.error)
      return throwError('An unknown error occurred!');

      return throwError(error.error);
  }

  private handleAuthentication(id: number, email: string, name: string, token: string, expiresIn: number, password: string, address: Address, payment: Payment){
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    const customer = new Customer(
      id,
      name, 
      email,
      token, 
      expirationDate
    );
  
    localStorage.setItem(environment.localStorageCustomer, JSON.stringify(customer));
    
    customer.address = address;
    customer.password = password;
    customer.payment = payment;

    this.customer.next(customer);
    this.setLogoutTimer(expiresIn);    
  }
  
  private setLogoutTimer(expirationDuration: number){
    this._tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    }, expirationDuration);
  }

  autoLogin(){
    const customerData: {
      id: number,
      name: string, 
      password: string,
      email: string,
      _token: string, 
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem(environment.localStorageCustomer));
    
    if(!customerData)
      return; 

    const loaddedCustomer = new Customer(customerData.id, customerData.name, customerData.email,customerData._token, new Date(customerData._tokenExpirationDate));
    if(loaddedCustomer){
      this.customer.next(loaddedCustomer);
      const expirationDuration = new Date(customerData._tokenExpirationDate).getTime() - new Date().getTime();
      this.setLogoutTimer(expirationDuration);
    }    
  }

  logout(){
    this.customer.next(null);
    localStorage.removeItem(environment.localStorageCustomer);
    this._router.navigate(['/']);

    if(this._tokenExpirationTimer)
      clearTimeout(this._tokenExpirationTimer);

    this._tokenExpirationTimer = null;
  }

  login(customer: CustomerLogin){
    return this._http.post(`${environment.ecommerceUrl}/${environment.customer}/login`, customer)
      .pipe(        
        catchError(this.handleError),
        tap((response: AuthResponseData) => this.handleAuthentication(response.id, response.email, response.name, response.token, response.expiresIn, null, null, null)));
  }

  register(customer: CustomerSave){
    return this._http.post(`${environment.ecommerceUrl}/${environment.customer}/register`, customer)
      .pipe(
        catchError(this.handleError),
        tap((response: AuthResponseData) => this.handleAuthentication(response.id, response.email, response.name, response.token, response.expiresIn, null, null, null)));
  }

  save(customer: CustomerSave){
    return this._http.post(`${environment.ecommerceUrl}/${environment.customer}`, customer)
      .pipe(catchError(this.handleError));
  }

  getProfile(){
    return this._http.post(`${environment.ecommerceUrl}/${environment.customer}/get`, 
      new CustomerGetProfile(this.customer.value.email, this.customer.value.id))
      .pipe(
        catchError(this.handleError),
        tap((response:GetResponseData) => this.handleAuthentication(this.customer.value.id, this.customer.value.email, 
          this.customer.value.name, response.token, response.expiresIn, response.password, response.address, response.payment)));
  }
}
