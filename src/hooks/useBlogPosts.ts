// src/hooks/useBlogPosts.ts
import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
}

export const useBlogPosts = (initialPosts: Post[]) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem("blogPosts");
    return saved ? JSON.parse(saved) : initialPosts;
  });

  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  }, [posts]);

  return { posts, setPosts };
};
