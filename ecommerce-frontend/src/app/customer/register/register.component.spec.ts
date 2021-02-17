import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerSave } from '@core/models/customer.model';
import { CustomerService } from '@core/services/customer.service';
import { NotificationService } from '@core/services/notification.service';
import { ToastrModule } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let customerService: CustomerService;
  let notificationService: NotificationService;
  const dummyReturnUrlParam = 'cart';
  const dummyEmail = 'test@email.com';
  const dummyName = 'test name';
  const dummyPassword = 'fad23Lsa';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ 
        HttpClientTestingModule, 
        RouterTestingModule, 
        ToastrModule.forRoot(),
        ReactiveFormsModule
      ],
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
    fixture = TestBed.createComponent(RegisterComponent);
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
    const nameInput = compiled.querySelector('input[id="name"]');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(nameInput).toBeTruthy();
  });

  it('should test form validity', () => {
    const form = component.form;
    const emailInput = form.controls.email;
    const passwordInput = form.controls.password;
    const nameInput = form.controls.name;

    expect(form.valid).toBeFalsy();
    emailInput.setValue(dummyEmail);
    
    expect(form.valid).toBeFalsy();
    passwordInput.setValue(dummyPassword);

    expect(form.valid).toBeFalsy();
    nameInput.setValue(dummyName);

    expect(form.valid).toBeTruthy();
  });

  it('should test input validity', () => {
    const emailInput = component.form.controls.email;
    const passwordInput = component.form.controls.password;
    const nameInput = component.form.controls.name;

    expect(emailInput.valid).toBeFalsy();
    expect(passwordInput.valid).toBeFalsy();

    emailInput.setValue(dummyEmail);
    passwordInput.setValue(dummyPassword);
    nameInput.setValue(dummyName);

    expect(emailInput.valid).toBeTruthy();
    expect(passwordInput.valid).toBeTruthy();
    expect(nameInput.valid).toBeTruthy();
  });

  it('should register', () => {
    const emailInput = component.form.controls.email;
    const passwordInput = component.form.controls.password;
    const nameInput = component.form.controls.name;

    emailInput.setValue(dummyEmail);
    passwordInput.setValue(dummyPassword);
    nameInput.setValue(dummyName);

    spyOn(customerService, 'register').and.callFake(() => {return new Observable;});
    const button = fixture.debugElement.nativeElement.querySelector('#register-btn');
    button.click();
    
    fixture.detectChanges();
    expect(customerService.register).toHaveBeenCalledWith(new CustomerSave(0, dummyName, dummyEmail,dummyPassword, null, null));
  });
  
});
