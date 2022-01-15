"use strict";
var ElementSelectors;
(function (ElementSelectors) {
    ElementSelectors["tasksListId"] = "tasksList";
    ElementSelectors["addTaskFormID"] = "addTaskForm";
    ElementSelectors["taskCheckboxClass"] = "page-body__task-checkbox";
    ElementSelectors["taskRemoveBtn"] = "page-body__delete-task";
    ElementSelectors["checkboxLabelID"] = "checkbox_label_";
    ElementSelectors["checkboxLabelCompletedClass"] = "page-body__label-text--completed";
})(ElementSelectors || (ElementSelectors = {}));
class Task {
    constructor(name, status, priority = 1) {
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
        const taskHtml = `
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
    constructor(tasks) {
        this.taskListEle = document.getElementById(ElementSelectors.tasksListId);
        this.tasks = tasks;
        this.intialTasks();
    }
    intialTasks() {
        this.renderTasks();
        this.formSubmitHandler();
        this.removeTaskListener();
        this.completeTaskListener();
    }
    renderTasks() {
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
    formSubmitHandler() {
        const addTaskForm = document.getElementById(ElementSelectors.addTaskFormID);
        addTaskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formTarget = e.target;
            const name = formTarget.taskName.value;
            const status = formTarget.taskStatus.checked;
            this.createTask(name, status);
            formTarget.reset();
        });
    }
    completeTask(taskId) {
        const selectedTask = this.tasks.find((task) => task.id === parseInt(taskId));
        if (selectedTask)
            selectedTask.status = !selectedTask.status;
        const labelText = document.getElementById(ElementSelectors.checkboxLabelID + taskId);
        labelText === null || labelText === void 0 ? void 0 : labelText.classList.toggle(ElementSelectors.checkboxLabelCompletedClass);
    }
    completeTaskListener() {
        document
            .querySelectorAll(`.${ElementSelectors.taskCheckboxClass}`)
            .forEach((item) => {
            item.addEventListener("click", (e) => {
                const checkboxTarget = e.target;
                const taskId = checkboxTarget.id.split("_")[1];
                this.completeTask(taskId);
            });
        });
    }
    removeTaskListener() {
        document
            .querySelectorAll(`.${ElementSelectors.taskRemoveBtn}`)
            .forEach((item) => {
            item.addEventListener("click", (e) => {
                const removeBtnTarget = e.target;
                const taskId = removeBtnTarget.id.split("_")[1];
                this.removeTask(taskId);
            });
        });
    }
    removeTask(taskId) {
        var _a;
        (_a = document.getElementById(`task_${taskId}`)) === null || _a === void 0 ? void 0 : _a.remove();
        const selectedTask = this.tasks.find((task) => task.id === parseInt(taskId));
        this.tasks = this.tasks.filter((task) => task.id != (selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.id));
    }
    insertTask(task) {
        var _a, _b;
        (_a = this.taskListEle) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", task.HtmlElement);
        (_b = this.taskListEle) === null || _b === void 0 ? void 0 : _b.scrollIntoView({ block: "end" });
    }
    createTask(name, status) {
        const task = new Task(name, status);
        this.tasks.push(task);
        this.insertTask(task);
        this.completeTaskListener();
        this.removeTaskListener();
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const task0 = new Task("task 1", true, 3);
    const task1 = new Task("task 2", false, 2);
    const task2 = new Task("task 3", false, 1);
    new Tasks([task0, task1, task2]);
});
