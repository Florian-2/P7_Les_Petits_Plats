import "./style.css";
import { fetchRecipes } from "./service/recipes.services";
import { Recipes } from "./Recipes/recipes";
import { SearchRecipes } from "./SearchRecipes/searchBar";


async function init() {
    const searchBar = document.querySelector("input[name='search']") as HTMLInputElement;

    const data = await fetchRecipes();

    const recipes = new Recipes(data);
    recipes.createRecipesList();

    const search = new SearchRecipes(data, searchBar);
}

init();