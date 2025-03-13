/* Основные стили */
body {
  margin: 0;
  padding: 0;
  font-family: 'Courier New', Courier, monospace;
  color: #fff;
  overflow: hidden;
}

/* Фон с картинкой */
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://i.pinimg.com/originals/1e/7a/3f/1e7a3f8f8b8b8b8b8b8b8b8b8b8b8b8b.jpg') no-repeat center center/cover;
  z-index: -1;
  filter: brightness(0.7);
}

/* Контейнер */
.container {
  display: flex;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

/* Левая колонка */
.left-column {
  width: 40%;
  padding-right: 20px;
  border-right: 2px solid rgba(255, 255, 255, 0.2);
}

/* Правая колонка */
.right-column {
  width: 60%;
  padding-left: 20px;
}

/* Секции */
.todo-section, .notes-section, .spotify-section {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #1db954;
}

input[type="text"], textarea {
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 16px;
}

textarea {
  height: 100px;
  resize: vertical;
}

button {
  padding: 10px 20px;
  background: #1db954;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

button:hover {
  background: #1ed760;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li:last-child {
  border-bottom: none;
}

#album-art {
  max-width: 150px;
  border-radius: 8px;
  margin-top: 10px;
// To-Do List
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function addTodo() {
  const input = document.getElementById('todo-input');
  const todoText = input.value.trim();
  if (todoText) {
    todos.push({ id: Date.now(), text: todoText, completed: false });
    input.value = '';
    saveTodos();
    renderTodos();
  }
}

function renderTodos() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = todos.map(todo => `
    <li class="${todo.completed ? 'completed' : ''}">
      <span>${todo.text}</span>
      <div>
        <button onclick="toggleTodo(${todo.id})">${todo.completed ? '✅' : '⬜'}</button>
        <button onclick="deleteTodo(${todo.id})">🗑️</button>
      </div>
    </li>
  `).join('');
}

function toggleTodo(id) {
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Заметки
const notesInput = document.getElementById('notes-input');
const notesDisplay = document.getElementById('notes-display');

function saveNotes() {
  const notes = notesInput.value.trim();
  localStorage.setItem('notes', notes);
  renderNotes();
}

function renderNotes() {
  const notes = localStorage.getItem('notes') || '';
  notesDisplay.textContent = notes;
}

// Spotify Integration
async function getNowPlaying() {
  // Заглушка для Spotify API
  const nowPlaying = {
    name: "Название трека",
    artist: "Исполнитель",
    albumArt: "https://via.placeholder.com/150"
  };

  document.getElementById('track-name').textContent = nowPlaying.name;
  document.getElementById('artist-name').textContent = nowPlaying.artist;
  document.getElementById('album-art').src = nowPlaying.albumArt;
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  renderTodos();
  renderNotes();
  getNowPlaying();
});
