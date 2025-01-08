import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import parse from "html-react-parser";

const Newsfeed = () => {

  const navigate = useNavigate();
 // const [announcements, setAnnouncements] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('recent');

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const announcementsResponse = await axios.get('https://reqres.in/api/users?page=2');
        const recentPostsResponse = await axios.get('http://localhost:8000/recent');
        const popularPostsResponse = await axios.get('http://localhost:8000/');
        console.log('API Response:', recentPostsResponse.data);
        console.log('API Response:', popularPostsResponse.data);
        //setAnnouncements(announcementsResponse.data);
        setRecentPosts(recentPostsResponse.data);
        setPopularPosts(popularPostsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);    

  // Sample data
  const announcements = [
    { id: 1, message: 'Welcome to the Journals App! Stay updated with the latest journals.' },
    { id: 2, message: 'Maintenance scheduled for this weekend. Expect downtime from 2 AM to 5 AM.' },
  ];
  
  const handlePostClick = (postId) => {
    localStorage.setItem('postId', postId);
    navigate('/interaction');
  };
  // Tab state: 'recent' or 'popular'

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Announcements */}
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded p-4 mb-6">
          <h2 className="text-lg font-bold mb-2">Announcements</h2>
          <ul className="space-y-2">
            {announcements.map((announcement) => (
              <li key={announcement.id} className="text-sm">
                {announcement.message}
              </li>
            ))}
          </ul>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <button
            className={`w-full px-6 py-2 mx-2 text-lg font-semibold rounded shadow ${activeTab === 'recent' ? ' bg-gray-600 text-white' : 'bg-white text-gray-600'}`}
            onClick={() => setActiveTab('recent')}
          >
            Recent
          </button>
          <button
            className={`w-full px-6 py-2 mx-2 text-lg font-semibold rounded shadow ${activeTab === 'popular' ? 'bg-gray-600 text-white' : 'bg-white text-gray-600'}`}
            onClick={() => setActiveTab('popular')}
          >
            Popular
          </button>
        </div>

        {/* Posts */}
        <div>
          {activeTab === 'recent' ? (
            <div>
              {recentPosts.map((post) => (
                <div key={post.id} 
                className="bg-white p-4 rounded shadow mb-4 cursor-pointer"
                onClick={() => handlePostClick(post.id)}
                >
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-gray-600">by {post.author} on {post.publishedDate.split('T')[0]} at {post.publishedDate.split('T')[1].split('.')[0]}</p>
                  <p className="text-justify">{parse(post.body.slice(0,330))} . . . . . See More</p>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {popularPosts.map((post) => (
                <div key={post.id} 
                className="bg-white p-4 rounded shadow mb-4 cursor-pointer"
                onClick={() => handlePostClick(post.id)}
                >
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-gray-600">by {post.author} on {post.publishedDate.split('T')[0]} at {post.publishedDate.split('T')[1].split('.')[0]}</p>
                  <p className="text-justify">{parse(post.body.slice(0,330))} . . . . . See More</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsfeed;