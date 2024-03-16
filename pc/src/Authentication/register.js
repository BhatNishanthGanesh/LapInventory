import React, { useState } from "react";

import { Link,useNavigate } from "react-router-dom";

const Register = () => {
  // State to manage form input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is set to 'user'
  const navigate = useNavigate();
  // Event handlers to update form input values
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Event handler for form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    // Prepare the registration data
    const registrationData = {
      username,
      password,
      role,
    };

    try {
      // Make a POST request to the backend registration endpoint
      const response = await fetch("http://127.0.0.1:8081/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      // Handle the response
      if (response.ok) {
        console.log("Registration successful!");
        navigate("/login");
        // You can redirect the user to the login page or perform other actions here
      } else {
        console.error("Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      {/* Register Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Dropdown for role selection */}
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-600"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={handleRoleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring focus:border-blue-300"
          >
            Register
          </button>

          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Log in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
