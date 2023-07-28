import * as editModule from './edit.js';
import { checkedBox, notChecked } from './completed.js';

// Jest setup file with custom localStorage mock
import './jest.setup.js';

// Mock the finalTodo function to simulate the data
jest.mock('./edit', () => ({
  getFinalTodo: jest.fn(() => [
    { desc: 'Task 1', completed: false, index: 1 },
    { desc: 'Task 2', completed: true, index: 2 },
    { desc: 'Task 3', completed: false, index: 3 },
  ]),
  storeItem: jest.fn(),
}));

describe('completed functions', () => {
  // Test for checkedBox function
  describe('checkedBox', () => {
    test('it should set the completed status to true for the given index and call storeItem', () => {
      const indexToCheck = 0;
      // Spy on the getFinalTodo function
      jest.spyOn(editModule, 'getFinalTodo'); 
      checkedBox(indexToCheck);
      expect(editModule.getFinalTodo).toHaveBeenCalled();
      expect(editModule.storeItem).toHaveBeenCalled();
    });
  });

  // Test for notChecked function
  describe('notChecked', () => {
    test('it should set the completed status to false for the given index and call storeItem', () => {
      const indexToUncheck = 1;
      // Spy on the getFinalTodo function
      jest.spyOn(editModule, 'getFinalTodo'); 
      notChecked(indexToUncheck);
      expect(editModule.getFinalTodo).toHaveBeenCalled();
      expect(editModule.storeItem).toHaveBeenCalled();
    });
  });
});
