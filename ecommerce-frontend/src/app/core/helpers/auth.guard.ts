import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { CustomerService } from "@core/services/customer.service";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(
        private _customerService: CustomerService,
        private _router: Router,
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
        return this._customerService.customer.pipe(
            take(1), 
            map(customer => {
                if(customer)
                    return true;
                
                return this._router.createUrlTree(['/customer/login']);
            })
        );
    }
}