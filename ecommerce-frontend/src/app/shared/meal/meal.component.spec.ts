import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SelectedMeal } from '@core/models/cart.model';
import { Meal } from '@core/models/meal.model';
import { CartService } from '@core/services/cart.service';
import { NotificationService } from '@core/services/notification.service';
import { environment } from '@env';
import { ToastrModule } from 'ngx-toastr';

import { MealComponent } from './meal.component';

describe('MealComponent', () => {
  let component: MealComponent;
  let fixture: ComponentFixture<MealComponent>;
  let cartService: CartService;
  let notificationService: NotificationService;
  const dummyMeal = new Meal(1, 1, "meal", 15, 1, 1, "description", ['meal.png']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        NoopAnimationsModule
      ],
      declarations: [ MealComponent ]
    })
    .compileComponents();

    cartService = TestBed.inject(CartService);
    notificationService = TestBed.inject(NotificationService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealComponent);
    
    component = fixture.componentInstance;
    component.meal = dummyMeal;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an image url', () => {
    const id = 1;
    const imageName = "meal.png";

    expect(component.getImage(id, imageName)).toEqual(`${environment.ecommerceUrl}/${environment.meal}/image/${id}/${imageName}`);
  });

  it('should add the meal to the cart', () => {
    expect(cartService.products.value.length).toEqual(0);
    component.addToCart();
    expect(cartService.products.value.length).toEqual(1);
  });
});
