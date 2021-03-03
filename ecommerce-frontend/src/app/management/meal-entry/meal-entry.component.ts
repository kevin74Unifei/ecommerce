import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Meal } from '@core/models/meal.model';
import { NotificationMessage, NotificationType } from '@core/models/notificationMessage.model';
import { MealService } from '@core/services/meal.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-meal-entry',
  templateUrl: './meal-entry.component.html',
  styleUrls: ['./meal-entry.component.scss']
})
export class MealEntryComponent implements OnInit {

  form: FormGroup;
  image1: File = null; 
  image2: File = null;
  image3: File = null;

  @ViewChild('labelImport1')
  label1: ElementRef;

  @ViewChild('labelImport2')
  label2: ElementRef;

  @ViewChild('labelImport3')
  label3: ElementRef;

  constructor(
    private _mealService: MealService, 
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl('', [Validators.required, Validators.min(0)]),
      'name': new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(100)]),
      'amount': new FormControl('', [Validators.required, Validators.min(0)]),
      'price': new FormControl('', [Validators.required, Validators.min(0)]),
      'daysToExpire': new FormControl('', [Validators.required, Validators.min(0)]),
      'description': new FormControl('', [Validators.required, Validators.maxLength(500)]),
      'instructions': new FormArray([]),
      'image1': new FormControl('', Validators.required),
      'image2': new FormControl('', Validators.required),
      'image3': new FormControl('', Validators.required),
      'scores': new FormArray([]),
      'enabled': new FormControl(true)
    });
  }

  private updateImageLabel(label: ElementRef, files: FileList){
    label.nativeElement.innerText = Array.from(files)
    .map(f => f.name)
    .join(', ');
  }

  onImage1Upload(files: FileList){
    this.updateImageLabel(this.label1, files);
    this.image1 = files.item(0); 
  }

  onImage2Upload(files: FileList){
    this.updateImageLabel(this.label2, files);
    this.image2 = files.item(0); 
  }

  onImage3Upload(files: FileList){
    this.updateImageLabel(this.label3, files);
    this.image3 = files.item(0); 
  }

  submitMeal(){
    var images:File[] = [];
    images.push(this.image1);
    images.push(this.image2);
    images.push(this.image3);

    var meal:Meal = new Meal(
      this.form.value['id'],
      1,
      this.form.value['name'], 
      this.form.value['amount'],
      this.form.value['price'],
      this.form.value['daysToExpire'],
      this.form.value['description'],
      null);

    this._mealService.saveMeal(meal, images).subscribe(() => {
      this._notificationService.sendMessage(new NotificationMessage('Meal inserted', NotificationType.success));
    }, error => {
      this._notificationService.sendMessage(new NotificationMessage(error, NotificationType.error));
    });
  }
}
