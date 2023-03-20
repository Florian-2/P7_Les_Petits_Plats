import { TypeTag } from './shared/interfaces';


enum Colors {
    ingredients = "#3282f7",
    appliances = "#68d9a4",
    ustensiles = "#ed6454"
}

export class Tag {
    private tags: TypeTag[];
    private sectionTag: HTMLElement;

    constructor() {
        this.tags = [];
        this.sectionTag = document.querySelector(".tags-section")!;

        this.addTag = this.addTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    addTag(li: HTMLLIElement) {
        const parent = li.parentElement as HTMLUListElement;
        const category = parent.dataset.label || "";
        const value = li.textContent || "";
        const color = category as keyof typeof Colors;
        const tag = { id: crypto.randomUUID(), value, category, color };

        this.tags.push(tag);

        const tagHtml = this.createTagHTML(tag);
        this.sectionTag.append(tagHtml);
    }

    removeTag(id: string) {
        const index = this.tags.findIndex((tag) => tag.id === id);
        this.tags.splice(index, 1);

        const tagHtml = document.querySelector(`button[data-id='${id}']`)?.parentElement;
        tagHtml && tagHtml.remove();
    }

    createTagHTML(tag: TypeTag): DocumentFragment {
        const template = document.getElementById("template-tag") as HTMLTemplateElement;
        const el = document.importNode(template.content, true);

        const [div, p, button] = [
            document.querySelector("div")!,
            document.querySelector("p")!,
            document.querySelector("button")!
        ];

        div.style.setProperty("background-color", tag.color);
        p.textContent = tag.value;
        button.setAttribute("data-id", tag.id);

        return el;
    }
}