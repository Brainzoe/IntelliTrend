// src/components/BlogList.tsx
import React from "react";
import { Post } from "../context/BlogContext";
import BlogPost from "./BlogPost";

export interface BlogListProps {
  posts: Post[];
  userId: string;
  preview?: boolean; // Add this line
}

const BlogList: React.FC<BlogListProps> = ({ posts, userId, preview = false }) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <BlogPost key={post._id} post={post} userId={userId} preview={preview} />
      ))}
    </div>
  );
};

export default BlogList;
