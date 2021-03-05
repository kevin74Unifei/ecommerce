import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '@core/models/address.model';
import { environment } from '@env';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface ApiResponseData{
  results: any,
}

export interface AddressResponseData{
  postal_code: string,
  country_code: string,
  city: string,
  state: string,
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private _http: HttpClient
  ) { }

  getAddressByZipCode(zipCode: string): Observable<Address>{
    return this._http.get(`${environment.addressUrl}/search?apikey=${environment.addressApiKey}&codes=${zipCode}&country=${environment.countryForZipCode}`)
      .pipe(switchMap((response: ApiResponseData) => {
          let address = Array.isArray(response.results) ? null : response.results[zipCode][0] as AddressResponseData;
          return of(address ? new Address(address.postal_code, address.country_code, address.state, address.city, '', '') : null);
        }
      ));
  }

}
