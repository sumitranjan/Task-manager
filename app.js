const express = require("express");
const tasks = require("./task.json").tasks;

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get All tasks
app.get("/tasks", (req, res) => {
  const { completed = "", sortBy = "", order = "" } = req.query;

  let filteredTasks = tasks;

  // Filter by completion status if provided
  if (completed !== "") {
    const completedStatus = completed === "true"; // Convert string to boolean
    filteredTasks = tasks.filter((task) => task.completed == completedStatus);
  }
  // Sort by creation date if requested
  if (sortBy === "createdAt") {
    filteredTasks.sort((a, b) => {
      if (order === "desc") {
        return new Date(b.createdAt) - new Date(a.createdAt); // Descending order
      }
      return new Date(a.createdAt) - new Date(b.createdAt); // Ascending order
    });
  }
  res.status(200).json(filteredTasks);
});

// Retrieve a single task by ID
app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Check if id is a valid number
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  const task = tasks.find((task) => task.id == id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.status(200).json(task);
});

// Create a new task
app.post("/tasks", (req, res) => {
  const { title, description, completed, priority } = req.body;

  // Specific validation checks
  if (!title) {
    return res
      .status(400)
      .json({ error: "Title is required and cannot be empty" });
  }
  if (!description) {
    return res
      .status(400)
      .json({ error: "Description is required and cannot be empty" });
  }
  if (
    completed === undefined ||
    completed === null ||
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({
      error: "Completed must be a boolean and cannot be null or undefined",
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed,
    priority: priority || null, // Set priority if provided, otherwise null
    createdAt: new Date(),
  };
  tasks.push(newTask);

  res.status(201).json(newTask);
});

//Update a task by its ID
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, completed, priority } = req.body;

  // Check if id is a valid number
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  // Specific validation checks
  if (!title) {
    return res
      .status(400)
      .json({ error: "Title is required and cannot be empty" });
  }
  if (!description) {
    return res
      .status(400)
      .json({ error: "Description is required and cannot be empty" });
  }
  if (
    completed === undefined ||
    completed === null ||
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({
      error: "Completed must be a boolean and cannot be null or undefined",
    });
  }

  const task = tasks.find((task) => task.id == id);

  if (!task) {
    return res
      .status(404)
      .json({ error: "The task with the given id was not found" });
  }
  task.title = title;
  task.description = description;
  task.completed = completed;
  task.priority = priority;

  res.json(task);
});

// Delete a task by its ID.
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Check if id is a valid number
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex == -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks.splice(taskIndex, 1);

  res.status(200).json("Task successfully deleted");
});

//Get task based on priority level
app.get("/tasks/priority/:level", (req, res) => {
  const level = req.params.level;

  // Validate priority level
  if (!["low", "medium", "high"].includes(level)) {
    return res.status(400).json({
      error:
        "Invalid priority level. Valid values are 'low', 'medium', 'high'.",
    });
  }

  // Filter tasks by priority level
  const filteredTasks = tasks.filter((task) => task.priority == level);
  res.status(200).json(filteredTasks);
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
