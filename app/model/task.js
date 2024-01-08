const fs = require("fs");

const readAllTasks = () => {
  const buffer = fs.readFileSync("task.json");
  // chuyen sang chuoi
  const taskString = buffer.toString();
  // chuyen sang json
  const taskJson = JSON.parse(taskString);
  return taskJson;
};

const createTask = (title, description) => {
  const newTask = {
    id: Math.random().toString(),
    title,
    description,
  };
  let taskList = readAllTasks();
  taskList = [...taskList, newTask];
  // taskList.push(newTask)
  fs.writeFileSync("task.json", JSON.stringify(taskList));
  console.log("newTask: ", taskList);
};

const readDetailTask = (id) => {
  const taskList = readAllTasks();
  const task = taskList.find((task) => task.id === id);
  return task;
};

const updateTask = (id, title, description) => {
  let taskList = readAllTasks();
  const index = taskList.findIndex((task) => task.id === id);
  if (index !== -1) {
    // thực hiện update
    const oldTask = taskList[index];
    const newTask = {
      ...oldTask,
      title,
      description,
    };
    taskList[index] = newTask;
    // console.log("taskList: ", taskList);
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return newTask;
  } else {
    // thong báo cho ng dùng
    return false;
  }
};

const deleteTask = (id) => {
  let taskList = readAllTasks();
  const index = taskList.findIndex((task) => task.id === id);
  if (index !== -1) {
    // thực hiện update
    const task = taskList[index];
    taskList = taskList.filter((task) => task.id !== id);
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return task;
  } else {
    // thong báo cho ng dùng
    return false;
  }
};

module.exports = {
  readAllTasks,
  createTask,
  readDetailTask,
  updateTask,
  deleteTask,
};
