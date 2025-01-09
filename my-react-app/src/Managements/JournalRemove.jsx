import React, { useState, useEffect } from "react";
import axios from "axios";
//{} jeson kaj kore
export default function JournalRemove() {
  const [journals, setJournals] = useState([]);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState(null);
  const [adminToken, setAdminToken] = useState(null);


  // Retrieve the admin token from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("adminAuthToken");
    
    if (token) {
      setAdminToken(token);
    } else {
      setError("Admin token not found. Please log in again.");
    }
  }, []);

  // Fetch journals when the component is mounted
  useEffect(() => {
    const fetchJournals = async () => {
      if (!adminToken) return;

      try {
        console.log("Token:", adminToken);
        const response = await axios.get("http://localhost:8000/admin/journals", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        if (response.status === 200) {
          setJournals(response.data); // Assuming response data is an array of journals
        } else {
          setError(`Failed to load journals: ${response.data.message || "Unknown error."}`);
        }
      } catch (error) {
        console.error("Error fetching journals:", error);
        setError("An error occurred while loading journals.");
      }
    };

    fetchJournals();
  }, [adminToken]);

  const handleRemoveJournal = async (id) => {
    if (!adminToken) {
      setError("Admin token not available. Please log in again.");
      return;
    }

    try {
      setIsRemoving(true);

      // Make a POST request using Axios to remove the journal
      const response = await axios.post(
        "http://localhost:8000/admin/remove-journal",
        id,
        {
          headers: {
            "Content-Type": "application/string",
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (response.status === 200) {
        setJournals((prevJournals) => prevJournals.filter((journal) => journal.id !== id));
        alert("Journal removed successfully.");
      } else {
        setError(`Remove failed: ${response.data.message || "Unknown error."}`);
      }
    } catch (error) {
      console.error("Error removing journal:", error);
      setError("An error occurred while removing the journal.");
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-40">
      <div className="w-full max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Journal Removal</h2>

        {/* Display error if any */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* List of journals with violent posts */}
        <div className="space-y-4">
          {journals

            .map((journal) => (
              <div
                key={journal.id}
                className="border border-gray-300 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{journal.title}</h3>
                  <p className="text-sm text-gray-700">{journal.content}</p>
                </div>
                <button
                  onClick={() => handleRemoveJournal(journal.id)}
                  className={`px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-full hover:bg-red-700 transition duration-200 ${
                    isRemoving ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isRemoving}
                >
                  {isRemoving ? "Removing..." : "Remove"}
                </button>
              </div>
            ))}
        </div>

        {/* No violent posts message */}
        {journals.filter((journal) => journal.isViolent).length === 0 && (
          <p className="mt-4 text-sm text-gray-900">No violent posts detected.</p>
        )}
      </div>
    </div>
  );
}
