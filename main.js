

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
  const boxes = [] // is this correct, to put the boxes in an array?
  console.log(gameContainer);
  gameboard.map((i) => {
    const box = document.createElement("div");
    box.classList.add("boxes");
    box.dataset.index = i;
    boxes.push(box) // add the box to the array
    // box.addEventListener("click", (e) => game(e));
    gameContainer.append(box);
  });
  const status = document.querySelector(".status");
// })();

// // module to run the game (create player)
// (() => {
  const player1 = newPlayer("player1", "x");
  const player2 = newPlayer("player2", "o");
  console.log(player1, player2);
  let currentPlayer = player1;
  // const gameContainer = document.querySelector(".container");
  // const box = document.getElementsByClassName(".boxes")
  gameContainer.addEventListener("click", (e) => {
    if (!gameWinner && boxes.every(box => box.textContent !== "")) {// not working
      status.textContent = "It's a tie game";
      gameOver()
    }
    else if (!gameWinner && e.target.classList.contains("boxes") && e.target.textContent === "") {
    e.target.innerHTML = currentPlayer.key;
    checkWinner(currentPlayer, boxes)
    changePlayer()
    }
  });

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

  function checkWinner(player, boxes) {
  let foundWinner = false;
  winningCombos.forEach((combo) => {
    let comboIsWinner = true;
    if (foundWinner === true) {
      return;
    }
    for (let i = 0; i < combo.length; i++) {
      const index = combo[i];
      if (boxes[index].textContent !== player.key) {
        comboIsWinner = false;
        break;
      }
    }
    if (comboIsWinner) {
      foundWinner = true;
      combo.forEach((index) => {
       boxes[index].classList.add("winner");
      });
    }
  });
  if (foundWinner === true) {
    gameWinner = player;
    status.textContent = `${player.name} is winner`;
    gameOver();
  }
}

function gameOver() {
  resetBtn.classList.toggle("hidden");
}

function changePlayer() {
    if (currentPlayer.key == "x") {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    } 
  }

  // check score


  // 4. reset
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("winner")
  }) 
  gameWinner = null
  status.textContent = "Let's Play"
  resetBtn.classList.add("hidden")
});
})();




// function game(e) {
//   console.log(e);
//   const playerChoice = spaceElements.find((obj) => obj.element === e.target);
//   if (currentPlayer === "x") {
//     playerChoice.content = "x";
//     playerChoice.element.innerHTML = "x";
//   }
//   if (checkWinner("x") || checkWinner("o")) {
//     gameOver();
//   } else if (currentPlayer === "x") {
//     currentPlayer = "o";
//     getComputerChoice();
//     checkWinner("o");
//     currentPlayer = "x";
//   }
// }
