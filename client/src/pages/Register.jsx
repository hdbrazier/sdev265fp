import { useState } from "react";
import { registerUser } from "../services/api";

function Register() {
  // Store registration form values and status message
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Handle new user registration
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser(name, email, password);

      setMessage("Account created successfully. Redirecting to login...");

      // Redirect user to login page after registration
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Registration page user interface
  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "4rem auto",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: "10px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Create Account</h1>

      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            <strong>Name</strong>
          </label>

          <input
            required
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
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
            <strong>Email</strong>
          </label>

          <input
            required
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
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
            <strong>Password</strong>
          </label>

          <input
            required
            type="password"
            value={password}
            placeholder="Create a password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "0.6rem",
              marginTop: "0.3rem",
            }}
          />
        </div>

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}

      <p style={{ marginTop: "1rem" }}>
        Already have an account? <a href="/">Log in</a>
      </p>
    </div>
  );
}

export default Register;