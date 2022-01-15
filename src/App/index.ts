enum ElementsIds {
  tasksList = "tasksList",
}

interface TaskInterface {
  name: string;
  priority: number;
}

class Task implements TaskInterface {
  name: string;
  priority: number;

  constructor(name: string, priority: number) {
    this.name = name;
    this.priority = priority;
  }

  createTask(name: string, priority: number) {}
}

class Tasks {
  tasks: Array<Task>;
  constructor(tasks: Array<Task>) {
    this.tasks = tasks;
    this.intialTasks();
  }

  intialTasks() {
    const tasksList: HTMLElement | null = document.getElementById(
      ElementsIds.tasksList,
    );
    this.tasks.map((task) => {
      //   tasksList?.appendChild();
    });
  }
}
