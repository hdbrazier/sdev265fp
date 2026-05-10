import { useState } from "react";
import { loginUser } from "../services/api";

function Login() {
  // Store login form values and status message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Handle user login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      // Save authentication data locally
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login successful");

      // Redirect user to dashboard
      window.location.href = "/dashboard";

      console.log("Logged in user:", data.user);
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Login page user interface
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Login
        </button>
      </form>

      {message && <p>{message}</p>}

      <p style={{ marginTop: "1rem" }}>
        Don&apos;t have an account? <a href="/register">Create one</a>
      </p>
    </div>
  );
}

export default Login;