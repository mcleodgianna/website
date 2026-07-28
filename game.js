const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
let player, blocks, score, gameOver;

function init() {
  player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 40,
    width: 40,
    height: 20,
    speed: 6
  };
  blocks = [];
  score = 0;
  gameOver = false;
}

function spawnBlock() {
  blocks.push({
    x: Math.random() * (canvas.width - 30),
    y: -20,
    width: 30,
    height: 30,
    speed: 2 + Math.random() * 2
  });
}

function update() {
  if (gameOver) return;
  blocks.forEach(block => {
    block.y += block.speed;
    if (
      block.x < player.x + player.width &&
      block.x + block.width > player.x &&
      block.y < player.y + player.height &&
      block.y + block.height > player.y
    ) {
      gameOver = true;
    }
  });
  blocks = blocks.filter(block => block.y < canvas.height);
  score++;
  scoreEl.textContent = "Score: " + score;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#6FA8D6"; // sky-deep
  ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.fillStyle = "#E896B4"; // blush-deep
  blocks.forEach(block => {
    ctx.fillRect(block.x, block.y, block.width, block.height);
  });
  if (gameOver) {
    ctx.fillStyle = "#4A4458";
    ctx.font = "24px Fredoka";
    ctx.textAlign = "center";
    ctx.fillText("Game Over 💀", canvas.width / 2, canvas.height / 2);
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (gameOver) return;
  if (e.key === "ArrowLeft") {
    player.x -= player.speed;
  } else if (e.key === "ArrowRight") {
    player.x += player.speed;
  }
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
});

setInterval(() => {
  if (!gameOver) spawnBlock();
}, 700);

restartBtn.addEventListener("click", () => {
  init();
});

init();
gameLoop();
