import { draw, disableGameBoard } from "./gameLogic.js";

const cells = document.querySelectorAll(".cell");
const statusArea = document.getElementById("statusArea");
const restartButton = document.getElementById("restartButton");

function endGame() {
  document.getElementById("endGameButton").style.display = "none";
  document.getElementById("summaryContainer").style.display = "block";
  document.getElementById("finalScoreX").textContent = scoreX;
  document.getElementById("finalScoreO").textContent = scoreO;
  document.getElementById("finalScoreDraw").textContent = draw;
  // Hide game board and disable it
  document.getElementById("gameContainer").style.display = "none";
  disableGameBoard();
}

function displaySummary() {
  // Show the summary container with final scores
  document.getElementById("summaryContainer").style.display = "block";
  document.getElementById("finalScoreX").textContent = scoreX;
  document.getElementById("finalScoreDraw").textContent = draw;

  // Optionally hide the game board and score sheet
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("scoreSheetContainer").style.display = "none";

  //document.getElementById('endGameButton').addEventListener('click', endGame);
}

export { cells, statusArea, restartButton, endGame, displaySummary };