import { Recipe } from "../shared/interfaces";

export async function fetchRecipes(url = "src/data/recipes.json"): Promise<Recipe[]> {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Erreur ${res.status}`);
    }

    const recipes = await res.json() as Recipe[];
    return recipes;
}