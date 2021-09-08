import { navigateTo } from "./navigationService.js";

let dimension = 4;

document.querySelectorAll(".radio-input").forEach((item) => {
  item.addEventListener("click", ({ target: { value } }) => {
    dimension = value;
  });
});

document.getElementById("start-button").onclick = () => {
  navigateTo(`game.html?dimension=${dimension}`);
};
