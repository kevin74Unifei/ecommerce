import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

import { FieldValidationComponent } from './field-validation.component';

describe('FieldValidationComponent', () => {
  let component: FieldValidationComponent;
  let fixture: ComponentFixture<FieldValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldValidationComponent);
    component = fixture.componentInstance;
    var formControl = new FormControl();
    component.field = formControl;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
