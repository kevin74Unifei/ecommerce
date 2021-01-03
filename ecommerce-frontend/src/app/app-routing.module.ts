import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'management', loadChildren: () => import('./management/management.module').then(m => m.ManagementModule)},
  {path: 'meal', loadChildren: () => import('./meal-details/meal-details.module').then(m => m.MealDetailsModule)},
  {path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)},
  {path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
