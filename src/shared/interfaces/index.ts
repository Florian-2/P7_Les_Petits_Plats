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

interface Ingredient {
    ingredient: string;
    quantity?: number;
    unit?: string;
}

export interface Keyword {
	ingredients: Set<string>;
	appliances: Set<string>;
	utensils: Set<string>;
}

export interface Tag {
    value: string;
    category: string;
}