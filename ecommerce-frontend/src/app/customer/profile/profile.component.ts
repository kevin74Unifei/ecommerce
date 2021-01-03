import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer, CustomerSave } from '@core/models/customer.model';
import { CustomerService } from '@core/services/customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  private _customerId: number;
  private _email: string;
  
  constructor(
    private _customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void{
    this._customerService.customer.subscribe((customer:Customer) => {
      this._customerId = customer.id;
      this._email = customer.email;
      
      this.form = new FormGroup({
        password: new FormControl(customer.password, [Validators.required, Validators.minLength(4), Validators.maxLength(25)]),
        name: new FormControl(customer.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
      });
    });
  }

  get name() { return this.form.get('name'); }
  get password() { return this.form.get('password'); }

  save(): void{
    var customer = new CustomerSave(
      this._customerId, 
      this.form.value["name"],
      this._email,
      this.form.value["password"]
    );

    this._customerService.save(customer).subscribe(
      result => console.log(result),
      error => console.log(error)
    );
  }

}
