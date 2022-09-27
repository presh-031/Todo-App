"use strict";
const newTaskInput = document.querySelector("#new-task");
const allTasks = document.querySelector("ul");
const bar = document.querySelector(".bar");
const removeTask = document.querySelector(".delete-task");

const itemCountEl = document.querySelector(".items-count");

const data = {};
let itemCount = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (newTaskInput.value) {
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
    "<input onClick='editTaskStatus(this)' type='checkbox' class='checkbox'> " +
    // Will be adding an icon before the delete-icon for editing tasks instead.
    `<p onClick='editTask(this)' class='new-task'>${data.text}</p>` +
    "<img onClick='deleteTask(this)' class='delete-task' src='./images/icon-cross.svg'>";

  allTasks.append(eachTask);
  updateCount(1);
}

function updateCount(num) {
  itemCount = itemCount + num;
  itemCountEl.innerHTML = itemCount;
  // if (itemCountEl.innerHTML <= 0) {
  // hideBar();
  // itemCountEl.innerHTML = 0;
  // }
  // itemCountEl.innerHTML = allTasks.children.length - 1;
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
  // should only further decrease count if its sibling checkbox not already checked.
  if (!e.parentElement.children[0].checked) {
    updateCount(-1);
  }
}

// Edit tasks
function editTask(e) {
  newTaskInput.value = e.innerHTML;
  e.parentElement.remove();
  updateCount(-1);
}

// Marking and unmarking tasks
function editTaskStatus(e) {
  if (e.checked) {
    // console.log("checked");
    e.nextElementSibling.classList.add("strike-through");
    updateCount(-1);
  } else {
    e.nextElementSibling.classList.remove("strike-through");
    updateCount(1);
    // console.log("unchecked");
  }
}

////////The buttons
// Clear completed tasks
const clearCompletedBtn = document.querySelector(".clear-completed");
// Add a modal for are you sure before clearing all completed
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

function clearCompletedTasks() {
  const allListItems = [...allTasks.children];
  allListItems.forEach((li) => {
    // console.log(li.children);
    if (li.children[0].checked) {
      li.remove();
    }
  });
}

// Show only completed tasks
const completedBtn = document.querySelector(".completed");
completedBtn.addEventListener("click", showCompletedTasks);

function showCompletedTasks() {
  const allListItems = [...allTasks.children];
  allListItems.forEach((li) => {
    // console.log(li.children);
    if (li.children[0].checked) {
      li.classList.remove("hidden");
    } else {
      li.classList.add("hidden");
    }
  });
}

// Show only active tasks
const activeBtn = document.querySelector(".active");
activeBtn.addEventListener("click", showActiveTasks);

function showActiveTasks() {
  const allListItems = [...allTasks.children];
  allListItems.forEach((li) => {
    // console.log(li.children);
    if (li.children[0].checked) {
      li.classList.add("hidden");
    } else {
      li.classList.remove("hidden");
    }
  });
}
// Show all tasks
const allBtn = document.querySelector(".all");
allBtn.addEventListener("click", showAllTasks);

function showAllTasks() {
  const allListItems = [...allTasks.children];
  allListItems.forEach((li) => {
    li.classList.remove("hidden");
  });
}
