"use strict";
const newTaskInput = document.querySelector("#new-task");
const allTasks = document.querySelector("ul");
const itemCount = document.querySelector(".items-count");
const bar = document.querySelector(".bar");
const removeTask = document.querySelector(".delete-task");

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
    `<p>${newTaskInput.value}</p>` +
    "<img class='delete-task' src='./images/icon-cross.svg'>";

  allTasks.append(eachTask);
  updateCount(1);
}

function updateCount(num) {
  itemCount.innerHTML = +itemCount.innerHTML + num;
  if (itemCount.innerHTML) {
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
