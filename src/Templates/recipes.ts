import { Recipe } from '../shared/interfaces';


export class RecipeTemplate {
    constructor(public recipes: Recipe[]) {
        this.recipes = recipes.sort((a, b) => a.name.localeCompare(b.name));
    }

    createRecipesList() {
        const list = this.recipes.map((recipe) => `
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
        `);

        const section = document.querySelector(".recipes-section") as HTMLElement;
        section.innerHTML = list.join("");
    }
}