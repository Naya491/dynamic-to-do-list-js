 // Ensure script runs only after HTML document has fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn"); // "Add Task" button
    const taskInput = document.getElementById("task-input");   // Input field for tasks
    const taskList = document.getElementById("task-list");     // UL element to hold tasks
  
    /**
     * Function: addTask
     * Purpose: Adds a new task to the task list if input is not empty.
     */
    function addTask() {
      // Get and trim input value
      const taskText = taskInput.value.trim();
  
      // Check if input is empty
      if (taskText === "") {
        alert("Please enter a task!");
        return;
      }
  
      // Create new list item (<li>)
      const li = document.createElement("li");
      li.textContent = taskText;
  
      // Create remove button
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.className = "remove-btn";
  
      // Add click event to remove button
      removeBtn.onclick = () => {
        taskList.removeChild(li);
      };
  
      // Append remove button to list item
      li.appendChild(removeBtn);
  
      // Append list item to task list
      taskList.appendChild(li);
  
      // Clear the input field
      taskInput.value = "";
    }
  
    // Event listener for Add Task button click
    addButton.addEventListener("click", addTask);
  
    // Event listener for Enter key press inside input field
    taskInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        addTask();
      }
    });
  
    // Optional: Call addTask once when page loads (can preload tasks here if needed)
    // addTask();
  });
  