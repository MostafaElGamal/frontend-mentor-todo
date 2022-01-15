enum ElementSelectors {
  tasksListId = "tasksList",
  addTaskFormID = "addTaskForm",
  taskCheckboxClass = "page-body__task-checkbox",
  taskRemoveBtn = "page-body__delete-task",
  checkboxLabelID = "checkbox_label_",
  checkboxLabelCompletedClass = "page-body__label-text--completed",
}

interface TaskInterface {
  name: string;
  priority: number;
  status: boolean;
  id: number;
}

class Task implements TaskInterface {
  name: string;
  priority: number;
  status: boolean;
  id: number;

  constructor(name: string, status: boolean, priority: number = 1) {
    this.name = name;
    this.priority = priority;
    this.status = status;
    this.id = Math.floor(Math.random() * 100) * new Date().getTime() + 1;
  }

  get HtmlElement() {
    const checked = this.status ? "checked" : "";
    const completed = this.status
      ? ElementSelectors.checkboxLabelCompletedClass
      : "";
    const taskHtml: string = `
    <li class="page-body__list-item" id="task_${this.id}">
        <div class="page-body__checkbox-holder"> 
            <div class="page-body__checkbox">
                <input
                  class="${ElementSelectors.taskCheckboxClass}"
                  type="checkbox" 
                  name="checkbox"
                  id="checkbox_${this.id}" 
                  ${checked}
                />
                <label for="checkbox_${this.id}"></label> 
            </div>
            <label for="checkbox_${this.id}" id="${ElementSelectors.checkboxLabelID}${this.id}" class="page-body__label-text ${completed}"> 
            ${this.name} 
            </label>
        </div> 
        <button class="${ElementSelectors.taskRemoveBtn}" 
          id="remove_${this.id}"
          >
            x
        </button>
    </li>`;
    return taskHtml;
  }
}

class Tasks {
  tasks: Array<Task>;
  taskListEle: HTMLElement | null;

  constructor(tasks: Array<Task>) {
    this.taskListEle = document.getElementById(ElementSelectors.tasksListId);
    this.tasks = tasks || [];
    this.intialTasks();
  }

  intialTasks() {
    this.renderTasks();
    this.formSubmitHandler();
    this.removeTaskListener();
    this.completeTaskListener();
  }

  private renderTasks() {
    if (this.taskListEle) {
      this.taskListEle.innerHTML = "";
    }
    this.tasks.sort((a, b) => {
      return a.priority - b.priority;
    });
    this.tasks.map((task) => {
      this.insertTask(task);
    });
  }

  private formSubmitHandler() {
    const addTaskForm = document.getElementById(
      ElementSelectors.addTaskFormID,
    ) as HTMLFormElement;

    addTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formTarget = e.target as HTMLFormElement;
      const name = formTarget.taskName.value;
      const status = formTarget.taskStatus.checked;
      this.createTask(name, status);
      formTarget.reset();
    });
  }

  private completeTask(taskId: string) {
    const selectedTask = this.tasks.find(
      (task) => task.id === parseInt(taskId),
    );
    if (selectedTask) selectedTask.status = !selectedTask.status;
    alert(selectedTask?.status);
    const labelText = document.getElementById(
      ElementSelectors.checkboxLabelID + taskId,
    );

    if (selectedTask?.status) {
      labelText?.classList.add(ElementSelectors.checkboxLabelCompletedClass);
    } else {
      labelText?.classList.remove(ElementSelectors.checkboxLabelCompletedClass);
    }
  }

  private completeTaskListener() {
    document
      .querySelectorAll(`.${ElementSelectors.taskCheckboxClass}`)
      .forEach((item) => {
        item.addEventListener("click", (e) => {
          const checkboxTarget = e.target as HTMLInputElement;
          const taskId = checkboxTarget.id.split("_")[1];
          this.completeTask(taskId);
        });
      });
  }

  private removeTaskListener() {
    document
      .querySelectorAll(`.${ElementSelectors.taskRemoveBtn}`)
      .forEach((item) => {
        item.addEventListener("click", (e) => {
          const removeBtnTarget = e.target as HTMLInputElement;
          const taskId = removeBtnTarget.id.split("_")[1];
          this.removeTask(taskId);
        });
      });
  }

  private removeTask(taskId: string): void {
    document.getElementById(`task_${taskId}`)?.remove();
    const selectedTask = this.tasks.find(
      (task) => task.id === parseInt(taskId),
    );
    this.tasks = this.tasks.filter((task) => task.id != selectedTask?.id);
  }

  private insertTask(task: Task) {
    this.taskListEle?.insertAdjacentHTML("beforeend", task.HtmlElement);
    this.taskListEle?.scrollIntoView({ block: "end" });
  }

  private createTask(name: string, status: boolean) {
    const task = new Task(name, status);
    this.tasks.push(task);
    this.insertTask(task);
    this.completeTaskListener();
    this.removeTaskListener();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // const task0 = new Task("task 1", true, 3);
  // const task1 = new Task("task 2", false, 2);
  // const task2 = new Task("task 3", false, 1);

  new Tasks([]);
});
