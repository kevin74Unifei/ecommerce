export class Payment{
    constructor(
        public method: string, 
        public name: string, 
        public number: number, 
        public expirationDate: string, 
        public securityCode: string, 
        public country: string, 
        public postalCode: string
    ){}
}