import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MealComponent } from './meal/meal.component';
import { RouterModule } from '@angular/router';
import { SelectedMealComponent } from './selected-meal/selected-meal.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FieldValidationComponent } from './field-validation/field-validation.component';
import { CoreModule } from '@core/core.module';
import { ParallaxDirective } from './directives/parallax.directive';
import { LoadingButtonComponent } from './loading-button/loading-button.component';
@NgModule({
  declarations: [
    MealComponent, 
    SelectedMealComponent, 
    FieldValidationComponent,
    ParallaxDirective,
    LoadingButtonComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MealComponent,
    SelectedMealComponent,
    FieldValidationComponent,
    ParallaxDirective,
    LoadingButtonComponent
  ]
})
export class SharedModule { }
