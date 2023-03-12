export interface Recipe {
    id: string;
    name: string;
    servings: number;
    ingredients: Ingredient[];
    time: number;
    description: string;
    appliance: string;
    ustensils: string[];
}

export interface Ingredient {
    ingredient: string;
    quantity?: number;
    unit?: string;
}