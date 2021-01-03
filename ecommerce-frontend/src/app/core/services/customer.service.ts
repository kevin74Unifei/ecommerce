import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerSave, CustomerLogin, Customer } from '@core/models/customer.model';
import { environment } from '@env';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface AuthResponseData{
  id: number,
  email: string,
  name: string,
  password: string,
  token: string,
  expiresIn: number
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private tokenExpirationTimer: any;
  customer = new BehaviorSubject<Customer>(null);

  constructor(
    private _http: HttpClient, 
    private _router: Router) {}

  private handleError(error: HttpErrorResponse){
    console.log(error);
    if(!error.error || !error.error.error)
      return throwError('An unknown error occurred!');

    return throwError(error.error.error.text);
  }

  private handleAuthentication(id: number, email: string, name: string, password: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    const customer = new Customer(
      id,
      name, 
      password,
      email, 
      token, 
      expirationDate
    );
  
    this.customer.next(customer);
    this.setLogoutTimer(expiresIn);
    localStorage.setItem('customerData', JSON.stringify(customer));
  }
  
  private setLogoutTimer(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
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
    } = JSON.parse(localStorage.getItem("customerData"));
    
    if(!customerData)
      return; 

    const loaddedCustomer = new Customer(customerData.id, customerData.name, customerData.password, customerData.email,
      customerData._token, new Date(customerData._tokenExpirationDate));
    if(loaddedCustomer){
      this.customer.next(loaddedCustomer);
      const expirationDuration = new Date(customerData._tokenExpirationDate).getTime() - new Date().getTime();
      this.setLogoutTimer(expirationDuration);
    }
    
  }

  logout(){
    this.customer.next(null);
    localStorage.removeItem('customerData');
    this._router.navigate(['/']);

    if(this.tokenExpirationTimer)
      clearTimeout(this.tokenExpirationTimer);

    this.tokenExpirationTimer = null;
  }

  login(customer: CustomerLogin){
    return this._http.post(environment.apiUrl + environment.user + "/login", customer)
      .pipe(        
        catchError(this.handleError),
        tap((response: AuthResponseData) => this.handleAuthentication(response.id, response.email, response.name, response.password, response.token, response.expiresIn)));
  }

  register(customer: CustomerSave){
    return this._http.post(environment.apiUrl + environment.user + "/register", customer)
      .pipe(catchError(this.handleError),
      tap((response: AuthResponseData) => this.handleAuthentication(response.id, response.email, response.name, response.password, response.token, response.expiresIn)));
  }

  save(customer: CustomerSave){
    return this._http.post(environment.apiUrl + environment.user, customer)
      .pipe(catchError(this.handleError), 
      tap(response => this.customer.next(new Customer(customer.id, customer.name, customer.password, customer.email, this.customer.value.token, null))));
  }
}
