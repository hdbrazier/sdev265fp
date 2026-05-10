const Task = require("../models/Task");

// Create a new task
const createTask = async (req, res) => {
  console.log("Create task route hit");
  console.log("req.user:", req.user);
  console.log("req.body:", req.body);

  try {
    const { title, description, dueDate } = req.body;

    // Validate required title field
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Create task linked to logged in user
    const newTask = new Task({
      title,
      description,
      dueDate,
      ownerId: req.user.id
    });

    await newTask.save();

    res.status(201).json({
      message: "Task created successfully",
      task: newTask
    });
  } catch (error) {
    console.error("Create task error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Retrieve all tasks for logged in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      ownerId: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Update selected task information
const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;

    // Find task owned by current user
    const task = await Task.findOne({
      _id: req.params.id,
      ownerId: req.user.id
    });

    // Return error if task does not exist
    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    // Update task fields if new values are provided
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.dueDate = dueDate ?? task.dueDate;
    task.status = status ?? task.status;

    const updatedTask = await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask
    });
  } catch (error) {
    console.error("Update task error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Delete selected task
const deleteTask = async (req, res) => {
  try {
    // Find task owned by current user
    const task = await Task.findOne({
      _id: req.params.id,
      ownerId: req.user.id
    });

    // Return error if task does not exist
    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    console.error("Delete task error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Export controller functions
module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};