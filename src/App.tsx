import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Header from './components/Header';
import BlogList from './components/BlogList';
import RecentUpdates from './components/RecentUpdates';
import posts from './data/posts';

// Import icons for categories
import techIcon from './assets/tech.svg';
import adventureIcon from './assets/adventure.svg';
import socialIcon from './assets/social.svg';
import celebrityIcon from './assets/celebrity.svg';
import trendsIcon from './assets/trends.svg';

// Import new pages
import Technology from './pages/Technology';
import Adventure from './pages/Adventure';
import Social from './pages/Social';
import Celebrity from './pages/Celebrity';
import Trends from './pages/Trends';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Define categories with both label and icon
  const categories = [
    { label: 'Technology', icon: techIcon },
    { label: 'Adventure', icon: adventureIcon },
    { label: 'Social', icon: socialIcon },
    { label: 'Celebrity', icon: celebrityIcon },
    { label: 'Trends', icon: trendsIcon },
  ];

  const recentUpdates = [
    { id: 1, title: 'New Technology Trends 2024', date: '2024-10-22' },
    { id: 2, title: 'Exploring New Adventures', date: '2024-10-20' },
    { id: 3, title: 'Top Celebrity News This Week', date: '2024-10-18' },
    { id: 4, title: 'Social Media Insights', date: '2024-10-16' },
  ];

  // Define the search handler
  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  // Define the category select handler
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Filter posts based on both search query and selected category
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery) &&
      (selectedCategory ? post.category === selectedCategory : true)
  );

  return (
    <>
      <Header onSearch={handleSearch} categories={categories} onCategorySelect={handleCategorySelect} />

      <div className="flex flex-col md:flex-row p-4">
        <main className="flex-grow md:w-3/4">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<BlogList posts={filteredPosts} />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/adventure" element={<Adventure />} />
            <Route path="/social" element={<Social />} />
            <Route path="/celebrity" element={<Celebrity />} />
            <Route path="/trends" element={<Trends />} />
          </Routes>
        </main>

        {/* Recent Updates Sidebar */}
        <aside className="w-full md:w-1/4 lg:w-1/5 p-4 mt-16">
          <RecentUpdates updates={recentUpdates} />
        </aside>
      </div>

      <Footer />
    </>
  );
};

export default App;
