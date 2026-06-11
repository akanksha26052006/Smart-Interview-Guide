// === THEME TOGGLE ===
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  toggleBtn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// === USER PROGRESS ===
let xp = parseInt(localStorage.getItem("xp") || 0);
let level = parseInt(localStorage.getItem("level") || 1);
const xpDisplay = document.getElementById("xp");
const levelDisplay = document.getElementById("level");
const xpFill = document.getElementById("xpFill");
const gainXpBtn = document.getElementById("gainXpBtn");

function updateProgress() {
  xpDisplay.textContent = xp % 100;
  levelDisplay.textContent = level;
  xpFill.style.width = `${(xp % 100)}%`;
  localStorage.setItem("xp", xp);
  localStorage.setItem("level", level);
  updateBadges();
  updateLeaderboard();
}

gainXpBtn.addEventListener("click", () => {
  const gained = Math.floor(Math.random() * 30) + 10; // Random 10–40 XP
  xp += gained;
  if (xp >= level * 100) {
    level++;
    alert(`🎉 Level Up! You’re now Level ${level}`);
  }
  updateProgress();
});

// === BADGES ===
const badgeList = document.getElementById("badgeList");
function updateBadges() {
  const badges = [];
  if (xp >= 50) badges.push("🔥 7-Day Streak");
  if (xp >= 200) badges.push("🎯 50 Quizzes Completed");
  if (xp >= 400) badges.push("🚀 System Design Master");
  if (level >= 5) badges.push("💎 Interview Guru");
  if (level >= 10) badges.push("🏆 Elite Achiever");

  badgeList.innerHTML = badges.length
    ? badges.map(b => `<div class="badge">${b}</div>`).join("")
    : "<p>No badges yet — gain XP to unlock!</p>";
}

// === LEADERBOARD ===
const leaderboardTable = document.getElementById("leaderboard").querySelector("tbody");
const resetLeaderboard = document.getElementById("resetLeaderboard");

function updateLeaderboard() {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  const username = "You"; // placeholder, can later be dynamic
  const existing = leaderboard.find(u => u.name === username);

  if (existing) {
    existing.level = level;
    existing.xp = xp;
  } else {
    leaderboard.push({ name: username, level, xp });
  }

  leaderboard.sort((a, b) => b.level - a.level || b.xp - a.xp);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

  leaderboardTable.innerHTML = leaderboard
    .map((user, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${user.name}</td>
        <td>${user.level}</td>
        <td>${user.xp}</td>
      </tr>
    `).join("");
}

resetLeaderboard.addEventListener("click", () => {
  if (confirm("Reset leaderboard data?")) {
    localStorage.removeItem("leaderboard");
    updateLeaderboard();
  }
});

// === INITIALIZE ===
updateProgress();
updateLeaderboard();
