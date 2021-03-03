import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealEntryComponent } from './meal-entry/meal-entry.component';
import { SharedModule } from '@shared/shared.module';
import { ManagementRoutingModule } from './management-rounting.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    MealEntryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManagementRoutingModule,
    MDBBootstrapModule.forRoot()
  ]
})
export class ManagementModule { }
