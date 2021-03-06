import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Meal } from '@core/models/meal.model';
import { NotificationMessage, NotificationType } from '@core/models/notificationMessage.model';
import { CartService } from '@core/services/cart.service';
import { MealService } from '@core/services/meal.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss']
})
export class MealDetailsComponent implements OnInit {
  private _id: number; 
  meal: Meal; 
  form: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _mealService: MealService,
    private _cartService: CartService,
    private _notificationService: NotificationService,
    private _titleService: Title
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) =>{
      this._id = +params["id"];
      this.getMeal();
    });
  }

  private getMeal(): void {
    this._mealService.getMeal(this._id).subscribe((result:Meal) => {
      this.meal = result;
      this._titleService.setTitle(this.meal.name);

      this.form = new FormGroup({
        amount: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(this.meal.amount)])
      });
    }, error => {
      this._notificationService.sendMessage(new NotificationMessage(error, NotificationType.error));
    })
  }

  get amount() { return this.form.get('amount'); }

  getImage(id: number, imageName: string): string{
    return this._mealService.getMealImage(id, imageName);
  }

  addToCart(){
    this._cartService.addProduct(this.meal, this.form.value["amount"]);
    this._notificationService.sendMessage(new NotificationMessage(this.meal.name + " added successfully to the cart!", NotificationType.success));
  }
}
