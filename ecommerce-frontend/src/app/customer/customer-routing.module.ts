import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@core/helpers/auth.guard";
import { LoginComponent } from "./login/login.component";
import { OrdersComponent } from "./orders/orders.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";

const routes:Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'login/:returnUrl', component: LoginComponent},
    {path: 'register/:returnUrl', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule{}