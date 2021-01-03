import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CheckOutComponent } from './check-out/check-out.component';

@NgModule({
  declarations: [CartComponent, CheckOutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CartRoutingModule,
    MDBBootstrapModule.forRoot(),
  ]
})
export class CartModule { }
