import { Tag } from "../shared/interfaces";

export class Tags {
    // public tags: Tag[];

    constructor() {
        // this.tags = tags;
        // console.log(tags);
    }

    createTagsList(tags: Tag[]) {
        const section = document.querySelector(".tags-section") as HTMLElement;

        const list = tags.map((tag) => `
            <div class="tag center">
                <p class="tag__label">${tag.value}</p>

                <button class="tag-remove center" data-id="${tag.id}">
                    <img src="icons/cross.svg" class="tag-remove__icon" alt="Icon en forme de croix">
                </button>
            </div>
        `);

        section.innerHTML = list.join("");
    }
}