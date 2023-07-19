const taskLoad = () => {
  const taskListDisplay = document.getElementById('todo-list');
  const taskDescription = document.getElementById('task-input');
  const spanMessage = document.getElementById('message');

  let taskLists = [];
  class Tasks {
    static addTask(taskDetails) {
      if (Tasks.isEmptyField(taskDetails)) {
        Tasks.showErrorMesssage('Please fill in a task to add to the list.');
        return;
      }

      if (Tasks.isDuplicate(taskDetails)) {
        Tasks.showErrorMesssage('This task is already added to the list.');
        return;
      }
      // Generate new unique ID for a task
      const id = Tasks.counterAutoIncreatmentId();

      // Add task to collection
      taskLists.push({ id, taskDetails, completed: false });

      // Save task to local storage
      Tasks.saveTasks();

      // Clear input fields
      Tasks.clearInputField();

      // Display success message
      Tasks.showsuccessMessage('Task added successfully!');

      // Display task in list
      Tasks.renderTasks(id, taskDetails, false);
    }

    static isEmptyField(taskDetails) {
      return !taskDetails;
    }

    static isDuplicate(taskDetails) {
      return taskLists.some((task) => task.taskDetails === taskDetails);
    }

    static removeTask(id) {
    // Remove task from collection
      taskLists = taskLists.filter((task) => task.id !== id);
      // Save tasks to local storage
      Tasks.saveTasks();
      // Remove task from the list
      const taskElement = document.getElementById(`task-${id}`);
      if (taskElement) {
        taskElement.remove();
      }
      // Display success message
      Tasks.showsuccessMessage('Task removed successfully!');
    }

    static renderTasks(id, taskDetails, completed) {
    // Create list of tasks
      const taskElement = document.createElement('li');
      taskElement.setAttribute('id', `task-${id}`);
      taskElement.setAttribute('class', 'task-item');
    
    //Create a CheckBox element
      const checkBox = document.createElement('input');
      checkBox.setAttribute('type', 'checkbox');
      
    //Create Task Detail element
      const taskDetailElement = document.createElement('span');
      taskDetailElement.setAttribute('class', 'task-detail');
      taskDetailElement.textContent = `${taskDetails}`;

    //Create Move icons
    const moveIcon = document.createElement('span');
    moveIcon.setAttribute('class', 'move-icons');

    //Create Trash Can Icon
    const trashCan = document.createElement('img');
    trashCan.setAttribute('class', 'fa transh-can');
    trashCan.src = './assets/trash-can.png';
    trashCan.alt = 'trash-can';
    

    // Add event listener to Trash Can
    trashCan.addEventListener('click', () => {
    Tasks.removeTask(id);
    Tasks.showsuccessMessage('Task removed successfully!');
    });
    taskElement.appendChild(checkBox);
    taskElement.appendChild(taskDetailElement);
    taskElement.appendChild(moveIcon);
    taskElement.appendChild(trashCan);
    // Add task to list
    taskListDisplay.appendChild(taskElement);
  }

    static counterAutoIncreatmentId() {
      if (taskLists.length === 0) {
        return 1;
      }
      return taskLists[taskLists.length - 1].id + 1;
    }

    static clearInputField() {
      taskDescription.value = '';
    }

    static saveTasks() {
      localStorage.setItem('taskLists', JSON.stringify(taskLists));
    }

    static loadTasks() {
      const tasksJson = localStorage.getItem('taskLists');
      return tasksJson ? JSON.parse(tasksJson) : [];
    }

    static showsuccessMessage(message) {
      spanMessage.classList.add('success');
      spanMessage.classList.remove('error');
      spanMessage.textContent = message;
      spanMessage.style.display = 'block';
      spanMessage.style.backgroundColor = 'green';
      spanMessage.style.color = 'white';
      taskDescription.style.border = '1px solid green';
      setTimeout(() => {
        spanMessage.style.display = 'none';
        taskDescription.style.border = '';
        Tasks.clearInputField();
      }, 2000);// hide the success message after 2 seconds
    }

    static showErrorMesssage(message) {
      spanMessage.classList.add('error');
      spanMessage.classList.remove('success');
      spanMessage.textContent = message;
      spanMessage.style.display = 'block';
      spanMessage.style.backgroundColor = 'red';
      spanMessage.style.color = 'white';
      taskDescription.style.border = '1px solid red';
      setTimeout(() => {
        spanMessage.style.display = 'none';
        taskDescription.style.border = '';
        Tasks.clearInputField();
      }, 2000);// hide the success message after 2 seconds
    }
  }

  // Add event listener to click or submit button
  const addButton = document.getElementById('add-icon');
  addButton.addEventListener('click', (event) => {
    event.preventDefault();
    const taskDetails = taskDescription.value.trim();
    if (taskDetails) {
      Tasks.addTask(taskDetails);
    }
  });

  // Load tasks from local storage and render it on the page
  Tasks.loadTasks().forEach((task) => {
    // Display task in list
    Tasks.renderTasks(task.id, task.taskDetails);
  });
};

export default taskLoad;