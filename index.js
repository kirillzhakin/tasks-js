const form = document.forms.add;
const input = form.elements.input;
const tasksContainer = document.querySelector(".tasks-container");
const deleteButton = document.querySelector(".task__delete");
const errorMessage = document.querySelector(".form__error");

const data = JSON.parse(localStorage.getItem("tasks"));
console.log(data);
let tasksArray = data ? data : [];

// Получаем темплэйт
const handleTemplate = (data) => {
  const taskElement = document
    .querySelector("#task-template")
    .content.cloneNode(true);
  taskElement.querySelector(".task__title").textContent = data;
  const deleteButton = taskElement.querySelector(".task__delete");
  const taskMark = taskElement.querySelector(".task");
  taskMark.addEventListener("click", markTask);
  deleteButton.addEventListener("click", deleteTask);
  tasksContainer.append(taskElement);
};

// Добавить задачу
const addTask = (e) => {
  e.preventDefault();

  // Обработка пустого инпута
  if (input.value.length < 1) {
    errorMessage.textContent = "Введите данные";
    setTimeout(() => (errorMessage.textContent = ""), 2000);
    return;
  }
  handleTemplate(input.value);
  tasksArray.push(input.value);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  input.value = "";
  console.log(tasksArray);
};

// Удалить задачу
const deleteTask = (e) => {
  e.preventDefault();
  const data = e.target.closest(".task").children[0].textContent;
  e.target.closest(".task").remove();
  tasksArray = tasksArray.filter((task) => task !== data);
  console.log(tasksArray);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

// Отметить задачу
const markTask = (e) => {
  e.preventDefault();
  e.target.classList.toggle("task_checked");
};

// Инпут
const handleInput = (e) => {
  e.preventDefault();
};

// Загрузка данных из храилища
tasksArray.forEach((task) => {
  handleTemplate(task);
});

// Слушатели событий
input.addEventListener("input", (e) => handleInput(e));
form.addEventListener("submit", (e) => addTask(e));
