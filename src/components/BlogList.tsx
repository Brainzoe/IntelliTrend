// src/components/BlogList.tsx
import React from "react";
import { Post } from "../context/BlogContext"; // adjust import if Post type is elsewhere
import BlogPost from "./BlogPost";

interface BlogListProps {
  posts: Post[];        // <-- add this
  userId: string;
  preview?: boolean;
}

const BlogList: React.FC<BlogListProps> = ({ posts, userId, preview }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <BlogPost key={post._id} post={post} userId={userId} preview={preview} />
      ))}
    </div>
  );
};

export default BlogList;
