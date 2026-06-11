const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("userInput");
const chatContainer = document.getElementById("chatContainer");
const topicBtns = document.querySelectorAll(".topic-btn");

// Theme Toggle
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }
});

// Simulate Chatbot Reply
function addMessage(message, type) {
  const msg = document.createElement("div");
  msg.className = type === "user" ? "user-message" : "bot-message";
  msg.textContent = message;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  input.value = "";
  setTimeout(() => {
    addMessage("🤖 " + generateResponse(text), "bot");
  }, 800);
});

// Simple keyword responses
function generateResponse(text) {
  text = text.toLowerCase();
  if (text.includes("data structure")) return "Data Structures are ways to organize data — start with arrays and linked lists!";
  if (text.includes("algorithm")) return "Algorithms define the steps to solve problems efficiently — try sorting and searching first.";
  if (text.includes("system design")) return "System Design covers scalability, databases, and load balancing.";
  if (text.includes("oop")) return "OOP stands for Object-Oriented Programming — key concepts are encapsulation, inheritance, and polymorphism.";
  if (text.includes("behavioral")) return "Behavioral questions test communication and problem-solving. Practice STAR (Situation, Task, Action, Result).";
  return "That's an interesting topic! Let's explore that together. 🚀";
}

// Topic Buttons autofill
topicBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    input.value = btn.textContent;
    sendBtn.click();
  });
});

// Progress animation
window.addEventListener("load", () => {
  const progress = document.querySelector(".progress");
  const target = progress.dataset.progress;
  setTimeout(() => progress.style.width = target + "%", 300);
});
