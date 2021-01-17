import { Address } from "./address.model";
import { Payment } from "./payment.model";

export class CustomerSave{
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string, 
        public address: Address,
        public payment: Payment
    ){}
}

export class CustomerGetProfile{
    constructor(
        public email: string, 
        public id: number
    ){}
}

export class CustomerLogin{
    constructor(
        public email: string,
        public password: string
    ){}
}

export class Customer{
    public password: string;
    public address: Address;
    public payment: Payment;
    
    constructor(
        public id: number,
        public name: string,         
        public email: string,        
        private _token: string,
        private _tokenExpirationDate: Date        
    ){}

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
            return null

        return this._token;
    }
}