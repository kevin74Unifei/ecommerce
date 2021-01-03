import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealDetailsComponent } from './meal-details.component';
import { MealDetailsRoutingModule } from './meal-details-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [MealDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MealDetailsRoutingModule,
    MDBBootstrapModule.forRoot(),
  ]
})
export class MealDetailsModule { }
