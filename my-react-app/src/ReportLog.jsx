import React, { useState } from "react";

export default function ReportLog() {
  // Sample data for reports
  const [reports, setReports] = useState([
    { id: 1, user: "JohnDoe", content: "Spam post in the forums", status: "Pending" },
    { id: 2, user: "JaneSmith", content: "Inappropriate comment", status: "Pending" },
    { id: 3, user: "AliceBrown", content: "Harassment in messages", status: "Resolved" },
  ]);

  // Handle resolving a report
  const handleResolve = (id) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id ? { ...report, status: "Resolved" } : report
      )
    );
    alert(`Report ${id} has been resolved.`);
  };

  // Handle deleting a report
  const handleDelete = (id) => {
    setReports((prevReports) => prevReports.filter((report) => report.id !== id));
    alert(`Report ${id} has been deleted.`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Report Log
        </h2>
        <ul className="space-y-4">
          {reports.map((report) => (
            <li key={report.id} className="border-b pb-4">
              <p className="text-sm text-gray-600">
                <strong>User:</strong> {report.user}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Content:</strong> {report.content}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong>{" "}
                <span
                  className={
                    report.status === "Resolved" ? "text-green-600" : "text-red-600"
                  }
                >
                  {report.status}
                </span>
              </p>
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => handleResolve(report.id)}
                  className="w-full px-8 py-3 bg-gray-800 text-white text-base font-medium rounded-full hover:bg-blue-700 transition duration-200"
                  disabled={report.status === "Resolved"}
                >
                  Resolve
                </button>
                <button
                  onClick={() => handleDelete(report.id)}
                  className="w-full px-8 py-3 bg-gray-800 text-white text-base font-medium rounded-full hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
