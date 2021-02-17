import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Address } from '@core/models/address.model';
import { Customer, CustomerSave } from '@core/models/customer.model';
import { NotificationMessage, NotificationType } from '@core/models/notificationMessage.model';
import { Payment } from '@core/models/payment.model';
import { CustomerService } from '@core/services/customer.service';
import { NotificationService } from '@core/services/notification.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  isSaving = false;

  private _customerId: number;
  private _email: string;
  
  constructor(
    private _customerService: CustomerService,
    private _notification: NotificationService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void{
    this._customerService.getProfile().pipe(switchMap(() => { return this._customerService.customer})).subscribe((customer: Customer)=>{
      this._customerId = customer.id;
      this._email = customer.email;
      let address = customer.address ? customer.address : new Address(null, null, null, null, null, null);
      let payment = customer.payment ? customer.payment : new Payment(null, null, null, null, null, null, null);
    
      this.form = new FormGroup({
        password: new FormControl(customer.password, [Validators.required, Validators.minLength(4), Validators.maxLength(25)]),
        name: new FormControl(customer.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]), 
        address: new FormGroup({
          postalCode: new FormControl(address.postalCode, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]), 
          country: new FormControl(address.country, [Validators.required]),
          state: new FormControl(address.state, [Validators.required]),
          city: new FormControl(address.city, [Validators.required]),
          street: new FormControl(address.street, [Validators.required]),
          complement: new FormControl(address.complement),
        }),        
        payment: new FormGroup({
          name: new FormControl(payment.name, [Validators.required]),
          number: new FormControl(payment.number, [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
          expirationDate: new FormControl(payment.expirationDate, [Validators.required]),
          securityCode: new FormControl(payment.securityCode, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
          postalCode: new FormControl(payment.postalCode, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
          country: new FormControl(payment.country, [Validators.required])
        })
      });
    });
  }

  save(): void{
    this.isSaving = true;

    var customer = new CustomerSave(
      this._customerId, 
      this.form.value["name"],
      this._email,
      this.form.value["password"], 
      this.form.value["address"],
      this.form.value["payment"]
    );

    this._customerService.save(customer).subscribe(
      result => { 
        this._notification.sendMessage(new NotificationMessage("Profile updated successfully", NotificationType.success));
        this.isSaving = false;
    },
      error => {
        this._notification.sendMessage(new NotificationMessage(error, NotificationType.error));
        this.isSaving = false;
      }
    );
  }

}
