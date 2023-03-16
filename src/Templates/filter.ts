import { Keyword } from "../shared/interfaces";

type Keywords = {
    [key: string]: HTMLLIElement[]
};

export class FilterTemplate {
    public keywords: Keyword;

    constructor(keywords: Keyword) {
        this.keywords = keywords;
        this.initEvent();
    }

    private createKeyword(content: string) {
        const li = document.createElement("li");
        li.classList.add("keywords-list__item");
        li.textContent = content;
        return li;
    }

    createFilterList() {
        const keywords: Keywords = {
            "appliances": Array.from(this.keywords.appliances).map((appliance) => this.createKeyword(appliance)),
            "ustensiles": Array.from(this.keywords.utensils).map((utensil) => this.createKeyword(utensil)),
            "ingredients": Array.from(this.keywords.ingredients).map((ingredient) => this.createKeyword(ingredient))
        }

        const div: NodeListOf<HTMLDivElement> = document.querySelectorAll(".keywords[data-label]");

        div.forEach((el) => {
            const label: string = el.dataset.label || "";

            for (const key in keywords) {
                if (label === key) {
                    const ul = document.createElement("ul");
                    ul.classList.add("keywords-list");
                    ul.append(...keywords[label]);
                    el.append(ul);
                }
            }
        })
    }

    initEvent() {
        const filters: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".filter-btn");
        const btnClose: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".keywords-search__btn");

        filters.forEach((btn) => btn.addEventListener("click", (e) => {
            this.close();
            this.open(e)
        }));

        btnClose.forEach((btn) => btn.addEventListener("click", () => this.close()));
    }

    open(e: Event) {
        const btn = e.target as HTMLButtonElement;
        btn.classList.add("filter-btn--hidden");
        btn.nextElementSibling?.classList.add("keywords-active");
    }

    close() {
        const keywordsList = document.querySelector(".keywords-active") as HTMLDivElement;
        const btn = document.querySelector(".filter-btn--hidden") as HTMLButtonElement;

        btn?.classList.remove("filter-btn--hidden");
        keywordsList?.classList.remove("keywords-active");
    }
}