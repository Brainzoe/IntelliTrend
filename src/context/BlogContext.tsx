// src/context/BlogContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export interface Post {
  _id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  date: string;
  shares?: number;
  reactions?: { [key: string]: number };
  reactedBy?: { [userId: string]: string };
  comments?: CommentType[];
  savedBy?: string[];
}

export interface CommentType {
  _id: string;
  author: string;
  text: string;
  reactions?: { [key: string]: number };
  reactedBy?: { [userId: string]: string };
  replies?: ReplyType[];
  date: string;
}

export interface ReplyType {
  _id: string;
  author: string;
  text: string;
  reactions?: { [key: string]: number };
  reactedBy?: { [userId: string]: string };
  replies?: ReplyType[];
  date: string;
}

interface BlogContextType {
  posts: Post[];
  fetchPosts: () => Promise<void>;
  addPost: (post: { title: string; author: string; category: string; content: string }) => Promise<void>;
  updatePost: (id: string, post: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  addComment: (postId: string, author: string, text: string) => Promise<Post | undefined>;
  addReply: (postId: string, parentId: string, author: string, text: string) => Promise<Post | undefined>;
  addReaction: (
    postId: string,
    emoji: string,
    userId: string,
    targetId?: string,
    parentCommentId?: string
  ) => Promise<Post | undefined>;
  
  sharePost: (postId: string) => Promise<void>;
  toggleSavePost: (postId: string, userId: string) => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Recursive helper for inserting replies
// const insertReplyRecursive = (
//   items: CommentType[] | ReplyType[],
//   parentId: string,
//   newReply: ReplyType
// ): CommentType[] | ReplyType[] => {
//   return items.map((item) => {
//     if (item._id === parentId) {
//       return { ...item, replies: [...(item.replies || []), newReply] };
//     } else if (item.replies && item.replies.length > 0) {
//       return { ...item, replies: insertReplyRecursive(item.replies, parentId, newReply) };
//     } else {
//       return item;
//     }
//   });
// };
// BlogContext.tsx

// helper to insert reply at correct depth
const insertReplyRecursive = (
  comments: CommentType[],
  parentId: string,
  newReply: CommentType
): CommentType[] => {
  return comments.map(comment => {
    if (comment._id === parentId) {
      // found the parent -> attach reply
      return {
        ...comment,
        replies: [...(comment.replies || []), newReply],
      };
    }

    // otherwise, check deeper replies recursively
    if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: insertReplyRecursive(comment.replies, parentId, newReply),
      };
    }

    return comment;
  });
};


// Recursive helper for adding reactions
const insertReactionRecursive = (
  comments: CommentType[] | ReplyType[] | undefined,
  targetId: string,
  type: string,
  userId: string
): CommentType[] | ReplyType[] | undefined => {
  if (!comments) return comments;
  return comments.map((c) => {
    if (c._id === targetId) {
      return {
        ...c,
        reactions: { ...(c.reactions || {}), [type]: (c.reactions?.[type] || 0) + 1 },
        reactedBy: { ...(c.reactedBy || {}), [userId]: type },
      };
    } else if (c.replies && c.replies.length > 0) {
      return { ...c, replies: insertReactionRecursive(c.replies, targetId, type, userId) };
    } else {
      return c;
    }
  });
};

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("/api/posts");
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const addPost = async (post: { title: string; author: string; category: string; content: string }) => {
    try {
      const { data } = await axios.post("/api/posts", post);
      setPosts((prev) => [data, ...prev]);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const updatePost = async (id: string, post: Partial<Post>) => {
    try {
      const { data } = await axios.put(`/api/posts/${id}`, post);
      setPosts((prev) => prev.map((p) => (p._id === id ? data : p)));
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const addComment = async (postId: string, author: string, text: string): Promise<Post | undefined> => {
    try {
      const { data } = await axios.post(`/api/posts/${postId}/comment`, { author, text });
      let updatedPost: Post | undefined;
      setPosts((prev) => {
        updatedPost = prev.map((p) => (p._id === postId ? { ...p, comments: data.comments } : p))
                          .find((p) => p._id === postId);
        return prev.map((p) => (p._id === postId ? { ...p, comments: data.comments } : p));
      });
      return updatedPost;
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const addReply = async (
    postId: string,
    parentId: string,
    author: string,
    text: string
  ): Promise<Post | undefined> => {
    try {
      const { data } = await axios.post(
        `/api/posts/${postId}/comment/${parentId}/reply`,
        { author, text }
      );
  
      let updatedPost: Post | undefined;
      setPosts((prev) => {
        updatedPost = prev.map((p) =>
          p._id === postId ? { ...p, comments: data.comments } : p
        ).find((p) => p._id === postId);
  
        return prev.map((p) =>
          p._id === postId ? { ...p, comments: data.comments } : p
        );
      });
      return updatedPost;
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };
  
  const addReaction = async (
    postId: string,
    emoji: string,
    userId: string,
    targetId?: string,
    parentCommentId?: string
  ): Promise<Post | undefined> => {
    try {
      let url = `/api/posts/${postId}`;
  
      if (!targetId) {
        // post-level reaction
        url += `/reaction`;
      } else if (parentCommentId) {
        // reply reaction
        url += `/comment/${parentCommentId}/reply/${targetId}/reaction`;
      } else {
        // comment reaction
        url += `/comment/${targetId}/reaction`;
      }
  
      const { data } = await axios.post(url, {
        type: emoji, // e.g. "like", "love"
        userId,
      });
  
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, comments: data.comments, reactions: data.reactions }
            : p
        )
      );
  
      return data;
    } catch (err) {
      console.error("Error adding reaction:", err);
    }
  };
  
  
  const toggleSavePost = async (postId: string, userId: string) => {
    try {
      const { data } = await axios.post(`/api/posts/${postId}/save`, { userId });
      setPosts((prev) => prev.map((p) => (p._id === postId ? { ...p, savedBy: data.savedBy } : p)));
    } catch (error) {
      console.error("Error toggling save post:", error);
    }
  };

  const sharePost = async (postId: string) => {
    try {
      await axios.post(`/api/posts/${postId}/share`);
      setPosts((prev) => prev.map((p) => (p._id === postId ? { ...p, shares: (p.shares || 0) + 1 } : p)));
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        posts,
        fetchPosts,
        addPost,
        updatePost,
        deletePost,
        addComment,
        addReply,
        addReaction,
        toggleSavePost,
        sharePost,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("useBlog must be used within a BlogProvider");
  return context;
};
