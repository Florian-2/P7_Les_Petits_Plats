import { RecipeTemplate } from '../Templates/recipes';
import { Keyword, Recipe, Tag } from '../shared/interfaces';
import { FilterTemplate } from '../Templates/filter';


export class SearchRecipes {
    readonly readRecipes: Recipe[];
    readonly readKeywords: Keyword;

    public resultRecipes: Recipe[];
    public input: HTMLInputElement;
    public keywords: Keyword;
    public tags: Tag[];

    constructor(recipes: Recipe[], inputs: HTMLInputElement) {
        this.readRecipes = recipes;
        this.resultRecipes = recipes;
        this.input = inputs;
        this.tags = [];
		this.keywords = {
            ingredients: new Set(),
			appliances: new Set(),
			utensils: new Set()
		};
		this.filterKeywords();
        this.readKeywords = this.keywords;
        this.initEvent();
    }

    private initEvent() {
        this.input.addEventListener("keyup", () => {
            if (this.input.value.trim().length >= 3) {
                return this.filterRecipes();
            }

            new RecipeTemplate(this.readRecipes).createRecipesList();
            new FilterTemplate(this.readKeywords).createFilterList();
        });
    }

    resetKeywords() {
        this.keywords = {
            ingredients: new Set(),
			appliances: new Set(),
			utensils: new Set()
		};
    }

    filterKeywords() {
        this.resetKeywords();

		this.resultRecipes.reduce((acc, recipe) => {
 			recipe.ingredients.forEach((ingredient) => acc.ingredients.add(ingredient.ingredient));
			recipe.ustensils.forEach((utensil) => acc.utensils.add(utensil));
			acc.appliances.add(recipe.appliance);

			return acc;
		}, this.keywords);

        new FilterTemplate(this.keywords).createFilterList();
	}

    filterRecipes() {
        const searchBarValue = this.input.value.toLowerCase();
        this.resultRecipes = this.readRecipes.filter((recipe) => recipe.name.toLowerCase().includes(searchBarValue));

        this.filterKeywords();

        if (!this.resultRecipes.length) {
            return this.notFound();
        }

        new RecipeTemplate(this.resultRecipes).createRecipesList();
        new FilterTemplate(this.keywords).createFilterList();
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