import { formatStr, capitalize } from "../utils/format";

type Option = { label: [string, string], color: string };


export class Filter {
    public keywordsList: string[];
    public options: Option;
    public filterEl: HTMLDivElement;
    public filterButtonEl: HTMLButtonElement;
    public filterInuputEl: HTMLInputElement;
    public noResultEl: HTMLParagraphElement;

    constructor(data: string[], options: Option) {
        this.keywordsList = data;
        this.options = options;

        this.filterEl = document.querySelector(`.filter[data-label="${options.label[0]}"]`)!;
        this.filterButtonEl = this.filterEl.querySelector(".filter-search__btn")!;
        this.filterInuputEl = this.filterEl.querySelector(".filter-search__input")!;
        this.noResultEl = this.noResult();

        this.expandFilter = this.expandFilter.bind(this);
        this.openFilter = this.openFilter.bind(this);
        this.closeFilter = this.closeFilter.bind(this);
        this.searchKeyWords = this.searchKeyWords.bind(this);

        this.init();
    }

    init() {
        this.createKeywordsList(this.keywordsList);
        this.searchBarEvent();
    }

    /**
     * Ajoute un événement "keyup" sur les 3 inputs pour permettre la recherche d'ingrédients, d'appareils et d'ustensiles
     */
    searchBarEvent() {
        this.filterInuputEl.addEventListener("keyup", this.searchKeyWords);
    }

    createKeywordsList(list: string[]) {
        list.sort((a, b) => a.localeCompare(b));

        const ul = document.createElement("ul");
        ul.classList.add("filter-list");

        const listLi = list.map((keyword) => `<li class="filter-list__item" data-color="${this.options.color}">${keyword}</li>`);
        ul.innerHTML = listLi.join("");

        // Suppression des listes de mots clés déjà présente dans le DOM
        const oldList = this.filterEl.querySelector("ul");
        oldList && oldList.remove();

        this.filterEl.append(ul);
    }

    searchKeyWords(e: Event) {
        const input = e.target as HTMLInputElement;
        const list = input.closest(".filter")?.querySelectorAll<HTMLLIElement>(".filter-list__item");
        const result = [];

        if (!list) return;

        list.forEach((li) => {
            // Si le mot recherché fait partie de la liste on l'affiche (display: block) sinon on le cache (display: none)
            if (formatStr(li.textContent || "").includes(formatStr(input.value))) {
                console.log(formatStr(li.textContent || ""));
                li.style.setProperty("display", "block");
                result.push(li);
            }
            else {
                li.style.setProperty("display", "none");
            }
        });

        // Affiche un message s'il n'y a aucun résultat pour le mot recherché
        if (result.length === 0) {
            this.filterEl.append(this.noResultEl);
        }
        else {
            this.noResultEl.remove();
        }
    }

    expandFilter(e: Event) {
        const divFilter = (e.target as HTMLButtonElement).closest(".filter");

        if (divFilter) {
            if (this.filterEl.classList.contains("filter-active")) {
                this.closeFilter();
            }
            else {
                this.openFilter();
            }
        }
    }

    openFilter() {
        this.filterInuputEl.placeholder = `Rechercher un ${this.options.label[1]}`;
        this.filterEl.classList.add("filter-active");
    }

    closeFilter() {
        this.filterInuputEl.value = "";
        this.filterInuputEl.placeholder = capitalize(this.options.label[1]);
        this.filterEl.classList.remove("filter-active");
        this.noResultEl.remove();
        this.filterEl.querySelectorAll<HTMLLIElement>(".filter-list__item").forEach((li) => li.style.setProperty("display", "block"));
    }

    noResult(): HTMLParagraphElement {
        const p = document.createElement("p");
        p.classList.add("no-result");
        p.textContent = "Aucun résultat";

        return p;
    }
}