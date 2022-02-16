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

      const newTaskInstance = new Task();
      newTaskInstance.state.data = getInputValues();

      storeTaskData(newTaskInstance);
      this.input.value = "";
      renderTask(newTaskInstance);
    });

    this.tasksContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("task__check")) {
        e.target.classList.toggle("task__check--done");

        const taskTitle = this.state.tasks.find(
          (task) => task.data.title === e.target.nextElementSibling.textContent
        );

        taskTitle.checked = !taskTitle.checked;
        updateLocalStorage();
      }
    });
  };

  const updateLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  };

  const storeTaskData = (taskInstance) => {
    this.state.tasks.push(taskInstance.state);
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  };

  const getTasksFromLocalStorage = () => {
    const tasksStates = JSON.parse(localStorage.getItem("tasks"));
    if (tasksStates) {
      this.state.tasks = tasksStates;
      return tasksStates;
    }
  };

  const renderAllTasks = () => {
    if (getTasksFromLocalStorage().length > 0) {
      this.state.tasks = getTasksFromLocalStorage();

      this.state.tasks.forEach((state) => {
        const task = new Task();
        task.state = state;
        task.render(this.tasksContainer);
      });
    }
  };
  const renderTask = (task) => {
    task.render(this.tasksContainer);
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
  };

  this.render = (container) => {
    const firstTaskCard = document.querySelector("div.task-card");
    const card = generateCardTask(this.state.checked);
    card.children[0].children[0].checked = this.state.checked;

    container.insertBefore(card, firstTaskCard);
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
  };
}

(function initApp() {
  let app = new App();
  app.init();
})();
