import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Meal } from '@core/models/meal.model';
import { MealService } from '@core/services/meal.service';
import { NotificationService } from '@core/services/notification.service';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mealService: MealService;
  let notificationService: NotificationService;

  const dummyMeals: Meal[] = [
    new Meal(1, 1, "meal 1", 1, 1, 1, "description 1", null),
    new Meal(2, 2, "meal 2", 2, 2, 2, "description 2", null)
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    mealService = TestBed.inject(MealService);
    notificationService = TestBed.inject(NotificationService);
  }));

  beforeEach(() => {
    spyOn(mealService, 'getMeals').and.callFake((() => of(dummyMeals)));

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const title = 'The Healthy Food you Need With the Taste You Want';
    const titleElement = fixture.debugElement.nativeElement.querySelector("#website-title");
    expect(titleElement.innerHTML).toEqual(title);
  });

  it('should have meals', () => {
    expect(component.meals).toEqual(dummyMeals);
  });

  it('should render the meals', () => {
    let meals = fixture.debugElement.nativeElement.querySelector("#meals");
    expect(meals.innerHTML).not.toEqual("");
  });
});
