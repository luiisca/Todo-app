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

  const getDomElems = () => {
    this.newCardInputCont = document.querySelector(".task-card--input");
    this.addNewCardBttn = document.querySelector(".list__new-task");
    this.input = document.querySelector(".input");
    this.tasksContainer = document.querySelector(".tasks");
  };

  const getInputValues = () => {
    const title = this.input.value;
    const details = this.input.value;
    const dueDate = this.input.value;
    return { title, details, dueDate };
  };

  const addListeners = () => {
    this.addNewCardBttn.addEventListener("click", () => this.input.focus());
    window.addEventListener("keydown", () => this.input.focus());

    this.newCardInputCont.addEventListener("submit", (e) => {
      e.preventDefault();
      
      storeNewTaskData(getInputValues());
      this.input.value = "";
      renderNewTask();
    });

    this.tasksContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("task__check")) {
        e.target.classList.toggle("task__check--done");
        console.log(
          this.state.tasks.find(
            (task) => task.state.data.title === e.target.nextSibling.textContent
          )
        );
      }
    });
  };

  const storeNewTaskData = (taskData) => {
    this.state.tasks.push(taskData);
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  };

  const getTasksFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      this.state.tasks = tasks;
      return tasks;
    }
  };

  const renderAllTasks = () => {
    const tasksData = getTasksFromLocalStorage(); // Not storing in state, let's see if it create bugs :)
    if (tasksData) tasksData.forEach((data) => {
      const task = new Task();
      task.state.data = data;
      task.render();
    });
  };
  const renderNewTask = () => {
    const tasks = this.state.tasks;
    const task = new Task();
    task.state.data = tasks[tasks.length - 1];
    task.render();
  };
}

function Task() {
  this.state = {
    checked: false,
    data: {
      title: "",
      details: "",
      dueDate: "",
    },
    tasksContainer: document.querySelector(".tasks"),
    firstTaskCard: document.querySelector("div.task-card"),
  };

  this.render = () => {
    const card = generateCardTask();
    this.state.tasksContainer.insertBefore(card, this.state.firstTaskCard);
  };

  const generateCardTask = (checked) => {
    const div = document.createElement("div");
    div.classList.add("task-card");
    div.innerHTML = `
      <div class="wrapper flex flex--sm">
        <input class="task__check ${
          checked ? "task__check--done" : ""
        }" type="checkbox" name="checkbox" id="">
        <span>${this.state.data.title}</span>
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
