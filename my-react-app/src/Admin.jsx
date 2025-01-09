import React, { useState } from "react";
import AdminBack from "./AdminBack";
import JournalRemove from "./JournalRemove";
import ReportLog from "./ReportLog";
import AccountRemove from "./AccountRemove";
import Announcement from "./Announcement";
import ManageTags from "./ManageTags";

export default function AdminPanel() {
  const [activeFeature, setActiveFeature] = useState("JournalRemove");
  const [reports, setReports] = useState([
    { id: 1, user: "JohnDoe", content: "Spam post in the forums", status: "Pending" },
    { id: 2, user: "JaneSmith", content: "Inappropriate comment", status: "Pending" },
    { id: 3, user: "AliceBrown", content: "Harassment in messages", status: "Resolved" },
  ]);

  const handleLogout = async () => {
    const token = localStorage.getItem("adminAuthToken");

    try {
      const response = await fetch("http://localhost:8000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Logout successfull");
        // Clear token and redirect to login
        localStorage.removeItem("adminAuthToken");
        window.location.href = "/login";
      } else {
        console.error("Failed to log out:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const renderFeature = () => {
    switch (activeFeature) {
      case "JournalRemove":
        return <JournalRemove />;
      case "ReportLog":
        return <ReportLog reports={reports} setReports={setReports} />;
      case "AccountRemove":
        return <AccountRemove />;
      case "Announcement":
        return <Announcement />;
      case "ManageTags":
        return <ManageTags />;
      default:
        return <JournalRemove />;
    }
  };

  return (
    <AdminBack>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white flex flex-col">
          <h1 className="text-2xl font-bold text-center py-4 border-b border-gray-700">
            Admin Panel
          </h1>
          <button
            className={`py-2 px-4 text-left ${activeFeature === "JournalRemove" ? "bg-gray-700" : "hover:bg-gray-600"}`}
            onClick={() => setActiveFeature("JournalRemove")}
          >
            Journal Remove
          </button>
          <button
            className={`py-2 px-4 text-left ${activeFeature === "ReportLog" ? "bg-gray-700" : "hover:bg-gray-600"}`}
            onClick={() => setActiveFeature("ReportLog")}
          >
            Report Log
          </button>
          <button
            className={`py-2 px-4 text-left ${activeFeature === "AccountRemove" ? "bg-gray-700" : "hover:bg-gray-600"}`}
            onClick={() => setActiveFeature("AccountRemove")}
          >
            Account Remove
          </button>
          <button
            className={`py-2 px-4 text-left ${activeFeature === "Announcement" ? "bg-gray-700" : "hover:bg-gray-600"}`}
            onClick={() => setActiveFeature("Announcement")}
          >
            Announcement
          </button>
          <button
            className={`py-2 px-4 text-left ${activeFeature === "ManageTags" ? "bg-gray-700" : "hover:bg-gray-600"}`}
            onClick={() => setActiveFeature("ManageTags")}
          >
            Manage Tags
          </button>
          <button
            className="mt-auto py-2 px-4 text-left bg-gray-800 hover:bg-red-900 transition duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">{renderFeature()}</div>
      </div>
    </AdminBack>
  );
}
