// src/services/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // update with your backend URL
});

// -------- POSTS --------
export const fetchPosts = () => API.get("/posts");
export const fetchPost = (id: string) => API.get(`/posts/${id}`);
export const createPost = (postData: any) => API.post("/posts", postData);
export const updatePost = (id: string, postData: any) =>
  API.put(`/posts/${id}`, postData);
export const deletePost = (id: string) => API.delete(`/posts/${id}`);

// -------- COMMENTS --------
export const addComment = (postId: string, content: string) =>
  API.post(`/posts/${postId}/comments`, { content });

export const addReply = (postId: string, commentId: string, content: string) =>
  API.post(`/posts/${postId}/comments/${commentId}/replies`, { content });

// -------- REACTIONS --------
export const reactToPost = (postId: string, type: string, userId: string) =>
  API.post(`/posts/${postId}/react`, { type, userId });

export const reactToComment = (
  postId: string,
  commentId: string,
  type: string,
  userId: string
) => API.post(`/posts/${postId}/comments/${commentId}/react`, { type, userId });

export const reactToReply = (
  postId: string,
  commentId: string,
  replyId: string,
  type: string,
  userId: string
) =>
  API.post(
    `/posts/${postId}/comments/${commentId}/replies/${replyId}/react`,
    { type, userId }
  );
