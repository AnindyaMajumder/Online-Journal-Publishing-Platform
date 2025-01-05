import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Root route - renders LoginBackground with NewsfeedPage */}
        <Route
          path="/NewsfeedPage"
          element={
              <NewsfeedPage />
            
          }
        />

        {/* Login page route */}
        <Route
          path="/login"
          element={
            <LoginBackground>
              <Login />
            </LoginBackground>
          }
        />

        {/* Register page route */}
        <Route
          path="/register"
          element={
            <LoginBackground>
              <Register />
            </LoginBackground>
          }
        />

        {/* Simple LoginBackground page */}
        <Route path="/" element={<LoginBackground />} />

        {/* Admin page route */}
        <Route path="/admin" element={<Admin />} />

        {/* Interaction page route */}
        <Route path="/interaction" element={<Interaction />} />

        {/* Notification page route */}
        <Route path="/notifications" element={<Notification />} />

        {/* Profile page route */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* WritePost page route */}
        <Route path="/writepost" element={<WritePost />} />
      </Routes>
    </Router>
  );
}
