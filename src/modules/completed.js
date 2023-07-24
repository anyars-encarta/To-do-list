import {
  finalTodo, storeItem,
} from './edit.js';

export const checkedBox = (index) => {
  finalTodo[index].completed = true;
  storeItem();
};

export const notChecked = (index) => {
  finalTodo[index].completed = false;
  storeItem();
};
