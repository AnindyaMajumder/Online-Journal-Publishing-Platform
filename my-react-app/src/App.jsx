import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css'; // Quill Snow theme
import Login from "./Login";
import Register from "./Register";
import Admin from "./Admin";
import LoginBackground from "./LoginBackground";
import Interaction from "./Interaction";
import Notification from "./Notification";
import ProfilePage from "./components/profile";
import NewsfeedPage from "./components/newsfeed";
import WritePost from './components/writepost';
import Navbar from './components/navbar';
import SearchedItems from './components/search';
import JournalRemove from "./JournalRemove"; // Import JournalRemove component
import Forget from "./ForgotPassword.jsx";
// ProtectedRoute component to enforce authentication
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Pages where Navbar is not visible */}
        <Route
          path="/login"
          element={
            <LoginBackground>
              <Login />
            </LoginBackground>
          }
        />
        <Route path="/ForgotPassword" element={<Forget />} />
        <Route
          path="/register"
          element={
            <LoginBackground>
              <Register />
            </LoginBackground>
          }
        />
        <Route path="/" element={<LoginBackground />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />


        {/* Pages where Navbar is visible */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                {/* NewsfeedPage - Protected Route */}
                <Route
                  path="/NewsfeedPage"
                  element={
                    <ProtectedRoute>
                      <NewsfeedPage />
                    </ProtectedRoute>
                  }
                />
                {/* Search page */}
                <Route path="/search" element={<SearchedItems />} />
                {/* JournalRemove page route - Protected */}
                <Route
                  path="/journalremove"
                  element={
                    <ProtectedRoute>
                      <JournalRemove />
                    </ProtectedRoute>
                  }
                />
                {/* Interaction page */}
                <Route path="/interaction" element={<Interaction />} />
                {/* Notification page */}
                <Route path="/notifications" element={<Notification />} />
                {/* Profile page */}
                <Route path="/profile" element={<ProfilePage />} />
                {/* WritePost page */}
                <Route path="/writepost" element={<WritePost />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}
