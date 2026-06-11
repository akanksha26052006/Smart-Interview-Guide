// === THEME TOGGLE ===
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  toggleBtn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// === QUOTE ROTATION ===
const quotes = [
  "🚀 “Believe in yourself — you are halfway there!”",
  "💡 “Every interview is a new opportunity to grow.”",
  "🔥 “Failing to prepare is preparing to fail.”",
  "✨ “Confidence comes from consistent practice.”",
  "🏆 “Do something today your future self will thank you for.”"
];
const quoteBar = document.getElementById("quoteBar");
setInterval(() => {
  quoteBar.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}, 7000);

// === VOICE INTERVIEW ===
const voiceBtn = document.getElementById("voiceBtn");
const voiceModal = document.getElementById("voiceModal");
const endInterview = document.getElementById("endInterview");
const nextQuestion = document.getElementById("nextQuestion");
const questionText = document.getElementById("questionText");
const timerDisplay = document.getElementById("timerDisplay");
const answerInput = document.getElementById("answerInput");
const companySelect = document.getElementById("companySelect");
const difficultySelect = document.getElementById("difficultySelect");

let timer, timeLeft = 30, questionIndex = 0;
const synth = window.speechSynthesis;
let answers = [];

const questions = [
  "Tell me about yourself.",
  "What are your strengths and weaknesses?",
  "Describe a project you are proud of.",
  "How do you handle pressure or tight deadlines?",
  "Why should we hire you?",
  "Describe a time you worked in a team.",
  "Where do you see yourself in five years?"
];

// Speak question aloud
function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1;
  utter.voice = synth.getVoices().find(v => v.lang.startsWith('en'));
  synth.speak(utter);
}

// Timer countdown
function startTimer() {
  timeLeft = 30;
  timerDisplay.textContent = "00:30";
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `00:${timeLeft < 10 ? "0" + timeLeft : timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion.click();
    }
  }, 1000);
}

function askQuestion() {
  const q = questions[questionIndex];
  questionText.textContent = q;
  speak(q);
  answerInput.value = "";
  startTimer();
}

// Start interview
voiceBtn.addEventListener("click", () => {
  voiceModal.style.display = "flex";
  questionIndex = 0;
  answers = [];
  askQuestion();
});

nextQuestion.addEventListener("click", () => {
  answers.push({ q: questions[questionIndex], a: answerInput.value || "No answer" });
  questionIndex++;
  if (questionIndex < questions.length) askQuestion();
  else endInterview.click();
});

endInterview.addEventListener("click", () => {
  clearInterval(timer);
  synth.cancel();
  voiceModal.style.display = "none";
  saveInterview();
});

// === SAVE & REVIEW HISTORY ===
function saveInterview() {
  const record = {
    company: companySelect.value || "General",
    difficulty: difficultySelect.value || "Medium",
    date: new Date().toLocaleString(),
    answers
  };
  const history = JSON.parse(localStorage.getItem("interviewHistory") || "[]");
  history.push(record);
  localStorage.setItem("interviewHistory", JSON.stringify(history));
  alert("✅ Interview saved! Check 'Review Past Interviews'.");
}

const reviewBtn = document.getElementById("reviewBtn");
const reviewModal = document.getElementById("reviewModal");
const closeReview = document.getElementById("closeReview");
const reviewList = document.getElementById("reviewList");

reviewBtn.addEventListener("click", () => {
  const history = JSON.parse(localStorage.getItem("interviewHistory") || "[]");
  reviewList.innerHTML = history.length
    ? history.map(r => `
        <div class="review-card">
          <h4>${r.company} — ${r.difficulty}</h4>
          <p><strong>Date:</strong> ${r.date}</p>
          ${r.answers.map(ans => `
            <p><b>Q:</b> ${ans.q}<br><b>A:</b> ${ans.a}</p>
          `).join("")}
        </div>
      `).join("")
    : "<p>No past interviews yet.</p>";
  reviewModal.style.display = "flex";
});

closeReview.addEventListener("click", () => reviewModal.style.display = "none");
window.addEventListener("click", e => {
  if (e.target === reviewModal) reviewModal.style.display = "none";
});
