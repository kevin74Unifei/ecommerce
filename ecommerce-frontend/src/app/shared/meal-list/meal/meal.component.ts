import { Component, Input, OnInit } from '@angular/core';
import { Meal } from '@core/models/meal.model';
import { CartService } from '@core/services/cart.service';
import { environment } from '@env'; 

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  @Input() meal: Meal

  constructor(
    private _cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  getImage(id: number, imageName: string): string{
    return environment.apiUrl + environment.mealUrl + "/image/" + id + "/" + imageName;
  }

  addToCart(): void{
    this._cartService.addProduct(this.meal);
  }

}
