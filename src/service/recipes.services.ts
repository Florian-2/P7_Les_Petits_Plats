import { Recipes } from "../shared/interfaces/recipes";

export async function fetchRecipes(url = "src/data/recipes.json"): Promise<Recipes[]> {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Erreur ${res.status}`);
    }

    const recipes = await res.json() as Recipes[];
    recipes.sort((a, b) => a.name.localeCompare(b.name));

    return recipes;
}