/* eslint-disable object-shorthand */
import './styles/style.css';
import myDateTime from './modules/date-time.js';
// Load Tasks
const tasks = [
  {
    id: 1,
    description: 'Join Microverse Ask me Anything',
    completed: true,
  },
  {
    id: 2,
    description: 'Join Microverse standup call',
    completed: true,
  },
  {
    id: 3,
    description: 'Join Microverse Program time',
    completed: false,
  },
  {
    id: 4,
    description: 'Join Microverse Coffee and Code',
    completed: false,
  },
  {
    id: 5,
    description: 'Contact Microverse Student Success',
    completed: true,
  },
  {
    id: 6,
    description: 'Hangout with Microverse CEO',
    completed: false,
  },
  {
    id: 7,
    description: 'Go to bed',
    completed: true,
  },
];

const taskContainer = document.getElementById('todo-list');

function addTasks() {
  taskContainer.innerHTML = `${tasks.map((item) => (`<li id="task-${item.id}" class="task-item">
    <input id="checkBx" type="checkbox">
    <span class="task-detail">${item.description}</span>
    <span class="move-icons"></span>
    <img class="fa trash-can" src="./assets/trash-can.png" alt="trash-can">
  </li>`)).join(' ')}`;
}

// Fetched from module
document.addEventListener('DOMContentLoaded', () => {
  addTasks();
  myDateTime();
});
