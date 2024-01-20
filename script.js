// const cells = document.querySelectorAll(".cell");
// const statusArea = document.getElementById("statusArea");
// const restartButton = document.getElementById("restartButton");
// let currentPlayer = "X";
// let gameActive = true;
// let gameState = ["", "", "", "", "", "", "", "", ""];

// const canvas = document.getElementById("crackerCanvas");
// const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// let particles = [];

// let scoreX = 0;
// let scoreO = 0;
// let draw = 0;

// const winningConditions = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// function handleCellPlayed(clickedCell, clickedCellIndex) {
//   gameState[clickedCellIndex] = currentPlayer;
//   clickedCell.innerHTML = currentPlayer;
// }

// function handlePlayerChange() {
//   currentPlayer = currentPlayer === "X" ? "O" : "X";
//   statusArea.innerHTML = `Player ${currentPlayer}'s turn`;
// }

// // Sound effect setup
// let audioContext;
// if (window.AudioContext || window.webkitAudioContext) {
//   audioContext = new (window.AudioContext || window.webkitAudioContext)();
// }

// let fireworkSound = document.getElementById("fireworkSound");
// function playSoundEffect() {
//   fireworkSound
//     .play()
//     .catch((error) => console.error("Error playing the sound:", error));

//   // if (!audioContext) {
//   //     return;
//   // }

//   // fetch('"D:\desk-coding\JS\Tic-Tac-Toe\firework-2-100072.mp3"')
//   //     .then(response => response.arrayBuffer())
//   //     .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
//   //     .then(audioBuffer => {
//   //         const soundSource = audioContext.createBufferSource();
//   //         soundSource.buffer = audioBuffer;
//   //         soundSource.connect(audioContext.destination);
//   //         soundSource.start();
//   //     }).catch(error => console.error('Error with fetching or playing audio:', error));
// }

// class Firecracker {
//   constructor(x, y, color) {
//     this.x = x;
//     this.y = y;
//     this.color = color;
//     this.particles = [];
//     this.exploded = false;
//   }

//   explode() {
//     for (let i = 0; i < 100; i++) {
//       let speed = Math.random() * 3 + 1;
//       let angle = Math.random() * Math.PI * 2;
//       let size = Math.random() * 3 + 1;
//       this.particles.push(
//         new Particle(this.x, this.y, speed, angle, size, this.color)
//       );
//     }
//     this.exploded = true;
//   }

//   update() {
//     if (!this.exploded) {
//       this.y -= 3; // speed of the firecracker going up
//       if (this.y < canvas.height / 2) this.explode();
//     }
//     this.particles = this.particles.filter((p) => !p.markedForDeletion);
//     this.particles.forEach((p) => p.update());
//   }

//   draw() {
//     if (!this.exploded) {
//       ctx.fillStyle = this.color;
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
//       ctx.fill();
//     }
//     this.particles.forEach((p) => p.draw());
//   }
// }

// class Particle {
//   constructor(x, y, speed, angle, size, color) {
//     this.x = x;
//     this.y = y;
//     this.speed = speed;
//     this.angle = angle;
//     this.size = size;
//     this.color = color;
//     this.markedForDeletion = false;
//   }

//   update() {
//     this.speed *= 0.99; // friction
//     this.size *= 0.99; // shrink size
//     this.x += Math.cos(this.angle) * this.speed;
//     this.y += Math.sin(this.angle) * this.speed + 0.05; // gravity effect
//     if (this.size < 0.5) this.markedForDeletion = true;
//   }

//   draw() {
//     ctx.fillStyle = this.color;
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//     ctx.fill();
//   }
// }

// let firecrackers = [];

// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   firecrackers = firecrackers.filter(
//     (f) => !f.exploded || f.particles.length > 0
//   );
//   firecrackers.forEach((firecracker) => {
//     firecracker.update();
//     firecracker.draw();
//   });
//   requestAnimationFrame(animate);
// }

// function showCrackers() {
//   canvas.style.display = "block";
//   for (let i = 0; i < 15; i++) {
//     // Number of firecrackers
//     let x = Math.random() * canvas.width;
//     let y = canvas.height;
//     let color = `hsl(${Math.random() * 360}, 50%, 50%)`;
//     firecrackers.push(new Firecracker(x, y, color));
//   }
//   playSoundEffect();
//   animate();
//   setTimeout(() => {
//     canvas.style.display = "none";
//   }, 5000); // Duration of the animation
// }

// function checkForWinner() {
//   let roundWon = false;

//   for (let i = 0; i < winningConditions.length; i++) {
//     const winCondition = winningConditions[i];
//     let a = gameState[winCondition[0]];
//     let b = gameState[winCondition[1]];
//     let c = gameState[winCondition[2]];
//     if (a === "" || b === "" || c === "") {
//       continue;
//     }
//     if (a === b && b === c) {
//       roundWon = true;
//       highlightWinningCells(winCondition); // Pass the indices of the winning cells
//       break;
//     }
//   }

//   if (roundWon) {
//     statusArea.innerHTML = `Player ${currentPlayer} wins!`;
//     gameActive = false;
//     playerWon(currentPlayer); // Pass the current player as the winner
//     showCrackers();
//     return;
//   }

//   let roundDraw = !gameState.includes("");
//   if (roundDraw) {
//     statusArea.innerHTML = "Game ended in a draw!";
//     gameActive = false;
//     playerWon("Draw");
//     return;
//   }

//   handlePlayerChange();
// }

