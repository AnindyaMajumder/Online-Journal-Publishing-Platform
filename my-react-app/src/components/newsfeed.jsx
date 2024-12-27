import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Navbar from "./navbar";

const NewsfeedPage = () => {

  const [selectedTag, setSelectedTag] = useState(null);

  const tags = ["Technology", "Health", "Lifestyle", "Finance", "Education"];

  return (
    <div className="min-h-screen bg-gray-100">
      <div><Navbar/></div>
      <div className="max-w-6xl mx-auto py-8">
      <section>
              <div className="bg-yellow-100 p-4 rounded">
                <p className="text-yellow-800">Platform update: New features are coming soon!</p>
              </div>
            </section>

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


            <section className="mb-2">
              <h2 className="text-xl font-semibold mt-2 mb-2">Recent Posts</h2>
              <div className="space-y-4">
                <JournalCard title="First Journal" date="2024-12-25" />
                <JournalCard title="Second Journal" date="2024-12-24" />
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-2 mb-2">Popular</h2>
              <div className="space-y-4">
                <JournalCard title="Trending Journal" date="2024-12-20" />
                <JournalCard title="Popular Journal" date="2024-12-19" />
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
