import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    email: "user@example.com",
    bio: "This is my bio.",
    password: "********",
  });

  const [section, setSection] = useState("myPosts");

  const handleEditInfo = (updatedInfo) => {
    setUserInfo((prev) => ({ ...prev, ...updatedInfo }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">My Profile</h1>

        <div className="grid grid-cols-4 gap-4">
          <nav className="col-span-1 bg-white shadow-md rounded-lg p-4">
            <ul className="space-y-4">
              <li>
                <button
                  className={`w-full text-left p-2 rounded ${section === "myPosts" && "bg-blue-500 text-white"}`}
                  onClick={() => setSection("myPosts")}
                >
                  My Posts
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-2 rounded ${section === "editInfo" && "bg-blue-500 text-white"}`}
                  onClick={() => setSection("editInfo")}
                >
                  Edit Information
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-2 rounded ${section === "savedPosts" && "bg-blue-500 text-white"}`}
                  onClick={() => setSection("savedPosts")}
                >
                  Saved Posts
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-2 rounded ${section === "likedPosts" && "bg-blue-500 text-white"}`}
                  onClick={() => setSection("likedPosts")}
                >
                  Liked Posts
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-2 rounded ${section === "warnings" && "bg-blue-500 text-white"}`}
                  onClick={() => setSection("warnings")}
                >
                  Warnings
                </button>
              </li>
            </ul>
          </nav>

          <main className="col-span-3 bg-white shadow-md rounded-lg p-4">
            {section === "myPosts" && <MyPosts />}
            {section === "editInfo" && <EditInformation userInfo={userInfo} onEdit={handleEditInfo} />}
            {section === "savedPosts" && <SavedPosts />}
            {section === "likedPosts" && <LikedPosts />}
            {section === "warnings" && <Warnings />}
          </main>
        </div>
      </div>
    </div>
  );
};

const MyPosts = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">My Posts</h2>
    <p>List of journals authored by you will appear here.</p>
  </div>
);

const EditInformation = ({ userInfo, onEdit }) => {
  const [formState, setFormState] = useState(userInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(formState);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            value={formState.bio}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

const SavedPosts = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Saved Posts</h2>
    <p>List of journals saved for later reading will appear here.</p>
  </div>
);

const LikedPosts = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Liked Posts</h2>
    <p>List of journals you have liked will appear here.</p>
  </div>
);

const Warnings = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Warnings</h2>
    <p>Notifications from the admin regarding platform violations will appear here.</p>
  </div>
);

export default ProfilePage;
