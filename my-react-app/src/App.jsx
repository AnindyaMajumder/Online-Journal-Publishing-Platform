import './App.css'
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'; // Quill Snow theme
import ProfilePage from "./components/profile";
import NewsfeedPage from "./components/newsfeed";
import WritePost from './components/writepost';

function App() {
//<ProfilePage/>

  return (
<Router>
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<NewsfeedPage/>} />

        {/* Route for the profile page */}
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/writepost" element={<WritePost/>} />
      </Routes>
    </Router>
  )
}

export default App
