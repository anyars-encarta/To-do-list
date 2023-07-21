import './style.css';
import myDateTime from './modules/date-time.js';
import {
  finalTodo, storeItem, addItem, editItem, removeItem, findIndex, clearTasks,
} from './modules/addEditRemove.js';
import { checkedBox, notChecked } from './modules/taskCompleted.js';

// Declare initial variables
const list = document.querySelector('#list');
const addBtn = document.querySelector('#add-btn');
const clear = document.querySelector('#clear');

// Sort tasks in descending order based on their indexes
const todoList = () => {
  finalTodo.sort((a, b) => a.index - b.index);

  finalTodo.forEach((item) => {
    list.innerHTML += `
        <li class="item">
            <input type="checkbox" class="check">
            <span class="focus">${item.desc}</span>
            <i class="fa fa-ellipsis-v"></i>
        </li>`;
  });
};

// Event listener to the parent container, edit and remove tasks
list.addEventListener('click', (e) => {
  const index = findIndex(e);
  if (e.target.classList.contains('fa-ellipsis-v')) {
    e.target.parentElement.contentEditable = 'true';
    e.target.parentElement.addEventListener('input', () => {
      editItem(index, e.target.parentElement.textContent);
      storeItem();
    });
    e.target.classList.remove('fa-ellipsis-v');
    e.target.classList.add('fa-trash');
  } else if (e.target.classList.contains('fa-trash')) {
    removeItem(index);
    e.target.parentElement.remove();
  } else if (e.target.classList.contains('check')) {
    e.target.addEventListener('change', () => {
      if (e.target.checked) {
        checkedBox(index);
      } else {
        notChecked(index);
      }
    });
  }
});

// Clear(remove) all completed marked tasks
clear.addEventListener('click', () => {
  const items = document.querySelectorAll('.check');
  items.forEach((item) => {
    if (item.checked) {
      item.parentElement.remove();
    }
  });
  clearTasks();
});

// Event listener to add(+) button
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const newItem = document.querySelector('#new').value;
  if (!newItem) {
    e.preventDefault();
  } else {
    addItem(newItem);
    list.innerHTML += `
        <li class="item"> 
          <input type="checkbox" class="check">
          <span class="focus">${newItem}</span>
          <i class="fa fa-ellipsis-v"></i>
        </li>`;
    document.querySelector('#new').value = '';
  }
  storeItem();
});

// Event listener to document on loading content
document.addEventListener('DOMContentLoaded', () => {
  todoList();
  myDateTime();
});
