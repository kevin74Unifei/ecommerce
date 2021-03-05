import { Injectable } from '@angular/core';
import { SelectedMeal } from '@core/models/cart.model';
import { Meal } from '@core/models/meal.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products = new BehaviorSubject<SelectedMeal[]>([]);

  constructor() { }

  addProduct(meal: Meal, amount:number = 1): void{
    let products = this.products.value.slice();
    let exists = false;
    
    products.find(SelectedMeal => {
      if(SelectedMeal.meal.id == meal.id){
        SelectedMeal.amount += amount;
        exists = true;
      }
    });

    if(!exists)
      products.push(new SelectedMeal(meal, amount));

    this.products.next(products);
  }

  removeProduct(meal: Meal): void {
    let products = this.products.value.slice();
    
    products = products.filter(SelectedMeal => {
      return SelectedMeal.meal.id != meal.id;
    });

    this.products.next(products);
  }

  updateProductAmount(meal: Meal, amount: number): void{
    let products = this.products.value.slice();
    
    products.find(SelectedMeal => {
      if(SelectedMeal.meal.id == meal.id){
        SelectedMeal.amount = amount;
      }
    });

    this.products.next(products);
  }

  clearCart(): void{
    this.products.next([]);
  }

  getTotal(): number{
    let total: number = 0;
    this.products.value.map(selectedMeal => total += selectedMeal.meal.price * selectedMeal.amount);

    return total;
  }
}
