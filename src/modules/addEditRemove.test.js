// Import the functions to be tested
import {
  storeItem, getItem, addItem, removeItem, editItem, findIndex, clearTasks,
} from './addEditRemove.js';

// Define mockLocalStorage outside the jest.mock function
const mockLocalStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
};
// Group tests for addEditRemove functions
describe('addEditRemove functions', () => {
  beforeEach(() => {
    // Clear the mock implementation data before each test
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValueOnce(null);
  });

  // Test for storeItem function
  describe('storeItem', () => {
    test('it should call localStorage.setItem with correct parameters', () => {
      const todo = [{ desc: 'Task 1', completed: false, index: 1 }];
      const updatedTodo = [...todo, { desc: 'New Task', completed: false, index: 2 }];

      // Call the actual storeItem function from the module, not the mocked one
      storeItem(updatedTodo, mockLocalStorage);

      // Expect storeItem to have been called with the updated todo
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'items',
        JSON.stringify(updatedTodo), // Corrected the expected parameter
      );

      // Check that mockLocalStorage.setItem is not called directly in the test
      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });

  // Test for getItem function
  describe('getItem', () => {
    test('it should call localStorage.getItem with correct parameters', () => {
      getItem(mockLocalStorage);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('items');
    });

    test('it should return an empty array if localStorage.getItem returns null', () => {
      const result = getItem(mockLocalStorage);
      expect(result).toEqual([]);
    });
  });

  // Test for addItem function
  describe('addItem', () => {
    test('it should call storeItem with the updated todo', () => {
      const todo = [{ desc: 'Task 1', completed: false, index: 1 }];
      const updatedTodo = [...todo, { desc: 'New Task', completed: false, index: 2 }];

      addItem(todo, 'New Task', mockLocalStorage);

      // Expect storeItem to have been called with the updated todo
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('items', JSON.stringify(updatedTodo));

      // Check that mockLocalStorage.setItem is not called directly in the test
      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });

  // Test for removeItem function
  describe('removeItem', () => {
    test('it should call storeItem with updated todo after removal', () => {
      const todo = [
        { desc: 'Task 1', completed: false, index: 1 },
        { desc: 'Task 2', completed: false, index: 2 },
      ];
      const updatedTodo = [{ desc: 'Task 2', completed: false, index: 1 }];

      removeItem(todo, 0, mockLocalStorage); // Removing the first item

      // Expect storeItem to have been called with the updated todo
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('items', JSON.stringify(updatedTodo));

      // Check that mockLocalStorage.setItem is not called directly in the test
      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });

  // Test for editItem function
  describe('editItem', () => {
    test('it should call storeItem with updated todo after editing', () => {
      const todo = [
        { desc: 'Task 1', completed: false, index: 1 },
        { desc: 'Task 2', completed: false, index: 2 },
      ];
      const updatedTodo = [
        { desc: 'Updated Task', completed: false, index: 1 },
        { desc: 'Task 2', completed: false, index: 2 },
      ];

      editItem(todo, 0, 'Updated Task', mockLocalStorage); // Editing the first item

      // Expect storeItem to have been called with the updated todo
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('items', JSON.stringify(updatedTodo));

      // Check that mockLocalStorage.setItem is not called directly in the test
      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });

  // Test for findIndex function
  describe('findIndex', () => {
    test('it should return the correct index of the target element', () => {
      // Mock the necessary HTML elements for testing
      const items = [{ textContent: 'Task 1' }, { textContent: 'Task 2' }, { textContent: 'Task 3' }];
      const e = { target: { parentElement: items[1] } };
      const list = { children: items };
      const index = findIndex(list, e);
      expect(index).toBe(1);
    });
  });

  // Test for clearTasks function
  describe('clearTasks', () => {
    test('it should call storeItem with updated todo after clearing completed tasks', () => {
      const todo = [
        { desc: 'Task 1', completed: false, index: 1 },
        { desc: 'Task 2', completed: true, index: 2 },
        { desc: 'Task 3', completed: false, index: 3 },
      ];
      clearTasks(todo, mockLocalStorage);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'items',
        JSON.stringify([
          { desc: 'Task 1', completed: false, index: 1 },
          { desc: 'Task 3', completed: false, index: 2 },
        ]),
      );
      // Check that mockLocalStorage.setItem is called only once in the test
      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });
});
