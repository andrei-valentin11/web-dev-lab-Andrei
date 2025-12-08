// ====== VARIABLES ======
let currentLevel = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
let username = '';
let role = '';

const levels = [
  {
    name: "Table Assembly",
    parts: [
      { id: "table_top", src: "assets/parts/table_top.png", correctX: 100, correctY: 50 },
      { id: "table_leg1", src: "assets/parts/table_leg.png", correctX: 50, correctY: 300 },
      { id: "table_leg2", src: "assets/parts/table_leg.png", correctX: 300, correctY: 300 },
      { id: "table_leg3", src: "assets/parts/table_leg.png", correctX: 50, correctY: 100 },
      { id: "table_leg4", src: "assets/parts/table_leg.png", correctX: 300, correctY: 100 },
    ],
    badge: "assets/badges/badge1.png"
  },
  {
    name: "Chair Assembly",
    parts: [
      { id: "chair_seat", src: "assets/parts/chair_seat.png", correctX: 120, correctY: 150 },
      { id: "chair_leg1", src: "assets/parts/chair_leg.png", correctX: 50, correctY: 300 },
      { id: "chair_leg2", src: "assets/parts/chair_leg.png", correctX: 250, correctY: 300 },
      { id: "chair_leg3", src: "assets/parts/chair_leg.png", correctX: 50, correctY: 50 },
      { id: "chair_leg4", src: "assets/parts/chair_leg.png", correctX: 250, correctY: 50 },
    ],
    badge: "assets/badges/badge2.png"
  }
];

// ====== LOGIN ======
document.getElementById("loginBtn").addEventListener("click", () => {
  username = document.getElementById("username").value || "Player";
  role = document.getElementById("role").value;

  document.getElementById("login-screen").classList.add("hidden");

  if (role === "student") {
    document.getElementById("game-screen").classList.remove("hidden");
    document.getElementById("player-name").textContent = username;
    startLevel(currentLevel);
  } else {
    document.getElementById("teacher-screen").classList.remove("hidden");
    showProgress();
  }
});

// ====== START LEVEL ======
function startLevel(levelIndex) {
  const level = levels[levelIndex];
  score = 0;
  timeLeft = 60;
  document.getElementById("score").textContent = score;
  document.getElementById("timer").textContent = timeLeft;
  document.getElementById("badge-area").innerHTML = '';
  document.getElementById("next-level").classList.add("hidden");

  const furnitureArea = document.getElementById("furniture-area");
  const partsArea = document.getElementById("parts-area");
  furnitureArea.innerHTML = '';
  partsArea.innerHTML = '';

  // Add draggable parts
  level.parts.forEach(part => {
    const img = document.createElement("img");
    img.src = part.src;
    img.id = part.id;
    img.classList.add("draggable");
    img.draggable = true;
    partsArea.appendChild(img);
  });

  setupDragDrop(level.parts);
  startTimer(levelIndex);
}

// ====== DRAG & DROP ======
function setupDragDrop(parts) {
  const furnitureArea = document.getElementById("furniture-area");
  const draggableParts = document.querySelectorAll('.draggable');
  let draggedPart = null;

  draggableParts.forEach(part => {
    part.addEventListener('dragstart', e => draggedPart = e.target);
  });

  furnitureArea.addEventListener('dragover', e => e.preventDefault());
  furnitureArea.addEventListener('drop', e => {
    const rect = furnitureArea.getBoundingClientRect();
    const x = e.clientX - rect.left - draggedPart.width / 2;
    const y = e.clientY - rect.top - draggedPart.height / 2;

    draggedPart.style.position = 'absolute';
    draggedPart.style.left = `${x}px`;
    draggedPart.style.top = `${y}px`;
    furnitureArea.appendChild(draggedPart);

    checkPlacement(draggedPart, x, y, parts);
  });
}

// ====== CHECK PLACEMENT ======
function checkPlacement(part, x, y, parts) {
  const correct = parts.find(p => p.id === part.id);
  const tolerance = 30;

  if (Math.abs(x - correct.correctX) < tolerance && Math.abs(y - correct.correctY) < tolerance) {
    score += 10;
    document.getElementById("score").textContent = score;
    part.draggable = false;
    part.style.border = '2px solid green';
    playSound("assets/sounds/correct.mp3");

    // Check if all parts placed
    if ([...document.querySelectorAll('.draggable')].every(p => !p.draggable)) {
      completeLevel();
    }
  }
}

// ====== TIMER ======
function startTimer(levelIndex) {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert('Time is up! Your score: ' + score);
    }
  }, 1000);
}

// ====== LEVEL COMPLETION ======
function completeLevel() {
  clearInterval(timerInterval);
  alert("Project Complete! Score: " + score);
  showBadge(currentLevel);
  saveProgress(username, currentLevel, score);

  if (currentLevel < levels.length - 1) {
    document.getElementById("next-level").classList.remove("hidden");
    document.getElementById("next-level").addEventListener("click", () => {
      currentLevel++;
      startLevel(currentLevel);
    });
  }
}

// ====== BADGES ======
function showBadge(levelIndex) {
  const badgeImg = document.createElement("img");
  badgeImg.src = levels[levelIndex].badge;
  document.getElementById("badge-area").appendChild(badgeImg);
  playSound("assets/sounds/levelup.mp3");
}

// ====== TEACHER DASHBOARD ======
function saveProgress(username, levelIndex, score) {
  let data = JSON.parse(localStorage.getItem("studentProgress") || "[]");
  data.push({ username, level: levels[levelIndex].name, score });
  localStorage.setItem("studentProgress", JSON.stringify(data));
}

function showProgress() {
  const progressList = document.getElementById("student-progress");
  const data = JSON.parse(localStorage.getItem("studentProgress") || "[]");
  progressList.innerHTML = '';
  data.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.username}: ${entry.level} - Score: ${entry.score}`;
    progressList.appendChild(li);
  });
}

// ====== SOUNDS ======
function playSound(src) {
  const audio = new Audio(src);
  audio.play();
}
