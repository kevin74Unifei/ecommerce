export class ApiListResult{
    constructor(
        public _embedded,
        public page: Page){}
}

class Page{
    constructor(
        public size: number,
        public totalElements: number,
        public totalPages: number,
        public number: number
    ){}
}