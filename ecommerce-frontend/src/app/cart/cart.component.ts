import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedMeal } from '@core/models/cart.model';
import { CartService } from '@core/services/cart.service';
import { CustomerService } from '@core/services/customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  selectedMeals: SelectedMeal[];

  constructor(
    private _cartService: CartService,
    private _customerService: CustomerService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._cartService.products.subscribe(meals => this.selectedMeals = meals);
  }

  getTotal(): number{
    var total = 0;
    this.selectedMeals.forEach(selectedMeal => total += selectedMeal.meal.price * selectedMeal.amount)

    return total;
  }

  redirect(): void{
    if(this._customerService.customer.value == null)
      this._router.navigate(['/customer', 'login', 'cart+checkOut'])
    else
      this._router.navigate(['/cart', 'checkOut']);    
  }
}
