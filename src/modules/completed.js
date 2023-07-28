import * as editModule from './edit.js'; // Use default import

export const checkedBox = (index) => {
  // Call the getFinalTodo function to get the updated array
  const todoArray = editModule.getFinalTodo();
  todoArray[index].completed = true;
  // Pass the updated todo array as an argument to the storeItem function
  editModule.storeItem(todoArray);
};

export const notChecked = (index) => {
  // Call the getFinalTodo function to get the updated array
  const todoArray = editModule.getFinalTodo();
  todoArray[index].completed = false;
  // Pass the updated todo array as an argument to the storeItem function
  editModule.storeItem(todoArray);
};
