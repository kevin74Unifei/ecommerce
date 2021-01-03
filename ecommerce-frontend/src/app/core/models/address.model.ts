export class Address{
    constructor(
        public postalCode: string,
        public country: string, 
        public state: string,
        public city: string,
        public street: string, 
        public complement: string
    ){}
}