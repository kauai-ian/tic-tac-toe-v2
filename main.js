function newPlayer(_name, _key) {
  const name = _name;
  const key = _key;
  let score = 0;
  function incremenetScore() {
    score++;
  }
  return { name, key, score, incremenetScore };
}

(() => {
  const gameContainer = document.querySelector(".container");
  const gameboard = [...Array(9).keys()];
  const boxes = [];
  console.log(gameContainer);
  gameboard.map((i) => {
    const box = document.createElement("div");
    box.classList.add("boxes");
    box.dataset.index = i;
    boxes.push(box); 
    gameContainer.append(box);
  });
  const status = document.querySelector(".status");
  const player1 = newPlayer("player1", "x");
  const player2 = newPlayer("player2", "o");
  console.log(player1, player2);
  let currentPlayer = player1;

  gameContainer.addEventListener("click", (e) => {
    if (
      !gameWinner &&
      e.target.classList.contains("boxes") &&
      e.target.textContent === ""
    ) {
      e.target.innerHTML = currentPlayer.key;
      checkWinner(currentPlayer, boxes);
    }
    const isTie = checkTie();
    if (isTie) {
      return gameOver();
    }
    // if no game winner and no tie then change player
    changePlayer();
    getComputerChoice();
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

  function checkTie() {
    if (!gameWinner && boxes.every((box) => box.textContent !== "")) {
      status.textContent = "It's a tie game";
      return true;
    }
    return false;
  }

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

  function getComputerChoice() {
    const emptyBoxes = boxes.filter((box) => box.textContent === "");
    if (emptyBoxes.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
      const computerChoice = emptyBoxes[randomIndex];
      computerChoice.innerHTML = player2.key;
      checkWinner(player2, boxes);
      changePlayer();
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

  const resetBtn = document.getElementById("resetBtn");
  resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
      box.textContent = "";
      box.classList.remove("winner");
    });
    gameWinner = null;
    status.textContent = "Let's Play";
    resetBtn.classList.add("hidden");
    currentPlayer = player1;
  });
})();
