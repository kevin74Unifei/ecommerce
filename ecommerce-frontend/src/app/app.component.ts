import { Component, OnInit } from '@angular/core';
import { CustomerService } from '@core/services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Ecommerce';

  constructor(private _customerService: CustomerService){}

  ngOnInit(){
    this._customerService.autoLogin();
  }
}
