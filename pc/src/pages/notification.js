import React, { useState } from 'react';
import CustomNavbar from '../components/navbar';
import Footer from '../components/footer';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Notification 1 from admin' },
    { id: 2, message: 'Notification 2 from admin' },
    // Add more notifications as needed
  ]);

  return (
    <>
    <CustomNavbar/>
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md p-4 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>

        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="mb-2">
                {notification.message}
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications right now.</p>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default NotificationPage;
