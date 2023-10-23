
const player = {name: "x", spaces: null, color: "white", winner: false}


let currentPlayer = "";
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

// 1. add new player
function addNewPlayer(name, spaces, color, winner) {
const player1 = 
}

// 2. game starts when user clicks on a space an x is given
spaceElements.forEach((spaceElement) => {
  spaceElement.element.addEventListener("click", (e) => {
    console.log(`player chooses ${spaceElement.index}`);
    game(e);
  });
});

// 4. 
const resetBtn = document.querySelector(".resetBtn");
  resetBtn.addEventListener("click", () => {
    spaceElements.content = "";
    spaceElements.innerHTML = "";
  })

function game(e) {
  const playerChoice = spaceElements.find((obj) => obj.element === e.target);
  if (currentPlayer === "x") {
    playerChoice.content = "x";
    playerChoice.element.innerHTML = "x";
    currentPlayer = "o";
    getComputerChoice();
  }
  if (playerChoice.content == "x" || playerChoice.content == "o") {
    return playerChoice;
  }
  if (checkWinner("x") || checkWinner("o")) {
    gameOver()
  }


  // 6. computer selection
  function getComputerChoice() {
    const availableSpaces = spaceElements.filter(
      (spaceElement) =>
        spaceElement.content !== "x" || spaceElement.content !== "o"
    );
    if (availableSpaces.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableSpaces.length);
      const randomChoice = availableSpaces[randomIndex];

      randomChoice.content = "o";
      randomChoice.element.innerHTML = "o";

      console.log("Computer chooses", randomChoice.index);
      currentPlayer = "x";
      checkWinner("o")
      return randomChoice;
    }
    if (availableSpaces.length <= 0) {
      console.log("Tie Game");
      gameOver();
    }
  }
  checkWinner();

  // 3. for each space check if the index matches. If it does not, then drop out. If all values of this wincondition are true, then return win.
  function checkWinner(player) {
    let foundWinner = false;
    winningCombos.forEach((combo) => {
      let comboIsWinner = true;
      
      for (let i = 0; i < combo.length; i++) {
        const index = combo[i];
        if (spaceElements[index].content !== player) {
          comboIsWinner = false;
          break;
        }
      }
      if (comboIsWinner) {
        foundWinner = true;
        combo.forEach((index) => {
          spaceElements[index].element.classList.add("winner");
          gameWinner = player;
          console.log(gameWinner, "is winner");
          gameOver();
        });
      }
    });
    return foundWinner;
  }
  return { spaceElements, checkWinner };
}
function gameOver() {
  console.log("game over");
  resetBtn.classList.toggle("hidden");
}

// 5. change display status

// 7. toggle players

// 8. choice of x or o. x goes first.
