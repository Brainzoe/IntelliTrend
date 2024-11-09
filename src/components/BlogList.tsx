// src/components/BlogList.tsx
import React from 'react';
import BlogPost from './BlogPost';

interface BlogListProps {
  posts: {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    category: string;
  }[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <BlogPost
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
          date={post.date}
          category={post.category}  // Add category to props if needed
        />
      ))}
    </div>
  );
};

export default BlogList;
