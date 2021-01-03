import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@core/helpers/auth.guard";
import { CartComponent } from "./cart.component";
import { CheckOutComponent } from "./check-out/check-out.component";

const routes:Routes = [
    {path: '', component: CartComponent},
    {path: 'checkOut', component: CheckOutComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CartRoutingModule{}