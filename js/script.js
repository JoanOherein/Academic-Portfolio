// Shared portfolio JavaScript: mobile navigation, planner, and contact validation.
document.addEventListener("DOMContentLoaded", () => {
  initialiseNavigation();
  updateCopyrightYear();
  initialiseImageFallbacks();
  initialisePlanner();
  initialiseContactForm();
});

function initialiseNavigation() {
  const navigationToggle = document.querySelector(".nav-toggle");
  const primaryNavigation = document.querySelector("#primary-nav");

  if (!navigationToggle || !primaryNavigation) return;

  navigationToggle.addEventListener("click", () => {
    const isOpen = navigationToggle.getAttribute("aria-expanded") === "true";
    navigationToggle.setAttribute("aria-expanded", String(!isOpen));
    navigationToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    primaryNavigation.classList.toggle("open", !isOpen);
  });

  primaryNavigation.addEventListener("click", (event) => {
    if (event.target.matches("a") && primaryNavigation.classList.contains("open")) {
      navigationToggle.setAttribute("aria-expanded", "false");
      navigationToggle.setAttribute("aria-label", "Open navigation");
      primaryNavigation.classList.remove("open");
    }
  });
}

function updateCopyrightYear() {
  const yearElement = document.querySelector("#current-year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();
}

function initialiseImageFallbacks() {
  document.querySelectorAll("img[data-fallback]").forEach((image) => {
    image.addEventListener("error", () => {
      if (image.src.endsWith(image.dataset.fallback)) return;
      image.src = image.dataset.fallback;
    }, { once: true });

    if (image.complete && image.naturalWidth === 0 && !image.src.endsWith(image.dataset.fallback)) {
      image.src = image.dataset.fallback;
    }
  });
}

const PLANNER_STORAGE_KEY = "joanAcademicTasks";
let plannerTasks = [];
let activeTaskFilter = "all";

function initialisePlanner() {
  const taskForm = document.querySelector("#task-form");
  if (!taskForm) return;

  plannerTasks = loadTasks();

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addTask();
  });

  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      activeTaskFilter = button.dataset.filter;
      document.querySelectorAll(".filter-button").forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });
      renderTasks();
    });
  });

  renderTasks();
}

function loadTasks() {
  try {
    const savedValue = localStorage.getItem(PLANNER_STORAGE_KEY);
    if (!savedValue) return [];
    const parsedTasks = JSON.parse(savedValue);
    if (!Array.isArray(parsedTasks)) return [];

    return parsedTasks.filter((task) =>
      task && typeof task.id === "string" && typeof task.title === "string" && typeof task.completed === "boolean"
    );
  } catch (error) {
    console.warn("Saved academic tasks could not be read.", error);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(plannerTasks));
  } catch (error) {
    console.warn("Academic tasks could not be saved.", error);
  }
}

function createTaskId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
}

function addTask() {
  const taskInput = document.querySelector("#task-input");
  const taskError = document.querySelector("#task-error");
  const taskTitle = taskInput.value.trim();

  if (!taskTitle) {
    taskError.textContent = "Please enter an academic task before adding it.";
    taskInput.setAttribute("aria-invalid", "true");
    taskInput.focus();
    return;
  }

  const newTask = { id: createTaskId(), title: taskTitle, completed: false };
  plannerTasks.unshift(newTask);
  taskInput.value = "";
  taskError.textContent = "";
  taskInput.removeAttribute("aria-invalid");
  saveTasks();
  renderTasks();
  taskInput.focus();
}

function toggleTask(taskId) {
  plannerTasks = plannerTasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task);
  saveTasks();
  renderTasks();
}

function deleteTask(taskId) {
  plannerTasks = plannerTasks.filter((task) => task.id !== taskId);
  saveTasks();
  renderTasks();
}

function getFilteredTasks() {
  if (activeTaskFilter === "pending") return plannerTasks.filter((task) => !task.completed);
  if (activeTaskFilter === "completed") return plannerTasks.filter((task) => task.completed);
  return plannerTasks;
}

function renderTasks() {
  const taskList = document.querySelector("#task-list");
  const emptyState = document.querySelector("#empty-state");
  const visibleTasks = getFilteredTasks();

  taskList.replaceChildren();

  visibleTasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = `task-item${task.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `${task.completed ? "Mark incomplete" : "Mark complete"}: ${task.title}`);
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-task";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", `Delete task: ${task.title}`);
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    listItem.append(checkbox, title, deleteButton);
    taskList.append(listItem);
  });

  const hasVisibleTasks = visibleTasks.length > 0;
  emptyState.hidden = hasVisibleTasks;
  if (!hasVisibleTasks) {
    if (plannerTasks.length === 0) emptyState.textContent = "No tasks yet. Add your first academic task above.";
    else emptyState.textContent = `No ${activeTaskFilter} tasks to show.`;
  }

  updateTaskSummary();
}

function updateTaskSummary() {
  const total = plannerTasks.length;
  const completed = plannerTasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.querySelector("#total-count").textContent = total;
  document.querySelector("#completed-count").textContent = completed;
  document.querySelector("#pending-count").textContent = pending;
  document.querySelector("#progress-label").textContent = `${percentage}%`;
  document.querySelector("#progress-bar").style.width = `${percentage}%`;

  const progressTrack = document.querySelector(".progress-track");
  progressTrack.setAttribute("aria-valuenow", String(percentage));
}

const MINIMUM_PHONE_LENGTH = 7;

function initialiseContactForm() {
  const contactForm = document.querySelector("#contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    validateContactForm();
  });

  contactForm.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateContactField(field);
      document.querySelector("#form-success").classList.remove("visible");
    });
  });
}

function setFieldError(field, message) {
  const errorElement = document.querySelector(`#${field.id}-error`);
  if (!errorElement) return;
  errorElement.textContent = message;
  field.setAttribute("aria-invalid", String(Boolean(message)));
}

function validateContactField(field) {
  const value = field.value.trim();
  let message = "";

  if (!value) {
    message = `${field.labels[0].textContent.replace("*", "").trim()} is required.`;
  } else if (field.id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    message = "Enter a valid email address, such as name@example.com.";
  } else if (field.id === "phone") {
    if (!/^\d+$/.test(value)) message = "Phone number must contain digits only.";
    else if (value.length < MINIMUM_PHONE_LENGTH) message = `Phone number must contain at least ${MINIMUM_PHONE_LENGTH} digits.`;
  }

  setFieldError(field, message);
  return message === "";
}

function validateContactForm() {
  const contactForm = document.querySelector("#contact-form");
  const fields = [...contactForm.querySelectorAll("input, textarea")];
  const invalidFields = fields.filter((field) => !validateContactField(field));
  const successMessage = document.querySelector("#form-success");

  if (invalidFields.length > 0) {
    successMessage.classList.remove("visible");
    successMessage.textContent = "";
    invalidFields[0].focus();
    return;
  }

  fields.forEach((field) => { field.value = field.value.trim(); });
  successMessage.textContent = "Validation successful. Your details are complete, but this demonstration has not sent or delivered a message.";
  successMessage.classList.add("visible");
}