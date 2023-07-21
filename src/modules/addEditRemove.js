// Variable to get Tasks from local storage
let todo = JSON.parse(localStorage.getItem('items')) || [];

// Function to save to local storage
export const storeItem = () => {
  localStorage.setItem('items', JSON.stringify(todo));
};

// Add new tasks
export const addItem = (desc) => {
  const item = {
    desc,
    completed: false,
    index: todo.length + 1,
  };
  todo.push(item);
  storeItem();
};

// Remove tasks
export const removeItem = (index) => {
  todo.splice(index, 1);
  for (let i = index; i < todo.length; i + 1) {
    todo[i].index = i + 1;
  }
  storeItem();
};

// Edit existing tasks
export const editItem = (index, desc) => {
  todo[index].desc = desc;
  storeItem();
};

// Find task indices
export const findIndex = (e) => {
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
export function clearTasks() {
  const unchecked = todo.filter((item) => item.completed === false);
  unchecked.forEach((item, index) => {
    item.index = index;
  });
  todo = unchecked;
  storeItem();
}

const finalTodo = todo;

export { finalTodo };