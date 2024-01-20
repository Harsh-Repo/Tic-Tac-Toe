import { playSoundEffect, Firecracker } from "./effects.js";
import { endGame } from "./uiInteractions.js";

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let scoreX = 0;
let scoreO = 0;
let draw = 0;

const canvas = document.getElementById("crackerCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//let particles = [];

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusArea.innerHTML = `Player ${currentPlayer}'s turn`;
}

function highlightWinningCells(winningConditions) {
  winningConditions.forEach((index) => {
    const winningCell = document.querySelector(
      `.cell[data-cell-index="${index}"]`
    );
    winningCell.classList.add("winning-cell");
  });
}

function showCrackers() {
  canvas.style.display = "block";
  for (let i = 0; i < 15; i++) {
    // Number of firecrackers
    let x = Math.random() * canvas.width;
    let y = canvas.height;
    let color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    firecrackers.push(new Firecracker(x, y, color));
  }
  playSoundEffect();
  animate();
  setTimeout(() => {
    canvas.style.display = "none";
  }, 5000); // Duration of the animation
}

let firecrackers = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  firecrackers = firecrackers.filter(
    (f) => !f.exploded || f.particles.length > 0
  );
  firecrackers.forEach((firecracker) => {
    firecracker.update();
    firecracker.draw();
  });
  requestAnimationFrame(animate);
}

function checkForWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      highlightWinningCells(winCondition); // Pass the indices of the winning cells
      break;
    }
  }

  if (roundWon) {
    statusArea.innerHTML = `Player ${currentPlayer} wins!`;
    gameActive = false;
    playerWon(currentPlayer); // Pass the current player as the winner
    showCrackers();
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusArea.innerHTML = "Game ended in a draw!";
    gameActive = false;
    playerWon("Draw");
    return;
  }
}

function updateScore(winner) {
  if (winner === "X") {
    scoreX++;
    document.getElementById("scoreX").textContent = scoreX;
  } else if (winner === "O") {
    scoreO++;
    document.getElementById("scoreO").textContent = scoreO;
  } else {
    // This else block will execute in case of a draw
    draw++;
    document.getElementById("scoreDraw").textContent = draw;
  }
}

function resetGame() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winning-cell"); // Remove the winning highlight
    // Reset other styles if necessary
  });
  // Reset the game state
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""]; // Adjust based on your game state representation
  gameActive = true; // Reset the gameActive flag

  // If you have a status display, reset its text as well
  document.querySelector(".status").textContent = "Player X's turn";

  // Re-enable clicks on cells
  enableGameBoard();
}

function startNewGame() {
  // Reset scores
  scoreX = 0;
  scoreO = 0;
  draw = 0;
  document.getElementById("scoreX").textContent = scoreX;
  document.getElementById("scoreO").textContent = scoreO;
  document.getElementById("scoreDraw").textContent = draw; // If tracking draw

  // Hide the summary and show the game board and score sheet
  document.getElementById("summaryContainer").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";
  document.getElementById("scoreSheetContainer").style.display = "block";
  // Show the "End Game" button again
  document.getElementById("endGameButton").style.display = "block";

  // Reset and enable the game board for a new game
  resetGame();
  enableGameBoard();
}

function enableGameBoard(handleCellClickCallback) {
  // Logic to re-enable the game board if it was previously disabled
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", handleCellClickCallback);
    cell.style.pointerEvents = "auto"; // Re-enables click events
  });
}

function disableGameBoard(handleCellClickCallback) {
  // Logic to disable the game board
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.removeEventListener("click", handleCellClickCallback);
    cell.style.pointerEvents = "none"; // Disables click events
  });
}

function playerWon(player) {
  if (player !== "Draw") {
    updateScore(player);
    showCrackers(); // Start the firecracker animation

    // Set a timeout to ask to continue after the animation ends
    setTimeout(() => {
      endOfRound(player);
    }, 3000);
  } else {
    updateScore(player);
    endOfRound(player);
  }
  // Assuming the firecracker animation lasts for 8000 milliseconds (8 seconds)
}

function endOfRound(outcome) {
  setTimeout(() => {
    if (outcome !== "Draw") {
      // Ask to continue only if there was a winner
      if (
        confirm(
          "Player " + outcome + " wins! Do you want to play another round?"
        )
      ) {
        resetGame();
      } else {
        endGame();
      }
    } else {
      // For a draw, update the UI accordingly without asking to continue
      if (confirm("It's a draw. Do you want to play another round?")) {
        resetGame();
      } else {
        endGame();
      }
    }
  }, 100);
}

export {
  startNewGame,
  currentPlayer,
  gameActive,
  gameState,
  winningConditions,
  scoreO,
  scoreX,
  draw,
  canvas,
  ctx,
  handleCellPlayed,
  handlePlayerChange,
  highlightWinningCells,
  checkForWinner,
  updateScore,
  resetGame,
  enableGameBoard,
  disableGameBoard,
  playerWon,
  endOfRound,
  showCrackers,
  animate,
};
