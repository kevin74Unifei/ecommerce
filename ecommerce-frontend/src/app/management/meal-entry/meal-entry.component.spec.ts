import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Meal } from '@core/models/meal.model';
import { MealService } from '@core/services/meal.service';
import { NotificationService } from '@core/services/notification.service';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { MealEntryComponent } from './meal-entry.component';

describe('MealEntryComponent', () => {
  let component: MealEntryComponent;
  let fixture: ComponentFixture<MealEntryComponent>;
  let mealService: MealService;
  let notificationService: NotificationService;
  const dummyMeal = new Meal(1, 1, 'meal', 1, 1, 1, 'description', null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule, 
        ToastrModule.forRoot(),
      ],
      declarations: [ MealEntryComponent ]
    })
    .compileComponents();

    mealService = TestBed.inject(MealService);
    notificationService = TestBed.inject(NotificationService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;

    const idInput = compiled.querySelector('input[id="id"]');
    const nameInput = compiled.querySelector('input[id="name"]');
    const categoryInput = compiled.querySelector('input[id="category"]');
    const enabledInput = compiled.querySelector('input[id="enabled"]');
    const descriptionInput = compiled.querySelector('textarea[id="description"]');
    const priceInput = compiled.querySelector('input[id="price"]');
    const amountInput = compiled.querySelector('input[id="amount"]');
    const daysToExpireInput = compiled.querySelector('input[id="daysToExpire"]');
    const image1Input = compiled.querySelector('input[id="image1"]');
    const image2Input = compiled.querySelector('input[id="image2"]');
    const image3Input = compiled.querySelector('input[id="image3"]');

    expect(idInput).toBeTruthy();
    expect(nameInput).toBeTruthy();
    expect(categoryInput).toBeTruthy();
    expect(enabledInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
    expect(priceInput).toBeTruthy();
    expect(amountInput).toBeTruthy();
    expect(daysToExpireInput).toBeTruthy();
    expect(image1Input).toBeTruthy();
    expect(image2Input).toBeTruthy();
    expect(image3Input).toBeTruthy();
  });

  it('should test form validity', () => {
    const form = component.form;
    const idInput = form.controls.id;
    const nameInput = form.controls.name; 
    const categoryInput = form.controls.category;
    const amountInput = form.controls.amount;
    const priceInput = form.controls.price;
    const daysToExpireInput = form.controls.daysToExpire;
    const descriptionInput = form.controls.description;
    const image1Input = form.controls.image1;
    const image2Input = form.controls.image2;
    const image3Input = form.controls.image3;     
    
    expect(form.valid).toBeFalsy();
    idInput.setValue(dummyMeal.id);

    expect(form.valid).toBeFalsy();
    nameInput.setValue(dummyMeal.name);

    expect(form.valid).toBeFalsy();
    categoryInput.setValue(dummyMeal.category);
    
    expect(form.valid).toBeFalsy();
    amountInput.setValue(dummyMeal.amount);

    expect(form.valid).toBeFalsy();
    priceInput.setValue(dummyMeal.price);

    expect(form.valid).toBeFalsy();
    daysToExpireInput.setValue(dummyMeal.daysToExpire);

    expect(form.valid).toBeFalsy();
    descriptionInput.setValue(dummyMeal.description);

    expect(form.valid).toBeFalsy();
    image1Input.setValue('image1.png');

    expect(form.valid).toBeFalsy();
    image2Input.setValue('image2.png');

    expect(form.valid).toBeFalsy();
    image3Input.setValue('image3.png');

    expect(form.valid).toBeTruthy();
  });

  it('should test input validity', () => {
    const form = component.form;
    const idInput = form.controls.id;
    const nameInput = form.controls.name; 
    const categoryInput = form.controls.category;
    const amountInput = form.controls.amount;
    const priceInput = form.controls.price;
    const daysToExpireInput = form.controls.daysToExpire;
    const descriptionInput = form.controls.description;
    const image1Input = form.controls.image1;
    const image2Input = form.controls.image2;
    const image3Input = form.controls.image3;    

    expect(idInput.value).toBeFalsy();
    expect(nameInput.value).toBeFalsy();
    expect(categoryInput.value).toBeFalsy();
    expect(amountInput.value).toBeFalsy();
    expect(priceInput.value).toBeFalsy();
    expect(daysToExpireInput.value).toBeFalsy();
    expect(descriptionInput.value).toBeFalsy();
    expect(image1Input.value).toBeFalsy();
    expect(image2Input.value).toBeFalsy();
    expect(image3Input.value).toBeFalsy();

    idInput.setValue(dummyMeal.id);
    nameInput.setValue(dummyMeal.name);
    categoryInput.setValue(dummyMeal.category);
    amountInput.setValue(dummyMeal.amount);
    priceInput.setValue(dummyMeal.price);
    daysToExpireInput.setValue(dummyMeal.daysToExpire);
    descriptionInput.setValue(dummyMeal.description);
    image1Input.setValue('image1.png');
    image2Input.setValue('image2.png');
    image3Input.setValue('image3.png');

    expect(idInput.value).toBeTruthy();
    expect(nameInput.value).toBeTruthy();
    expect(categoryInput.value).toBeTruthy();
    expect(amountInput.value).toBeTruthy();
    expect(priceInput.value).toBeTruthy();
    expect(daysToExpireInput.value).toBeTruthy();
    expect(descriptionInput.value).toBeTruthy();
    expect(image1Input.value).toBeTruthy();
    expect(image2Input.value).toBeTruthy();
    expect(image3Input.value).toBeTruthy();
  });

  it('should add a meal', () => {
    const form = component.form;
    const idInput = form.controls.id;
    const nameInput = form.controls.name; 
    const categoryInput = form.controls.category;
    const amountInput = form.controls.amount;
    const priceInput = form.controls.price;
    const daysToExpireInput = form.controls.daysToExpire;
    const descriptionInput = form.controls.description;
    const image1Input = form.controls.image1;
    const image2Input = form.controls.image2;
    const image3Input = form.controls.image3;    

    idInput.setValue(dummyMeal.id);
    nameInput.setValue(dummyMeal.name);
    categoryInput.setValue(dummyMeal.category);
    amountInput.setValue(dummyMeal.amount);
    priceInput.setValue(dummyMeal.price);
    daysToExpireInput.setValue(dummyMeal.daysToExpire);
    descriptionInput.setValue(dummyMeal.description);
    image1Input.setValue('image1.png');
    image2Input.setValue('image2.png');
    image3Input.setValue('image3.png');

    spyOn(mealService, 'saveMeal').and.callFake(() => new Observable);
    component.submitMeal();

    expect(mealService.saveMeal).toHaveBeenCalledWith(dummyMeal, [null, null, null]);
  });
});
