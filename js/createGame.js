import { GAME_CONTAINER, CARD_ID_PREFIX, PAIRS_ID } from "./constants.js";

const possibleDimensions = [4, 8, 12];
let gameInterval = null;
let gameStart = null;
let dimension = 4;
let cards = [];
let cardsClicked = [];
let pairs = 8;
let pairsRemaning = 8;

const createGame = (gameDimensions, gameEndHandler) => {
  if (!possibleDimensions.includes(gameDimensions)) {
    throw new Error("gameDimensions must be either 4, 8 or 12.");
  }

  if (typeof gameEndHandler !== "function") {
    throw new Error("gameEndHandler is not a function.");
  }

  gameStart = new Date();
  dimension = gameDimensions;
  pairs = (gameDimensions * gameDimensions) / 2;
  pairsRemaning = pairs;
  cards = [];
  cardsClicked = [];

  _createGamePairs();
  _renderCards(gameEndHandler);
};

const _createGamePairs = () => {
  const pairs = Array.from({ length: pairsRemaning }, (_, i) => i + 1);
  cards = [...pairs, ...pairs];

  let currentIndex = cards.length;
  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    const randomValue = cards[randomIndex];
    const currentValue = cards[currentIndex];
    cards[currentIndex] = randomValue;
    cards[randomIndex] = currentValue;
  }
};

const _renderCards = (gameEndHandler) => {
  // Recreate the game container
  let gameContainer = document.getElementById(GAME_CONTAINER);
  if (gameContainer) {
    gameContainer.remove();
  }
  gameContainer = document.createElement("div");
  gameContainer.setAttribute("id", GAME_CONTAINER);
  document.body.appendChild(gameContainer);

  const pairsElement = document.getElementById(PAIRS_ID);

  for (let i = 0; i < cards.length; i++) {
    // Create Card Component
    const cardContainer = document.createElement("div");
    const cardFront = document.createElement("div");
    const cardBack = document.createElement("div");

    cardFront.innerHTML = cards[i];
    cardContainer.setAttribute("id", `${CARD_ID_PREFIX}-${i}`);
    cardContainer.classList.add("card");
    cardContainer.classList.add(`card__${dimension}`);
    cardFront.classList.add("card-front");
    cardBack.classList.add("card-back");

    cardContainer.appendChild(cardFront);
    cardContainer.appendChild(cardBack);
    gameContainer.appendChild(cardContainer);

    // Add click handler to the card
    cardContainer.onclick = () => {
      const [previousClickedCard] = cardsClicked;

      if (
        cardFront.classList.contains("found") ||
        previousClickedCard?.cardContainer?.id === cardContainer.id
      ) {
        return;
      }

      if (
        cardsClicked.length === 1 &&
        previousClickedCard?.cardFront?.innerHTML === cardFront.innerHTML
      ) {
        // Setting opacity on the Card container would mess up the transform-style
        cardContainer.classList.add("clicked");
        cardFront.classList.add("found");
        cardBack.classList.add("found");
        previousClickedCard?.cardFront?.classList.add("found");
        previousClickedCard?.cardBack?.classList.add("found");

        cardsClicked = [];
        pairsRemaning--;
        pairsElement.innerHTML = `Megtalált párok: ${pairs - pairsRemaning}`;

        // Check if the game has ended
        if (pairsRemaning === 0) {
          clearInterval(gameInterval);
          gameEndHandler(new Date() - gameStart);
        }

        return;
      }

      if (cardsClicked.length === 2) {
        cardsClicked.forEach((card) =>
          card?.cardContainer?.classList.remove("clicked")
        );
        cardsClicked = [];
      }

      cardsClicked.push({ cardFront, cardBack, cardContainer });
      cardContainer.classList.add("clicked");
    };
  }
};

export default createGame;
