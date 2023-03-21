import { Recipes } from './recipes';
import { TypeRecipe } from './shared/interfaces';
import { formatStr } from './utils/format';
import { Tag } from './tag';
import { Filter } from './filter';


export class SearchRecipes {
    private recipesInstance: Recipes;
    public tagsInstance: Tag;
    public ingredientsInstance: Filter;
    public appliancesInstance: Filter;
    public ustensilsInstance: Filter;
    private inputSearch: HTMLInputElement;

    constructor(recipes: TypeRecipe[]) {
        this.recipesInstance = new Recipes(recipes);
        this.tagsInstance = new Tag();
        this.ingredientsInstance = new Filter(this.recipesInstance.ingredientsList, {
            label: ["ingredients", "ingrédient"],
            color: "#3282f7" 
        });
        this.appliancesInstance = new Filter(this.recipesInstance.appliancesList, {
            label: ["appliances", "appareil"],
            color: "#68d9a4" 
        });
        this.ustensilsInstance = new Filter(this.recipesInstance.ustensilsList, { 
            label: ["ustensils", "ustensile"], 
            color: "#ed6454" 
        });

        this.inputSearch = document.querySelector("input[name='search']")!;
    }

    init() {
        this.recipesInstance.createRecipesList();
        this.searchBarEvent();
        this.filterEvent();
    }

    render(recipes: TypeRecipe[]) {
        this.recipesInstance.createRecipesList(recipes);
        const keywords = this.recipesInstance.initKeywordsList(recipes);
        this.updateKeywordsList(keywords);
    }

    private searchBarEvent() {
        this.inputSearch.addEventListener("input", () => this.search());
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

    updateKeywordsList(recipes: { ingredients: string[], appliances: string[], ustensils: string[] }) {
        this.ingredientsInstance.createKeywordsList(recipes.ingredients);
        this.appliancesInstance.createKeywordsList(recipes.appliances);
        this.ustensilsInstance.createKeywordsList(recipes.ustensils);
    }

    search() {
        let result: TypeRecipe[] = [];
        const inputValue = formatStr(this.inputSearch.value);

        if (inputValue.length >= 3) {
            result.push(...this.searchTitle(inputValue));
            result.push(...this.searchDescription(inputValue));
        }
        else {
            result = this.recipesInstance.recipesList;
        }

        this.render(result);
    }

    searchTitle(searchBarValue: string): TypeRecipe[] {
        return this.recipesInstance.recipesList.filter((recipe) => formatStr(recipe.name).includes(searchBarValue));
    }

    searchDescription(searchBarValue: string): TypeRecipe[] {
        return this.recipesInstance.recipesList.filter((recipe) => formatStr(recipe.description).includes(searchBarValue));
    }
}