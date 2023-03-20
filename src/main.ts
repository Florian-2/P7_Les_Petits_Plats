import "./style.css";
import { fetchRecipes } from "./app/service/recipes.services";
import { SearchRecipes } from "./app/search";


async function init() {
    const data = await fetchRecipes();

    new SearchRecipes(data).init();
}

init();