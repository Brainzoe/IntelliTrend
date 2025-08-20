// src/components/BlogPost.tsx
import React, { useState } from "react";
import { Post } from "../context/BlogContext";
import ReactionButtons from "./ReactionButtons";
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";

interface BlogPostProps {
  post: Post;
  userId: string;
  preview?: boolean;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, userId, preview = false }) => {
  const [showComments, setShowComments] = useState(!preview);
  const [showReactions, setShowReactions] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // handle long text
  const MAX_PREVIEW_LENGTH = 200;
  const isLong = post.content.length > MAX_PREVIEW_LENGTH;
  const displayContent =
    preview || !expanded
      ? post.content.slice(0, MAX_PREVIEW_LENGTH) + (isLong && !expanded ? "..." : "")
      : post.content;

  return (
    <div className="border p-4 rounded shadow-sm bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-2">
        {preview ? <Link to={`/blog/${post._id}`}>{post.title}</Link> : post.title}
      </h2>
      <p className="text-sm text-gray-500 mb-2">
        By {post.author} | {new Date(post.date).toLocaleDateString()}
      </p>

      {/* Content with "Read More" */}
      <p className="mb-2">
        {displayContent}
        {isLong && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="text-blue-500 ml-2"
          >
            Read More
          </button>
        )}
      </p>

      {/* Reaction Buttons (clickable) */}
      <ReactionButtons
        postId={post._id}
        userId={userId}
        initialReactions={post.reactions}
        initialReactedBy={post.reactedBy}
      />

      {/* Toggle for grouped reactions */}
      <div className="mt-2">
        <button
          onClick={() => setShowReactions((prev) => !prev)}
          className="text-sm text-blue-500"
        >
          {showReactions ? "Hide Reactions" : "View Reactions"}
        </button>
        {showReactions && post.reactions && (
          <div className="mt-2 text-sm text-gray-700">
            {Object.entries(post.reactions).map(([emoji, count]) => (
              <span key={emoji} className="mr-2">
                {emoji} {count}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Shares */}
      {post.shares !== undefined && (
        <p className="mt-2 text-sm text-gray-500">Shares: {post.shares}</p>
      )}

      {/* Comments */}
      {!preview && (
        <>
          <button
            className="mt-2 text-blue-500"
            onClick={() => setShowComments((prev) => !prev)}
          >
            {showComments ? "Hide Comments" : `Show Comments (${post.comments?.length || 0})`}
          </button>

          {showComments && (
            <div className="mt-4">
              <CommentSection postId={post._id} userId={userId} />
            </div>
          )}
        </>
      )}

      {/* Latest comments in preview mode */}
      {preview && post.comments && post.comments.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          Latest comments:
          {post.comments.slice(0, 2).map((c) => (
            <div key={c._id} className="mt-1">
              <strong>{c.author}:</strong> {c.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPost;
