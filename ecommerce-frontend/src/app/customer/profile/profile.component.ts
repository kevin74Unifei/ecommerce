import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Address } from '@core/models/address.model';
import { Customer, CustomerSave } from '@core/models/customer.model';
import { NotificationMessage, NotificationType } from '@core/models/notificationMessage.model';
import { Payment } from '@core/models/payment.model';
import { AddressService } from '@core/services/address.service';
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
  isGettingAddress = false;

  private _customerId: number;
  private _email: string;
  
  constructor(
    private _addressService: AddressService,
    private _customerService: CustomerService,
    private _notificationService: NotificationService,
    private _titleService: Title
    ) {}

  ngOnInit(): void {
    this.initForm();
    this._titleService.setTitle("My Profile");
  }

  private initForm(): void{
    this._customerService.getProfile().pipe(switchMap(() => { return this._customerService.customer})).subscribe((customer: Customer)=>{
      this._customerId = customer.id;
      this._email = customer.email;
      let address = customer.address ? customer.address : new Address(null, null, null, null, null, null);
      let payment = customer.payment ? customer.payment : new Payment(null, null, null, null, null, null, null);
    
      this.form = new FormGroup({
        password: new FormControl(customer.password, [Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,25}$/),
          Validators.minLength(8),Validators.required, Validators.maxLength(25)]),
        name: new FormControl(customer.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]), 
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
      () => { 
        this._notificationService.sendMessage(new NotificationMessage("Profile updated successfully", NotificationType.success));
        this.isSaving = false;
    },error => {
        this._notificationService.sendMessage(new NotificationMessage(error, NotificationType.error));
        this.isSaving = false;
      }
    );
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
