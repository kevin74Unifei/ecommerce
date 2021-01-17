import { Component, OnInit } from '@angular/core';
import { Meal } from '@core/models/meal.model';
import { NotificationMessage, NotificationType } from '@core/models/notificationMessage.model';
import { MealService } from '@core/services/meal.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})
export class MealListComponent implements OnInit {

  meals: Meal[] = [];

  constructor(
    private mealService: MealService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.mealService.getMeals().subscribe((result:Meal[]) => {
      this.meals = result;
    }, error => {
      this._notificationService.sendMessage(new NotificationMessage(error, NotificationType.error));
    });
  }

}