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

// 1. add new players
// factory function to create player.

function newPlayer(_name, _key) {
  const name = _name;
  const key = _key;
  let score = 0;
  function incremenetScore() {
    score++;
  }
  return { name, key, score, incremenetScore };
}

// function to create the gameboard
(() => {
  const gameContainer = document.querySelector(".container");
  const gameboard = [...Array(9).keys()];
  console.log(gameContainer);
  gameboard.map((i) => {
    const box = document.createElement("div");
    box.classList.add("boxes");
    console.log(box);
    box.dataset.index = i;
    // box.addEventListener("click", (e) => game(e));
    gameContainer.append(box);
  });
})();

// module to run the game (create player)
(() => {
  const player1 = newPlayer("player1", "x");
  const player2 = newPlayer("player2", "o");
  console.log(player1, player2);
  let currentPlayer = player1;
  const gameContainer = document.querySelector(".container");
  gameContainer.addEventListener("click", (e) => {
    e.target.innerHTML = currentPlayer.key;
    changePlayer()
  });
  function changePlayer() {
    if (currentPlayer.key == "x") {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  }
  // check for winner before change player
  // check score
  //
})();

// 2. game starts when user clicks on a space an x is given - module
spaceElements.forEach((spaceElement) => {
  spaceElement.element.addEventListener("click", (e) => {
    console.log(`player chooses ${spaceElement.index}`);
    game(e);
  });
});

// 4.
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
  spaceElements.content = "";
  spaceElements.innerHTML = "";
});

function game(e) {
  console.log(e);
  const playerChoice = spaceElements.find((obj) => obj.element === e.target);
  if (currentPlayer === "x") {
    playerChoice.content = "x";
    playerChoice.element.innerHTML = "x";
  }
  if (checkWinner("x") || checkWinner("o")) {
    gameOver();
  } else if (currentPlayer === "x") {
    currentPlayer = "o";
    getComputerChoice();
    checkWinner("o");
    currentPlayer = "x";
  }
}
// 6. computer selection - module
function getComputerChoice() {
  const availableSpaces = spaceElements.filter(
    (spaceElement) => !spaceElement.content
  );
  if (!availableSpaces.length) {
    console.log("Tie Game");
    gameOver();
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableSpaces.length);
  const randomChoice = availableSpaces[randomIndex];

  randomChoice.content = "o";
  randomChoice.element.innerHTML = "o";

  console.log("Computer chooses", randomChoice.index);
}

// 3. for each space check if the index matches array of winning indexes. If it does not, then drop out. If all values of this are true, then return winner.
function checkWinner(player) {
  let foundWinner = false;
  winningCombos.forEach((combo) => {
    let comboIsWinner = true;
    if (foundWinner === true) {
      return;
    }
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
      });
    }
  });
  if (foundWinner === true) {
    gameWinner = player;
    console.log(gameWinner, "is winner");
    gameOver();
  }
}

function gameOver() {
  console.log("game over");
  resetBtn.classList.toggle("hidden");
}

// 5. change display status
