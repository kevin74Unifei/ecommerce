import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Address } from '@core/models/address.model';
import { SelectedMeal } from '@core/models/cart.model';
import { Customer } from '@core/models/customer.model';
import { NotificationMessage, NotificationType } from '@core/models/notificationMessage.model';
import { Payment } from '@core/models/payment.model';
import { AddressService } from '@core/services/address.service';
import { CartService } from '@core/services/cart.service';
import { CustomerService } from '@core/services/customer.service';
import { NotificationService } from '@core/services/notification.service';
import { OrderService } from '@core/services/order.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  private _customer: Customer;
  selectedMeals: SelectedMeal[];
  form: FormGroup;
  isCheckingOut = false;
  isGettingAddress = false;

  constructor(
    private _addressService: AddressService,
    private _cartService: CartService,
    private _customerService: CustomerService, 
    private _orderService: OrderService,
    private _notificationService: NotificationService,
    private _router: Router,
    private _titleService: Title
  ) {}

  ngOnInit(): void {
    this._cartService.products.subscribe(selectedMeals => this.selectedMeals = selectedMeals);

    this._customerService.getProfile().pipe(switchMap(() => this._customerService.customer)).subscribe(customer => {
      this._customer = customer;
      this.initForm();
    });

    this._titleService.setTitle("Checkout");
  }

  initForm(): void{
    let address = this._customer.address ? this._customer.address : new Address(null, null, null, null, null, null);
    let payment = this._customer.payment ? this._customer.payment : new Payment(null, null, null, null, null, null, null);
    
    this.form = new FormGroup({
      address: new FormGroup({
        postalCode: new FormControl(address.postalCode, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]), 
        country: new FormControl(address.country, [Validators.required]),
        state: new FormControl(address.state, [Validators.required]),
        city: new FormControl(address.city, [Validators.required]),
        street: new FormControl(address.street, [Validators.required]),
        complement: new FormControl(address.complement),
      }),        
      payment: new FormGroup({
        name: new FormControl(payment.name, [Validators.required]),
        number: new FormControl(payment.number, [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
        expirationDate: new FormControl(payment.expirationDate, [Validators.required, Validators.pattern(/^(1[0-2]|0[1-9])(2[1-9])$/)]),
        securityCode: new FormControl(payment.securityCode, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
        postalCode: new FormControl(payment.postalCode, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
        country: new FormControl(payment.country, [Validators.required])
      })
    });
  }

  finishOrder(): void{
    if(this.form.valid){
      this.isCheckingOut = true;
      let address = this.form.value["address"];     
      let payment = this.form.value["payment"];
      
      this._orderService.addOrder(address, payment, this.selectedMeals, this._customer).subscribe(
        () => {
          this._router.navigate(["/customer", "orders"]);
          this._notificationService.sendMessage(new NotificationMessage("Order complete successfully! Thanks for your request!", NotificationType.success));
          this.isCheckingOut = false;
        }, 
        error => {
          this._notificationService.sendMessage(new NotificationMessage(error, NotificationType.error));
          this.isCheckingOut = false;
        }
      );
    }
  }

  getTotal(): number{
    return this._cartService.getTotal();
  }

  getAddress(): void{
    let zipCode: string = this.form.get("address.postalCode").value;
    this.isGettingAddress = true;
    this._addressService.getAddressByZipCode(zipCode).subscribe((address: Address)=>{
      if(address){
        this.form.get('address.country').setValue(address.country);
        this.form.get('address.state').setValue(address.state);
        this.form.get('address.city').setValue(address.city);
        this._notificationService.sendMessage(new NotificationMessage("Address Found!", NotificationType.info));
      }else{
        this._notificationService.sendMessage(new NotificationMessage("Address Not Found!", NotificationType.warning));
      }
      
      this.isGettingAddress = false
    }, error => {
      this._notificationService.sendMessage(new NotificationMessage(error, NotificationType.error));
      this.isGettingAddress = false;
    });
  }
}
