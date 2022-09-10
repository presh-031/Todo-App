"use strict";
const newTaskInput = document.querySelector("#new-task");
const allTasks = document.querySelector("ul");
const itemCount = document.querySelector(".items-count");
const bar = document.querySelector(".bar");
const removeTask = document.querySelector(".delete-task");
// const completed = false; //working on this for checkbox
// const clearTask = document.querySelector(".checkbox");

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (newTaskInput.value) {
      addNewTask();
      showBar();
      newTaskInput.value = "";
    }
  }
});

function addNewTask() {
  const eachTask = document.createElement("li");

  eachTask.innerHTML =
    "<input type='checkbox' class='checkbox'> " +
    `<p class='new-task'>${newTaskInput.value}</p>` +
    "<img class='delete-task' src='./images/icon-cross.svg'>";

  allTasks.append(eachTask);
  updateCount(1);
}

function updateCount(num) {
  itemCount.innerHTML = +itemCount.innerHTML + num;

  console.log(itemCount.innerHTML);
  if (itemCount.innerHTML <= 0) {
    // hideBar();
    itemCount.innerHTML = 0;
  }
}

function hideBar() {
  bar.classList.add("hidden");
}

function showBar() {
  bar.classList.remove("hidden");
}

// Delete tasks
function deleteTask(e, task) {
  task.remove();

  // deleting the task should only decrement the counter if it is not already checked.

  console.log(e.target.previousElementSibling);

  if (!e.target.previousElementSibling.classList.contains("strike-through")) {
    updateCount(-1);
    // console.log("count -1");
  }
}
allTasks.addEventListener("click", (e) => {
  // console.log(e.target.parentElement);
  if (e.target.classList.contains("delete-task")) {
    deleteTask(e, e.target.parentElement);
  }
});

// Marking and unmarking tasks
function markTask(e) {
  updateCount(-1);
  e.target.nextElementSibling.classList.add("strike-through");
}
function unMarkTask(e) {
  updateCount(1);
  e.target.nextElementSibling.classList.remove("strike-through");
}
allTasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("checkbox")) {
    if (e.target.checked) {
      markTask(e);
    } else {
      unMarkTask(e);
    }
  }
});
