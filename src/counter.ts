export class Counter {
	private counter = 0;
	private element: HTMLButtonElement;

	constructor(element: HTMLButtonElement) {
		this.element = element;
		this.setCounter(0);
		this.element.addEventListener("click", () => this.setCounter(this.counter + 1));
	}

	private setCounter(count: number): void {
		this.counter = count;
		this.element.textContent = `count is ${this.counter}`;
	}
}
