import React, { useState, useEffect } from "react";

export default function Notification() {
  // Sample notification data (you can replace this with dynamic data from a backend or API)
  const [notifications, setNotifications] = useState([]);
  const [floatingNotifications, setFloatingNotifications] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Simulate fetching notifications
    const dummyNotifications = [
      { id: 1, message: "Your profile has been updated.", type: "all" },
      { id: 2, message: "New comment on your blog post.", type: "following" },
      { id: 3, message: "You have a new follower!", type: "archive" },
    ];

    setNotifications(dummyNotifications);
  }, []);

  // Trigger floating notification on click
  const triggerFloatingNotification = (message) => {
    const newNotification = { id: Date.now(), message };
    setFloatingNotifications((prev) => [...prev, newNotification]);

    // Remove the notification after 5 seconds
    setTimeout(() => {
      setFloatingNotifications((prev) =>
        prev.filter((notification) => notification.id !== newNotification.id)
      );
    }, 500); // Notifications will disappear after 5 seconds
  };

  // Filter notifications based on the selected option
  const filteredNotifications = notifications.filter(
    (notification) => filter === "all" || notification.type === filter
  );

  return (
    <div className="bg-white p-6 rounded shadow-lg w-96 mx-auto mt-10 text-gray-800">
      {/* Your Notifications Header */}
      <h2 className="text-2xl font-semibold mb-4">Your Notifications</h2>

      {/* Filter Options */}
      <div className="flex justify-center space-x-8 mt-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${
            filter === "all" ? "bg-gray-800 text-white" : "bg-gray-300"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            filter === "following" ? "bg-gray-800 text-white" : "bg-gray-300"
          }`}
          onClick={() => setFilter("following")}
        >
          Following
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            filter === "archive" ? "bg-gray-800 text-white" : "bg-gray-300"
          }`}
          onClick={() => setFilter("archive")}
        >
          Archive
        </button>
      </div>

      {/* Main notifications list */}
      <div>
        {filteredNotifications.length === 0 ? (
          <p>No notifications at the moment.</p>
        ) : (
          <ul>
            {filteredNotifications.map((notification) => (
              <li
                key={notification.id}
                className="border-b py-2 cursor-pointer hover:text-blue-500"
                onClick={() => triggerFloatingNotification(notification.message)} // Trigger floating notification on click
              >
                {notification.message}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Floating Notifications */}
      <div
        className="fixed right-0 top-1/2 transform -translate-y-1/2 p-4 space-y-2 z-50"
        style={{ pointerEvents: "none" }} // Disable interaction with floating notifications
      >
        {floatingNotifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-gray-800 text-white p-4 rounded-full shadow-lg animate-fadeIn"
            style={{ pointerEvents: "auto" }} // Enable interaction for this notification
          >
            {notification.message}
          </div>
        ))}
      </div>
    </div>
  );
}
