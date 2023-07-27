// Function to save to local storage
export const storeItem = (todo, localStorage) => {
  if (localStorage) {
    localStorage.setItem('items', JSON.stringify(todo));
  }
};

// Function to retrieve from local storage
export const getItem = (localStorage) => {
  if (localStorage) {
    const storedItems = localStorage.getItem('items');
    return JSON.parse(storedItems) || [];
  }
  return [];
};

// Add new tasks
export const addItem = (todo, desc, localStorage) => {
  if (localStorage) {
    const item = {
      desc,
      completed: false,
      index: todo.length + 1,
    };
    todo.push(item);
    storeItem(todo, localStorage);
  }
};

export const removeItem = (todo, indexToRemove, localStorage) => {
  console.log('Removing item at index:', indexToRemove);
  if (localStorage) {
    // Ensure the index is within the valid range
    if (indexToRemove >= 0 && indexToRemove < todo.length) {
      const updatedTodo = todo.filter((item, index) => index !== indexToRemove);
      updatedTodo.forEach((item, index) => {
        // Update the index property correctly
        item.index = index + 1; 
      });
      storeItem(updatedTodo, localStorage);
      // Update localStorage after removing the item
    } else {
      console.error('Invalid indexToRemove:', indexToRemove);
    }
  }
};

// Edit existing tasks
export const editItem = (todo, index, desc, localStorage) => {
  if (localStorage) {
    todo[index].desc = desc;
    storeItem(todo, localStorage);
  }
};

// Find task index
export const findIndex = (list, e) => {
  const item = e.target.parentElement;
  const index = Array.from(list.children).indexOf(item);
  return index;
};

// Function to clear marked completed tasks
export function clearTasks(todo, localStorage) {
  if (localStorage) {
    const updatedTodo = todo.filter((item) => !item.completed);
    updatedTodo.forEach((item, index) => {
      item.index = index + 1;
    });
    storeItem(updatedTodo, localStorage);
    return updatedTodo;
  }
  return [];
}
