import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Meal } from '@core/models/meal.model';
import { CartService } from '@core/services/cart.service';
import { MealService } from '@core/services/meal.service';
import { NotificationService } from '@core/services/notification.service';
import { environment } from '@env';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';

import { MealDetailsComponent } from './meal-details.component';

describe('MealDetailsComponent', () => {
  let component: MealDetailsComponent;
  let fixture: ComponentFixture<MealDetailsComponent>;
  let mealService: MealService;
  let cartService: CartService;
  let notificationService: NotificationService;

  let dummyMeal = new Meal(1, 1, 'Meal', 1, 1, 1, 'description', ['image1.png', 'image2.png', 'image3.png'] );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
      ],
      declarations: [ MealDetailsComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: dummyMeal.id
            })
          }
        }
      ]
    })
    .compileComponents();

    mealService = TestBed.inject(MealService);
    cartService = TestBed.inject(CartService);
    notificationService = TestBed.inject(NotificationService);
  }));

  beforeEach(() => {
    spyOn(mealService, 'getMeal').and.callFake(() => of(dummyMeal));

    fixture = TestBed.createComponent(MealDetailsComponent);
    component = fixture.componentInstance;
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

  it('should add meal to cart', () => {
    expect(cartService.products.value.length).toEqual(0);
    component.addToCart();
    expect(cartService.products.value.length).toEqual(1);
  });
});
