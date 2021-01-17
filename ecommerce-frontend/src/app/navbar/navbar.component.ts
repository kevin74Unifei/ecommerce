import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationMessage, NotificationType } from '@core/models/notificationMessage.model';
import { CustomerService } from '@core/services/customer.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged = false;

  constructor(
    private _customerService: CustomerService,
    private _notificationService: NotificationService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._customerService.customer.subscribe(customer => this.isLogged = !! customer);
  }

  logout(): void{
    this._customerService.logout();
    this._notificationService.sendMessage(new NotificationMessage("Logout successful", NotificationType.success));
  }

  redirect(location: string): void{
    this._router.navigate(['/customer', location, this._router.url.slice(1).replace("/", "+")])
  }
}
