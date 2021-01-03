import { Address } from "./address.model";
import { Payment } from "./payment.model";

export class Order{
    constructor(
        public id: number,
        public customerId: number, 
        public address: Address,
        public payment: Payment,        
        public orderedMeals: OrderedMeal[], 
        public creationDate: Date
    ){}
}

export class OrderedMeal{
    constructor(
        public id: number,
        public amount: number,
    ){}
}

export class OrderStored{
    constructor(
        public id: number, 
        public creationDate: Date, 
        public status: string, 
        public orderedMeals: OrderedMealDetailed[]
    ){}
}

export class OrderedMealDetailed extends OrderedMeal{
    constructor(
        id: number,
        amount: number, 
        public name: string,
        public description: string,         
        public price: number, 
        public image: string
    ){
        super(id, amount);
    }
}