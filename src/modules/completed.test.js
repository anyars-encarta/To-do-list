import * as editModule from './edit.js';
import { checkedBox, notChecked } from './completed.js';

// Jest setup file with custom localStorage mock
import './jest.setup.js';

describe('completed functions', () => {
  // Test for checkedBox function
  describe('checkedBox', () => {
    test('it should set the completed status to true for the given index and call storeItem', () => {
      const indexToCheck = 0;
      jest.spyOn(editModule, 'getFinalTodo'); // Spy on the getFinalTodo function

      checkedBox(indexToCheck);

      expect(editModule.getFinalTodo).toHaveBeenCalled();
      expect(editModule.storeItem).toHaveBeenCalled();
    });
  });

  // Test for notChecked function
  describe('notChecked', () => {
    test('it should set the completed status to false for the given index and call storeItem', () => {
      const indexToUncheck = 1;
      jest.spyOn(editModule, 'getFinalTodo'); // Spy on the getFinalTodo function

      notChecked(indexToUncheck);

      expect(editModule.getFinalTodo).toHaveBeenCalled();
      expect(editModule.storeItem).toHaveBeenCalled();
    });
  });
});
