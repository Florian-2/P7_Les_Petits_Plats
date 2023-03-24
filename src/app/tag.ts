import { TypeTag } from './shared/interfaces';


enum Colors {
    ingredients = "#3282f7",
    appliances = "#68d9a4",
    ustensiles = "#ed6454"
}

export class Tag {
    public tags: TypeTag[];
    private sectionTag: HTMLElement;

    constructor() {
        this.tags = [];
        this.sectionTag = document.querySelector(".tags-section")!;

        this.addTag = this.addTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    addTag(li: HTMLLIElement): Element | null {
        const category = li.dataset.label || "";
        const value = li.textContent || "";
        const color = li.dataset.color || "" as keyof typeof Colors;
        const newTag = { id: crypto.randomUUID(), value, category, color };

        // Si le tag existe déjà on arrête là
        const tag = this.tags.some((tag) => tag.value === value);
        if (tag) return null;

        this.tags.push(newTag);
        const tagHtml = this.createTagHTML(newTag);
        this.sectionTag.insertAdjacentHTML("beforeend", tagHtml);

        return this.sectionTag.lastElementChild;
    }

    removeTag(id: string) {
        const index = this.tags.findIndex((tag) => tag.id === id);
        this.tags.splice(index, 1);

        const tagHtml = document.querySelector(`button[data-id='${id}']`)?.parentElement;
        tagHtml && tagHtml.remove();
    }

    createTagHTML(tag: TypeTag): string {
        const el = `
            <div class="tag center" style="background-color: ${tag.color}">
                <p class="tag__label">${tag.value}</p>

                <button class="tag-remove center" data-id="${tag.id}">
                    <img src="icons/cross.svg" class="tag-remove__icon" alt="Icon en forme de croix">
                </button>
            </div>
        `;

        return el;
    }
}