import './App.css'
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'; // Quill Snow theme
import ProfilePage from "./components/profile";
import NewsfeedPage from "./components/newsfeed";
import WritePost from './components/writepost';
import Navbar from './components/navbar';
import SearchedItems from './components/search';

function App() {
//<ProfilePage/>

  return (
<Router>
  <Navbar />
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<NewsfeedPage/>} />

        <Route path="/search" element={<SearchedItems />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/writepost" element={<WritePost/>} />
      </Routes>
    </Router>
  )
}

export default App
