/* eslint-disable no-use-before-define */
export default class Task {
  constructor(description, index) {
    this.description = description;
    this.completed = false;
    this.index = index;
  }

  static task() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
  }

  static addTask(task) {
    const taskItem = document.querySelector('textarea');
    const tasks = this.task();
    tasks.push(task);
    taskItem.value = '';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    window.location.reload();
  }

  static showTasks(task) {
    const taskList = document.getElementById('task-list');

    const div = document.createElement('div');
    setAttributes(div, {
      class: 'listed-task', draggable: 'true', id: `${task.index}`, 'data-completed': `${task.completed}`,
    });

    const check = document.createElement('input');
    setAttributes(check, { class: 'check', type: 'checkbox' });

    const input = document.createElement('input');
    input.setAttribute('class', 'input');

    const i = document.createElement('i');
    i.setAttribute('class', 'bi bi-three-dots-vertical');

    input.value = `${task.description}`;
    if (task.completed === true) {
      input.style.textDecoration = 'line-through';
      check.checked = true;
    } else {
      input.style.textDecoration = 'none';
      check.checked = false;
    }
    div.append(check, input, i);
    taskList.appendChild(div);
  }
}

const setAttributes = (el, attrs) => {
  Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
};