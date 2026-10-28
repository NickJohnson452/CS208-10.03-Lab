// Add dom before event listeners
document.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    // Register addButtonClick as the Add button's click event handler
    const addButton = document.getElementById("add-btn");
    addButton.addEventListener("click", addButtonClick);

    // Add a keyup event handler for the textbox to listen for Enter
    const taskInput = document.getElementById("task-input");
    taskInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            addButtonClick();
        }
    });

    const doneButtons = document.querySelectorAll(".done-btn");
    doneButtons.forEach(button => {
        button.addEventListener("click", removeTask);
    });
}

function addButtonClick() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value;

    // Prevent adding an empty string
    if (taskText.trim() !== "") {
        addTask(taskText);
    }

    // Clear textbox and return focus back to it
    taskInput.value = "";
    taskInput.focus();
}

function addTask(taskText) {
    // Create new <li> element with task text and X button
    const listItem = document.createElement("li");
    listItem.innerHTML = `${taskText} <button class="done-btn">X</button>`;

    // Find the <ol> node and append the new list item
    const ol = document.querySelector("ol");
    ol.appendChild(listItem);

    // Search dom for all done buttons and register removeTask on the newest one
    const doneButtons = document.querySelectorAll(".done-btn");
    const lastButton = doneButtons[doneButtons.length - 1];
    lastButton.addEventListener("click", removeTask);
}

function removeTask(event) {
    // Get the parent node (<li>) and remove it from the parent (<ol>)
    const li = event.target.parentNode;
    const ol = li.parentNode;
    ol.removeChild(li);
}