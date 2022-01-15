"use strict";
var ElementsIds;
(function (ElementsIds) {
    ElementsIds["tasksList"] = "tasksList";
})(ElementsIds || (ElementsIds = {}));
class Task {
    constructor(name, priority) {
        this.name = name;
        this.priority = priority;
    }
    createTask(name, priority) { }
}
class Tasks {
    constructor(tasks) {
        this.tasks = tasks;
        this.intialTasks();
    }
    intialTasks() {
        const tasksList = document.getElementById(ElementsIds.tasksList);
        this.tasks.map((task) => {
            //   tasksList?.appendChild();
        });
    }
}
