import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealComponent } from './meal-list/meal/meal.component';
import { RouterModule } from '@angular/router';
import { SelectedMealListComponent } from './selected-meal-list/selected-meal-list.component';
import { SelectedMealComponent } from './selected-meal-list/selected-meal/selected-meal.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FieldValidationComponent } from './field-validation/field-validation.component';



@NgModule({
  declarations: [MealListComponent, MealComponent, SelectedMealListComponent, SelectedMealComponent, FieldValidationComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MealListComponent,
    SelectedMealListComponent,
    FieldValidationComponent
  ]
})
export class SharedModule { }
