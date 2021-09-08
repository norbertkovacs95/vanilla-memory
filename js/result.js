import { navigateTo, getQueryParam } from "./navigationService.js";

const time = Number(getQueryParam("time"));
if (!time || typeof time !== "number") {
  navigateTo("index.html");
}

const generateTimeText = (time) => {
  const minutes = Math.floor(time / 60000);
  const seconds = ((time % 60000) / 1000).toFixed(0);
  return minutes > 0
    ? `${minutes} perc és ${seconds} másodperc`
    : `${seconds} másodperc`;
};

document.getElementById("game-time").innerHTML = generateTimeText(time);
document.getElementById("new-game").onclick = () => {
  navigateTo("index.html");
};
