import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealEntryComponent } from './meal-entry.component';

describe('MealEntryComponent', () => {
  let component: MealEntryComponent;
  let fixture: ComponentFixture<MealEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
