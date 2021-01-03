export class CustomerSave{
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string
    ){}
}

export class CustomerLogin{
    constructor(
        public email: string,
        public password: string
    ){}
}

export class Customer{
    constructor(
        public id: number,
        public name: string, 
        public password: string,
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