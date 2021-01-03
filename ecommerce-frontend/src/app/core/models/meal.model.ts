export class Meal{
    constructor(
        public id: number,
        public category: number,
        public name: string,
        public amount: number,
        public price: number,
        public daysToExpire: number,
        public description: string,
        public images: string[]
    ){}
}