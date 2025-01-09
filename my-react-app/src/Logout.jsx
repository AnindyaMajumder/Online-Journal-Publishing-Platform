import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const history = useHistory();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);

    // Remove JWT token from local storage or session storage
    localStorage.removeItem("jwtToken");

    // Optionally, you can remove it from sessionStorage instead if that's what you use
    // sessionStorage.removeItem("jwtToken");

    // Redirect to login page after logout
    setTimeout(() => {
      history.push("/login");
    }, 1000); // Wait for a moment before redirecting
  };

  return (
    <div className="flex justify-center items-center">
      {isLoggingOut ? (
        <p>Logging out...</p>
      ) : (
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-lg font-semibold rounded-full bg-gray-800 text-white hover:bg-red-900 transition duration-200 ease-in-out"
        >
          Logout
        </button>
      )}
    </div>
  );
}
