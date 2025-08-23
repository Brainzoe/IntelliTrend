// src/components/BlogList.tsx
import React from "react";
import { Post } from "../context/BlogContext";
import BlogPost from "./BlogPost";

// BlogList.tsx
interface BlogListProps {
  posts: Post[];        
  preview?: boolean;    // keep preview prop
}

const BlogList: React.FC<BlogListProps> = ({ posts, preview }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <BlogPost key={post._id} post={post} preview={preview} />
      ))}
    </div>
  );
};


export default BlogList;
