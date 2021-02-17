import { Component, OnInit } from '@angular/core';
import { Meal } from '@core/models/meal.model';
import { NotificationMessage, NotificationType } from '@core/models/notificationMessage.model';
import { MealService } from '@core/services/meal.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  meals: Meal[] = [];

  constructor(
    private mealService: MealService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.mealService.getMeals().subscribe((meals:Meal[]) => {
      this.meals = meals;
    }, error => {
      this._notificationService.sendMessage(new NotificationMessage(error, NotificationType.error));
    });
  }

}
