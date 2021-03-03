import { Component, Input, OnInit } from '@angular/core';
import { Meal } from '@core/models/meal.model';
import { NotificationMessage, NotificationType } from '@core/models/notificationMessage.model';
import { CartService } from '@core/services/cart.service';
import { MealService } from '@core/services/meal.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  @Input() meal: Meal

  constructor(
    private _cartService: CartService,
    private _mealService: MealService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  getImage(id: number, imageName: string): string{
    return this._mealService.getMealImage(id, imageName);
  }

  addToCart(): void{
    this._cartService.addProduct(this.meal);
    this._notificationService.sendMessage(new NotificationMessage(this.meal.name + " added successfully to the cart!", NotificationType.success));
  }

}
