import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CustomerService } from "@core/services/customer.service";
import { exhaustMap, take } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(
        private _customerService: CustomerService
    ){}

    intercept(request: HttpRequest<any>, next: HttpHandler){
        return this._customerService.customer.pipe(
            take(1),
            exhaustMap(customer => {
                if(!customer)
                    return next.handle(request);

                const modifiedRequest = request.clone({
                    headers: new HttpHeaders().set('Authorization', customer.token)
                });
                
                return next.handle(modifiedRequest);
            })
        )
    }
}