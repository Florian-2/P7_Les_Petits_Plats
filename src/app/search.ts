import { Recipes } from './recipes';
import { TypeRecipe } from '../shared/interfaces';
import { formatStr } from './utils/format';
import { Tag } from './tag';
import { Filter } from './filter';


export class SearchRecipes {
    private recipesInstance: Recipes;
    public tagsInstance: Tag;
    public ingredientsInstance: Filter;
    public appliancesInstance: Filter;
    public ustensilsInstance: Filter;
    public inputSearch: HTMLInputElement;

    constructor(recipes: TypeRecipe[]) {
        this.tagsInstance = new Tag();
        this.recipesInstance = new Recipes(recipes);
        this.ingredientsInstance = new Filter(this.recipesInstance.ingredientsList, { label: ["ingredients", "ingrédient"], color: "#3282f7"});
        this.appliancesInstance = new Filter(this.recipesInstance.appliancesList, { label: ["appliances", "appareil"], color: "#68d9a4" });
        this.ustensilsInstance = new Filter(this.recipesInstance.ustensilsList, { label: ["ustensils", "ustensile"], color: "#ed6454" });

        this.inputSearch = document.querySelector("input[name='search']")!;
    }

    init() {
        this.recipesInstance.createRecipesList();
        this.searchBarEvent();
        this.filterEvent();
    }

    render(recipes: TypeRecipe[]) {
        this.recipesInstance.createRecipesList(recipes);
    }

    private searchBarEvent() {
        this.inputSearch.addEventListener("keyup", () => {
            if (this.inputSearch.value.trim().length >= 3) {
                return this.search();
            }

            this.recipesInstance.createRecipesList();
        });
    }

    filterEvent() {
        this.ingredientsInstance.filterButtonEl.addEventListener("click", (event) => {
			this.appliancesInstance.closeFilter();
			this.ustensilsInstance.closeFilter();
			this.ingredientsInstance.expandFilter(event);
		});
		this.appliancesInstance.filterButtonEl.addEventListener("click", (event) => {
			this.ingredientsInstance.closeFilter();
			this.ustensilsInstance.closeFilter();
			this.appliancesInstance.expandFilter(event);
		});
		this.ustensilsInstance.filterButtonEl.addEventListener("click", (event) => {
			this.ingredientsInstance.closeFilter();
			this.appliancesInstance.closeFilter();
			this.ustensilsInstance.expandFilter(event);
		});
    }

    search() {
        let result: TypeRecipe[] = [];
        const inputValue = formatStr(this.inputSearch.value);

        result.push(...this.searchTitle(inputValue));
        result.push(...this.searchDescription(inputValue));
        result = Array.from(new Set(result)); // Suppression des doublons

        if (result.length === 0) {
            return this.recipesInstance.noResult();
        }

        this.recipesInstance.createRecipesList(result);
    }

    searchTitle(searchBarValue: string): TypeRecipe[] {
        return this.recipesInstance.recipesList.filter((recipe) => formatStr(recipe.name).includes(searchBarValue));
    }

    searchDescription(searchBarValue: string): TypeRecipe[] {
        return this.recipesInstance.recipesList.filter((recipe) => formatStr(recipe.description).includes(searchBarValue));
    }
}