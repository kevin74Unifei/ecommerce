import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectedMeal } from '@core/models/cart.model';
import { CartService } from '@core/services/cart.service';
import { environment } from '@env';

@Component({
  selector: 'app-selected-meal',
  templateUrl: './selected-meal.component.html',
  styleUrls: ['./selected-meal.component.scss']
})
export class SelectedMealComponent implements OnInit {

  @Input() selectedMeal: SelectedMeal;
  form: FormGroup;

  constructor(
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      amount: new FormControl(this.selectedMeal.amount, [Validators.required, Validators.min(1), Validators.max(this.selectedMeal.meal.amount)])
    });
  }

  getImage(id: number, imageName: string): string{
    return environment.apiUrl + environment.mealUrl + "/image/" + id + "/" + imageName;
  }

  get amount() { return this.form.get('amount'); }

  updateAmount(): void{
    this._cartService.updateProductAmount(this.selectedMeal.meal, this.form.value["amount"]);
  }

  remove(): void {
    this._cartService.removeProduct(this.selectedMeal.meal);
  }
}
