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
  itemCount.innerHTML = +itemCount.innerHTML + num;

  // console.log(itemCount.innerHTML);
  // if (itemCount.innerHTML <= 0) {
  // hideBar();
  // itemCount.innerHTML = 0;
  // }
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
  // should only further decrease count if not already checked.
  updateCount(-1);
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
    console.log("checked");
    e.nextElementSibling.classList.add("strike-through");
    updateCount(-1);
  } else {
    console.log("unchecked");
    e.nextElementSibling.classList.remove("strike-through");
    updateCount(1);
  }
}

////////The buttons
// Clear completed tasks
const clearCompletedBtn = document.querySelector(".clear-completed");
// Add a modal for are you sure.
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
      li.classList.add("hidden");
    }
  });
  // loop starts at i to ignore the bar
  // for (let i = 1; i < allTasks.children.length; i++) {
  //   // console.log(allTasks.children[i].children);
  //   if (!allTasks.children[i].children[0].checked) {
  //     allTasks.children[i].classList.add("hidden");
  //     // updateCount(-1);
  //     // console.log(allTasks.children[i]);
  //   } else {
  //     allTasks.children[i].classList.remove("hidden");
  //   }
  // }
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
