import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedMealComponent } from './selected-meal.component';

describe('SelectedMealComponent', () => {
  let component: SelectedMealComponent;
  let fixture: ComponentFixture<SelectedMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedMealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
