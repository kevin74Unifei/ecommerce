import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerLogin } from '@core/models/customer.model';
import { CustomerService } from '@core/services/customer.service';
import { NotificationService } from '@core/services/notification.service';
import { ToastrModule } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let customerService: CustomerService;
  let notificationService: NotificationService;
  const dummyReturnUrlParam = 'cart';
  const dummyEmail = 'test@email.com';
  const dummyPassword = 'fad23Lsa';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule, 
        RouterTestingModule, 
        ToastrModule.forRoot(),
        ReactiveFormsModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              returnUrl: dummyReturnUrlParam
            })
          }
        }
      ]
    })
    .compileComponents();

    customerService = TestBed.inject(CustomerService);
    notificationService = TestBed.inject(NotificationService);  
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive url params', () => {
    expect(component.redirectUrl).toEqual(dummyReturnUrlParam);
  });

  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    const emailInput = compiled.querySelector('input[id="email"]');
    const passwordInput = compiled.querySelector('input[id="password"]');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should test form validity', () => {
    const form = component.form;
    const emailInput = form.controls.email;
    const passwordInput = form.controls.password;

    expect(form.valid).toBeFalsy();
    emailInput.setValue(dummyEmail);
    
    expect(form.valid).toBeFalsy();
    passwordInput.setValue(dummyPassword);

    expect(form.valid).toBeTruthy();
  });

  it('should test input validity', () => {
    const emailInput = component.form.controls.email;
    const passwordInput = component.form.controls.password;

    expect(emailInput.valid).toBeFalsy();
    expect(passwordInput.valid).toBeFalsy();

    emailInput.setValue(dummyEmail);
    passwordInput.setValue(dummyPassword);

    expect(emailInput.valid).toBeTruthy();
    expect(passwordInput.valid).toBeTruthy();
  });

  it('should login', () => {
    const emailInput = component.form.controls.email;
    const passwordInput = component.form.controls.password;
    emailInput.setValue(dummyEmail);
    passwordInput.setValue(dummyPassword);

    spyOn(customerService, 'login').and.callFake(() => {return new Observable;});
    const button = fixture.debugElement.nativeElement.querySelector('#login-btn');
    button.click();
    
    fixture.detectChanges();
    expect(customerService.login).toHaveBeenCalledWith(new CustomerLogin(dummyEmail,dummyPassword));
  });
});
