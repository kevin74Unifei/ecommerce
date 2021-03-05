import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Customer } from '@core/models/customer.model';
import { CustomerService } from '@core/services/customer.service';
import { NotificationService } from '@core/services/notification.service';
import { ToastrModule } from 'ngx-toastr';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let customerService: CustomerService;
  let notificationService: NotificationService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();

    customerService = TestBed.inject(CustomerService);
    notificationService = TestBed.inject(NotificationService);
  }));

  beforeEach(() => {
    customerService.customer.next(new Customer(1, 'customer', 'email', 'token', new Date()));
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the profile link', () => {
    var profile = fixture.debugElement.nativeElement.querySelector(".fa-user-circle");
    expect(profile).toBeTruthy();
  });

  it('should render the "my orders" link', () => {
    var profile = fixture.debugElement.nativeElement.querySelector(".fa-receipt");
    expect(profile).toBeTruthy();
  });

  it('should render the logout link', () => {
    var profile = fixture.debugElement.nativeElement.querySelector(".fa-sign-out-alt");
    expect(profile).toBeTruthy();
  });

  it('should not render the login link', () => {
    var profile = fixture.debugElement.nativeElement.querySelector(".fa-sign-in-alt");
    expect(profile).toBeFalsy();
  });
});