// function handleCellClick(clickedCellEvent) {
//   const clickedCell = clickedCellEvent.target;
//   const clickedCellIndex = parseInt(
//     clickedCell.getAttribute("data-cell-index")
//   );

//   if (gameState[clickedCellIndex] !== "" || !gameActive) {
//     return;
//   }

//   handleCellPlayed(clickedCell, clickedCellIndex);
//   const winner = checkForWinner();

//   if (winner) {
//     gameActive = false;
//     // handle the win (update UI, show messages, etc.)
//   }
// }

// function restartGame() {
//   gameActive = true;
//   currentPlayer = "X";
//   gameState = ["", "", "", "", "", "", "", "", ""];
//   statusArea.innerHTML = `Player X's turn`;
//   cells.forEach((cell) => (cell.innerHTML = ""));
// }

// // Example function that gets called when a player wins
// function playerWon(player) {
//   if (player !== "Draw") {
//     updateScore(player);
//     showCrackers(); // Start the firecracker animation

//     // Set a timeout to ask to continue after the animation ends
//     setTimeout(() => {
//       endOfRound(player);
//     }, 3000);
//   } else {
//     updateScore(player);
//     endOfRound(player);
//   }
//   // Assuming the firecracker animation lasts for 8000 milliseconds (8 seconds)
// }
// function highlightWinningCells(winningCombination) {
//   winningCombination.forEach((index) => {
//     const winningCell = document.querySelector(
//       `.cell[data-cell-index="${index}"]`
//     );
//     winningCell.classList.add("winning-cell");
//   });
// }

// function endOfRound(outcome) {
//   setTimeout(() => {
//     if (outcome !== "Draw") {
//       // Ask to continue only if there was a winner
//       if (
//         confirm(
//           "Player " + outcome + " wins! Do you want to play another round?"
//         )
//       ) {
//         resetGame();
//       } else {
//         endGame();
//       }
//     } else {
//       // For a draw, update the UI accordingly without asking to continue
//       if (confirm("It's a draw. Do you want to play another round?")) {
//         resetGame();
//       } else {
//         endGame();
//       }
//     }
//   }, 100);
// }
// function updateScore(winner) {
//   if (winner === "X") {
//     scoreX++;
//     document.getElementById("scoreX").textContent = scoreX;
//   } else if (winner === "O") {
//     scoreO++;
//     document.getElementById("scoreO").textContent = scoreO;
//   } else {
//     // This else block will execute in case of a draw
//     draw++;
//     document.getElementById("scoreDraw").textContent = draw;
//   }
// }

// function endGame() {
//   document.getElementById("endGameButton").style.display = "none";
//   document.getElementById("summaryContainer").style.display = "block";
//   document.getElementById("finalScoreX").textContent = scoreX;
//   document.getElementById("finalScoreO").textContent = scoreO;
//   document.getElementById("finalScoreDraw").textContent = draw;
//   // Hide game board and disable it
//   document.getElementById("gameContainer").style.display = "none";
//   disableGameBoard();
// }

// function displaySummary() {
//   // Show the summary container with final scores
//   document.getElementById("summaryContainer").style.display = "block";
//   document.getElementById("finalScoreX").textContent = scoreX;
//   document.getElementById("finalScoreDraw").textContent = draw;

//   // Optionally hide the game board and score sheet
//   document.getElementById("gameContainer").style.display = "none";
//   document.getElementById("scoreSheetContainer").style.display = "none";

//   //document.getElementById('endGameButton').addEventListener('click', endGame);
// }

// function disableGameBoard() {
//   // Logic to disable the game board
//   document.querySelectorAll(".cell").forEach((cell) => {
//     cell.removeEventListener("click", handleCellClick);
//     cell.style.pointerEvents = "none"; // Disables click events
//   });
// }

// function startNewGame() {
//   // Reset scores
//   scoreX = 0;
//   scoreO = 0;
//   draw = 0;
//   document.getElementById("scoreX").textContent = scoreX;
//   document.getElementById("scoreO").textContent = scoreO;
//   document.getElementById("scoreDraw").textContent = draw; // If tracking draw

//   // Hide the summary and show the game board and score sheet
//   document.getElementById("summaryContainer").style.display = "none";
//   document.getElementById("gameContainer").style.display = "block";
//   document.getElementById("scoreSheetContainer").style.display = "block";
//   // Show the "End Game" button again
//   document.getElementById("endGameButton").style.display = "block";

//   // Reset and enable the game board for a new game
//   resetGame();
//   enableGameBoard();
// }
// document.getElementById("endGameButton").addEventListener("click", endGame);

// function resetGame() {
//   document.querySelectorAll(".cell").forEach((cell) => {
//     cell.textContent = "";
//     cell.classList.remove("winning-cell"); // Remove the winning highlight
//     // Reset other styles if necessary
//   });
//   // Reset the game state
//   gameState = ["", "", "", "", "", "", "", "", ""]; // Adjust based on your game state representation
//   gameActive = true; // Reset the gameActive flag

//   // If you have a status display, reset its text as well
//   document.querySelector(".status").textContent = "Player X's turn";

//   // Re-enable clicks on cells
//   enableGameBoard();
// }

// function enableGameBoard() {
//   // Logic to re-enable the game board if it was previously disabled
//   document.querySelectorAll(".cell").forEach((cell) => {
//     cell.addEventListener("click", handleCellClick);
//     cell.style.pointerEvents = "auto"; // Re-enables click events
//   });
// }

// enableGameBoard();

// cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
// restartButton.addEventListener("click", restartGame);
