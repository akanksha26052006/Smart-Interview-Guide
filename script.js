// Chatbot elements
const chatbotBtn = document.getElementById('chatbotBtn');
const chatbotPopup = document.getElementById('chatbotPopup');
const closeBtn = document.getElementById('closeBtn');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatbotBody = document.getElementById('chatbotBody');
const suggestionsBox = document.getElementById('suggestions');

// Open/Close Chatbot
chatbotBtn.addEventListener('click', () => chatbotPopup.style.display = 'flex');
closeBtn.addEventListener('click', () => chatbotPopup.style.display = 'none');

// Load previous questions
let previousQues = JSON.parse(localStorage.getItem('previousQues')) || [];

// Preloaded questions
const preloadedQuestions = [
  "What is a stack and how does it work?",
  "Explain queue and its types",
  "What is a linked list?",
  "Explain different types of trees",
  "What is a graph? Types of graphs?",
  "Explain sorting algorithms",
  "What is dynamic programming?",
  "Explain BFS and DFS algorithms",
  "What is system design?",
  "Tell me about yourself",
  "Describe a challenging situation at work",
  "Explain recursion",
  "Explain database",
  "Explain API"
];

// Show suggestions
function showSuggestions(text) {
  suggestionsBox.innerHTML = '';
  let filtered = [];

  if (text) {
    filtered = [...previousQues, ...preloadedQuestions].filter(q => 
      q.toLowerCase().includes(text.toLowerCase())
    );
  } else {
    filtered = preloadedQuestions.slice(0, 10);
  }

  filtered.forEach(q => {
    const div = document.createElement('div');
    div.textContent = q;
    div.addEventListener('click', () => {
      userInput.value = div.textContent;
      sendMessage();
      suggestionsBox.innerHTML = '';
    });
    suggestionsBox.appendChild(div);
  });
}

// Send message
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'user-message';
  userMsg.textContent = text;
  chatbotBody.appendChild(userMsg);

  if (!previousQues.includes(text)) {
    previousQues.push(text);
    localStorage.setItem('previousQues', JSON.stringify(previousQues));
  }

  userInput.value = '';
  suggestionsBox.innerHTML = '';
  chatbotBody.scrollTop = chatbotBody.scrollHeight;

  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'bot-message';
    botMsg.textContent = generateAnswer(text);
    chatbotBody.appendChild(botMsg);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }, 500);
}

// Generate answer
function generateAnswer(question) {
  const q = question.toLowerCase();
  const answers = [
    {keywords: ['stack'], answer: 'A stack is LIFO. Practice valid parentheses, reverse stack, etc.'},
    {keywords: ['queue'], answer: 'Queue is FIFO. Practice BFS, sliding window, circular queue.'},
    {keywords: ['linked list'], answer: 'Linked List: insertion, deletion, reverse, detect loop.'},
    {keywords: ['tree'], answer: 'Trees: traversal, height, diameter, LCA, BST operations.'},
    {keywords: ['graph'], answer: 'Graphs: BFS, DFS, Dijkstra, MST.'},
    {keywords: ['sorting'], answer: 'Sorting: Bubble, Merge, Quick, Heap. Know complexity.'},
    {keywords: ['dynamic programming'], answer: 'DP: optimal substructure, overlapping subproblems.'},
    {keywords: ['system design'], answer: 'Focus on architecture, scalability, caching, load balancing.'},
    {keywords: ['behavioral'], answer: 'Behavioral: use STAR method - Situation, Task, Action, Result.'},
    {keywords: ['algorithm'], answer: 'Practice searching, sorting, recursion, backtracking, graph algos.'},
    {keywords: ['recursion'], answer: 'Recursion: function calls itself. Practice factorial, fibonacci, tree traversal.'},
    {keywords: ['database'], answer: 'Understand SQL, joins, normalization, transactions, indexing.'},
    {keywords: ['api'], answer: 'APIs: REST endpoints, methods, status codes, communication between apps.'}
  ];

  for (const a of answers) {
    if (a.keywords.some(k => q.includes(k))) return a.answer;
  }

  return "Interesting! Try asking about Data Structures, Algorithms, System Design, or Behavioral questions.";
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
  showSuggestions(userInput.value);
});
userInput.addEventListener('input', () => showSuggestions(userInput.value));
showSuggestions('');

// Sign In Modal
const signInBtn = document.getElementById('signInBtn');
const signInModal = document.getElementById('signInModal');
const closeSignIn = document.getElementById('closeSignIn');
const loginBtn = document.getElementById('loginBtn');
const loginMessage = document.getElementById('loginMessage');

signInBtn.addEventListener('click', () => signInModal.style.display = 'block');
closeSignIn.addEventListener('click', () => {
  signInModal.style.display = 'none';
  loginMessage.textContent = '';
});

loginBtn.addEventListener('click', () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  if (!email || !password) {
    loginMessage.textContent = 'Please enter both email and password.';
    return;
  }
  if (email === 'user@example.com' && password === '123456') {
    loginMessage.style.color = 'green';
    loginMessage.textContent = 'Login successful!';
    setTimeout(() => { signInModal.style.display = 'none'; loginMessage.textContent = ''; }, 1000);
  } else {
    loginMessage.style.color = 'red';
    loginMessage.textContent = 'Invalid email or password.';
  }
});

window.addEventListener('click', (e) => {
  if (e.target === signInModal) { signInModal.style.display = 'none'; loginMessage.textContent = ''; }
});
