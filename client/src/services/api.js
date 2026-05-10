// Base backend API URL
const API_URL = "http://localhost:5001/api";

// Authenticate existing user
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  // Display login error if request fails
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

// Retrieve all tasks for logged in user
export const getTasks = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  // Display error if tasks cannot be retrieved
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch tasks");
  }

  return data;
};

// Create a new task
export const createTask = async (taskData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(taskData)
  });

  const data = await response.json();

  // Display error if task creation fails
  if (!response.ok) {
    throw new Error(data.message || "Failed to create task");
  }

  return data;
};

// Delete selected task
export const deleteTask = async (taskId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  // Display error if task deletion fails
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete task");
  }

  return data;
};

// Update existing task information
export const updateTask = async (taskId, updatedData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updatedData)
  });

  const data = await response.json();

  // Display error if task update fails
  if (!response.ok) {
    throw new Error(data.message || "Failed to update task");
  }

  return data;
};

// Register a new user account
export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  // Display registration error if request fails
  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};