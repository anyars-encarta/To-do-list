import { addItem, removeItem, getItem } from './addEditRemove';
import 'jest-localstorage-mock';

const localStorageMock = {
  // Initialize items property
  items: {}, 
  getItem(key) {
    return this.items[key];
  },
  setItem(key, value) {
    // Update items property
    this.items[key] = value.toString(); 
  },
  clear() {
    this.items = {};
  },
  removeItem(key) {
    delete this.items[key];
  },
};

// addItem test
describe('addItem function', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  test('should add an item to the list and update localStorage', () => {
    const initialTodo = [];
    const newDesc = 'Task 3';
    // Create a shallow copy of the array
    const clonedTodo = [...initialTodo];
    addItem(clonedTodo, newDesc, localStorageMock);

    const updatedTodo = JSON.parse(localStorageMock.getItem('items'));
    expect(updatedTodo.length).toBe(initialTodo.length + 1);
    expect(updatedTodo[updatedTodo.length - 1]).toEqual({
      desc: newDesc,
      completed: false,
      index: initialTodo.length + 1,
    });
  });
});

// removeItem test
describe('removeItem function', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  test('should remove an item from the list and update localStorage', () => {
    const initialTodo = [
      { desc: 'Task 1', completed: false, index: 1 },
      { desc: 'Task 2', completed: true, index: 2 },
      { desc: 'Task 3', completed: false, index: 3 },
    ];
    // Specify the index to remove (0 for the first item in the list)
    const indexToRemove = 0;
    removeItem(initialTodo, indexToRemove, localStorageMock);

    // Get the updated items from localStorage
    const storedItems = getItem(localStorageMock);

    // Calculate the updated length manually
    const updatedLength = initialTodo.length - 1;
    // Expecting 2 items in the updated list
    expect(storedItems.length).toBe(updatedLength);
    // The first item should now be 'Task 2'
    expect(storedItems[0].desc).toBe('Task 2');
    // The second item should now be 'Task 3'
    expect(storedItems[1].desc).toBe('Task 3');
  });
});
