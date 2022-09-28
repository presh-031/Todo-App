"use strict";
const newTaskInput = document.querySelector("#new-task");
const allTasks = document.querySelector("ul");
const bar = document.querySelector(".bar");
const removeTask = document.querySelector(".delete-task");

const itemCountEl = document.querySelector(".items-count");

const data = {};
let itemCount = 0;

filterBtnsColors();
toggleColorMode();

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    // Validation
    if (newTaskInput.value) {
      acceptData();
      updateBarVisibility();
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
}

function updateBarVisibility() {
  bar.classList.remove("hidden");

  const allListItems = [...allTasks.children];
  // The bar is one of the children elements of the allTasks ul (important for styling purposes)
  if (allListItems.length === 1) {
    bar.classList.add("hidden");
  }
}

// Delete tasks
function deleteTask(e) {
  e.parentElement.remove();
  updateBarVisibility();
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
    e.nextElementSibling.classList.add("strike-through");
    updateCount(-1);
  } else {
    e.nextElementSibling.classList.remove("strike-through");
    updateCount(1);
  }
}

////////// Clear completed tasks btn
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

////////////Filter Btns
// Show only completed tasks
const completedBtn = document.querySelector(".completed");
completedBtn.addEventListener("click", showCompletedTasks);

function showCompletedTasks() {
  const allListItems = [...allTasks.children];
  allListItems.forEach((li) => {
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

//Update filterBtns colors
function filterBtnsColors() {
  const filterBtns = document.querySelectorAll(".filterBtn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((btn) => btn.classList.remove("clicked"));
      btn.classList.add("clicked");
    });
  });
}

///////////////////////////
//////////////Dark Mode////
///////////////////////////
function toggleColorMode() {
  const btn = document.querySelector(".color-mode");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme == "dark") {
    document.body.classList.toggle("dark-theme");
    btn.src = "./images/icon-moon.svg";
  } else if (currentTheme == "light") {
    document.body.classList.toggle("light-theme");
    btn.src = "./images/icon-sun.svg";
  }

  btn.addEventListener("click", function () {
    if (prefersDarkScheme.matches) {
      document.body.classList.toggle("light-theme");
      var theme = document.body.classList.contains("light-theme") ? "light" : "dark";
    } else {
      document.body.classList.toggle("dark-theme");
      var theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    }
    localStorage.setItem("theme", theme);
    toggleBtnImg(btn, theme);
  });
}
function toggleBtnImg(btn, theme) {
  if (theme === "dark") {
    btn.src = "./images/icon-moon.svg";
  } else if (theme === "light") {
    btn.src = "./images/icon-sun.svg";
  }
}
