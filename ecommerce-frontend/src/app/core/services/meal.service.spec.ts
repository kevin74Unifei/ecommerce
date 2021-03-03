import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Meal } from '@core/models/meal.model';
import { environment } from '@env';

import { MealService } from './meal.service';

describe('MealService', () => {
  let service: MealService;
  let httpMock: HttpTestingController;
  const dummyMeals: Meal[] = [ new Meal(1, 1, 'name 1', 1, 1, 1, 'description 1', null), 
      new Meal(2, 2, 'name 2', 2, 2, 2, 'description 2', null)]; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(MealService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all meals', () => {
    service.getMeals().subscribe((response) => {
      expect(response).toEqual(dummyMeals);
    });

    const req = httpMock.expectOne({
      url: `${environment.ecommerceUrl}/${environment.meal}`,
      method : "GET"
    });

    req.flush(dummyMeals);
  });

  it('should get one meal', () => {
    service.getMeal(1).subscribe((response) => {
      expect(response).toEqual(dummyMeals[0]);
    });

    const req = httpMock.expectOne({
      url: `${environment.ecommerceUrl}/${environment.meal}/${1}`,
      method : "GET"
    });

    req.flush(dummyMeals[0]);
  });

  it('should save a meal', () => {
    var obj: Object = new Object();
    service.saveMeal(dummyMeals[0], []).subscribe(response => {
      expect(response).toEqual(Object);
    });

    const req = httpMock.expectOne({
      url: `${environment.ecommerceUrl}/${environment.meal}`,
      method: "POST"
    });
  });

  it('should get an image url', () => {
    let imageName = "image.png";
    let id = 1; 

    expect(`${environment.ecommerceUrl}/${environment.meal}/image/${id}/${imageName}`)
      .toEqual(service.getMealImage(id, imageName));
  });
});
