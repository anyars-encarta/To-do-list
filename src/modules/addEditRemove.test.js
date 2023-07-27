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
  })


});
