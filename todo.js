"use strict";
const newTaskInput = document.querySelector("#new-task");
const allTasks = document.querySelector("ul");
const itemCount = document.querySelector(".items-count");
const bar = document.querySelector(".bar");
const removeTask = document.querySelector(".delete-task");

const data = {};

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (newTaskInput.value) {
      // addNewTask();
      acceptData();
      showBar();
    }
  }
});

function acceptData() {
  data.text = newTaskInput.value;
  addNewTask();
  newTaskInput.value = "";
}

function addNewTask() {
  const eachTask = document.createElement("li");

  eachTask.innerHTML =
    "<input type='checkbox' class='checkbox'> " +
    `<p class='new-task'>${data.text}</p>` +
    "<img onClick='deleteTask(this)' class='delete-task' src='./images/icon-cross.svg'>";

  allTasks.append(eachTask);
  updateCount(1);
}

function updateCount(num) {
  itemCount.innerHTML = +itemCount.innerHTML + num;

  // console.log(itemCount.innerHTML);
  if (itemCount.innerHTML <= 0) {
    // hideBar();
    itemCount.innerHTML = 0;
  }
  // itemCount.innerHTML = allTasks.children.length - 1;
}

function hideBar() {
  bar.classList.add("hidden");
}

function showBar() {
  bar.classList.remove("hidden");
}

// Delete tasks
function deleteTask(e) {
  e.parentElement.remove();

  // deleting the task should only decrement the counter if it is not already checked.
  // if (!e.target.previousElementSibling.classList.contains("strike-through")) {
  //   updateCount(-1);
  // }
}

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

////////The buttons
// Clear completed tasks
const clearCompletedBtn = document.querySelector(".clear-completed");
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

function clearCompletedTasks() {
  // loop starts at i to ignore the bar
  for (let i = 1; i < allTasks.children.length; i++) {
    const checkBoxes = allTasks.children[i].children[0];
    // console.log(allTasks.children[i].children);
    if (checkBoxes.checked) {
      checkBoxes.parentElement.remove();
      // allTasks.children[i].children[0].parentElement.remove();
    }
  }
}

// Show only completed tasks
const completedBtn = document.querySelector(".completed");
completedBtn.addEventListener("click", showCompletedTasks);

function showCompletedTasks() {
  // loop starts at i to ignore the bar
  for (let i = 1; i < allTasks.children.length; i++) {
    // console.log(allTasks.children[i].children);
    if (!allTasks.children[i].children[0].checked) {
      allTasks.children[i].classList.add("hidden");
      // updateCount(-1);
      // console.log(allTasks.children[i]);
    } else {
      allTasks.children[i].classList.remove("hidden");
    }
  }
}

// Show only active tasks
const activeBtn = document.querySelector(".active");
activeBtn.addEventListener("click", showActiveTasks);

function showActiveTasks() {
  // loop starts at i to ignore the bar
  for (let i = 1; i < allTasks.children.length; i++) {
    // console.log(allTasks.children[i].children);
    if (allTasks.children[i].children[0].checked) {
      allTasks.children[i].classList.add("hidden");
      // updateCount(-1);
      // console.log(allTasks.children[i]);
    } else {
      allTasks.children[i].classList.remove("hidden");
    }
  }
}
// Show all tasks
const allBtn = document.querySelector(".all");
allBtn.addEventListener("click", showAllTasks);

function showAllTasks() {
  // loop starts at i to ignore the bar
  for (let i = 1; i < allTasks.children.length; i++) {
    allTasks.children[i].classList.remove("hidden");
  }
}
