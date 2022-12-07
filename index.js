const form = document.forms.add;
const inputForm = form.elements.input;
const dateForm = form.elements.date;
const priorityForm = form.elements.priority;

const tasksContainer = document.querySelector(".tasks-container");
const deleteButton = document.querySelector(".task__delete");
const errorMessage = document.querySelector(".form__error");
const filterSelect = document.querySelector("#ready");
const sortSelect = document.querySelector("#sort");

const tasks = JSON.parse(localStorage.getItem("tasks"));
const tasksId = JSON.parse(localStorage.getItem("id"));

let tasksArray = tasks ? tasks : [];

let id = tasksId ? tasksId : 100;
const date = new Date().toLocaleDateString("en-ca");
dateForm.value = date;

console.log("Рендер страницы");
// Отрисовка темплэйт
const renderTemplate = (data) => {
  const taskElement = document
    .querySelector("#task-template")
    .content.cloneNode(true);
  taskElement.querySelector(".task__title").textContent = data.task;
  taskElement.querySelector(".task__date").textContent = data.dedline;
  taskElement.querySelector(".task__priority").textContent = data.priority;
  const deleteButton = taskElement.querySelector(".task__delete");
  const taskMark = taskElement.querySelector(".task");
  taskMark.id = data.id;
  taskMark.dataset.ready = data.ready;
  taskMark.dataset.create = data.create;
  taskMark.priorityIndex = data.priorityIndex;
  taskMark.addEventListener("click", markTask);
  deleteButton.addEventListener("click", deleteTask);
  if (data.ready === true) {
    taskMark.classList.add("task_checked");
  }

  tasksContainer.append(taskElement);
};

// Добавить задачу
const addTask = (e) => {
  e.preventDefault();

  // Обработка пустого инпута
  if (inputForm.value.length < 1) {
    errorMessage.textContent = "Введите данные";
    setTimeout(() => (errorMessage.textContent = ""), 2000);
    return;
  }
  const dedlineDate = new Date(dateForm.value).toLocaleDateString();
  const createDate = new Date();
  const data = {
    task: inputForm.value,
    dedline: dedlineDate,
    create: createDate,
    priority: priorityForm.value,
    priorityIndex: priorityForm.selectedIndex,
    id,
    ready: false,
  };

  renderTemplate(data);
  tasksArray.push(data);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  inputForm.value = "";
  dateForm.value = date;
  priorityForm.value = "Средний";
  id += 1;
  localStorage.setItem("id", JSON.stringify(id));

  console.log(tasksArray);
};

// Удалить задачу
const deleteTask = (e) => {
  e.preventDefault();
  const data = e.target.closest(".task");
  e.target.closest(".task").remove();
  tasksArray = tasksArray.filter((task) => task.id != data.id);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

// Отметить задачу
const markTask = (e) => {
  e.preventDefault();
  const mark = e.target.closest(".task");
  tasksArray = tasksArray.map((task) => {
    if (task.id == mark.id && task.ready === false) {
      mark.classList.add("task_checked");
      mark.dataset.ready = true;
      return { ...task, ready: true };
    }
    if (task.id == mark.id && task.ready === true) {
      mark.classList.remove("task_checked");
      mark.dataset.ready = false;
      return { ...task, ready: false };
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

// Фильтрs
const filterTask = (e) => {
  e.preventDefault();
  const statusTask = e.target.value;
  const allTasks = document.querySelectorAll(".task");
  allTasks.forEach((task) => {
    if (task.dataset.ready !== statusTask && statusTask !== "all") {
      task.classList.add("task_hide");
    } else {
      task.classList.remove("task_hide");
    }
  });
};

// Функция сортировки
const sortFn = (param) => {
  if (param === "priorityIndex") {
    tasksArray = tasksArray.sort((a, b) => a[param] - b[param]);
  } 
  tasksArray = tasksArray.sort((a, b) => {
    const prev = new Date(a[param]).getTime();
    const next = new Date(b[param]).getTime();
    return prev - next;
  });
};

// Сортs
const sortTask = (e) => {
  e.preventDefault();
  const sortParam = e.target.value;
  sortFn(sortParam);
  const allTasks = document.querySelectorAll(".task");
  allTasks.forEach((task) => {
    task.remove();
  });
  tasksArray.forEach((task) => {
    renderTemplate(task);
  });
};




// Инпут
const handleInput = (e) => {
  e.preventDefault();
};

// Загрузка данных из храилища

tasksArray.forEach((task) => {
  renderTemplate(task);
});

// Слушатели событий
form.addEventListener("submit", addTask);
inputForm.addEventListener("input", handleInput);
filterSelect.addEventListener("input", filterTask);
sortSelect.addEventListener("input", sortTask);
