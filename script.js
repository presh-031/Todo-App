"use strict";
const newTaskInput = document.querySelector("#new-task");
const itemCount = document.querySelector(".items-count");
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addNewTask();
    showHiddenBar();
    newTaskInput.value = "";
    // deleteTask();
  }
});

// const allTasksArr = [];
const allTasks = document.querySelector("ul");
function addNewTask() {
  const eachTask = document.createElement("li");

  eachTask.innerHTML =
    "<input type='checkbox'> " +
    `<p>${newTaskInput.value}</p>` +
    "<img class='delete-task' src='./images/icon-cross.svg'>";
  // allTasksArr.push(eachTask);
  // console.log(allTasksArr);

  // allTasksArr.forEach((task) => {
  // allTasks.appendChild(task);
  allTasks.append(eachTask);
  updateCount(1);
  // });
}
function updateCount(num) {
  itemCount.innerHTML = +itemCount.innerHTML + num;
}

function showHiddenBar() {
  const bar = document.querySelector(".bar");
  bar.classList.remove("hidden");
}
// Delete tasks
function deleteTask(task) {
  task.remove();
  updateCount(-1);
}

allTasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-task")) {
    deleteTask(e.target.parentElement);
  }
});

// drag and drop
sortable.create(ul);
