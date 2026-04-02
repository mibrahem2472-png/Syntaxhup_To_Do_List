let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ADD
function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    completed: false
  });

  input.value = "";
  save();
  render();
}

// DELETE
function deleteTask(i) {
  tasks.splice(i, 1);
  save();
  render();
}

// TOGGLE ✔️
function toggleTask(i) {
  tasks[i].completed = !tasks[i].completed;
  save();
  render();
}

// RENDER
function render() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let done = tasks.filter(t => t.completed).length;
  let total = tasks.length;

  tasks.forEach((task, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-left">
        <div onclick="toggleTask(${i})" class="check ${task.completed ? 'checked' : ''}"></div>
        <span class="${task.completed ? 'completed' : ''}">
          ${task.text}
        </span>
      </div>

      <div onclick="deleteTask(${i})" class="delete">❌</div>
    `;

    list.appendChild(li);
  });

  // DASHBOARD
  document.getElementById("total").innerText = total;
  document.getElementById("done").innerText = done;

  let percent = total === 0 ? 0 : Math.round((done / total) * 100);
  document.getElementById("percent").innerText = percent + "%";
}

// INIT
render();