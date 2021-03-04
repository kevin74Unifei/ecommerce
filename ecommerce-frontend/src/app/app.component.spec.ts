import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerService } from '@core/services/customer.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let customerService: CustomerService;
  let gtmService: GoogleTagManagerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, 
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    customerService = TestBed.inject(CustomerService);
    gtmService = TestBed.inject(GoogleTagManagerService);
  }));

  it('should create the app', () => {
    spyOn(gtmService, 'addGtmToDom').and.callFake(() =>{ return new Promise<boolean>(()=>true); });
    
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Ecommerce'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Ecommerce');
  });
});
