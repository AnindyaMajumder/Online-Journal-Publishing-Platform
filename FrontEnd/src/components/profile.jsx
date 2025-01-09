import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
const token = localStorage.getItem("authToken");

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "Enter first name",
    lastName: "Enter last name",
    email: "Enter email",
    password: "Enter password",
  });

  const [section, setSection] = useState("myPosts");
  const navigate = useNavigate();

  const handleEditInfo = (updatedInfo) => {
    setUserInfo((prev) => ({ ...prev, ...updatedInfo }));
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
                  className={`w-full text-left p-2 rounded ${
                    section === "myPosts" && "bg-gray-600 text-white"
                  }`}
                  onClick={() => setSection("myPosts")}
                >
                  My Posts
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-2 rounded ${
                    section === "myInfo" && "bg-gray-600 text-white"
                  }`}
                  onClick={() => setSection("myInfo")}
                >
                  My Information
                </button>
              </li>              
              <li>
                <button
                  className={`w-full text-left p-2 rounded ${
                    section === "editInfo" && "bg-gray-600 text-white"
                  }`}
                  onClick={() => setSection("editInfo")}
                >
                  Edit Information
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-2 rounded ${
                    section === "likedPosts" && "bg-gray-600 text-white"
                  }`}
                  onClick={() => setSection("likedPosts")}
                >
                  Liked Posts
                </button>
              </li>
              
              <li>
                <button
                  className={`w-full text-left p-2 rounded ${
                    section === "SavedPosts" && "bg-gray-600 text-white"
                  }`}
                  onClick={() => setSection("SavedPosts")}
                >
                  Saved Posts
                </button>
              </li>

              <li>
                <button
                  className={`w-full text-left p-2 rounded ${
                    section === "warnings" && "bg-gray-600 text-white"
                  }`}
                  onClick={() => setSection("warnings")}
                >
                  Warnings
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-2 rounded`}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-2 rounded ${
                    section === "deleteProfile" && "bg-gray-600 text-white"
                  }`}
                  onClick={() => setSection("deleteProfile")}
                >
                  Delete Profile
                </button>
              </li>
            </ul>
          </nav>

          <main className="col-span-3 bg-white shadow-md rounded-lg p-4">
            {section === "myPosts" && <MyPosts />}
            {section === "editInfo" && (
              <EditInformation userInfo={userInfo} onEdit={handleEditInfo} />
            )}
            {section === "myInfo" && <MyInformation />}
            {section === "likedPosts" && <LikedPosts />}
            {section === "SavedPosts" && <SavedPosts />}
            {section === "warnings" && <Warnings />}
            {section === "deleteProfile" && <DeleteProfile />}

          </main>
        </div>
      </div>
    </div>
  );
};

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/my-posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Posts</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="border-b py-2">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="text-gray-600">by {post.author} on {post.publishedDate.split('T')[0]} at {post.publishedDate.split('T')[1].split('.')[0]}</p>
              <p className="text-justify">{parse(post.body.slice(0,230))} . . . . . See More</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

const LikedPosts = () => {
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/liked", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikedPosts(response.data);
      } catch (error) {
        console.error("Error fetching liked posts:", error);
      }
    };

    fetchLikedPosts();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Liked Posts</h2>
      {likedPosts.length > 0 ? (
        <ul>
          {likedPosts.map((post) => (
            <li key={post.id} className="border-b py-2">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="text-gray-600">by {post.author} on {post.publishedDate.split('T')[0]} at {post.publishedDate.split('T')[1].split('.')[0]}</p>
              <p className="text-justify">{parse(post.body.slice(0,230))} . . . . . See More</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No liked posts found.</p>
      )}
    </div>
  );
};

const EditInformation = ({ userInfo, onEdit }) => {
  const [formState, setFormState] = useState(userInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8000/user/edit-details",
        {
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          password: formState.password
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Update successful:", response.data);
      onEdit(formState);
    } catch (error) {
      console.error("Error updating user info:", error, formState);
    }
    setIsModalOpen(true);
  };
  
  const handleContinue = () => {
    setIsModalOpen(false);
  };


  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
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
          className="bg-black text-white p-2 rounded hover:bg-gray-600"
        >
          Save Changes
        </button>
      </form>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>Information Updated!</p>
            <button
              onClick={handleContinue}
              className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-600"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const MyInformation = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/my-info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchMyInfo();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Information</h2>
      {userInfo ? (
        <div className="space-y-2">
          <p>
            <strong>Username:</strong> {userInfo.username}
          </p>
          <p>
            <strong>First Name:</strong> {userInfo.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {userInfo.lastName}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
        </div>
      ) : (
        <p>Loading your information...</p>
      )}
    </div>
  );
};


const SavedPosts = () => {
  const [SavedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/saved", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedPosts(response.data);
      } catch (error) {
        console.error("Error fetching SavedPosts:", error);
      }
    };

    fetchSavedPosts();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Saved Posts</h2>
      {SavedPosts.length > 0 ? (
        <ul>
          {SavedPosts.map((post) => (
            <li key={post.id} className="border-b py-2">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="text-gray-600">by {post.author} on {post.publishedDate.split('T')[0]} at {post.publishedDate.split('T')[1].split('.')[0]}</p>
              <p className="text-justify">{parse(post.body.slice(0,230))} . . . . . See More</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Saved Posts posts found.</p>
      )}
    </div>
  );
};

const DeleteProfile = () => {
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("http://localhost:8000/user/delete", {
        headers: { Authorization: `Bearer ${token}` },
        data: { password },
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Delete Profile</h2>
      <form onSubmit={handleDeleteProfile} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            Enter Password to Delete Your Profile
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
        >
          Delete Profile
        </button>
      </form>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>Profile Deleted Successfully</p>
            <button
              onClick={handleContinue}
              className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-600"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



const Warnings = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Warnings</h2>
    <p>Notifications from the admin regarding platform violations will appear here.</p>
  </div>
);

export default ProfilePage;