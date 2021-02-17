import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CustomerLogin } from '@core/models/customer.model';
import { NotificationMessage, NotificationType } from '@core/models/notificationMessage.model';
import { CustomerService } from '@core/services/customer.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  redirectUrl = '';
  form: FormGroup;
  isLogging = false;

  constructor(
    private _customerService: CustomerService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService
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

  login(): void{
    this.isLogging = true;
    var customer = new CustomerLogin(
      this.form.value["email"],
      this.form.value["password"]
    );

    this._customerService.login(customer).subscribe(
      () => {
        this._router.navigateByUrl("/" + this.redirectUrl.replace("+","/")); 
        this._notificationService.sendMessage(new NotificationMessage("Logged successfully", NotificationType.success))
        this.isLogging = false;
      },
      error => {
        this._notificationService.sendMessage(new NotificationMessage(error, NotificationType.error));
        this.isLogging = false;
      }
    );
    
  }
}
