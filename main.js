const userPrice = document.querySelector("#user-input-price");
const userItem = document.querySelector("#user-input-item");
const taskInput = document.querySelector("#user-input");
const listContainer = document.querySelector("#list-container");
const taskForm = document.querySelector("#task-form");

let tasks = [];

//load data from local starge
const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
  renderList(tasks);
}
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(taskForm);
  tasks.push({
    timeStamp: new Date().toLocaleString("en-UK"),
    description: formData.get("user-input-item"),
    Price: formData.get("user-input-price"),
  });
  renderList(tasks);
  saveStateToLocalStorage();
});
function renderList(taskArr) {
  buildList(tasks);
}
//...---Build list---...//
function buildList(taskArr) {
  while (listContainer.firstChild) {
    listContainer.firstChild.remove();
  }
  taskArr.forEach((task, i) => {
    const timeStampElem = document.createElement("p");
    timeStampElem.classList.add("timestamp");
    timeStampElem.textContent = task.timeStamp;
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("textcontainer");
    const descriptionElemPrice = document.createElement("input");
    descriptionElemPrice.value = task.Price;
    descriptionElemPrice.classList.add("description");
    const descriptionElem = document.createElement("input");
    descriptionElem.classList.add("description");
    descriptionElem.value = task.description;
    descriptionElem.readOnly = true;
    // buttons
    const editButton = document.createElement("button");
    editButton.textContent = "Edit item";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => {
      tasks[i].description = descriptionElem.value;
      saveStateToLocalStorage();
      descriptionElem.readOnly = !descriptionElem.readOnly;
      editButton.textContent = descriptionElem.readOnly
        ? "Edit item"
        : "Save item";
      if (!descriptionElem.readOnly) descriptionElem.focus();
    });
    //...---delete button here---...//
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove item";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {});
    taskContainer.append(
      descriptionElemPrice,
      descriptionElem,
      editButton,
      deleteButton,
      timeStampElem
    );
    listContainer.prepend(taskContainer);
  });
}
function saveStateToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
