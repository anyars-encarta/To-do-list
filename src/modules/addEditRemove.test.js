//addEditRemove.test.js
import { addItem, removeItem, getItem } from './addEditRemove';
import 'jest-localstorage-mock';

const localStorageMock = {
  items: {}, // Initialize items property
  getItem(key) {
    return this.items[key];
  },
  setItem(key, value) {
    this.items[key] = value.toString(); // Update items property
  },
  clear() {
    this.items = {};
  },
  removeItem(key) {
    delete this.items[key];
  },
};

describe('addItem function', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  test('should add an item to the list and update localStorage', () => {
    const initialTodo = [];
    const newDesc = 'Task 3';
    const clonedTodo = [...initialTodo]; // Create a shallow copy of the array
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

    const indexToRemove = 0; // Specify the index to remove (0 for the first item in the list)
    removeItem(initialTodo, indexToRemove, localStorageMock);

    // Get the updated items from localStorage
    const storedItems = getItem(localStorageMock);

    // Check the stored items
    console.log('Stored items:', storedItems);

    // Calculate the updated length manually
    const updatedLength = initialTodo.length - 1;

    expect(storedItems.length).toBe(updatedLength); // Expecting 2 items in the updated list
    expect(storedItems[0].desc).toBe('Task 2'); // The first item should now be 'Task 2'
    expect(storedItems[1].desc).toBe('Task 3'); // The second item should now be 'Task 3'
  });
});