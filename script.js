// Persisted To-Do List with Local Storage
document.addEventListener("DOMContentLoaded", () => {
    // ---- DOM refs ----
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList  = document.getElementById("task-list");

    // ---- Storage helpers ----
    const getStoredTasks = () =>
        JSON.parse(localStorage.getItem("tasks") || "[]");

    const setStoredTasks = (tasks) =>
        localStorage.setItem("tasks", JSON.stringify(tasks));

    // ---- Render one task into the DOM ----
    function renderTask(taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        // Remove from DOM + Local Storage
        removeBtn.onclick = function () {
            taskList.removeChild(li);

            // Update storage (remove first matching instance)
            const tasks = getStoredTasks();
            const idx = tasks.indexOf(taskText);
            if (idx > -1) {
                tasks.splice(idx, 1);
                setStoredTasks(tasks);
            }
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // ---- Add task (optionally skip saving when loading) ----
    function addTask(taskText, save = true) {
        // Support: called with no args (read from input), or with text (e.g., from load)
        const text = (typeof taskText === "string" ? taskText : taskInput.value).trim();

        if (text === "") {
            alert("Please enter a task.");
            return;
        }

        // Paint it
        renderTask(text);

        // Save if requested
        if (save) {
            const tasks = getStoredTasks();
            tasks.push(text);
            setStoredTasks(tasks);
        }

        // Clear input only when user added from the box
        if (typeof taskText !== "string") {
            taskInput.value = "";
        }
    }

    // ---- Load tasks on page load ----
    function loadTasks() {
        const stored = getStoredTasks();
        stored.forEach((t) => addTask(t, false)); // don't re-save while loading
    }

    // ---- Events ----
    addButton.addEventListener("click", () => addTask());
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") addTask();
    });

    // Init
    loadTasks();
});
