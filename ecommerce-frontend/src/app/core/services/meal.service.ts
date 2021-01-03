import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '@core/models/meal.model';
import { environment } from '@env'; 
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private _http: HttpClient) { }

  private handleError(error: HttpErrorResponse){
    console.log(error);
    return throwError(error);
  }

  getMeals(){
    return this._http.get<Meal[]>(environment.apiUrl + environment.mealUrl)
      .pipe(catchError(this.handleError));
  }

  getMeal(id: number){
    return this._http.get<Meal>(environment.apiUrl + environment.mealUrl + "/" + id)
      .pipe(catchError(this.handleError));
  }

  saveMeal(meal: Meal, images: File[]){
    let formData = new FormData();

    formData.append("meal", JSON.stringify(meal));
    images.forEach((image) => {
      formData.append("files", image);
    })

    return this._http.post(environment.apiUrl + environment.mealUrl, formData)
      .pipe(catchError(this.handleError));
  }
}
