export { playSoundEffect, Firecracker, Particle };

import { canvas, ctx } from "./gameLogic.js";
// Sound effect setup
let audioContext;
if (window.AudioContext || window.webkitAudioContext) {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

let fireworkSound = document.getElementById("fireworkSound");
function playSoundEffect() {
  fireworkSound
    .play()
    .catch((error) => console.error("Error playing the sound:", error));
}

class Firecracker {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.particles = [];
    this.exploded = false;
  }

  explode() {
    for (let i = 0; i < 100; i++) {
      let speed = Math.random() * 3 + 1;
      let angle = Math.random() * Math.PI * 2;
      let size = Math.random() * 3 + 1;
      this.particles.push(
        new Particle(this.x, this.y, speed, angle, size, this.color)
      );
    }
    this.exploded = true;
  }

  update() {
    if (!this.exploded) {
      this.y -= 3; // speed of the firecracker going up
      if (this.y < canvas.height / 2) this.explode();
    }
    this.particles = this.particles.filter((p) => !p.markedForDeletion);
    this.particles.forEach((p) => p.update());
  }

  draw() {
    if (!this.exploded) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    this.particles.forEach((p) => p.draw());
  }
}

class Particle {
  constructor(x, y, speed, angle, size, color) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.size = size;
    this.color = color;
    this.markedForDeletion = false;
  }

  update() {
    this.speed *= 0.99; // friction
    this.size *= 0.99; // shrink size
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + 0.05; // gravity effect
    if (this.size < 0.5) this.markedForDeletion = true;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
