import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '@shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, ProfileComponent, OrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MDBBootstrapModule.forRoot(),
    CustomerRoutingModule,
    NgxMaskModule.forRoot(),
  ]
})
export class CustomerModule { }
