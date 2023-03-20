export interface TypeRecipe {
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

export type Keyword = {
    [key in "ingredients" | "appliances" | "ustensiles"]: string[]
};

export interface TypeTag {
    id: string;
    value: string;
    category: string;
    color: string;
}