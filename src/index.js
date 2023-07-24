import { finalTodo, storeItem, addItem, editItem, removeItem, findIndex, clearTasks } from './modules/edit.js';
import './styles/style.css';
import myDateTime from './modules/date-time.js';
import messages from './modules/messages.js';
import { checkedBox, notChecked } from './modules/completed.js';

const list = document.querySelector('#list');
const addBtn = document.querySelector('#add-btn');
const clear = document.querySelector('#clear');
const spanMessage = document.getElementById('message');

/* To-do list displaying and storing */
const todoList = () => {
  finalTodo.sort((a, b) => a.index - b.index);

  finalTodo.forEach((item) => {
    list.innerHTML += `
        <li class="item">
            <input type="checkbox" class="check">
            <span>${item.desc}</span>
            <i class="fa fa-ellipsis-v"></i>
        </li>`;
  });
};

/* List Listeners */
list.addEventListener('click', (e) => {
  const index = findIndex(e);
  console.log(e.target)
  if (e.target.classList.contains('fa-ellipsis-v')) {
    e.target.parentElement.contentEditable = 'true';
    e.target.parentElement.firstElementChild.nextElementSibling.style.border = '1px solid red';
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

clear.addEventListener('click', () => {
  const items = document.querySelectorAll('.check');
  items.forEach((item) => {
    if (item.checked) {
      item.parentElement.remove();
    }
  });
  clearTasks();
});

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
          <span>${newItem}</span>
          <i class="fa fa-ellipsis-v"></i>
        </li>`;
    document.querySelector('#new').value = '';
  }
  storeItem();
});

document.addEventListener('DOMContentLoaded', () => {
  todoList();
  myDateTime();
  messages();
});