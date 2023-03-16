import { RecipeTemplate } from '../Templates/recipes';
import { Keyword, Recipe, Tag } from '../shared/interfaces';
import { FilterTemplate } from '../Templates/filter';


export class SearchRecipes {
    readonly readRecipes: Recipe[];
    readonly readKeywords: Keyword;

    public resultRecipes: Recipe[];
    public keywords: Keyword;
    public inputSearch: HTMLInputElement;
    public inputKeyword: NodeListOf<HTMLInputElement>;
    public tags: Tag[];

    constructor(recipes: Recipe[]) {
        this.readRecipes = recipes;
        this.resultRecipes = recipes;
        this.inputSearch = document.querySelector("input[name='search']")!;
        this.inputKeyword = document.querySelectorAll("input.keywords-search__input");
        this.tags = [];
		this.keywords = {
            ingredients: [],
			appliances: [],
			ustensiles: []
		};
		this.formatKeywords();
        this.readKeywords = this.keywords;
        this.initEvent();
    }

    private initEvent() {
        this.inputSearch.addEventListener("keyup", () => {
            if (this.inputSearch.value.trim().length >= 3) {
                return this.filterRecipes();
            }

            new RecipeTemplate(this.readRecipes).createRecipesList();
            new FilterTemplate(this.readKeywords).createFilterList();
        });

        this.inputKeyword.forEach((input) => input.addEventListener("input", (e) => this.filterKeywords(e)));
    }

    formatKeywords() {
        this.keywords = {
            ingredients: [],
			appliances: [],
			ustensiles: []
		};

		this.resultRecipes.reduce((acc, recipe) => {
 			recipe.ingredients.forEach((ingredient) => {
                if (!acc.ingredients.includes(ingredient.ingredient)) {
                    acc.ingredients.push(ingredient.ingredient)
                }
            });
			recipe.ustensils.forEach((utensil) => {
                if (!acc.ustensiles.includes(utensil)) {
                    acc.ustensiles.push(utensil);
                }
            });

            if (!acc.appliances.includes(recipe.appliance)) {
                acc.appliances.push(recipe.appliance);
            }

			return acc;
		}, this.keywords);

        new FilterTemplate(this.keywords).createFilterList();
	}

    filterKeywords(e: Event) {
        const input = e.target as HTMLInputElement;
        const inputValue = input.value.toLowerCase();
        const label = input.name as keyof Keyword;

        this.formatKeywords();

        this.keywords[label] = this.readKeywords[label].filter((keyword) => keyword.toLowerCase().includes(inputValue));
        new FilterTemplate(this.keywords).createFilterList();
    }

    filterRecipes() {
        const searchBarValue = this.inputSearch.value.toLowerCase();
        this.resultRecipes = this.readRecipes.filter((recipe) => recipe.name.toLowerCase().includes(searchBarValue));

        this.formatKeywords();

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