import { formatStr, capitalize } from "../utils/format";

type Option = { label: [string, string], color: string };


export class Filter {
    public keywordsList: string[];
    public options: Option;
    public filterEl: HTMLDivElement;
    public filterButtonEl: HTMLButtonElement;
    public filterInuputEl: HTMLInputElement;

    constructor(data: string[], options: Option) {
        this.keywordsList = data;
        this.options = options;

        this.filterEl = document.querySelector(`.filter[data-label="${options.label[0]}"]`)!;
        this.filterButtonEl = this.filterEl.querySelector(".filter-search__btn")!;
        this.filterInuputEl = this.filterEl.querySelector(".filter-search__input")!;

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
        const result = this.keywordsList.filter((keyword) => formatStr(keyword).includes(formatStr(input.value)));

        // if (result.length === 0) {
            // Aucun résultat
        // }

        return result;
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
    }

    noResult(): HTMLParagraphElement {
        const p = document.createElement("p");
        p.classList.add("no-result");
        p.textContent = "Aucun résultat";

        return p;
    }
}