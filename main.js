let currentPlayer = "x";
let gameWinner = null;
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// 1. gameboard array of objects
const spaceElements = Array.from(document.querySelectorAll(".boxes")).map(
  (spaceElement, index) => ({
    element: spaceElement,
    index: index,
    content: "",
  })
);
console.log(spaceElements);

// 2. game starts when user clicks on a space an x is given
spaceElements.forEach((spaceElement) => {
  spaceElement.element.addEventListener("click", (e) => {
    console.log(`clicked space is ${spaceElement.index}`);
    game(e);
  });
});

const availableSpaces = spaceElements.filter(
  (spaceElement) =>
    spaceElement.content !== "x" && spaceElement.content !== "o"
);

function game(e) {
  const playerChoice = spaceElements.find((obj) => obj.element === e.target);
  if (currentPlayer === "x") {
    playerChoice.content = "x";
    playerChoice.element.innerHTML = "x";
    playerChoice.element.style.color = "white";
    currentPlayer = "o";
    getComputerChoice();
  } if (availableSpaces.length === 0) {
    console.log("Tie Game")
  } if (playerChoice.content == "x" || playerChoice.content == "o") {
    return playerChoice;
  } 
}

// 6. computer selection
function getComputerChoice() {
  if (availableSpaces.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableSpaces.length);
    const randomChoice = availableSpaces[randomIndex];

    randomChoice.content = "o";
    randomChoice.element.innerHTML = "o";

    console.log("Computer chooses", randomChoice.index);
    currentPlayer = "x";
    return randomChoice;
  }
  if (availableSpaces.length === 0) {
    console.log("Tie Game")
  }
}
checkWinner();

// 3. for each space object
function checkWinner() {
  winningCombos.forEach((combo) => {
      spaceElements.index[0] == winningCombos.index[0] &&
        spaceElements.index[1] == winningCombos.index[1]  &&
        spaceElements.index[2] == winningCombos.index[2] 
    );
  });
  console.log("is there a winner?");
  console.log(`the winner is ${gameWinner}`);
}

function gameOver() {
  console.log("game over");
}
// 4.

// 5.

// 7. toggle players

// 8. choice of x or o. x goes first.
