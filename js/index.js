"use strict";

function App() {
  this.state = {
    tasks: [],
  };

  this.init = function () {
    getDomElems();
    addListeners();
    renderAllTasks();
  };

  const storeNewTask = (task) => {
    this.state.tasks.push(task);
  };

  const getDomElems = () => {
    this.newCardInputCont = document.querySelector(".task-card--input");
    this.addNewCardBttn = document.querySelector(".list__new-task");
    this.input = document.querySelector(".input");
  };

  const addListeners = () => {
    this.addNewCardBttn.addEventListener("click", () => this.input.focus());
    window.addEventListener("keydown", () => this.input.focus());

    this.newCardInputCont.addEventListener("submit", (e) => {
      e.preventDefault();
      const task = new Task();
      const taskTitle = this.input.value;
      this.input.value = '';

      storeNewTask(task);
      renderNewTask(taskTitle);
    });
  };

  // function getTasks() {
  //   let tasks = JSON.parse(localStorage.getItem("tasks"));
  //   if (tasks) {
  //     this.state.tasks = tasks;
  //   }
  // }

  const renderAllTasks = () => {
    const tasks = this.state.tasks;
    tasks.forEach((task) => {
      task.render(); //document.querySelector('.tasks') should be property of Task class
    });
  };
  const renderNewTask = (title) => {
    const tasks = this.state.tasks;
    const task = tasks[tasks.length - 1];
    task.render(title);
  };
}

function Task() {
  this.state = {
    tasksContainer: document.querySelector(".tasks"),
    firstTaskCard: document.querySelector("div.task-card"),
  };

  this.render = (title) => {
    const card = generateCardTask(title);
    this.state.tasksContainer.insertBefore(card, this.state.firstTaskCard);
  };

  function generateCardTask(taskText) {
    const div = document.createElement("div");
    div.classList.add("task-card");
    div.innerHTML = `
      <div class="wrapper flex flex--sm">
        <input class="task__check task__check--done" type="checkbox" name="" id="">
        <span>${taskText}</span>
      </div>
      <span class="wrapper flex flex--sm">
        <span class="task__due">9 Abr</span>
        <img
          class="task__icon"
          src="img/icons/shapes-icon.png"
          alt="command or control icon"
        />
      </span>`;
    return div;
  }
}

(function initApp() {
  let app = new App();
  app.init();
})();
