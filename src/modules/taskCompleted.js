import { finalTodo, storeItem } from './addEditRemove.js';

// Set checkbox to true and save to local storage
export const checkedBox = (index) => {
  finalTodo[index].completed = true;
  storeItem();
};

// Set checkbox to false and save to local storage
export const notChecked = (index) => {
  finalTodo[index].completed = false;
  storeItem();
};