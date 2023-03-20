import { TypeRecipe } from './shared/interfaces';


export class Recipes {
    public recipesList: TypeRecipe[];
    public ingredientsList: string[];
    public appliancesList: string[];
    public ustensilsList: string[];

    constructor(recipesList: TypeRecipe[]) {
        this.recipesList = recipesList.sort((a, b) => a.name.localeCompare(b.name));
        this.ingredientsList = [];
        this.appliancesList = [];
        this.ustensilsList = [];

        this.initKeywordsList();
    }

    initKeywordsList() {
        this.recipesList.forEach((recipe) => {
            this.ingredientsList.push(...recipe.ingredients.map((ing) => ing.ingredient));
            this.ustensilsList.push(...recipe.ustensils);
            this.appliancesList.push(recipe.appliance);
        });

        // Suppression des doublons
        this.ingredientsList = [...new Set(this.ingredientsList)];
        this.appliancesList = [...new Set(this.appliancesList)];
        this.ustensilsList = [...new Set(this.ustensilsList)];
    }

    createRecipesList(recipes = this.recipesList) {
        const list = recipes.map((recipe) => this.createRecipe(recipe));

        const section = document.querySelector(".recipes-section") as HTMLElement;
        section.innerHTML = list.join("");
    }

    createRecipe(recipe: TypeRecipe) {
        const content = `
            <article class="card-recipe">
                <div class="card-recipe__thumbnail"></div>

                <div class="card-recipe__description">
                    <div class="recipe-header">
                        <h2 class="recipe-header__title">${recipe.name}</h2>

                        <div class="recipe-time center">
                            <img src="icons/clock.svg" alt="Chronomètre" class="recipe-time__icon">
                            <p class="recipe-time__time">${recipe.time}min</p>
                        </div>
                    </div>

                    <div class="card-recipe__details">
                        <ul class="recipe-ingredients">
                            ${
                                recipe.ingredients.map((inc) => `
                                        <li class="recipe-ingredients__item">
                                            <span>${inc.ingredient}:</span> ${inc.quantity || ''} ${inc.unit || ''}
                                        </li>
                                    `
                                ).join('')
                            }
                        </ul>

                        <p class="card-recipe__instructions">${recipe.description}</p>
                    </div>
                </div>
            </article>
        `;
        return content;
    }

    noResult() {
        const section = document.querySelector(".recipes-section") as HTMLElement;

        const h1 = document.createElement("h1");
        h1.classList.add("not-found");
        h1.textContent = "Aucune recette ne correspond à vos critères...";
        section.innerHTML = "";
        section.appendChild(h1);
    }
}