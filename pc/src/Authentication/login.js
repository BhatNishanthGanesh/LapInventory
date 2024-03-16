import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import wallpaper from '../assets/home-wallpaper.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
      console.log('Updated username:', value);
    } else if (name === 'password') {
      setPassword(value);
      console.log('Updated password:', value.length); // Logging password length
    } else if (name === 'role') {
      setRole(value);
      console.log('Updated role:', value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password,
      role,
    };

    try {
      const response = await fetch('http://127.0.0.1:8081/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Keys in Response Data:', Object.keys(responseData));
        if (responseData.message === 'Login successful') {
          localStorage.setItem('token', responseData.token);
          localStorage.setItem('username', JSON.stringify(responseData.username));
          localStorage.setItem('role', role);
          console.log('Stored username:', localStorage.getItem('username'));
        
          console.log(responseData);
          // navigate('/');
          const userRole = localStorage.getItem('role');
          const targetRoute = userRole === 'admin' ? '/admin' : '/';
            navigate(targetRoute);
        } else {
          console.error('Login failed:', responseData.message);
        }
        
      } else {
        setError('HTTP error during login: ' + response.status);
      }
    } catch (error) {
      setError('Error during login: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="absolute inset-0 md:bg-black md:opacity-50 md:w-1/2"></div>
      <div className="hidden lg:block m-8 md:w-1/2 relative">
        <img src={wallpaper} alt="Laptop Image" className="object-cover w-full h-full" loading="lazy" />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Laptop Assistant</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your username"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-600">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={role}
              onChange={handleInputChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring focus:border-blue-300"
          >
            Log In
          </button>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
