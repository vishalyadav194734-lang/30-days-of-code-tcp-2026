const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);

function handleClick() {
  const index = this.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;
  this.classList.add(currentPlayer);

  checkWinner();
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      gameActive = false;
      statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;

      pattern.forEach(i => {
        cells[i].classList.add("win");
      });

      return;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "🤝 Match Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer} Turn`;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X Turn";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.className = "cell";
  });
}
