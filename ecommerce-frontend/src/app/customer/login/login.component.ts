import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CustomerLogin } from '@core/models/customer.model';
import { CustomerService } from '@core/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
      email : new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  login(): void{
    var customer = new CustomerLogin(
      this.form.value["email"],
      this.form.value["password"]
    );

    this._customerService.login(customer).subscribe(
      result => this._router.navigateByUrl("/" + this.redirectUrl.replace("+","/")),
      error => console.log(error)
    );
    
  }
}
