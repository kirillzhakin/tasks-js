const form = document.forms.add;
const input = form.elements.input;
const tasksContainer = document.querySelector(".tasks-container");
const deleteButton = document.querySelector(".task__delete");
const errorMessage = document.querySelector(".form__error");

const data = JSON.parse(localStorage.getItem("tasks"));
console.log(data);
let tasksArray = data ? data : [];

// Удалить задачу
const deleteTask = (e) => {
  e.preventDefault();
  const data = e.target.closest(".task").children[0].textContent;
  e.target.closest(".task").remove();
  const taskFillter = tasksArray.filter((task) => task !== data);
  console.log(taskFillter);
  localStorage.setItem("tasks", JSON.stringify(taskFillter));
};

// Отметить задачу
const markTask = (e) => {
  e.preventDefault();
  e.target.classList.toggle("task_checked");
};

// Загрузка данных из храилища
tasksArray.forEach((task) => {
  const taskElement = document
    .querySelector("#task-template")
    .content.cloneNode(true);
  taskElement.querySelector(".task__title").textContent = task;
  const deleteButton = taskElement.querySelector(".task__delete");
  const taskMark = taskElement.querySelector(".task");
  taskMark.addEventListener("click", markTask);
  deleteButton.addEventListener("click", deleteTask);
  tasksContainer.append(taskElement);
});

// Инпут
const handleInput = (e) => {
  e.preventDefault();
};

// Добавить задачу
const addTask = (e) => {
  e.preventDefault();

  // Обработка путого инпута
  if (input.value.length < 1) {
    errorMessage.textContent = "Введите данные";
    setTimeout(() => (errorMessage.textContent = ""), 2000);
    return;
  }

  const taskElement = document
    .querySelector("#task-template")
    .content.cloneNode(true);
  const deleteButton = taskElement.querySelector(".task__delete");
  const taskMark = taskElement.querySelector(".task");

  taskElement.querySelector(".task__title").textContent = input.value;
  tasksArray.push(input.value);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  tasksContainer.append(taskElement);
  input.value = "";

  taskMark.addEventListener("click", markTask);
  deleteButton.addEventListener("click", deleteTask);
};

// Слушатели событий
input.addEventListener("input", (e) => handleInput(e));
form.addEventListener("submit", (e) => addTask(e));
