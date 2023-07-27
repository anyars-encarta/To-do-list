import 'jest-localstorage-mock';

const localStorageMock = (() => {
    let store = {};
  
    return {
      getItem: (key) => store[key],
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
      removeItem: (key) => {
        delete store[key];
      },
    };
  })();
  
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  