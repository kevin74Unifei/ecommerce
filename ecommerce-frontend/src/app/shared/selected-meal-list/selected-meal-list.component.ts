import { Component, Input, OnInit } from '@angular/core';
import { SelectedMeal } from '@core/models/cart.model';

@Component({
  selector: 'app-selected-meal-list',
  templateUrl: './selected-meal-list.component.html',
  styleUrls: ['./selected-meal-list.component.scss']
})
export class SelectedMealListComponent implements OnInit {

  @Input() selectedMeals: SelectedMeal[];

  constructor() {}

  ngOnInit(): void {
  }

}
