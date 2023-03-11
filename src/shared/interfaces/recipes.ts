export interface Recipes {
    id: string;
    name: string;
    servings: number;
    ingredients: Ingredients[];
    time: number;
    description: string;
    appliance: string;
    ustensils: string[];
}

export interface Ingredients {
    ingredient: string;
    quantity?: number;
    unit?: string;
}