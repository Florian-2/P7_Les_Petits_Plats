import { Recipes } from './recipes';
import { TypeRecipe } from './shared/interfaces';
import { formatStr } from './utils/format';
import { Tag } from './tag';
import { Filter } from './filter';


export class SearchRecipes {
    private recipesInstance: Recipes;
    private tagsInstance: Tag;
    private ingredientsInstance: Filter;
    private appliancesInstance: Filter;
    private ustensilsInstance: Filter;
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
        this.tagEvent();
    }

    render(recipes: TypeRecipe[]) {
        this.recipesInstance.createRecipesList(recipes);
        const keywords = this.recipesInstance.initKeywordsList(recipes);
        this.updateKeywordsList(keywords);
        this.tagEvent();
    }

    private searchBarEvent() {
        this.inputSearch.addEventListener("input", () => this.search());
    }

    private filterEvent() {
        this.ingredientsInstance.filterButtonEl.addEventListener("click", (e) => {
			this.appliancesInstance.closeFilter();
			this.ustensilsInstance.closeFilter();
			this.ingredientsInstance.expandFilter(e);
		});
		this.appliancesInstance.filterButtonEl.addEventListener("click", (e) => {
			this.ingredientsInstance.closeFilter();
			this.ustensilsInstance.closeFilter();
			this.appliancesInstance.expandFilter(e);
		});
		this.ustensilsInstance.filterButtonEl.addEventListener("click", (e) => {
			this.ingredientsInstance.closeFilter();
			this.appliancesInstance.closeFilter();
			this.ustensilsInstance.expandFilter(e);
		});
    }

    private tagEvent() {
        const ingredientsLi = this.ingredientsInstance.filterEl.querySelectorAll(".filter-list__item");
        const appliancesLi = this.appliancesInstance.filterEl.querySelectorAll(".filter-list__item");
        const ustensilsLi = this.ustensilsInstance.filterEl.querySelectorAll(".filter-list__item");

        ingredientsLi.forEach((li) => li.addEventListener("click", (e) => this.addTagEvent(e)));
        appliancesLi.forEach((li) => li.addEventListener("click", (e) => this.addTagEvent(e)));
        ustensilsLi.forEach((li) => li.addEventListener("click", (e) => this.addTagEvent(e)));
    }

    private updateKeywordsList(recipes: { ingredients: string[], appliances: string[], ustensils: string[] }) {
        this.ingredientsInstance.createKeywordsList(recipes.ingredients);
        this.appliancesInstance.createKeywordsList(recipes.appliances);
        this.ustensilsInstance.createKeywordsList(recipes.ustensils);
    }

    private search() {
        let result: TypeRecipe[] = [];
        const inputValue = formatStr(this.inputSearch.value);

        if (inputValue.length >= 3) {
            result.push(...this.searchTitle(inputValue));
            result.push(...this.searchDescription(inputValue));
        }
        else {
            result = this.recipesInstance.recipesList;
        }

        if (this.tagsInstance.tags.length > 0) {
            this.tagsInstance.tags.forEach((tag) => {
                switch (tag.category) {
                    case "ingredients":
                        result = this.searchIngredient(tag.value, result);
                        break;
                    case "appliances":
                        result = this.searchAppliance(tag.value, result);
                        break;
                    case "ustensils":
                        result = this.searchUstensil(tag.value, result);
                        break;
                }
            })
        }

        result = Array.from(new Set(result));

        this.render(result);
    }

    private searchTitle(searchBarValue: string): TypeRecipe[] {
        return this.recipesInstance.recipesList.filter((recipe) => formatStr(recipe.name).includes(searchBarValue));
    }

    private searchDescription(searchBarValue: string): TypeRecipe[] {
        return this.recipesInstance.recipesList.filter((recipe) => formatStr(recipe.description).includes(searchBarValue));
    }

    private searchIngredient(searchValue: string, recipes: TypeRecipe[]): TypeRecipe[] {
        return recipes.filter((recipe) => {
            return recipe.ingredients.some((ing) => formatStr(ing.ingredient) === formatStr(searchValue));
        });
    }

    private searchAppliance(searchValue: string, recipes: TypeRecipe[]) {
        return recipes.filter((recipe) => formatStr(recipe.appliance) === formatStr(searchValue));
    }

    private searchUstensil(searchValue: string, recipes: TypeRecipe[]): TypeRecipe[] {
        return recipes.filter((recipe) => recipe.ustensils.includes(searchValue));
    }

    private addTagEvent(e: Event) {
        const li = e.target as HTMLLIElement;
        const tagEl = this.tagsInstance.addTag(li);
        if (tagEl) {
            tagEl.querySelector("button")?.addEventListener("click", (e) => this.removeTagEvent(e));
            this.search();
        }
    }

    private removeTagEvent(e: Event) {
        const id = (e.target as HTMLButtonElement).dataset.id;
        id && this.tagsInstance.removeTag(id);
        this.search();
    }
}