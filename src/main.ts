import "./style.css";
import { fetchRecipes } from "./service/recipes.services";
import { RecipeTemplate } from "./Templates/recipes";
import { SearchRecipes } from "./SearchRecipes/search";


async function init() {
    const data = await fetchRecipes();

    const recipes = new RecipeTemplate(data);
    recipes.createRecipesList();

    const search = new SearchRecipes(data);
}

init();