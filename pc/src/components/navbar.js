import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Moon, Sun, Bell } from "react-feather";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const [firstLetter, setFirstLetter] = useState("");
  const [storedUserData, setStoredUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    console.log("Stored Theme:", theme);
    if (theme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    try {
      const storedUserDataString = localStorage.getItem("username");

      if (storedUserDataString) {
        const parsedUserData = JSON.parse(storedUserDataString);
        console.log("Parsed User Data:", parsedUserData);

        if (parsedUserData) {
          setStoredUserData(parsedUserData);
          setFirstLetter(parsedUserData.charAt(0).toUpperCase());
        } else {
          console.log("Error");
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const userRole = localStorage.getItem("role");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleBellIconClick = () => {
    // Redirect to the desired page when bell icon is clicked
    navigate("/notifications");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setStoredUserData(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <NavLink to="/">Laptop Assistance</NavLink>
        </div>
        <div className="flex items-center space-x-4">
          <div
            className="relative w-16 h-6 flex items-center dark:bg-gray-900 bg-teal-500 cursor-pointer rounded-full p-1"
            onClick={() => setDarkMode(!darkMode)}
          >
            <Moon className="text-white" size={18} />
            <div
              className="absolute bg-white  w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
              style={darkMode ? { left: "2px" } : { right: "2px" }}
            ></div>
            <Sun className="ml-auto text-yellow-400" size={18} />
          </div>
          {userRole !== "admin" && (
            <Bell
              className="text-white cursor-pointer"
              size={18}
              onClick={handleBellIconClick}
            />
          )}
          <div className="cursor-pointer relative" onClick={toggleDropdown}>
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              {firstLetter}
            </div>

            {showDropdown && (
              <div className="absolute top-10 right-0 bg-white p-2 rounded shadow">
                <button
                  className="block text-gray-800 hover:bg-gray-200 py-1 px-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          {/* Logout button */}
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
