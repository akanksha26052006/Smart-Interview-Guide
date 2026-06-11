// --- Dynamic Quote Rotation ---
const quotes = [
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById("quote").innerHTML = `
  <blockquote>“${randomQuote.text}”<br><span>– ${randomQuote.author}</span></blockquote>
`;

// --- Local Storage Progress Data ---
let progressData = JSON.parse(localStorage.getItem("progressData")) || {
  topicsCompleted: 12,
  streak: 7,
  accuracy: 85,
  skills: { ds: 85, algo: 70, sd: 50, dbms: 65 },
};

// --- Update UI ---
function updateUI() {
  document.getElementById("topics-completed").textContent = `${progressData.topicsCompleted} / 20`;
  document.getElementById("weekly-streak").textContent = `${progressData.streak} Days`;
  document.getElementById("accuracy").textContent = `${progressData.accuracy}%`;

  document.getElementById("ds-fill").style.width = `${progressData.skills.ds}%`;
  document.getElementById("algo-fill").style.width = `${progressData.skills.algo}%`;
  document.getElementById("sd-fill").style.width = `${progressData.skills.sd}%`;
  document.getElementById("dbms-fill").style.width = `${progressData.skills.dbms}%`;
}

updateUI();

// --- Update Button Logic ---
document.getElementById("update-btn").addEventListener("click", () => {
  progressData.topicsCompleted = Math.min(progressData.topicsCompleted + 1, 20);
  progressData.streak += 1;
  progressData.accuracy = Math.min(progressData.accuracy + Math.floor(Math.random() * 3), 100);

  Object.keys(progressData.skills).forEach(skill => {
    progressData.skills[skill] = Math.min(progressData.skills[skill] + Math.floor(Math.random() * 5), 100);
  });

  localStorage.setItem("progressData", JSON.stringify(progressData));
  updateUI();
  renderCharts();
});

// --- Chart.js ---
function renderCharts() {
  if (window.skillChartInstance) window.skillChartInstance.destroy();
  if (window.trendChartInstance) window.trendChartInstance.destroy();

  const skillCtx = document.getElementById("skillChart");
  window.skillChartInstance = new Chart(skillCtx, {
    type: "doughnut",
    data: {
      labels: ["Data Structures", "Algorithms", "System Design", "DBMS"],
      datasets: [{
        data: Object.values(progressData.skills),
        backgroundColor: ["#0077ff", "#00c6ff", "#f5a623", "#f76c6c"],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      cutout: "70%",
      plugins: { legend: { position: "bottom" } }
    }
  });

  const trendCtx = document.getElementById("trendChart");
  window.trendChartInstance = new Chart(trendCtx, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Practice Hours",
          data: [2, 3, 4, 2.5, 5, 4.5, 3],
          backgroundColor: "#0077ff80",
          borderRadius: 5
        },
        {
          label: "Accuracy (%)",
          data: [75, 78, 80, 83, 85, 87, progressData.accuracy],
          type: "line",
          borderColor: "#00b894",
          borderWidth: 2,
          fill: false,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { position: "bottom" } }
    }
  });
}

renderCharts();

// --- Theme Toggle ---
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");

// Load saved theme
let savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀️ Light Mode";
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});
