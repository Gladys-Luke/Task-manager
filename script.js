// Task class to represent a single task
class Task {
    constructor(description, isCompleted = false) {
      this.description = description;
      this.isCompleted = isCompleted;
    }
  }
  
  // TaskManager class to manage tasks
  class TaskManager {
    constructor() {
      this.tasks = [];
    }
  
    addTask(description) {
      const task = new Task(description);
      this.tasks.push(task);
    }
  
    deleteTask(index) {
      if (index >= 0 && index < this.tasks.length) {
        this.tasks.splice(index, 1);
      }
    }
  
    editTask(index, newDescription) {
      if (index >= 0 && index < this.tasks.length) {
        this.tasks[index].description = newDescription;
      }
    }
  
    toggleTask(index) {
      if (index >= 0 && index < this.tasks.length) {
        this.tasks[index].isCompleted = !this.tasks[index].isCompleted;
      }
    }
  }
  
  // User class (not used in this simplified example)
  class User {
    constructor(username) {
      this.username = username;
    }
  }
  
  // Get HTML elements
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTask');
  const taskList = document.getElementById('taskList');
  
  // Create a task manager
  const taskManager = new TaskManager();
  
  // Add a task when the "Add Task" button is clicked
  addTaskButton.addEventListener('click', () => {
    const taskDescription = taskInput.value.trim();
    if (taskDescription) {
      taskManager.addTask(taskDescription);
      updateTaskList();
      taskInput.value = '';
    }
  });
  
  // Helper function to update the task list in the UI
  function updateTaskList() {
    taskList.innerHTML = '';
    taskManager.tasks.forEach((task, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <input type="checkbox" ${task.isCompleted ? 'checked' : ''}>
        <span>${task.description}</span>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      `;
      taskList.appendChild(listItem);
  
      // Add event listeners for editing and deleting tasks
      const editButton = listItem.querySelector('.edit');
      const deleteButton = listItem.querySelector('.delete');
  
      editButton.addEventListener('click', () => {
        const newDescription = prompt('Edit task:', task.description);
        if (newDescription !== null) {
          taskManager.editTask(index, newDescription);
          updateTaskList();
        }
      });
  
      deleteButton.addEventListener('click', () => {
        taskManager.deleteTask(index);
        updateTaskList();
      });
  
      // Add event listener for task completion
      listItem.querySelector('input[type="checkbox"]').addEventListener('change', () => {
        taskManager.toggleTask(index);
        updateTaskList();
      });
    });
  }
  
  // Initial UI update
  updateTaskList();
  