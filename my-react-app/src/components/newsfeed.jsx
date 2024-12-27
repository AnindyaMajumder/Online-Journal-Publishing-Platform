import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const NewsfeedPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const tags = ["Technology", "Health", "Lifestyle", "Finance", "Education"];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Newsfeed</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <aside className="md:col-span-1 bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Tags</h2>
            <ul className="space-y-2">
              {tags.map((tag, index) => (
                <li key={index}>
                  <button
                    className={`w-full text-left p-2 rounded ${
                      selectedTag === tag && "bg-blue-500 text-white"
                    }`}
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <main className="md:col-span-3">
            <div className="mb-4 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search journals..."
                value={searchQuery}
                onChange={handleSearch}
                className="flex-grow p-2 border border-gray-300 rounded"
              />
              <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={() => console.log("Searching for", searchQuery)}
              >
                Search
              </button>
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
              <div className="space-y-4">
                <JournalCard title="First Journal" date="2024-12-25" />
                <JournalCard title="Second Journal" date="2024-12-24" />
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Popular</h2>
              <div className="space-y-4">
                <JournalCard title="Trending Journal" date="2024-12-20" />
                <JournalCard title="Popular Journal" date="2024-12-19" />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Announcements</h2>
              <div className="bg-yellow-100 p-4 rounded">
                <p className="text-yellow-800">Platform update: New features are coming soon!</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

const JournalCard = ({ title, date }) => (
  <div className="p-4 bg-white shadow-md rounded-lg">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-500">Published on {date}</p>
  </div>
);

export default NewsfeedPage;
