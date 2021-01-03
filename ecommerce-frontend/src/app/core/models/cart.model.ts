import { Meal } from "./meal.model";

export class SelectedMeal{
    constructor(
        public meal: Meal, 
        public amount: number
    ){}
}