import { Component, OnInit } from '@angular/core';
import { Meal } from '@core/models/meal.model';
import { MealService } from '@core/services/meal.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})
export class MealListComponent implements OnInit {

  meals: Meal[] = [];

  constructor(private mealService: MealService) { }

  ngOnInit(): void {
    this.mealService.getMeals().subscribe((result:Meal[]) => {
      this.meals = result;
    }, error => {
      console.log(error);
    });
  }

}