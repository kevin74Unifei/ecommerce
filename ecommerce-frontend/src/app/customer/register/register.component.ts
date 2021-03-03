import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerSave } from '@core/models/customer.model';
import { NotificationMessage, NotificationType } from '@core/models/notificationMessage.model';
import { CustomerService } from '@core/services/customer.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  title = 'Register';
  redirectUrl = '';
  form: FormGroup;
  isLogging = false;

  constructor(
    private _customerService: CustomerService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _notification: NotificationService
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
      password: new FormControl(null, [Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,25}$/),
      Validators.minLength(8),Validators.required, Validators.maxLength(25)]),
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
    });
  }

  register(): void{
    this.isLogging = true;
    var customer = new CustomerSave(
      0, 
      this.form.value["name"],
      this.form.value["email"],
      this.form.value["password"],
      null,
      null
    );

    this._customerService.register(customer).subscribe(
      () => {
        this._router.navigateByUrl("/" + this.redirectUrl.replace("+","/")); 
        this._notification.sendMessage(new NotificationMessage("Registered successfully", NotificationType.success));
        this.isLogging = false;},
      error => {
        this._notification.sendMessage(new NotificationMessage(error, NotificationType.error));
        this.isLogging = false;
      }
    );
  }
}
