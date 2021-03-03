import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '@core/models/address.model';
import { SelectedMeal } from '@core/models/cart.model';
import { Customer } from '@core/models/customer.model';
import { Order, OrderedMeal, OrderStored } from '@core/models/order.model';
import { Payment } from '@core/models/payment.model';
import { environment } from '@env';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private _http: HttpClient,
    private _cartService: CartService
  ) {}

  private handleError(error: HttpErrorResponse){
    console.log(error);
    return throwError(error);
  }

  addOrder(address: Address, payment: Payment, selectedMeals: SelectedMeal[], customer: Customer){
    var orderedMeals: OrderedMeal[] = [];

    selectedMeals.forEach(selectedMeal => orderedMeals.push(new OrderedMeal(selectedMeal.meal.id, selectedMeal.amount)));

    var order = new Order(null, customer.id, address, payment, orderedMeals, null);
    return this._http.post(`${environment.ecommerceUrl}/${environment.order}`, order)
      .pipe(catchError(this.handleError), tap(() => this._cartService.clearCart()));
  }

  getOrders(customerId: number){
    return this._http.post<OrderStored[]>(`${environment.ecommerceUrl}/${environment.order}/getOrders`, {"customerId": customerId})
      .pipe(catchError(this.handleError));
  }
}
