const yargs = require("yargs");
const fs = require("fs");
const { readAllTasks, createTask, readDetailTask, updateTask, deleteTask } = require("./model/task");

yargs.command({
  command: "test",
  handler: () => {
    console.log("test");
  },
});

// CRUD
// create command - node app/index.js create --title="hoc nodejs" --description="dau kho lam dau"
yargs.command({
  command: "create",
  buider: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { title, description } = args;
    createTask(title, description);
  },
});

// read all
yargs.command({
  command: "read-all",
  handler: () => {
    const result = readAllTasks();
    console.log("taskJson: ", result);
    console.log("read all");
  },
});

// read detail - node app/index.js read-detail --id="123"
yargs.command({
  command: "read-detail",
  buider: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const task = readDetailTask(id.toString());
    // console.log(task)
    if (task) {
      console.log("task: ", task);
    } else {
      console.log("Not Found!");
    }
  },
});

// update command - node app/index.js update --id="1" --title="hoc nodejs" --description="dau kho lam dau aa"
yargs.command({
  command: "update",
  buider: {
    id: {
      type: "string",
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id, title, description } = args;
    const task = updateTask(id.toString(), title, description);
    if (task) {
      console.log("task updated: ", task);
    } else {
      console.log("Not Found!");
    }
  },
});

// delete command - node app/index.js delete --id="123"
yargs.command({
  command: "delete",
  handler: (args) => {
    const { id } = args;
    const task = deleteTask(id.toString());
    if (task) {
      console.log("task deleted: ", task);
    } else {
      console.log("Not Found!");
    }
  },
});

// save command
yargs.parse();
