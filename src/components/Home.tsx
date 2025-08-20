// src/components/Home.tsx
import React from "react";
import { Post } from "../context/BlogContext";
import BlogList from "./BlogList";

interface HomeProps {
  posts: Post[];
  userId: string;
}

const Home: React.FC<HomeProps> = ({ posts, userId }) => {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
      <BlogList posts={posts} userId={userId} preview={true} />
    </div>
  );
};

export default Home;
