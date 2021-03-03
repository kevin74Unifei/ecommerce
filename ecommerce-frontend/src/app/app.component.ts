import { Component, OnInit } from '@angular/core';
import { CustomerService } from '@core/services/customer.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Ecommerce';

  constructor(
    private _customerService: CustomerService,
    private _gtmService: GoogleTagManagerService){}

  ngOnInit(){
    this._customerService.autoLogin();
    this._gtmService.addGtmToDom();
  }
}
