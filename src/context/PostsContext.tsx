import React, { createContext, useState, useEffect } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
};

type PostsContextType = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

export const PostsContext = createContext<PostsContextType | null>(null);

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Load posts from localStorage + fallback admin API
  useEffect(() => {
    const saved = localStorage.getItem("posts");
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      fetch("/api/admin/posts") // replace with real API
        .then(res => res.json())
        .then(data => {
          setPosts(data);
          localStorage.setItem("posts", JSON.stringify(data));
        });
    }
  }, []);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};
