import { Recipe } from "../shared/interfaces/recipes";


export class SearchKeyword {
    public recipes: Recipe[];

    constructor(recipes: Recipe[]) {
        this.recipes = recipes;
    }
}