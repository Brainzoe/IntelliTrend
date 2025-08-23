// src/App.tsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Header from "./components/Header";
import BlogList from "./components/BlogList";
import Post from "./components/Post";
import RecentUpdates from "./components/RecentUpdates";
import { BlogProvider, useBlog } from "./context/BlogContext";
import { Toaster } from "react-hot-toast";

// Authentications
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Icons
import techIcon from "./assets/tech.svg";
import adventureIcon from "./assets/adventure.svg";
import socialIcon from "./assets/social.svg";
import celebrityIcon from "./assets/celebrity.svg";
import trendsIcon from "./assets/trends.svg";

// Pages
import Technology from "./pages/Technology";
import Adventure from "./pages/Adventure";
import Social from "./pages/Social";
import Celebrity from "./pages/Celebrity";
import Trends from "./pages/Trends";

// Users
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const userId = "guest-user";

  const categories = [
    { label: "Technology", icon: techIcon },
    { label: "Adventure", icon: adventureIcon },
    { label: "Social", icon: socialIcon },
    { label: "Celebrity", icon: celebrityIcon },
    { label: "Trends", icon: trendsIcon },
  ];

  const recentUpdates = [
    { id: 1, title: "New Technology Trends 2024", date: "2024-10-22" },
    { id: 2, title: "Exploring New Adventures", date: "2024-10-20" },
    { id: 3, title: "Top Celebrity News This Week", date: "2024-10-18" },
    { id: 4, title: "Social Media Insights", date: "2024-10-16" },
  ];

  const handleSearch = (query: string) => setSearchQuery(query.toLowerCase());
  const handleCategorySelect = (category: string) =>
    setSelectedCategory(category);

  return (
    <AuthProvider>
      <BlogProvider>
        <Header
          onSearch={handleSearch}
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />

        <div className="flex flex-col md:flex-row p-4">
          <main className="flex-grow md:w-3/4">
            <Routes>
              <Route path="/" element={<HomeWrapper userId={userId} />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/blog"
                element={<BlogListWrapper userId={userId} />}
              />
              <Route
                path="/blog/:postId"
                element={<PostWrapper userId={userId} />}
              />
              <Route path="/technology" element={<Technology />} />
              <Route path="/adventure" element={<Adventure />} />
              <Route path="/social" element={<Social />} />
              <Route path="/celebrity" element={<Celebrity />} />
              <Route path="/trends" element={<Trends />} />
            </Routes>
          </main>

          <aside className="w-full md:w-1/4 lg:w-1/5 p-4 mt-16">
            <RecentUpdates updates={recentUpdates} />
          </aside>
        </div>

        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </BlogProvider>
    </AuthProvider>
  );
};

// ---------------- Wrappers using useBlog ----------------

// Home wrapper
const HomeWrapper: React.FC<{ userId: string }> = ({ userId }) => {
  const { posts } = useBlog();
  return <Home posts={posts} userId={userId} />;
};

const BlogListWrapper: React.FC<{ userId: string }> = ({ userId }) => {
  const { posts } = useBlog();
  return <BlogList posts={posts} userId={userId} />;
};

// Post wrapper
const PostWrapper: React.FC<{ userId: string }> = ({ userId }) => {
  const { posts } = useBlog();
  return <Post posts={posts} userId={userId} />;
};

export default App;
