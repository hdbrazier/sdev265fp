const mongoose = require("mongoose");

// Define task document structure
const taskSchema = new mongoose.Schema({
  // Task title (required)
  title: {
    type: String,
    required: true
  },

  // Optional task description
  description: String,

  // Task completion status
  status: {
    type: String,
    default: "pending"
  },

  // Optional task due date
  dueDate: Date,

  // Reference to task owner
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

  // Automatically create createdAt and updatedAt fields
}, { timestamps: true });

// Export Task model
module.exports = mongoose.model("Task", taskSchema);