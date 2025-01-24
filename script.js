document.querySelector("#push").onclick = function () {
  const input = document.querySelector("#newtask input");
  const tasksDiv = document.querySelector("#tasks");

  if (input.value.length == 0) {
    alert("Digite uma tarefa");
  } else {
    tasksDiv.style.display = "block";
    tasksDiv.innerHTML += `
          <div class="task">
              <input type="checkbox" class="task-check">
              <span id="taskname">${input.value}</span>
              <button class="delete">
                  <i class="far fa-trash-alt"></i>
              </button>
          </div>
      `;

    const currentTasks = document.querySelectorAll(".delete");
    for (let i = 0; i < currentTasks.length; i++) {
      currentTasks[i].onclick = function () {
        this.parentNode.remove();

        if (tasksDiv.children.length === 0) {
          tasksDiv.style.display = "none";
        }
      };
    }

    input.value = "";
  }
};
