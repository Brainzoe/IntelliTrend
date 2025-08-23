// src/components/CommentSection.tsx
import React, { useMemo, useState } from "react";
import { useBlog, CommentType, ReplyType } from "../context/BlogContext";
import ReactionButtons from "./ReactionButtons";

interface Props {
  postId: string;
}

/** Simple "time ago" formatter */
export const timeAgo = (iso: string) => {
  const date = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // in seconds

  if (diff < 0) return "just now"; // future dates

  const units: [label: string, secs: number][] = [
    ["year", 31536000],   // 365 days
    ["month", 2592000],   // 30 days
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];

  for (const [label, secs] of units) {
    const value = Math.floor(diff / secs);
    if (value >= 1) {
      return `${value} ${label}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};


type NodeType = CommentType | ReplyType;

const CommentSection: React.FC<Props> = ({ postId }) => {
  const { posts, addComment, addReply } = useBlog();
  const post = useMemo(() => posts.find((p) => p._id === postId), [posts, postId]);

  const [newCommentText, setNewCommentText] = useState("");
  const [openReplyFor, setOpenReplyFor] = useState<string | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [showReactionsFor, setShowReactionsFor] = useState<Record<string, boolean>>({});
  const [collapsedComments, setCollapsedComments] = useState<Record<string, boolean>>({});

  if (!post) return <p>Loading comments...</p>;

  // ----------------- Fixed functions -----------------
  const onAddComment = async () => {
    if (!newCommentText.trim()) return;
    await addComment(postId, newCommentText.trim()); // author removed
    setNewCommentText("");
  };

  const onReply = async (parentId: string) => {
    const text = (replyDrafts[parentId] || "").trim();
    if (!text) return;
    await addReply(postId, parentId, text); // author removed
    setReplyDrafts((prev) => ({ ...prev, [parentId]: "" }));
    setOpenReplyFor(null);
  };
  // ----------------------------------------------------

  const renderList = (list: NodeType[] | undefined, depth = 0) => {
    if (!list || list.length === 0) return null;

    return list.map((item) => {
      const indent = Math.min(depth, 8) * 16; // cap at 8 levels visually
      const isShowingReactions = showReactionsFor[item._id];
      const isCollapsed = collapsedComments[item._id];

      return (
        <div key={item._id} className="mt-3" style={{ marginLeft: indent }}>
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
            <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{item.author || "Unknown"}</span>
                <span className="text-xs text-gray-500">{timeAgo(item.date)}</span>
              </div>

              <p className="mt-1 text-sm whitespace-pre-wrap">{item.text}</p>

              <div className="mt-2 flex items-center gap-3">
                <button
                  className="text-xs text-blue-600 hover:underline"
                  onClick={() => setOpenReplyFor((id) => (id === item._id ? null : item._id))}
                >
                  Reply
                </button>

                {/* Reaction buttons for comment/reply */}
                <ReactionButtons
                  postId={postId}
                  targetId={item._id}
                  initialReactions={item.reactions || {}}
                  initialReactedBy={item.reactedBy || {}}
                />
              </div>

              {/* Toggle grouped counts */}
              <div className="mt-1">
                <button
                  onClick={() =>
                    setShowReactionsFor((prev) => ({
                      ...prev,
                      [item._id]: !prev[item._id],
                    }))
                  }
                  className="text-xs text-blue-500"
                >
                  {isShowingReactions ? "Hide Reactions" : "View Reactions"}
                </button>

                {isShowingReactions && item.reactions && (
                  <div className="mt-1 text-xs text-gray-700">
                    {Object.entries(item.reactions).map(([emoji, count]) => (
                      <span key={emoji} className="mr-2">
                        {emoji} {count}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Reply editor */}
              {openReplyFor === item._id && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 flex-1"
                    placeholder="Write a reply..."
                    value={replyDrafts[item._id] || ""}
                    onChange={(e) =>
                      setReplyDrafts((prev) => ({ ...prev, [item._id]: e.target.value }))
                    }
                  />
                  <button className="bg-blue-600 text-white px-3 rounded" onClick={() => onReply(item._id)}>
                    Reply
                  </button>
                </div>
              )}

              {/* Collapse toggle for replies */}
              {item.replies && item.replies.length > 0 && (
                <div className="mt-2">
                  <button
                    className="text-xs text-gray-600 hover:underline"
                    onClick={() =>
                      setCollapsedComments((prev) => ({
                        ...prev,
                        [item._id]: !prev[item._id],
                      }))
                    }
                  >
                    {isCollapsed ? `Show Replies (${item.replies.length})` : "Hide Replies"}
                  </button>
                </div>
              )}

              {/* Children */}
              {!isCollapsed && item.replies && item.replies.length > 0 && renderList(item.replies, depth + 1)}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-3">Comments</h4>

      {/* New comment */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border rounded px-2 py-2 flex-1"
          placeholder="Add a comment..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 rounded" onClick={onAddComment}>
          Post
        </button>
      </div>

      {/* Thread */}
      {post.comments && post.comments.length > 0 ? (
        <div>{renderList(post.comments, 0)}</div>
      ) : (
        <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default CommentSection;
