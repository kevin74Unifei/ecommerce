import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@core/core.module';
import { SelectedMeal } from '@core/models/cart.model';
import { Meal } from '@core/models/meal.model';
import { CartService } from '@core/services/cart.service';
import { environment } from '@env';

import { SelectedMealComponent } from './selected-meal.component';

describe('SelectedMealComponent', () => {
  let component: SelectedMealComponent;
  let fixture: ComponentFixture<SelectedMealComponent>;
  
  let cartService: CartService;
  const dummySelectedMeal = new SelectedMeal(new Meal(1, 1, "meal", 15, 1, 1, "description", ['meal.png']), 10);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule
      ],
      declarations: [ SelectedMealComponent]
    })
    .compileComponents();

    cartService = TestBed.inject(CartService);
  }));

  beforeEach(() => {
    cartService.products.next([dummySelectedMeal]);
    fixture = TestBed.createComponent(SelectedMealComponent);
    
    component = fixture.componentInstance;
    component.selectedMeal = dummySelectedMeal;

    fixture.detectChanges();    
  });

  it('should create', () => {
    console.log(component);
    expect(component).toBeTruthy();
  });

  it('should return an image url', () => {
    const id = 1;
    const imageName = "meal.png";

    expect(component.getImage(id, imageName)).toEqual(`${environment.ecommerceUrl}/${environment.meal}/image/${id}/${imageName}`);
  });

  it('should update the amount', () => {
    const newAmount = 4;
    const amountInput = component.form.get('amount');

    expect(component.selectedMeal.amount).toEqual(dummySelectedMeal.amount);
    amountInput.setValue(newAmount);
    component.updateAmount();
    expect(component.selectedMeal.amount).toEqual(newAmount);
  });

  it('should remove the meal from the cart', () => {
    component.remove();
    expect(cartService.products.value.length).toEqual(0);
  });
});