import { API_URL } from './config.js';

// GET
function fetchTasks() {
  const tasksDiv = document.querySelector("#tasks");

  fetch(API_URL)
    .then(response => response.json())
    .then(tasks => {
      tasksDiv.innerHTML = "";

      if (tasks.length > 0) {
        tasksDiv.style.display = "block";
        tasks.forEach(task => {
          tasksDiv.innerHTML += `
            <div class="task">
              <input type="checkbox" class="task-check" ${task.completed ? "checked" : ""}>
              <span id="taskname">${task.name}</span>
              <button class="delete" data-id="${task.id}">
                  <i class="far fa-trash-alt"></i>
              </button>
            </div>
          `;
        });

        assignDeleteEvents();
      } else {
        tasksDiv.style.display = "none";
      }
    })
    .catch(error => console.error("Erro ao buscar tarefas:", error));
}

// POST
document.querySelector("#push").onclick = function () {
  const input = document.querySelector("#newtask input");
  const taskName = input.value;

  if (taskName.length === 0) {
    alert("Digite uma tarefa");
  } else {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: taskName,
        completed: false,
      }),
    })
      .then(response => response.json())
      .then(() => {
        fetchTasks();
        input.value = "";
      })
      .catch(error => console.error("Erro ao criar tarefa:", error));
  }
};

// DELETE
function assignDeleteEvents() {
  const deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach(button => {
    button.onclick = function () {
      const taskId = this.dataset.id;

      fetch(`${API_URL}?id=${taskId}`, {
        method: "DELETE",
      })
        .then(response => response.json())
        .then(() => {
          fetchTasks();
        })
        .catch(error => console.error("Erro ao excluir tarefa:", error));
    };
  });
}
