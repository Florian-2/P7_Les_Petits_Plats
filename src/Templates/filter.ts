import { Keyword } from "../shared/interfaces";

type Keywords = {
    [key: string]: HTMLLIElement[]
};

enum Colors {
    ingredients = "#3282f7",
    appliances = "#68d9a4",
    ustensiles = "#ed6454"
}

export class FilterTemplate {
    public keywords: Keyword;

    constructor(keywords: Keyword) {
        this.keywords = keywords;
        this.initEvent();
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

    private createKeyword(content: string) {
        const li = document.createElement("li");
        li.addEventListener("click", (e) => console.log(e.target));
        li.classList.add("keywords-list__item");
        li.textContent = content;

        return li;
    }

    createFilterList() {
        const keywords: Keywords = {
            "appliances": Array.from(this.keywords.appliances).map((appliance) => this.createKeyword(appliance)),
            "ustensiles": Array.from(this.keywords.ustensiles).map((utensile) => this.createKeyword(utensile)),
            "ingredients": Array.from(this.keywords.ingredients).map((ingredient) => this.createKeyword(ingredient))
        }

        const div: NodeListOf<HTMLDivElement> = document.querySelectorAll(".keywords[data-label]");
        const list = document.querySelectorAll(".keywords-list");
        list.forEach((l) => l.remove());

        div.forEach((el) => {
            const label = el.dataset.label || "";

            for (const key in keywords) {
                if (label === key) {
                    const ul = document.createElement("ul");
                    ul.classList.add("keywords-list");
                    const color = label as keyof typeof Colors;
                    ul.style.setProperty("background-color", Colors[color]);

                    ul.append(...keywords[label]);
                    el.append(ul);
                }
            }
        })
    }

    open(e: Event) {
        const btn = e.target as HTMLButtonElement;
        btn.classList.add("filter-btn--hidden");
        btn.nextElementSibling?.classList.add("keywords-active");
        btn.parentElement?.classList.add("filter-active");
    }

    close() {
        const keywordsList = document.querySelector(".keywords-active") as HTMLDivElement;
        const btn = document.querySelector(".filter-btn--hidden") as HTMLButtonElement;
        const parent = document.querySelector(".filter-active") as HTMLDivElement;

        btn?.classList.remove("filter-btn--hidden");
        keywordsList?.classList.remove("keywords-active");
        parent?.classList.remove("filter-active");
    }
}