import { Recipes } from '../Recipes/recipes';
import { Recipe } from '../shared/interfaces/recipes';


export class SearchRecipes {
    public recipes: Recipe[];
    public input: HTMLInputElement

    constructor(recipes: Recipe[], inputs: HTMLInputElement) {
        this.recipes = recipes;
        this.input = inputs;
        this.initEvent();
    }

    private initEvent() {
        this.input.addEventListener("keyup", () => {
            if (this.input.value.trim().length >= 3) {
                return this.filterRecipes();
            }

            new Recipes(this.recipes).createRecipesList();
        });
    }

    filterRecipes() {
        const searchBarValue = this.input.value.toLowerCase();

        const recipes = this.recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchBarValue));

        if (!recipes.length) {
            return this.notFound();
        }

        new Recipes(recipes).createRecipesList();
    }

    notFound() {
        const section = document.querySelector(".recipes-section") as HTMLElement;

        const h1 = document.createElement("h1");
        h1.classList.add("not-found");
        h1.textContent = "Aucune recette ne correspond à vos critères...";
        section.innerHTML = "";
        section.appendChild(h1);
    }
}