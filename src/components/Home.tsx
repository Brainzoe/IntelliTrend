import React from 'react';
import BlogList from './BlogList';
import posts from '../data/posts'; // Import posts data

interface HomeProps {
  searchQuery: string; // Add searchQuery prop
}

const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  // Filter posts based on the search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery) ||
    post.content.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <main className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-center text-5xl font-bold text-blue-600 mb-6">IntelliTrend</h1>
        <p className="text-center text-lg text-gray-600 mb-8">
          Discover the latest trends and insights in the world of blogging. Use the search bar to find
          specific topics or explore our recent posts below!
        </p>
        <BlogList posts={filteredPosts} /> {/* Pass filtered posts */}
      </main>
    </div>
  );
};

export default Home;

