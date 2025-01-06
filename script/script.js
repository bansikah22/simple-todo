document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('clearTasksBtn').addEventListener('click', clearTasks);
document.getElementById('viewChartBtn').addEventListener('click', viewChart);

let editingIndex = -1; // To track which task is being edited

function addTask() {
   const taskInput = document.getElementById('taskInput').value.trim();
   const taskTime = document.getElementById('taskTime').value;

   if (taskInput && taskTime) {
       const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
       
       if (editingIndex === -1) {
           // Add new task
           tasks.push({ task: taskInput, time: taskTime, completed: false });
       } else {
           // Edit existing task
           tasks[editingIndex] = { task: taskInput, time: taskTime, completed: tasks[editingIndex].completed };
           editingIndex = -1; // Reset editing index after editing
       }

       localStorage.setItem('tasks', JSON.stringify(tasks));
       displayTasks();
       resetInputs();
   } else {
       alert("Please enter both a task and a due date/time.");
   }
}

function displayTasks() {
   const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
   
   const tbody = document.querySelector('#taskList tbody');
   
   tbody.innerHTML = '';

   tasks.forEach((taskObj, index) => {
       const tr = document.createElement('tr');
       
       const tdTask = document.createElement('td');
       tdTask.textContent = taskObj.task;

       const tdTime = document.createElement('td');
       tdTime.textContent = new Date(taskObj.time).toLocaleString();

       const tdStatus = document.createElement('td');
       tdStatus.textContent = taskObj.completed ? 'Done' : 'Pending';
       
       const tdAction = document.createElement('td');
       
       const editBtn = document.createElement('button');
       editBtn.innerHTML = '<i class="fas fa-edit"></i>'; // Edit icon
       editBtn.onclick = () => editTask(index);
       
       const doneBtn = document.createElement('button');
       doneBtn.innerHTML = taskObj.completed ? '<i class="fas fa-undo"></i>' : '<i class="fas fa-check"></i>'; // Done/Undo icon
       doneBtn.onclick = () => toggleTaskCompletion(index);
       
       const deleteBtn = document.createElement('button');
       deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'; // Delete icon
       deleteBtn.onclick = () => deleteTask(index);
       
       tdAction.appendChild(editBtn);
       tdAction.appendChild(doneBtn);
       tdAction.appendChild(deleteBtn);
       
       tr.appendChild(tdTask);
       tr.appendChild(tdTime);
       tr.appendChild(tdStatus);
       tr.appendChild(tdAction);
       
       tbody.appendChild(tr);
   });
}

// Function to reset input fields
function resetInputs() {
   document.getElementById('taskInput').value = '';
   document.getElementById('taskTime').value = '';
}

// Function to delete a specific task
function deleteTask(index) {
   const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
   
   // Remove the task at the specified index
   tasks.splice(index, 1);
   
   // Update local storage
   localStorage.setItem('tasks', JSON.stringify(tasks));
   
   // Refresh the displayed tasks
   displayTasks();
}

// Function to clear all tasks
function clearTasks() {
   localStorage.removeItem('tasks');
   displayTasks();
}

// Function to edit a specific task
function editTask(index) {
   const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
   
   // Set input values to the selected task's values
   document.getElementById('taskInput').value = tasks[index].task;
   document.getElementById('taskTime').value = tasks[index].time;
   
   editingIndex = index; // Set editing index to the current index
}

// Function to toggle completion status of a specific task
function toggleTaskCompletion(index) {
   const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
   
   // Toggle the completed status of the selected task
   tasks[index].completed = !tasks[index].completed;

   // Update local storage
   localStorage.setItem('tasks', JSON.stringify(tasks));

   // Refresh the displayed tasks
   displayTasks();
}

// Function to view chart (placeholder)
function viewChart() {
   alert("This feature will show a chart of your tasks."); 
}

// Call displayTasks on page load to show existing tasks
window.onload = displayTasks;
