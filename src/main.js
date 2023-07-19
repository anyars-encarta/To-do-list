/* eslint-disable object-shorthand */
import taskLoad from './modules/addTasks.js';
import myDateTime from './modules/date-time.js';

// Fetched from module
document.addEventListener('DOMContentLoaded', () => {
  taskLoad();
  myDateTime();
});