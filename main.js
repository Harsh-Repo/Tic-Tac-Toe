// main.js
import {
  startNewGame,
  gameState,
  gameActive,
  handleCellPlayed,
  handlePlayerChange,
  checkForWinner,
  resetGame,
  enableGameBoard,
  showCrackers,
} from "./gameLogic.js";

import { cells, statusArea, restartButton, endGame } from "./uiInteractions.js";

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  const winner = checkForWinner();

  if (winner) {
    gameActive = false;
    if (winner !== "Draw") {
      showCrackers();
    }
  } else {
    handlePlayerChange();
  }
}

function restartGame() {
  resetGame();
  cells.forEach((cell) => (cell.innerHTML = ""));
  statusArea.innerHTML = `Player X's turn`;
}

// Event listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
document.getElementById("endGameButton").addEventListener("click", endGame);
window.startNewGame = startNewGame;
// Initialize the game
enableGameBoard(handleCellClick);
