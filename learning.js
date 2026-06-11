// Theme toggle
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
  toggleBtn.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Search filter
const searchBox = document.getElementById('search');
const modules = document.getElementById('modules').children;

searchBox.addEventListener('input', () => {
  const query = searchBox.value.toLowerCase();
  for (let card of modules) {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? 'block' : 'none';
  }
});


// ===== Chatbot Functionality =====
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBody = document.getElementById('chat-body');

chatbotToggle.addEventListener('click', () => {
  chatbot.style.display = 'flex';
  chatbotToggle.style.display = 'none';
});

closeChat.addEventListener('click', () => {
  chatbot.style.display = 'none';
  chatbotToggle.style.display = 'flex';
});

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  
  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'user-msg';
  userMsg.textContent = text;
  chatBody.appendChild(userMsg);
  
  userInput.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  // Simulate bot reply
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'bot-msg';
    botMsg.textContent = getBotReply(text);
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 800);
}

// Simple Q&A logic
function getBotReply(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("data structure")) return "Data Structures help organize and store data efficiently.";
  if (msg.includes("algorithm")) return "Algorithms are step-by-step methods to solve computational problems.";
  if (msg.includes("system design")) return "System Design involves creating scalable and efficient architecture.";
  if (msg.includes("hello") || msg.includes("hi")) return "Hi there! 👋 How can I assist you today?";
  return "I'm not sure about that yet 🤔, but I’m learning every day!";
}
