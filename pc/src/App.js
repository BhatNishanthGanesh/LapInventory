// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './Authentication/login';
// import Register from './Authentication/register';
// import Home from './pages/Home';
// import NotificationPage from './pages/notification';


// const useAuth = () => {
//   // Implement your authentication logic here
//   // Check if the user is authenticated (e.g., by checking the presence of a token)
//   const isAuthenticated = localStorage.getItem('token') !== null;

//   return isAuthenticated;
// };

// const PrivateRoute = ({ element, path }) => {
//   const isAuthenticated = useAuth();

//   return isAuthenticated ? element : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <div className='dark:bg-dark'>
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/" element={<PrivateRoute element={<Home />} />} />
//         <Route path="/notifications" element={<NotificationPage />} />
//       </Routes>
//     </Router>
//     </div>
//   );
// }

// export default App;


// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Authentication/login';
import Register from './Authentication/register';
import Home from './pages/Home';
import NotificationPage from './pages/notification';
import AdminPage from './pages/Admin'; // Import the AdminPage component

const useAuth = () => {
  // Implement your authentication logic here
  // Check if the user is authenticated (e.g., by checking the presence of a token)
  const isAuthenticated = localStorage.getItem('token') !== null;
  const userRole = localStorage.getItem('role'); // Assume role is stored in localStorage
  console.log(userRole);
  return { isAuthenticated, userRole };
};

const PrivateRoute = ({ element, path }) => {
  const { isAuthenticated, userRole } = useAuth();

  // Check if user is authenticated and has the required role
  const isAdmin = userRole === 'admin';

  // Redirect to different pages based on the role
  if (isAuthenticated) {
    if (isAdmin && path === '/') {
      return <Navigate to="/admin" />;
    } else if (!isAdmin && path === '/admin') {
      return <Navigate to="/" />;
    } else {
      return element;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <div className='dark:bg-dark'>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/admin" element={<AdminPage />} /> {/* Add this route */}
          <Route path="/notifications" element={<NotificationPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
