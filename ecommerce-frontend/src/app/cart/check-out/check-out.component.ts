import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from '@core/models/address.model';
import { SelectedMeal } from '@core/models/cart.model';
import { Customer } from '@core/models/customer.model';
import { Payment } from '@core/models/payment.model';
import { CartService } from '@core/services/cart.service';
import { CustomerService } from '@core/services/customer.service';
import { OrderService } from '@core/services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  private _customer: Customer;
  selectedMeals: SelectedMeal[];
  form: FormGroup;

  constructor(
    private _cartService: CartService,
    private _customerService: CustomerService, 
    private _orderService: OrderService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._cartService.products.subscribe(selectedMeals => this.selectedMeals = selectedMeals);

    this._customerService.customer.subscribe(customer => {
      this._customer = customer;
      this.initForm();
    });
  }

  initForm(): void{
    this.form = new FormGroup({
      //address
      postalCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]), 
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      complement: new FormControl(),
      //payment
      method: new FormControl(null, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      number: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
      expirationDate: new FormControl(null, [Validators.required]),
      securityCode: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
      paymentPostalCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      paymentCountry: new FormControl('', [Validators.required]),
    });
  }

  finishOrder(): void{
    if(this.form.valid){
      let address = new Address(this.form.value["postalCode"], this.form.value["country"], this.form.value["state"], 
        this.form.value["city"], this.form.value["street"], this.form.value["complement"]);
     
      let payment = new Payment(this.form.value["method"], this.form.value["name"], this.form.value["number"],
        this.form.value["expirationDate"], this.form.value["securityCode"], this.form.value["paymentCountry"], this.form.value["paymentPostalCode"]);

      this._orderService.addOrder(address, payment, this.selectedMeals, this._customer).subscribe(
        result => {
          this._router.navigate(["/customer", "orders"]);
        }, 
        error => console.log(error)
      );
    }
  }

  getTotal(): number{
    var total = 0;
    this.selectedMeals.forEach(selectedMeal => total += selectedMeal.meal.price * selectedMeal.amount)

    return total;
  }

}
