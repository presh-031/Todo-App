"use strict";
const newTaskInput = document.querySelector("#new-task");
const allTasks = document.querySelector("ul");
const itemCount = document.querySelector(".items-count");
const bar = document.querySelector(".bar");
const removeTask = document.querySelector(".delete-task");
const completed = false; //working on this for checkbox
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
  if (itemCount.innerHTML === 0) {
    hideBar();
  }
}

function hideBar() {
  bar.classList.add("hidden");
}

function showBar() {
  bar.classList.remove("hidden");
}

// Delete tasks
function deleteTask(task) {
  task.remove();
  updateCount(-1);
}
allTasks.addEventListener("click", (e) => {
  // console.log(e.target.parentElement);
  if (e.target.classList.contains("delete-task")) {
    deleteTask(e.target.parentElement);
  }
});

// Clear Tasks
// const clearTask = document.querySelector(".checkbox");
// clearTask.addEventListener("change", function () {
//   if (this.checked) {
//     console.log("Checkbox is checked..");
//   } else {
//     console.log("Checkbox is not checked..");
//   }
// });

function markTask() {
  updateCount(-1);
  document.querySelector(".new-task").style.textDecoration = "line-through";
}
allTasks.addEventListener("click", (e) => {
  const clearTask = document.querySelector(".checkbox");
  if (e.target.classList.contains("checkbox")) {
    clearTask.addEventListener("change", () => {
      if (clearTask.checked) {
        console.log("Checkbox is checked..");
      } else {
        console.log("Checkbox is not checked..");
      }
    });
  }
});

// if (clearTask) {
//   console.log("Checkbox is checked..");
// } else {
//   console.log("Checkbox is not checked..");
// }
