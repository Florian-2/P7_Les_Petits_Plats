import "./style.css";
import { Counter } from "./counter";

const app = document.querySelector("#app") as HTMLDivElement;

app.innerHTML = `
    <h1>Vite + TypeScript</h1>
    <button type="button" id="counter"></button>
`;

const btn = document.querySelector("#counter") as HTMLButtonElement;

new Counter(btn);
