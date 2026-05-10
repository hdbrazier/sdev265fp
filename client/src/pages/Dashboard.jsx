import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [taskMessage, setTaskMessage] = useState("");

  // Fetch all tasks for logged in user
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const handleCreateTask = async (e) => {
    e.preventDefault();

    // Prevent empty titles
    if (!title.trim()) {
      setTaskMessage("Task title is required.");
      return;
    }

    try {
      console.log("Due date being submitted:", dueDate);
      await createTask({ title, description, dueDate });

      setTaskMessage("Task created successfully.");

      setTitle("");
      setDescription("");
      setDueDate("");

      fetchTasks();
    } catch (error) {
      setTaskMessage(error.message);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error(error.message);
    }
  };

  // Toggle task completion status
  const handleComplete = async (task) => {
    try {
      await updateTask(task._id, {
        status: task.status === "completed" ? "pending" : "completed",
      });
      fetchTasks();
    } catch (error) {
      console.error(error.message);
    }
  };

  // Clear user session and return to login page
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // Load selected task into edit mode
  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };
 
  // Save updated task information
  const handleSaveEdit = async (id) => {
    try {
      await updateTask(id, {
        title: editTitle,
        description: editDescription,
      });

      setEditingTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error(error.message);
    }
  };

  // Dashboard user interface
  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          gap: "1rem",
        }}
      >
        <h1
          style={{
            margin: 0,
          }}
        >
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <section
        style={{
          backgroundColor: "#f7f7f7",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          border: "1px solid #ddd",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Add Task</h2>

        <form onSubmit={handleCreateTask}>
          <div style={{ marginBottom: "1rem" }}>
            <label>
              <strong>Title</strong>
            </label>
            <input
              type="text"
              value={title}
              placeholder="Enter task title"
              onChange={(e) => setTitle(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: "0.6rem",
                marginTop: "0.3rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>
              <strong>Description</strong>
            </label>
            <textarea
              value={description}
              placeholder="Enter task description"
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              style={{
                display: "block",
                width: "100%",
                padding: "0.6rem",
                marginTop: "0.3rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>
              <strong>Due Date</strong>
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: "0.6rem",
                marginTop: "0.3rem",
              }}
            />
          </div>

          <button type="submit">Add Task</button>
        </form>
        {taskMessage && (
          <p style={{ marginTop: "1rem", color: "#333" }}>
            {taskMessage}
          </p>
        )}
      </section>

      <section>
        <h2>Tasks</h2>

        {tasks.length === 0 ? (
          <p>No tasks yet. Add one above to get started.</p>
        ) : (
          <div>
            {tasks.map((task) => (
              <div
                key={task._id}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "1rem",
                  marginBottom: "1rem",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                {editingTaskId === task._id ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                    />

                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows="3"
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                      }}
                    />

                    <button
                      onClick={() => handleSaveEdit(task._id)}
                      style={{ marginTop: "0.5rem" }}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h3 style={{ marginTop: 0 }}>{task.title}</h3>

                    {task.description && <p>{task.description}</p>}
                  </>
                )}

                {task.dueDate && (
                  <p>
                    <strong>Due:</strong> {task.dueDate.split("T")[0]}
                  </p>
                )}

                <p>
                  <strong>Status:</strong>{" "}
                  {task.status === "completed" ? "Completed" : "Not Complete"}
                </p>

                <button onClick={() => handleComplete(task)}>
                  {task.status === "completed" ? "Reopen" : "Complete"}
                </button>
                <button
                  onClick={() => handleEdit(task)}
                  style={{ marginRight: "0.5rem" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;