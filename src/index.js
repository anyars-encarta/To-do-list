import './style.css';
import myDateTime from './date-time.js';

// Declare initial variables
const list = document.querySelector('#list');
const addBtn = document.querySelector('#add-btn');
const clear = document.querySelector('#clear');

// Variable to get Tasks from local storage
let todo = JSON.parse(localStorage.getItem('items')) || [];

// Function to save to local storage
const storeItem = () => {
  localStorage.setItem('items', JSON.stringify(todo));
};

// Add new tasks
const addItem = (desc) => {
  const item = {
    desc,
    completed: false,
    index: todo.length + 1,
  };
  todo.push(item);
  storeItem();
};

// Edit existing tasks
const editItem = (index, desc) => {
  todo[index].desc = desc;
  storeItem();
};

// Remove tasks
const removeItem = (index) => {
  todo.splice(index, 1);
  for (let i = index; i < todo.length; i++) {
    todo[i].index = i++;
  }
  storeItem();
};

// Find task indices
const findIndex = (e) => {
  const items = document.querySelectorAll('.item');
  let index = 0;

  for (let i = 0; i < items.length; i += 1) {
    if (e.target.textContent === todo[i].desc) {
      index = i;
    } if (e.target.nextSibling.textContent === todo[i].desc) {
      index = i;
    } else if (e.target.previousSibling.textContent === todo[i].desc) {
      index = i;
    }
  }

  return index;
};

// Function to clear marked completed tasks
function clearTasks() {
  const unchecked = todo.filter((item) => item.completed === false);
  unchecked.forEach((item, index) => {
    item.index = index;
  });
  todo = unchecked;
  storeItem();
}

const finalTodo = todo;

// Set checkbox to true and save to local storage
const checkedBox = (index) => {
  finalTodo[index].completed = true;
  storeItem();
};

// Set checkbox to false and save to local storage
const notChecked = (index) => {
  finalTodo[index].completed = false;
  storeItem();
};

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