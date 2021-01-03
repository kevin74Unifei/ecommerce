import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerSave } from '@core/models/customer.model';
import { CustomerService } from '@core/services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  redirectUrl = '';
  form: FormGroup;

  constructor(
    private _customerService: CustomerService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      if(params['returnUrl'])
        this.redirectUrl = params['returnUrl'];
    });

    this.initForm();
  }

  private initForm(): void{
    this.form = new FormGroup({
      email : new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(25)]),
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
    });
  }

  get email() { return this.form.get('email'); }
  get name() { return this.form.get('name'); }
  get password() { return this.form.get('password'); }

  register(): void{
    var customer = new CustomerSave(
      0, 
      this.form.value["name"],
      this.form.value["email"],
      this.form.value["password"]
    );

    this._customerService.register(customer).subscribe(
      result => this._router.navigateByUrl("/" + this.redirectUrl.replace("+","/")),
      error => console.log(error)
    );
  }
}
