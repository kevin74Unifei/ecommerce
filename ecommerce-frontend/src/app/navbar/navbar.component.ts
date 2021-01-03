import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '@core/services/customer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged = false;

  constructor(
    private _customerService: CustomerService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._customerService.customer.subscribe(customer => this.isLogged = !! customer);
  }

  logout(): void{
    this._customerService.logout();
  }

  redirect(location: string): void{
    this._router.navigate(['/customer', location, this._router.url.slice(1).replace("/", "+")])
  }
}
