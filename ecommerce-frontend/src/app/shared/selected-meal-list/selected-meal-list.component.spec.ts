import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedMealListComponent } from './selected-meal-list.component';

describe('SelectedMealListComponent', () => {
  let component: SelectedMealListComponent;
  let fixture: ComponentFixture<SelectedMealListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedMealListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedMealListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
