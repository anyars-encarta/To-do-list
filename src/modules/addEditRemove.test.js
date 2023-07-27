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
