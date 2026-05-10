const mongoose = require("mongoose");

// Define user document structure
const userSchema = new mongoose.Schema({
  // User full name
  name: {
    type: String,
    required: true
  },

  // Unique user email address
  email: {
    type: String,
    required: true,
    unique: true
  },

  // Securely stored hashed password
  passwordHash: {
    type: String,
    required: true
  },

  // User role for authorization
  role: {
    type: String,
    default: "user"
  }

  // Automatically create createdAt and updatedAt fields
}, { timestamps: true });

// Export User model
module.exports = mongoose.model("User", userSchema);