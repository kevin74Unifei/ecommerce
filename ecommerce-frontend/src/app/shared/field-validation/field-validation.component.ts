import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-field-validation',
  templateUrl: './field-validation.component.html',
  styleUrls: ['./field-validation.component.scss']
})
export class FieldValidationComponent implements OnInit {

  @Input() field: AbstractControl;
  @Input() successMessage: string = "";
  @Input() errorMessage: string = "";

  constructor() { }

  ngOnInit(): void {
  }
}
