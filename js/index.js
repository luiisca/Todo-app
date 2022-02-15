"use strict";

const newCardInput = document.querySelector(".task-card--input");
const input = document.querySelector(".input");
const addNewCard = document.querySelector(".list__new-task");

// Create new task from input and from 'Create new task' button

let newTask;
function createNewCard(task) {
  let div = document.createElement("div");
  div.classList.add("task-card");
  div.innerHTML = `
    <div class="wrapper flex flex--sm">
      <input class="task__check task__check--done" type="checkbox" name="" id="">
      <span>${task}</span>
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

addNewCard.addEventListener("click", () => input.focus());
window.addEventListener("keydown", () => input.focus())

newCardInput.addEventListener("submit", (e) => {
  e.preventDefault
  let value = e.target.newTask.value;
  newTask = value;
  e.target.newTask.value = "";

  let card = createNewCard(newTask);
  document.querySelector(".tasks").appendChild(card);
});

