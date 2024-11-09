// src/components/Post.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPost from './BlogPost'; // Adjust import path if necessary

const Post: React.FC = () => {
  const { id } = useParams(); // Get post ID from route params

  const postId = id ? Number(id) : 0;

  // Example post data (should be fetched based on postId)
  const post = {
    id: postId,
    title: 'Post Title Here',
    content: '<p>Post content goes here...</p>',
    author: 'John Doe',
    date: '2024-10-23',
    category: 'Technology', // Add the category field here
  };

  return (
    <div>
      <BlogPost 
        id={postId} 
        title={post.title} 
        content={post.content} 
        author={post.author} 
        date={post.date} 
        category={post.category} // Pass category prop
      />
    </div>
  );
};

export default Post;
