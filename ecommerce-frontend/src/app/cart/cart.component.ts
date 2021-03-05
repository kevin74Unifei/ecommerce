import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
    private _router: Router,
    private _titleService: Title
  ) {}

  ngOnInit(): void {
    this._cartService.products.subscribe(meals => this.selectedMeals = meals);
    this._titleService.setTitle("Cart");
  }

  getTotal(): number{
    return this._cartService.getTotal();
  }

  redirect(): void{
    if(!this._customerService.customer.value)
      this._router.navigate(['/customer', 'login', 'cart+checkOut'])
    else
      this._router.navigate(['/cart', 'checkOut']);    
  }
}
