import "./style.css";
import { fetchRecipes } from "./service/recipes.services";
import { Recipes } from "./Recipes/recipes";


async function init() {
    const data = await fetchRecipes();
    const recipes = new Recipes(data);
    recipes.createRecipesList();
}

init();