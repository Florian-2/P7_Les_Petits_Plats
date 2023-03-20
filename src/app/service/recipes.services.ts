import { TypeRecipe } from "../shared/interfaces";

export async function fetchRecipes(url = "src/data/recipes.json"): Promise<TypeRecipe[]> {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Erreur ${res.status}`);
    }

    const recipes = await res.json() as TypeRecipe[];
    return recipes;
}