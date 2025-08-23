// src/components/Post.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { Post as PostType } from "../context/BlogContext";
import BlogPost from "./BlogPost";

interface PostProps {
  posts: PostType[];
}

const Post: React.FC<PostProps> = ({ posts }) => {
  const { postId } = useParams<{ postId: string }>();
  const post = posts.find((p) => p._id === postId);

  if (!post) return <p>Post not found.</p>;

  return <BlogPost post={post} />;
};

export default Post;
