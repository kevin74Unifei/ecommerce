import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Address } from '@core/models/address.model';
import { environment } from '@env';

import { AddressService } from './address.service';

describe('AddressService', () => {
  let service: AddressService;
  let httpMock: HttpTestingController;
  const dummyAddress: Address = new Address("376600", "Brazil", "SP", "São Paulo", "Avenida Paulista", "");

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });

    service = TestBed.inject(AddressService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get address', () => {
    service.getAddressByZipCode(dummyAddress.postalCode).subscribe((response) => {
      expect(response).toEqual(dummyAddress);
    });

    const req = httpMock.expectOne({
      url: `${environment.addressUrl}/search?apikey=${environment.addressApiKey}&codes=${dummyAddress.postalCode}&country=${environment.countryForZipCode}`,
      method : "GET"
    });

    req.flush(dummyAddress);
  });
});
