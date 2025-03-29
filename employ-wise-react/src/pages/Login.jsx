import React, { useState } from "react";

const Login = () => {
  // State to store email & password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle login
  const handleLogin = async () => {
    try {
      console.log("Logging in with:", email, password); // Debugging

      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data); //  Debug Response

      if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "/users"; // Redirect to users page
      } else {
        console.error("Login failed:", data.error);
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Update email state
        required
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Update password state
        required
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
