import { navigateTo, getQueryParam } from "./navigationService.js";
import createGame from "./createGame.js";

const dimension = Number(getQueryParam("dimension"));
if (!dimension || typeof dimension !== "number") {
  navigateTo("index.html");
}

document.getElementById("new-game").onclick = () => {
  navigateTo("index.html");
};

createGame(dimension, (time) => {
  navigateTo(`result.html?time=${time}`);
});
