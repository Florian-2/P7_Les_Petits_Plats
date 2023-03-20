import "./style.css";
import { fetchRecipes } from "./app/service/recipes.services";
import { SearchRecipes } from "./app/search";


async function init() {
    const data = await fetchRecipes();

    const search = new SearchRecipes(data);
    search.init();
}

init();